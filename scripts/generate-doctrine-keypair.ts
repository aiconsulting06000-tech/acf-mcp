#!/usr/bin/env node
import { readFile, writeFile, appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { generateDoctrineKeypair } from "../src/lib/doctrine-signature";

/*
 * One-shot doctrine keypair generator.
 *
 *   npx tsx scripts/generate-doctrine-keypair.ts
 *
 * Writes the SECRET private key into .env (gitignored) under
 * ACF_DOCTRINE_PRIVATE_KEY, and prints the public key. Never overwrites an
 * existing key — re-keying must be a deliberate manual act, because it
 * invalidates every previously published doctrine signature.
 */

const ENV_VAR = "ACF_DOCTRINE_PRIVATE_KEY";

async function main(): Promise<void> {
  const envPath = path.resolve(process.cwd(), ".env");

  if (existsSync(envPath)) {
    const existing = await readFile(envPath, "utf8");
    if (new RegExp(`^${ENV_VAR}=`, "m").test(existing)) {
      console.error(
        `✗ ${ENV_VAR} already present in .env — refusing to overwrite.\n` +
          `  Re-keying invalidates all published signatures. Remove the line ` +
          `manually first if this is intentional.`,
      );
      process.exit(1);
    }
  }

  const { privateKey, publicKey } = generateDoctrineKeypair();

  const line = `${ENV_VAR}=${privateKey}\n`;
  if (existsSync(envPath)) {
    await appendFile(envPath, line, "utf8");
  } else {
    await writeFile(envPath, line, "utf8");
  }

  console.log("✓ ed25519 doctrine keypair generated.");
  console.log(`  Private key → .env  (${ENV_VAR}, gitignored)`);
  console.log(`  Public key  (base64 SPKI):\n  ${publicKey}`);
  console.log(
    "\n  Next: run `npm run sign-doctrine` to embed signature + public key into meta.json.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
