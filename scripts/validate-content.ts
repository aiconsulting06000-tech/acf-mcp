#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  AcfLocaleSchema,
  AutonomyLevelSchema,
  DdaoSchema,
  DimensionSchema,
  FicheFrontmatterSchema,
  GlossaryEntrySchema,
  GuideFrontmatterSchema,
  MetaSchema,
  PrincipleSchema,
} from "../src/core/types";

/* -------------------- Forbidden patterns (IP guardrails) -------------------- */

export interface ForbiddenPattern {
  pattern: string;
  matcher: RegExp;
  reason: string;
}

/*
 * IP firewall (spec §11.1), nuanced per the 2026 INPI clarification.
 *
 * FORBIDDEN (hard fail): (a) the patent number 2605113; (b) the INPI trademark
 * registration numbers 5224709 & 5251856; (c) any description of the ACF
 * Decision Engine *internal architecture* (pipeline / sub-10ms latency / hash
 * chain / trust registry); (d) any reference to the unpublished book
 * "La Souveraineté Agentique" as a book/work.
 *
 * ALLOWED (must NOT be flagged): the registered mark/concept "Souveraineté
 * Agentique(®)"; the commercial feature name "ACF Decision Engine"; the bare
 * fact of INPI patent protection in France *without* the number.
 */
export const FORBIDDEN_PATTERNS: ForbiddenPattern[] = [
  /* (a) Patent number — with or without the FR prefix. */
  {
    pattern: "Patent number 2605113",
    matcher: /\b(?:FR\s?)?2605113\b/i,
    reason: "Patent INPI number — must never appear in public content (spec §11.1)",
  },
  /* (b) INPI trademark registration numbers. */
  {
    pattern: "INPI mark 5224709",
    matcher: /\b5224709\b/,
    reason: "INPI trademark registration number — IP guardrail (spec §11.1)",
  },
  {
    pattern: "INPI mark 5251856",
    matcher: /\b5251856\b/,
    reason: "INPI trademark registration number — IP guardrail (spec §11.1)",
  },
  /* (c) Decision Engine INTERNAL ARCHITECTURE — the feature *name* is allowed,
     its internal mechanism is not. High-signal patent-claim vocabulary only. */
  {
    pattern: "Decision Engine architecture — hash chain",
    matcher: /\bhash[\s-]?chain\b|cha[îi]ne\s+de\s+hach/i,
    reason: "Decision Engine internal architecture (hash chain) — IP guardrail (spec §11.1)",
  },
  {
    pattern: "Decision Engine architecture — sub-10ms latency",
    matcher: /<\s*10\s*ms|moins\s+de\s+10\s*ms|sub-?\s*10\s*ms/i,
    reason: "Decision Engine internal latency figure — IP guardrail (spec §11.1)",
  },
  {
    pattern: "Decision Engine architecture — trust registry",
    matcher: /registre\s+de\s+confiance|trust\s+registry/i,
    reason: "Decision Engine internal architecture (trust registry) — IP guardrail (spec §11.1)",
  },
  /* (d) Upcoming book — only book-referencing constructions are forbidden. The
     concept and the ® mark are allowed, so the bare phrase must NOT be flagged. */
  {
    pattern: "Book reference (book-word + title)",
    matcher: /\b(?:livre|ouvrage|compagnon)\b[\s\S]{0,40}souverainet[ée]\s+agentique/i,
    reason: "Upcoming book reference forbidden — concept/® mark allowed, the book is not (spec §11.1)",
  },
  {
    pattern: "Book reference (title + author/edition)",
    matcher: /souverainet[ée]\s+agentique\s*[»"']?\s*[—–·.,-]*\s*(?:vincent\s+dorange|v\.\s*dorange|[ée]dition\s+2026)/i,
    reason: "Upcoming book reference forbidden — concept/® mark allowed, the book is not (spec §11.1)",
  },
];

export interface ForbiddenFinding {
  file: string;
  pattern: string;
  reason: string;
  excerpt: string;
}

export function scanForbiddenPatterns(
  file: string,
  body: string,
): ForbiddenFinding[] {
  const findings: ForbiddenFinding[] = [];
  for (const { pattern, matcher, reason } of FORBIDDEN_PATTERNS) {
    const match = matcher.exec(body);
    if (match) {
      const start = Math.max(0, match.index - 30);
      const end = Math.min(body.length, match.index + match[0].length + 30);
      findings.push({
        file,
        pattern,
        reason,
        excerpt: body.slice(start, end),
      });
    }
  }
  return findings;
}

/* -------------------- Walker -------------------- */

async function walk(dir: string, files: string[] = []): Promise<string[]> {
  const entries = await readdir(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) await walk(full, files);
    else files.push(full);
  }
  return files;
}

/* -------------------- Validators -------------------- */

async function validateMeta(root: string, errors: string[]): Promise<void> {
  const file = path.join(root, "meta.json");
  try {
    MetaSchema.parse(JSON.parse(await readFile(file, "utf8")));
  } catch (e) {
    errors.push(`meta.json invalid: ${(e as Error).message}`);
  }
}

async function validateFramework(root: string, errors: string[]): Promise<void> {
  const fwDir = path.join(root, "framework");
  try {
    const p = JSON.parse(
      await readFile(path.join(fwDir, "principles.json"), "utf8"),
    );
    for (const principle of p.principles ?? []) PrincipleSchema.parse(principle);
  } catch (e) {
    errors.push(`principles.json invalid: ${(e as Error).message}`);
  }
  try {
    const a = JSON.parse(
      await readFile(path.join(fwDir, "autonomy-levels.json"), "utf8"),
    );
    for (const level of a.levels ?? []) AutonomyLevelSchema.parse(level);
  } catch (e) {
    errors.push(`autonomy-levels.json invalid: ${(e as Error).message}`);
  }
  try {
    const d = JSON.parse(
      await readFile(path.join(fwDir, "dimensions.json"), "utf8"),
    );
    for (const dim of d.dimensions ?? []) DimensionSchema.parse(dim);
  } catch (e) {
    errors.push(`dimensions.json invalid: ${(e as Error).message}`);
  }
  try {
    DdaoSchema.parse(
      JSON.parse(await readFile(path.join(fwDir, "ddao.json"), "utf8")),
    );
  } catch (e) {
    errors.push(`ddao.json invalid: ${(e as Error).message}`);
  }
}

export async function validateFiches(root: string, errors: string[]): Promise<void> {
  const dir = path.join(root, "fiches");
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
  for (const f of files) {
    const raw = await readFile(path.join(dir, f), "utf8");
    try {
      const parsed = matter(raw);
      FicheFrontmatterSchema.parse(parsed.data);
    } catch (e) {
      errors.push(`fiches/${f} invalid: ${(e as Error).message}`);
    }
  }
  // §9.3: every fiche must exist in FR + EN minimum.
  const codes = new Set<string>();
  for (const f of files) {
    const m = /^(ACF-\d{2})\.[a-z]{2}\.md$/.exec(f);
    if (m) codes.add(m[1]!);
  }
  for (const code of [...codes].sort()) {
    for (const loc of ["fr", "en"] as const) {
      if (!files.includes(`${code}.${loc}.md`)) {
        errors.push(
          `fiches: ${code} missing required locale "${loc}" (FR+EN minimum, spec §9.3)`,
        );
      }
    }
  }
}

/**
 * §9.3: cross-URI integrity — every related_* reference must resolve to a
 * content entity that actually exists (fiche file / principle / dimension).
 */
export async function validateCrossRefs(root: string, errors: string[]): Promise<void> {
  const validFiches = new Set<string>();
  try {
    const files = (await readdir(path.join(root, "fiches"))).filter((f) =>
      f.endsWith(".md"),
    );
    for (const f of files) {
      const m = /^(ACF-\d{2})\./.exec(f);
      if (m) validFiches.add(m[1]!);
    }
  } catch {
    /* no fiches dir — surfaced elsewhere */
  }

  const validPrinciples = new Set<string>();
  const validDimensions = new Set<string>();
  try {
    const p = JSON.parse(
      await readFile(path.join(root, "framework", "principles.json"), "utf8"),
    );
    for (const pr of p.principles ?? []) if (pr?.code) validPrinciples.add(pr.code);
  } catch {
    /* surfaced in validateFramework */
  }
  try {
    const d = JSON.parse(
      await readFile(path.join(root, "framework", "dimensions.json"), "utf8"),
    );
    for (const dim of d.dimensions ?? []) if (dim?.code) validDimensions.add(dim.code);
  } catch {
    /* surfaced in validateFramework */
  }

  const checkFiche = (where: string, code: string) => {
    if (!validFiches.has(code))
      errors.push(`${where}: related fiche "${code}" does not exist`);
  };
  const checkPrinciple = (where: string, code: string) => {
    if (!validPrinciples.has(code))
      errors.push(`${where}: related principle "${code}" does not exist`);
  };
  const checkDimension = (where: string, code: string) => {
    if (!validDimensions.has(code))
      errors.push(`${where}: dimension "${code}" does not exist`);
  };

  // Fiche frontmatter cross-refs.
  try {
    const dir = path.join(root, "fiches");
    const files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
    for (const f of files) {
      const fm = matter(await readFile(path.join(dir, f), "utf8")).data as Record<
        string,
        unknown
      >;
      const where = `fiches/${f}`;
      for (const c of (fm.related_fiches as string[] | undefined) ?? [])
        checkFiche(where, c);
      for (const c of (fm.related_principles as string[] | undefined) ?? [])
        checkPrinciple(where, c);
      if (typeof fm.maturity_dimension === "string")
        checkDimension(where, fm.maturity_dimension);
    }
  } catch {
    /* fiche read errors surfaced in validateFiches */
  }

  // Principle cross-refs.
  try {
    const p = JSON.parse(
      await readFile(path.join(root, "framework", "principles.json"), "utf8"),
    );
    for (const pr of p.principles ?? []) {
      const where = `principles.json#${pr?.code ?? "?"}`;
      for (const c of pr?.related_fiches ?? []) checkFiche(where, c);
      for (const c of pr?.related_dimensions ?? []) checkDimension(where, c);
    }
  } catch {
    /* surfaced in validateFramework */
  }

  // Glossary cross-refs.
  try {
    const gdir = path.join(root, "glossary");
    const gfiles = (await readdir(gdir)).filter((f) => f.endsWith(".json"));
    for (const gf of gfiles) {
      const entries = JSON.parse(
        await readFile(path.join(gdir, gf), "utf8"),
      ) as Array<Record<string, unknown>>;
      for (const e of entries) {
        const where = `glossary/${gf}#${(e.term as string) ?? "?"}`;
        for (const c of (e.related_principles as string[] | undefined) ?? [])
          checkPrinciple(where, c);
        for (const c of (e.related_fiches as string[] | undefined) ?? [])
          checkFiche(where, c);
      }
    }
  } catch {
    /* surfaced in validateGlossary */
  }
}

/**
 * Presence of the long-form content surfaced as MCP resources (whitepaper,
 * deck, 5 guides FR+EN, regulation-articles, manual parts).
 */
export async function validatePresence(root: string, errors: string[]): Promise<void> {
  const must = [
    "whitepaper/fr.md",
    "whitepaper/en.md",
    "deck/fr.md",
    "guides/regulation-articles.json",
  ];
  for (const reg of ["ai-act", "gdpr", "dora", "nis2", "iso-42001"]) {
    must.push(`guides/${reg}.fr.md`, `guides/${reg}.en.md`);
  }
  for (const rel of must) {
    if (!existsSync(path.join(root, ...rel.split("/")))) {
      errors.push(`missing required content file: ${rel}`);
    }
  }
  try {
    const parts = (await readdir(path.join(root, "manual", "fr"))).filter((f) =>
      /^part-\d+\.md$/.test(f),
    );
    if (parts.length === 0) errors.push("manual/fr: no part-NN.md files found");
  } catch {
    errors.push("manual/fr: directory missing");
  }
}

async function validateGlossary(root: string, errors: string[]): Promise<void> {
  const dir = path.join(root, "glossary");
  const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
  for (const f of files) {
    try {
      const raw = JSON.parse(await readFile(path.join(dir, f), "utf8")) as unknown[];
      for (const entry of raw) GlossaryEntrySchema.parse(entry);
    } catch (e) {
      errors.push(`glossary/${f} invalid: ${(e as Error).message}`);
    }
  }
}

async function validateGuides(root: string, errors: string[]): Promise<void> {
  const dir = path.join(root, "guides");
  let files: string[];
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
  } catch {
    return; // guides may not exist yet at scaffold time
  }
  for (const f of files) {
    const raw = await readFile(path.join(dir, f), "utf8");
    try {
      const parsed = matter(raw);
      GuideFrontmatterSchema.parse(parsed.data);
    } catch (e) {
      errors.push(`guides/${f} invalid: ${(e as Error).message}`);
    }
  }
}

/* -------------------- Main -------------------- */

const MAX_FILE_BYTES = 50 * 1024;

async function main(): Promise<void> {
  const root = path.resolve(process.cwd(), "content");
  const errors: string[] = [];
  const warnings: string[] = [];
  const ipFindings: ForbiddenFinding[] = [];

  await validateMeta(root, errors);
  await validateFramework(root, errors);
  await validateFiches(root, errors);
  await validateGlossary(root, errors);
  await validateGuides(root, errors);
  await validateCrossRefs(root, errors);
  await validatePresence(root, errors);

  const allFiles = await walk(root);
  for (const file of allFiles) {
    if (!file.endsWith(".md") && !file.endsWith(".json")) continue;
    const body = await readFile(file, "utf8");
    ipFindings.push(...scanForbiddenPatterns(file, body));
    const bytes = Buffer.byteLength(body, "utf8");
    if (bytes > MAX_FILE_BYTES) {
      warnings.push(
        `${file} is ${(bytes / 1024).toFixed(1)} KB (> 50 KB soft limit, spec §9.3)`,
      );
    }
  }

  if (errors.length > 0) {
    console.error("Content validation errors:");
    for (const e of errors) console.error(`  - ${e}`);
  }

  if (ipFindings.length > 0) {
    console.error("IP guardrail violations:");
    for (const f of ipFindings) {
      console.error(
        `  - ${f.file} :: ${f.pattern} (${f.reason})\n    excerpt: ${f.excerpt}`,
      );
    }
  }

  if (warnings.length > 0) {
    console.warn("Content warnings (non-fatal):");
    for (const w of warnings) console.warn(`  - ${w}`);
  }

  if (errors.length + ipFindings.length > 0) {
    process.exit(1);
  }

  console.log(
    `✓ Content validation passed (${allFiles.length} files scanned, ${FORBIDDEN_PATTERNS.length} IP patterns, ${warnings.length} size warnings).`,
  );
}

if (process.argv[1]?.endsWith("validate-content.ts")) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

// Ensure unused import is referenced for tree-shaking safety:
void AcfLocaleSchema;
