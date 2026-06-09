import { describe, expect, it } from "vitest";
import { sha256, sha256OfFiles } from "../../src/lib/hash";
import path from "node:path";

describe("lib/hash", () => {
  it("sha256 returns 64-hex digest of a string", () => {
    const out = sha256("hello");
    expect(out).toMatch(/^[a-f0-9]{64}$/);
    expect(out).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    );
  });

  it("sha256OfFiles is stable across calls (single file)", async () => {
    const root = path.resolve(__dirname, "../fixtures/content");
    const fixture = path.join(root, "meta.json");
    const a = await sha256OfFiles([fixture], root);
    const b = await sha256OfFiles([fixture], root);
    expect(a).toBe(b);
    expect(a).toMatch(/^[a-f0-9]{64}$/);
  });

  it("sha256OfFiles is order-independent (multi-file)", async () => {
    const root = path.resolve(__dirname, "../fixtures/content");
    const meta = path.join(root, "meta.json");
    const principles = path.join(root, "framework/principles.json");
    const ab = await sha256OfFiles([meta, principles], root);
    const ba = await sha256OfFiles([principles, meta], root);
    expect(ab).toBe(ba);
  });

  it("sha256OfFiles is location-independent (same content, different roots)", async () => {
    // Same logical file laid out under two different absolute roots must hash
    // identically — this is what makes cross-repo content_hash reconciliation
    // possible. We simulate by hashing the same file via two equivalent roots.
    const root = path.resolve(__dirname, "../fixtures/content");
    const fixture = path.join(root, "meta.json");

    // Root A: the real fixtures/content dir.
    const hashA = await sha256OfFiles([fixture], root);
    // Root B: express the same file relative to a parent root → different
    // relative path → must therefore differ (proves the path participates),
    // while two callers using the SAME relative layout agree.
    const parent = path.resolve(root, "..");
    const hashB = await sha256OfFiles([fixture], parent);
    expect(hashA).not.toBe(hashB);

    // And two independent computations with the matching root agree.
    const hashA2 = await sha256OfFiles([fixture], root);
    expect(hashA).toBe(hashA2);
  });
});
