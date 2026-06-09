import { describe, expect, it } from "vitest";
import path from "node:path";
import { createHash } from "node:crypto";
import { buildArchiveBundle } from "../../scripts/build-archive-bundle";
import { verifyDoctrineSignature } from "../../src/lib/doctrine-signature";

const CONTENT_ROOT = path.resolve(__dirname, "../../content");
const sha256hex = (b: Buffer | string) =>
  createHash("sha256").update(b).digest("hex");

describe("scripts/build-archive-bundle", () => {
  it("produces a non-empty bundle whose file_count matches files[]", async () => {
    const { bundle } = await buildArchiveBundle(CONTENT_ROOT);
    expect(bundle.file_count).toBeGreaterThan(0);
    expect(bundle.files).toHaveLength(bundle.file_count);
    expect(bundle.schema).toBe("acf-doctrine-archive/1");
  });

  it("every per-file sha256 recomputes from the embedded bytes", async () => {
    const { bundle } = await buildArchiveBundle(CONTENT_ROOT);
    for (const f of bundle.files) {
      expect(f.sha256).toBe("sha256:" + sha256hex(Buffer.from(f.content, "utf8")));
    }
  });

  it("aggregate content_hash recomputes from files[] alone (no repo access)", async () => {
    const { bundle } = await buildArchiveBundle(CONTENT_ROOT);
    const sorted = [...bundle.files].sort((a, b) =>
      a.path < b.path ? -1 : a.path > b.path ? 1 : 0,
    );
    const h = createHash("sha256");
    for (const f of sorted) {
      h.update(f.path);
      h.update("\0");
      h.update(sha256hex(Buffer.from(f.content, "utf8")));
      h.update("\n");
    }
    expect("sha256:" + h.digest("hex")).toBe(bundle.content_hash);
  });

  it("ed25519 signature verifies with the embedded public key", async () => {
    const { bundle } = await buildArchiveBundle(CONTENT_ROOT);
    const ok = verifyDoctrineSignature(
      bundle.content_hash,
      bundle.doctrine_signature.replace(/^ed25519:/, ""),
      bundle.doctrine_public_key,
    );
    expect(ok).toBe(true);
  });

  it("manifest mirrors the bundle (same hash, signature, paths) without content", async () => {
    const { bundle, manifest } = await buildArchiveBundle(CONTENT_ROOT);
    expect(manifest.schema).toBe("acf-doctrine-manifest/1");
    expect(manifest.content_hash).toBe(bundle.content_hash);
    expect(manifest.doctrine_signature).toBe(bundle.doctrine_signature);
    expect(manifest.file_count).toBe(bundle.file_count);
    expect(manifest.files.map((f) => f.path)).toEqual(bundle.files.map((f) => f.path));
    // Manifest entries carry no embedded content.
    for (const f of manifest.files as Array<Record<string, unknown>>) {
      expect(f).not.toHaveProperty("content");
    }
  });

  it("determinism: two builds of identical content are byte-identical", async () => {
    const a = await buildArchiveBundle(CONTENT_ROOT);
    const b = await buildArchiveBundle(CONTENT_ROOT);
    expect(JSON.stringify(a.bundle)).toBe(JSON.stringify(b.bundle));
  });
});
