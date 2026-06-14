import { describe, expect, it } from "vitest";
import {
  scanForbiddenPatterns,
  FORBIDDEN_PATTERNS,
} from "../../scripts/validate-content";

describe("validate-content forbidden patterns", () => {
  /* -------- (a) Patent number -------- */
  it("catches the patent number 2605113 (with FR prefix)", () => {
    const findings = scanForbiddenPatterns("test.md", "see FR2605113 for details");
    expect(findings.some((f) => f.pattern.includes("2605113"))).toBe(true);
  });

  it("catches the bare patent number 2605113", () => {
    const findings = scanForbiddenPatterns("test.md", "patent 2605113 filed");
    expect(findings.some((f) => f.pattern.includes("2605113"))).toBe(true);
  });

  /* -------- (b) Trademark registration numbers -------- */
  it("catches INPI mark number 5224709", () => {
    const findings = scanForbiddenPatterns("test.md", "ref 5224709");
    expect(findings.length).toBeGreaterThan(0);
  });

  it("catches INPI mark number 5251856", () => {
    const findings = scanForbiddenPatterns("test.md", "ref 5251856");
    expect(findings.length).toBeGreaterThan(0);
  });

  /* -------- ALLOWED: the patent *fact* without a number -------- */
  it("does NOT flag the word 'brevet' on its own (patent fact without number is allowed)", () => {
    const findings = scanForbiddenPatterns(
      "test.md",
      "Le moteur de qualification est protégé par brevet INPI déposé en France.",
    );
    expect(findings).toEqual([]);
  });

  /* -------- (c) Decision Engine: name allowed, architecture forbidden -------- */
  it("does NOT flag the 'ACF Decision Engine' feature name", () => {
    const findings = scanForbiddenPatterns(
      "test.md",
      "ACF Decision Engine is an optional enterprise brick, not detailed publicly.",
    );
    expect(findings).toEqual([]);
  });

  it("catches Decision Engine internal architecture (hash chain)", () => {
    const findings = scanForbiddenPatterns(
      "test.md",
      "The engine appends each decision to a hash chain.",
    );
    expect(findings.some((f) => f.pattern.includes("hash chain"))).toBe(true);
  });

  it("catches Decision Engine internal architecture (sub-10ms latency)", () => {
    const findings = scanForbiddenPatterns(
      "test.md",
      "Arbitration completes in <10ms.",
    );
    expect(findings.some((f) => f.pattern.includes("latency"))).toBe(true);
  });

  it("catches Decision Engine internal architecture (trust registry)", () => {
    const findings = scanForbiddenPatterns(
      "test.md",
      "Le registre de confiance trace chaque agent.",
    );
    expect(findings.some((f) => f.pattern.includes("trust registry"))).toBe(true);
  });

  /* -------- (d) Book: concept/mark allowed, book reference forbidden -------- */
  it("does NOT flag the bare concept 'souveraineté agentique'", () => {
    const findings = scanForbiddenPatterns(
      "test.md",
      "Mesurez votre souveraineté agentique en quelques minutes.",
    );
    expect(findings).toEqual([]);
  });

  it("does NOT flag the registered mark 'Souveraineté Agentique®'", () => {
    const findings = scanForbiddenPatterns(
      "test.md",
      "ACF® is part of the Souveraineté Agentique® portfolio.",
    );
    expect(findings).toEqual([]);
  });

  it("catches an upcoming-book reference (book word + title)", () => {
    const findings = scanForbiddenPatterns(
      "test.md",
      "Compagnon du livre La Souveraineté Agentique.",
    );
    expect(findings.some((f) => f.pattern.includes("Book reference"))).toBe(true);
  });

  it("catches an upcoming-book reference (title + author)", () => {
    const findings = scanForbiddenPatterns(
      "test.md",
      "La Souveraineté Agentique — Vincent Dorange, 2026.",
    );
    expect(findings.some((f) => f.pattern.includes("Book reference"))).toBe(true);
  });

  /* -------- General -------- */
  it("does NOT flag a clean fiche", () => {
    const findings = scanForbiddenPatterns(
      "ACF-00.fr.md",
      "Les 4 principes fondateurs de l'ACF®",
    );
    expect(findings).toEqual([]);
  });

  it("exposes the canonical patterns list", () => {
    expect(FORBIDDEN_PATTERNS).toBeDefined();
    expect(FORBIDDEN_PATTERNS.length).toBeGreaterThan(0);
  });
});
