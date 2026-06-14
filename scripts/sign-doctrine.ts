#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { signDoctrineHash } from "../src/lib/doctrine-signature";

/*
 * Sign the doctrine. Reads ACF_DOCTRINE_PRIVATE_KEY (from .env / env), signs the
 * current meta.content_hash, and writes doctrine_signature + doctrine_public_key
 * back into meta.json.
 *
 * Run AFTER `npm run build:hash` so it signs the final content_hash:
 *   npm run build:hash && npm run sign-doctrine
 */

const ENV_VAR = "ACF_DOCTRINE_PRIVATE_KEY";

async function main(): Promise<void> {
  // Node ≥20.6 built-in .env loader; ignore if no .env (key may be in env already).
  try {
    process.loadEnvFile(path.resolve(process.cwd(), ".env"));
  } catch {
    /* no .env file — fall back to process.env */
  }

  const privateKey = process.env[ENV_VAR];
  if (!privateKey) {
    console.error(
      `✗ ${ENV_VAR} not set. Run \`npm run keygen:doctrine\` first (or export the key).`,
    );
    process.exit(1);
  }

  const metaPath = path.resolve(process.cwd(), "content", "meta.json");
  const meta = JSON.parse(await readFile(metaPath, "utf8"));

  if (typeof meta.content_hash !== "string" || !meta.content_hash.startsWith("sha256:")) {
    console.error("✗ meta.content_hash missing/invalid — run `npm run build:hash` first.");
    process.exit(1);
  }

  const { signature, publicKey } = signDoctrineHash(meta.content_hash, privateKey);
  // Spec §6: self-describing algorithm tag on the detached signature.
  meta.doctrine_signature = `ed25519:${signature}`;
  meta.doctrine_public_key = publicKey;

  await writeFile(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");
  console.log(`✓ Doctrine signed (ed25519) over ${meta.content_hash}`);
  console.log(`  doctrine_public_key: ${publicKey}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
