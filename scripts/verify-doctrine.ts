#!/usr/bin/env node
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { sha256OfFiles, formatDoctrineHash } from "../src/lib/hash";
import { verifyDoctrineSignature } from "../src/lib/doctrine-signature";

/*
 * Verify the doctrine integrity chain — needs NO private key, so it is safe to
 * run in CI / by any third party:
 *
 *   1. recompute content_hash from the content files  → must equal meta.content_hash
 *   2. verify doctrine_signature over content_hash with the embedded public key
 *
 * Exits non-zero on any failure.
 */

async function walk(dir: string, out: string[] = []): Promise<string[]> {
  for (const e of await readdir(dir)) {
    const full = path.join(dir, e);
    const s = await stat(full);
    if (s.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

async function main(): Promise<void> {
  const contentRoot = path.resolve(process.cwd(), "content");
  const metaPath = path.join(contentRoot, "meta.json");
  const meta = JSON.parse(await readFile(metaPath, "utf8"));

  const failures: string[] = [];

  // (1) Recompute content hash (same exclusion of meta.json as inject-meta-hash).
  const files = (await walk(contentRoot)).filter(
    (f) =>
      (f.endsWith(".json") || f.endsWith(".md")) &&
      !f.endsWith("/meta.json") &&
      !f.endsWith("\\meta.json"),
  );
  const recomputed = formatDoctrineHash(await sha256OfFiles(files, contentRoot));
  if (recomputed !== meta.content_hash) {
    failures.push(
      `content_hash mismatch:\n    meta:       ${meta.content_hash}\n    recomputed: ${recomputed}`,
    );
  }

  // (2) Verify signature.
  if (!meta.doctrine_signature || !meta.doctrine_public_key) {
    failures.push(
      "doctrine_signature / doctrine_public_key missing from meta.json (run `npm run sign-doctrine`)",
    );
  } else if (
    !verifyDoctrineSignature(
      meta.content_hash,
      String(meta.doctrine_signature).replace(/^ed25519:/, ""),
      meta.doctrine_public_key,
    )
  ) {
    failures.push("ed25519 signature does NOT verify against the embedded public key");
  }

  if (failures.length > 0) {
    console.error("✗ Doctrine verification FAILED:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }

  console.log("✓ Doctrine verified — content_hash matches and ed25519 signature is valid.");
  console.log(`  content_hash: ${meta.content_hash}`);
  console.log(`  public_key:   ${meta.doctrine_public_key}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
