import {
  createPrivateKey,
  createPublicKey,
  generateKeyPairSync,
  sign,
  verify,
  type KeyObject,
} from "node:crypto";

/*
 * Doctrine signature (spec §9.x / IP-integrity).
 *
 * The doctrine is content-addressed by `content_hash` (sha256 of all content
 * files). We sign that hash string with an ed25519 private key held only by the
 * doctrine author (gitignored .env). The public key + detached signature are
 * published in meta.json, so any consumer can verify the doctrine is authentic
 * and unmodified WITHOUT the private key.
 *
 * Wire format:
 *   - private key: base64( PKCS8 DER )   — secret, .env only
 *   - public key:  base64( SPKI  DER )   — public, meta.json
 *   - signature:   base64( raw 64-byte ed25519 signature of UTF-8 content_hash )
 */

export interface DoctrineKeypair {
  /** base64(PKCS8 DER) — SECRET. */
  privateKey: string;
  /** base64(SPKI DER) — public. */
  publicKey: string;
}

export function generateDoctrineKeypair(): DoctrineKeypair {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  return {
    privateKey: privateKey.export({ type: "pkcs8", format: "der" }).toString("base64"),
    publicKey: publicKey.export({ type: "spki", format: "der" }).toString("base64"),
  };
}

function importPrivateKey(privateKeyB64: string): KeyObject {
  return createPrivateKey({
    key: Buffer.from(privateKeyB64, "base64"),
    format: "der",
    type: "pkcs8",
  });
}

function importPublicKey(publicKeyB64: string): KeyObject {
  return createPublicKey({
    key: Buffer.from(publicKeyB64, "base64"),
    format: "der",
    type: "spki",
  });
}

/** Derive the base64(SPKI) public key from a base64(PKCS8) private key. */
export function publicKeyFromPrivate(privateKeyB64: string): string {
  const pub = createPublicKey(importPrivateKey(privateKeyB64));
  return pub.export({ type: "spki", format: "der" }).toString("base64");
}

/**
 * Sign a content hash. Returns the detached signature (base64) and the matching
 * public key (base64) so callers can publish both together.
 */
export function signDoctrineHash(
  contentHash: string,
  privateKeyB64: string,
): { signature: string; publicKey: string } {
  const key = importPrivateKey(privateKeyB64);
  const signature = sign(null, Buffer.from(contentHash, "utf8"), key).toString("base64");
  const publicKey = createPublicKey(key)
    .export({ type: "spki", format: "der" })
    .toString("base64");
  return { signature, publicKey };
}

/** Verify a detached signature over a content hash. Never throws. */
export function verifyDoctrineSignature(
  contentHash: string,
  signatureB64: string,
  publicKeyB64: string,
): boolean {
  try {
    return verify(
      null,
      Buffer.from(contentHash, "utf8"),
      importPublicKey(publicKeyB64),
      Buffer.from(signatureB64, "base64"),
    );
  } catch {
    return false;
  }
}
