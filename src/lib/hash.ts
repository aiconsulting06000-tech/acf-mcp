import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

export function sha256(input: string | Buffer): string {
  return createHash("sha256").update(input).digest("hex");
}

/**
 * Hash a set of files in a stable, order-independent AND location-independent
 * way. Each file contributes its path *relative to `root`* (normalised to
 * forward slashes) plus the sha256 of its bytes; entries are sorted by that
 * relative path. Two byte-identical content trees therefore hash to the same
 * value regardless of where they live on disk or which OS computed them —
 * essential so the doctrine_hash can be reproduced and verified independently
 * across the monorepo and the published package.
 */
export async function sha256OfFiles(
  files: string[],
  root: string,
): Promise<string> {
  const entries = files
    .map((abs) => ({
      rel: path.relative(root, abs).split(path.sep).join("/"),
      abs,
    }))
    .sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));

  const h = createHash("sha256");
  for (const { rel, abs } of entries) {
    const data = await readFile(abs);
    h.update(rel);
    h.update("\0");
    h.update(sha256(data));
    h.update("\n");
  }
  return h.digest("hex");
}

export function formatDoctrineHash(hex: string): string {
  return `sha256:${hex}`;
}
