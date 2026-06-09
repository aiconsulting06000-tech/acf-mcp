#!/usr/bin/env node
import { readFile, readdir, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { sha256, sha256OfFiles, formatDoctrineHash } from "../src/lib/hash";
import { verifyDoctrineSignature } from "../src/lib/doctrine-signature";

/*
 * Build the permanent doctrine archive bundle served at permanent_archive_url
 * (meta.permanent_archive_url). The bundle is SELF-VERIFYING and deterministic:
 *
 *   - files[]            every hashed content file, with its bytes + per-file sha256
 *   - content_hash       the aggregate over files[] (recomputed here, must match meta)
 *   - doctrine_signature ed25519 detached signature over content_hash (from meta)
 *   - doctrine_public_key embedded so a third party verifies with zero external state
 *
 * A verifier can, with ONLY this JSON: (1) recompute each file sha256 from bytes,
 * (2) recompute the aggregate content_hash, (3) verify the signature. No private
 * key, no network, no repo checkout required.
 *
 * Determinism: the bundle timestamp is meta.content_build (NOT Date.now()), so
 * re-running on identical content yields a byte-identical bundle.
 *
 * Run AFTER `npm run build:hash && npm run sign-doctrine`. Emits to dist/archive/.
 */

export interface ArchiveFile {
  path: string;
  sha256: string;
  content: string;
}

export interface ArchiveBundle {
  schema: "acf-doctrine-archive/1";
  framework_version: string;
  rules_version: string;
  content_build: string;
  permanent_archive_url: string;
  content_hash: string;
  doctrine_signature: string;
  doctrine_public_key: string;
  locales: string[];
  fallback_locale: string;
  file_count: number;
  files: ArchiveFile[];
}

export interface ArchiveManifest {
  schema: "acf-doctrine-manifest/1";
  framework_version: string;
  rules_version: string;
  content_build: string;
  permanent_archive_url: string;
  content_hash: string;
  doctrine_signature: string;
  doctrine_public_key: string;
  file_count: number;
  files: Array<{ path: string; sha256: string }>;
}

async function walk(dir: string, out: string[] = []): Promise<string[]> {
  for (const e of await readdir(dir)) {
    const full = path.join(dir, e);
    const s = await stat(full);
    if (s.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

/**
 * Build the signed, self-verifying archive bundle + lightweight manifest from a
 * content root. Throws if meta is unsigned, if the recomputed content_hash does
 * not match meta, or if the signature does not verify — so the caller can never
 * emit a stale or unverifiable archive.
 */
export async function buildArchiveBundle(
  contentRoot: string,
): Promise<{ bundle: ArchiveBundle; manifest: ArchiveManifest }> {
  const meta = JSON.parse(
    await readFile(path.join(contentRoot, "meta.json"), "utf8"),
  );

  if (!meta.content_hash || !meta.doctrine_signature || !meta.doctrine_public_key) {
    throw new Error(
      "meta.json is missing content_hash / doctrine_signature / doctrine_public_key — " +
        "run `npm run build:hash && npm run sign-doctrine` first.",
    );
  }

  // Same file set + same meta.json exclusion as inject-meta-hash / verify-doctrine.
  const all = (await walk(contentRoot)).filter(
    (f) =>
      (f.endsWith(".json") || f.endsWith(".md")) &&
      !f.endsWith("/meta.json") &&
      !f.endsWith("\\meta.json"),
  );

  // (1) Refuse to emit an inconsistent archive.
  const recomputed = formatDoctrineHash(await sha256OfFiles(all, contentRoot));
  if (recomputed !== meta.content_hash) {
    throw new Error(
      `content_hash mismatch — meta=${meta.content_hash} recomputed=${recomputed}; ` +
        "run `npm run build:hash && npm run sign-doctrine` then retry.",
    );
  }

  // (2) Refuse to emit an archive whose signature does not verify.
  const bareSig = String(meta.doctrine_signature).replace(/^ed25519:/, "");
  if (!verifyDoctrineSignature(meta.content_hash, bareSig, meta.doctrine_public_key)) {
    throw new Error("doctrine_signature does NOT verify against doctrine_public_key.");
  }

  const files: ArchiveFile[] = (
    await Promise.all(
      all.map(async (abs) => {
        const bytes = await readFile(abs);
        return {
          path: path.relative(contentRoot, abs).split(path.sep).join("/"),
          sha256: formatDoctrineHash(sha256(bytes)),
          content: bytes.toString("utf8"),
        };
      }),
    )
  ).sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));

  const bundle: ArchiveBundle = {
    schema: "acf-doctrine-archive/1",
    framework_version: meta.framework_version,
    rules_version: meta.rules_version,
    content_build: meta.content_build,
    permanent_archive_url: meta.permanent_archive_url,
    content_hash: meta.content_hash,
    doctrine_signature: meta.doctrine_signature,
    doctrine_public_key: meta.doctrine_public_key,
    locales: meta.locales,
    fallback_locale: meta.fallback_locale,
    file_count: files.length,
    files,
  };

  const manifest: ArchiveManifest = {
    schema: "acf-doctrine-manifest/1",
    framework_version: meta.framework_version,
    rules_version: meta.rules_version,
    content_build: meta.content_build,
    permanent_archive_url: meta.permanent_archive_url,
    content_hash: meta.content_hash,
    doctrine_signature: meta.doctrine_signature,
    doctrine_public_key: meta.doctrine_public_key,
    file_count: files.length,
    files: files.map((f) => ({ path: f.path, sha256: f.sha256 })),
  };

  return { bundle, manifest };
}

async function main(): Promise<void> {
  const contentRoot = path.join(path.resolve(process.cwd()), "content");
  const archiveDir = path.join(path.resolve(process.cwd()), "dist", "archive");

  const { bundle, manifest } = await buildArchiveBundle(contentRoot);
  const version = `v${bundle.framework_version}`;

  await mkdir(archiveDir, { recursive: true });
  await writeFile(
    path.join(archiveDir, `doctrine-${version}.json`),
    JSON.stringify(bundle, null, 2) + "\n",
    "utf8",
  );
  await writeFile(
    path.join(archiveDir, `manifest-${version}.json`),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8",
  );

  console.log(`✓ Doctrine archive bundle built (${version}):`);
  console.log(`  dist/archive/doctrine-${version}.json   (${bundle.file_count} files, full content)`);
  console.log(`  dist/archive/manifest-${version}.json   (hashes only)`);
  console.log(`  content_hash: ${bundle.content_hash}`);
}

// Only run the CLI when invoked directly (not when imported by a test).
const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]).endsWith("build-archive-bundle.ts");
if (invokedDirectly) {
  main().catch((err) => {
    console.error("✗", err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
