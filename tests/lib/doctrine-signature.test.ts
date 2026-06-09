import { describe, expect, it } from "vitest";
import {
  generateDoctrineKeypair,
  publicKeyFromPrivate,
  signDoctrineHash,
  verifyDoctrineSignature,
} from "../../src/lib/doctrine-signature";

const HASH = "sha256:7f74794921d22a1e251b4ad6577f2d77c8d9320db2dfe105b9e06e1a2e699227";

describe("doctrine ed25519 signature", () => {
  it("verifies a signature produced for the same hash", () => {
    const { privateKey } = generateDoctrineKeypair();
    const { signature, publicKey } = signDoctrineHash(HASH, privateKey);
    expect(verifyDoctrineSignature(HASH, signature, publicKey)).toBe(true);
  });

  it("rejects a signature when the hash is tampered", () => {
    const { privateKey } = generateDoctrineKeypair();
    const { signature, publicKey } = signDoctrineHash(HASH, privateKey);
    const tampered = HASH.replace(/.$/, "0");
    expect(verifyDoctrineSignature(tampered, signature, publicKey)).toBe(false);
  });

  it("rejects a signature verified against the wrong public key", () => {
    const a = generateDoctrineKeypair();
    const b = generateDoctrineKeypair();
    const { signature } = signDoctrineHash(HASH, a.privateKey);
    expect(verifyDoctrineSignature(HASH, signature, b.publicKey)).toBe(false);
  });

  it("derives the embedded public key from the private key", () => {
    const { privateKey, publicKey } = generateDoctrineKeypair();
    const { publicKey: derived } = signDoctrineHash(HASH, privateKey);
    expect(derived).toBe(publicKey);
    expect(publicKeyFromPrivate(privateKey)).toBe(publicKey);
  });

  it("does not throw on malformed signature / key inputs", () => {
    expect(verifyDoctrineSignature(HASH, "not-base64-sig", "not-a-key")).toBe(false);
  });
});
