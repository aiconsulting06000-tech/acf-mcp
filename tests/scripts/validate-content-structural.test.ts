import { afterAll, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  validateCrossRefs,
  validateFiches,
  validatePresence,
} from "../../scripts/validate-content";

/*
 * Negative / structural tests. These prove the §9.3 validators actually CATCH
 * violations — a green run of the real content tells us nothing if the checks
 * are vacuous. Each test builds a throwaway content root, introduces exactly
 * one defect, and asserts the matching error is raised.
 */

const tmpRoots: string[] = [];

async function makeRoot(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "acf-validate-"));
  tmpRoots.push(root);
  return root;
}

afterAll(async () => {
  await Promise.all(
    tmpRoots.map((r) => rm(r, { recursive: true, force: true })),
  );
});

const FICHE_FM = (code: string, extra = ""): string =>
  [
    "---",
    `code: ${code}`,
    `slug: ${code.toLowerCase()}-slug`,
    "title: Titre de test",
    "order: 0",
    "keywords:",
    "  - test",
    "version: 1.0.0",
    extra,
    "---",
    "",
    "Corps de la fiche.",
  ]
    .filter((l) => l !== "")
    .join("\n");

describe("validateFiches — FR+EN minimum (§9.3)", () => {
  it("flags a fiche present only in FR", async () => {
    const root = await makeRoot();
    await mkdir(path.join(root, "fiches"), { recursive: true });
    await writeFile(
      path.join(root, "fiches", "ACF-00.fr.md"),
      FICHE_FM("ACF-00"),
      "utf8",
    );

    const errors: string[] = [];
    await validateFiches(root, errors);

    expect(
      errors.some((e) => /ACF-00 missing required locale "en"/.test(e)),
    ).toBe(true);
  });

  it("does NOT flag a fiche present in both FR and EN", async () => {
    const root = await makeRoot();
    await mkdir(path.join(root, "fiches"), { recursive: true });
    await writeFile(
      path.join(root, "fiches", "ACF-00.fr.md"),
      FICHE_FM("ACF-00"),
      "utf8",
    );
    await writeFile(
      path.join(root, "fiches", "ACF-00.en.md"),
      FICHE_FM("ACF-00"),
      "utf8",
    );

    const errors: string[] = [];
    await validateFiches(root, errors);

    expect(errors.some((e) => /missing required locale/.test(e))).toBe(false);
  });
});

describe("validateCrossRefs — dangling references (§9.3)", () => {
  it("flags a fiche whose related_fiches points to a non-existent card", async () => {
    const root = await makeRoot();
    await mkdir(path.join(root, "fiches"), { recursive: true });
    // ACF-16 is a schema-valid code but has no file in this fixture.
    const fm = FICHE_FM("ACF-00", "related_fiches:\n  - ACF-16");
    await writeFile(path.join(root, "fiches", "ACF-00.fr.md"), fm, "utf8");
    await writeFile(path.join(root, "fiches", "ACF-00.en.md"), fm, "utf8");

    const errors: string[] = [];
    await validateCrossRefs(root, errors);

    expect(
      errors.some((e) => /related fiche "ACF-16" does not exist/.test(e)),
    ).toBe(true);
  });

  it("does NOT flag a related_fiches reference that resolves", async () => {
    const root = await makeRoot();
    await mkdir(path.join(root, "fiches"), { recursive: true });
    await writeFile(
      path.join(root, "fiches", "ACF-00.fr.md"),
      FICHE_FM("ACF-00", "related_fiches:\n  - ACF-01"),
      "utf8",
    );
    await writeFile(
      path.join(root, "fiches", "ACF-01.fr.md"),
      FICHE_FM("ACF-01"),
      "utf8",
    );

    const errors: string[] = [];
    await validateCrossRefs(root, errors);

    expect(errors.some((e) => /does not exist/.test(e))).toBe(false);
  });
});

describe("validatePresence — required content files (§9.3)", () => {
  it("flags a missing whitepaper", async () => {
    const root = await makeRoot();
    const errors: string[] = [];
    await validatePresence(root, errors);

    expect(
      errors.some((e) =>
        /missing required content file: whitepaper\/fr\.md/.test(e),
      ),
    ).toBe(true);
  });
});
