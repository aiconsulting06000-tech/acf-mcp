import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  AcfLocale,
  AutonomyLevel,
  AutonomyLevelSchema,
  Ddao,
  DdaoSchema,
  Dimension,
  DimensionSchema,
  DocDocument,
  FicheDocument,
  FicheFrontmatterSchema,
  GlossaryEntry,
  GlossaryEntrySchema,
  GuideDocument,
  GuideFrontmatterSchema,
  ManualDocument,
  ManualPart,
  Meta,
  MetaSchema,
  Principle,
  PrincipleSchema,
  RegulationArticlesFile,
  RegulationArticlesFileSchema,
} from "./types";
import { fallbackChain } from "./locale";

export interface ContentLoaderOptions {
  contentRoot: string;
}

export class ContentLoader {
  private readonly root: string;
  private metaCache: Meta | null = null;
  private regulationArticlesCache: RegulationArticlesFile | null = null;

  constructor(opts: ContentLoaderOptions) {
    this.root = opts.contentRoot;
  }

  /* -------------------- Meta -------------------- */

  async loadMeta(): Promise<Meta> {
    // No lock needed: concurrent callers all parse the same file and write
    // identical values to metaCache, so the last write is idempotent.
    if (this.metaCache) return this.metaCache;
    const file = path.join(this.root, "meta.json");
    const raw = JSON.parse(await readFile(file, "utf8"));
    this.metaCache = MetaSchema.parse(raw);
    return this.metaCache;
  }

  /* -------------------- Framework -------------------- */

  async loadPrinciples(): Promise<Principle[]> {
    const file = path.join(this.root, "framework", "principles.json");
    const raw = JSON.parse(await readFile(file, "utf8"));
    return (raw.principles ?? []).map((p: unknown) => PrincipleSchema.parse(p));
  }

  async loadAutonomyLevels(): Promise<AutonomyLevel[]> {
    const file = path.join(this.root, "framework", "autonomy-levels.json");
    const raw = JSON.parse(await readFile(file, "utf8"));
    return (raw.levels ?? []).map((l: unknown) => AutonomyLevelSchema.parse(l));
  }

  async loadDimensions(): Promise<Dimension[]> {
    const file = path.join(this.root, "framework", "dimensions.json");
    const raw = JSON.parse(await readFile(file, "utf8"));
    return (raw.dimensions ?? []).map((d: unknown) => DimensionSchema.parse(d));
  }

  async loadDdao(): Promise<Ddao> {
    const file = path.join(this.root, "framework", "ddao.json");
    const raw = JSON.parse(await readFile(file, "utf8"));
    return DdaoSchema.parse(raw);
  }

  /* -------------------- Fiches -------------------- */

  /**
   * Load a fiche by code with locale fallback chain.
   *
   * **Caller contract:** `code` MUST be pre-validated against `/^ACF-(0[0-9]|1[0-6])$/`
   * before calling this method. ContentLoader does NOT sanitise the code and relies
   * on Zod validation at the tool boundary (Phase 5+). Skipping pre-validation is a
   * path traversal risk.
   */
  async loadFiche(code: string, locale: AcfLocale): Promise<FicheDocument> {
    for (const candidate of fallbackChain(locale)) {
      const file = path.join(this.root, "fiches", `${code}.${candidate}.md`);
      if (!existsSync(file)) continue;
      const raw = await readFile(file, "utf8");
      const parsed = matter(raw);
      const frontmatter = FicheFrontmatterSchema.parse(parsed.data);
      return {
        frontmatter,
        body: parsed.content,
        served_locale: candidate,
        is_fallback: candidate !== locale,
      };
    }
    throw new Error(`Fiche ${code} not found in any locale chain for ${locale}`);
  }

  /* -------------------- Guides -------------------- */

  /**
   * Load a regulatory guide markdown with locale fallback chain.
   *
   * **Caller contract:** `regulation` MUST be pre-validated against the
   * `["ai-act", "gdpr", "dora", "nis2", "iso-42001"]` enum before calling
   * this method. ContentLoader does NOT sanitise the regulation string.
   */
  async loadGuide(
    regulation: string,
    locale: AcfLocale,
  ): Promise<GuideDocument> {
    for (const candidate of fallbackChain(locale)) {
      const file = path.join(this.root, "guides", `${regulation}.${candidate}.md`);
      if (!existsSync(file)) continue;
      const raw = await readFile(file, "utf8");
      const parsed = matter(raw);
      const frontmatter = GuideFrontmatterSchema.parse(parsed.data);
      return {
        frontmatter,
        body: parsed.content,
        served_locale: candidate,
        is_fallback: candidate !== locale,
      };
    }
    throw new Error(
      `Guide ${regulation} not found in any locale chain for ${locale}`,
    );
  }

  /* -------------------- Glossary -------------------- */

  async loadGlossary(locale: AcfLocale): Promise<{
    entries: GlossaryEntry[];
    served_locale: AcfLocale;
    is_fallback: boolean;
  }> {
    for (const candidate of fallbackChain(locale)) {
      const file = path.join(this.root, "glossary", `${candidate}.json`);
      if (!existsSync(file)) continue;
      const raw = JSON.parse(await readFile(file, "utf8")) as unknown[];
      return {
        entries: raw.map((entry) => GlossaryEntrySchema.parse(entry)),
        served_locale: candidate,
        is_fallback: candidate !== locale,
      };
    }
    throw new Error(`Glossary not found in any locale chain for ${locale}`);
  }

  /**
   * Lookup a glossary entry by `term` or `expansion` (case-insensitive).
   *
   * **Caller contract:** `term` is matched against entry strings, not used as a
   * file path, so path traversal is not a concern here. But callers should
   * still validate length/format to avoid pathological inputs.
   *
   * Returns null if no entry matches.
   */
  async loadGlossaryEntry(
    term: string,
    locale: AcfLocale,
  ): Promise<{
    entry: GlossaryEntry;
    served_locale: AcfLocale;
    is_fallback: boolean;
  } | null> {
    const { entries, served_locale, is_fallback } = await this.loadGlossary(locale);
    const normalised = term.trim().toLowerCase();
    const entry =
      entries.find(
        (e) =>
          e.term.toLowerCase() === normalised ||
          e.expansion?.toLowerCase() === normalised,
      ) ?? null;
    if (!entry) return null;
    return { entry, served_locale, is_fallback };
  }

  /* -------------------- Whitepaper -------------------- */

  /**
   * Load the whitepaper as a single document with locale fallback chain.
   *
   * V1.0 reality: the whitepaper is a flat PDF text-layer extract with no
   * markdown headings, so it is served as one document (no section anchors).
   * Frontmatter (if any) is stripped via gray-matter; the `title` is taken
   * from frontmatter when present, else a generic fallback.
   */
  async loadWhitepaper(locale: AcfLocale): Promise<DocDocument> {
    for (const candidate of fallbackChain(locale)) {
      const file = path.join(this.root, "whitepaper", `${candidate}.md`);
      if (!existsSync(file)) continue;
      const raw = await readFile(file, "utf8");
      const parsed = matter(raw);
      const title =
        (typeof parsed.data.title === "string" && parsed.data.title.trim()) ||
        "ACF Whitepaper";
      return {
        title,
        body: parsed.content,
        served_locale: candidate,
        is_fallback: candidate !== locale,
      };
    }
    throw new Error(`Whitepaper not found in any locale chain for ${locale}`);
  }

  /* -------------------- Manual -------------------- */

  /**
   * Load the pedagogical manual with locale fallback chain.
   *
   * The manual has reliable structure via its `part-NN.md` files (each carries
   * `part`, `title`, `page_range` frontmatter). Parts are returned sorted by
   * the numeric `part` field.
   */
  async loadManual(locale: AcfLocale): Promise<ManualDocument> {
    for (const candidate of fallbackChain(locale)) {
      const dir = path.join(this.root, "manual", candidate);
      if (!existsSync(dir)) continue;
      const files = (await readdir(dir)).filter((f) =>
        /^part-\d+\.md$/.test(f),
      );
      if (files.length === 0) continue;
      const parts: ManualPart[] = [];
      for (const f of files) {
        const raw = await readFile(path.join(dir, f), "utf8");
        const parsed = matter(raw);
        parts.push({
          part: Number(parsed.data.part),
          title: String(parsed.data.title ?? ""),
          page_range: String(parsed.data.page_range ?? ""),
          body: parsed.content,
        });
      }
      parts.sort((a, b) => a.part - b.part);
      return {
        parts,
        served_locale: candidate,
        is_fallback: candidate !== locale,
      };
    }
    throw new Error(`Manual not found in any locale chain for ${locale}`);
  }

  /* -------------------- Deck -------------------- */

  /**
   * Load the slide deck as a single document with locale fallback chain.
   *
   * Like the whitepaper, the deck is a flat extract served as one document.
   */
  async loadDeck(locale: AcfLocale): Promise<DocDocument> {
    for (const candidate of fallbackChain(locale)) {
      const file = path.join(this.root, "deck", `${candidate}.md`);
      if (!existsSync(file)) continue;
      const raw = await readFile(file, "utf8");
      const parsed = matter(raw);
      const title =
        (typeof parsed.data.title === "string" && parsed.data.title.trim()) ||
        "ACF Deck";
      return {
        title,
        body: parsed.content,
        served_locale: candidate,
        is_fallback: candidate !== locale,
      };
    }
    throw new Error(`Deck not found in any locale chain for ${locale}`);
  }

  /* -------------------- Regulation articles -------------------- */

  /**
   * Load the regulation→ACF mapping file (guides/regulation-articles.json).
   * Cached after first parse.
   */
  async loadRegulationArticles(): Promise<RegulationArticlesFile> {
    if (this.regulationArticlesCache) return this.regulationArticlesCache;
    const file = path.join(this.root, "guides", "regulation-articles.json");
    const raw = JSON.parse(await readFile(file, "utf8"));
    this.regulationArticlesCache = RegulationArticlesFileSchema.parse(raw);
    return this.regulationArticlesCache;
  }
}
