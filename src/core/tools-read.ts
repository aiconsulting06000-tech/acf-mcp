import { z } from "zod";
import { AcfRegistry } from "./registry";
import { AcfLocaleSchema } from "./types";

/* -------------------- acf.search -------------------- */

export const SearchInputSchema = z.object({
  query: z.string().min(2).max(200),
  scope: z
    .enum(["all", "framework", "fiche", "guide", "whitepaper", "glossary"])
    .default("all"),
  locale: AcfLocaleSchema.optional(),
  limit: z.number().int().min(1).max(20).default(5),
});
export type SearchInput = z.infer<typeof SearchInputSchema>;

export async function handleSearchTool(
  registry: AcfRegistry,
  rawInput: unknown,
): Promise<{ hits: ReturnType<AcfRegistry["search"]["search"]> }> {
  const input = SearchInputSchema.parse(rawInput);
  const locale = input.locale ?? "en";
  const hits = registry.search.search({
    query: input.query,
    scope: input.scope,
    locale,
    limit: input.limit,
  });
  return { hits };
}

/* -------------------- acf.fiche.lookup -------------------- */

export const FicheLookupInputSchema = z.object({
  code: z.string().regex(/^ACF-(0[0-9]|1[0-6])$/),
  locale: AcfLocaleSchema.optional(),
  include_frontmatter: z.boolean().default(true),
});
export type FicheLookupInput = z.infer<typeof FicheLookupInputSchema>;

export interface FicheLookupOutput {
  code: string;
  title: string;
  markdown: string;
  metadata: Record<string, unknown>;
  pdf_url: string;
  uri: string;
  served_locale: string;
  is_fallback: boolean;
}

export async function handleFicheLookupTool(
  registry: AcfRegistry,
  rawInput: unknown,
): Promise<FicheLookupOutput> {
  const input = FicheLookupInputSchema.parse(rawInput);
  const locale = input.locale ?? "en";
  const fiche = await registry.content.loadFiche(input.code, locale);
  return {
    code: fiche.frontmatter.code,
    title: fiche.frontmatter.title,
    markdown: fiche.body,
    metadata: input.include_frontmatter
      ? (fiche.frontmatter as unknown as Record<string, unknown>)
      : {},
    pdf_url: fiche.frontmatter.pdf_url ?? "",
    uri: `acf://fiche/${fiche.frontmatter.code}`,
    served_locale: fiche.served_locale,
    is_fallback: fiche.is_fallback,
  };
}

/* -------------------- acf.regulation.article -------------------- */

export const RegulationArticleInputSchema = z.object({
  regulation: z.enum(["ai-act", "gdpr", "dora", "nis2", "iso-42001"]),
  article: z.string().min(1).max(20),
  locale: AcfLocaleSchema.optional(),
});
export type RegulationArticleInput = z.infer<typeof RegulationArticleInputSchema>;

export interface RegulationArticleOutput {
  regulation: string;
  article: string;
  title: string;
  text: string;
  mapping: {
    principles: string[];
    dimensions: string[];
    fiches: string[];
    operational_note: string;
  };
  source?: string;
  applicable_date?: string;
}

export async function handleRegulationArticleTool(
  registry: AcfRegistry,
  rawInput: unknown,
): Promise<RegulationArticleOutput> {
  const input = RegulationArticleInputSchema.parse(rawInput);
  const data = await registry.content.loadRegulationArticles();
  const reg = data.regulations[input.regulation];
  const article = reg?.articles[input.article];
  if (!article) {
    const available = reg
      ? Object.keys(reg.articles).join(", ")
      : "(regulation not found)";
    throw new Error(
      `Article ${input.regulation} Art. ${input.article} not found. Available articles for ${input.regulation}: ${available}.`,
    );
  }
  const L: "fr" | "en" = input.locale === "fr" ? "fr" : "en";
  return {
    regulation: input.regulation,
    article: input.article,
    title: article.title[L],
    text: article.text[L],
    mapping: {
      principles: article.mapping.principles,
      dimensions: article.mapping.dimensions,
      fiches: article.mapping.fiches,
      operational_note: article.mapping.operational_note[L],
    },
    source: article.source,
    applicable_date: article.applicable_date,
  };
}

/* -------------------- acf.glossary.define -------------------- */

export const GlossaryDefineInputSchema = z.object({
  term: z.string().min(1).max(80),
  locale: AcfLocaleSchema.optional(),
});
export type GlossaryDefineInput = z.infer<typeof GlossaryDefineInputSchema>;

export interface GlossaryDefineOutput {
  term: string;
  expansion?: string;
  definition: string;
  related: { principles: string[]; fiches: string[] };
  served_locale: string;
}

export async function handleGlossaryDefineTool(
  registry: AcfRegistry,
  rawInput: unknown,
): Promise<GlossaryDefineOutput> {
  const input = GlossaryDefineInputSchema.parse(rawInput);
  const locale = input.locale ?? "en";
  // loadGlossaryEntry returns { entry, served_locale, is_fallback } | null
  const result = await registry.content.loadGlossaryEntry(input.term, locale);
  if (!result) {
    throw new Error(`Glossary entry not found: ${input.term}`);
  }
  return {
    term: result.entry.term,
    expansion: result.entry.expansion,
    definition: result.entry.definition,
    related: {
      principles: result.entry.related_principles ?? [],
      fiches: result.entry.related_fiches ?? [],
    },
    // Use the ACTUAL served locale (which may be a fallback), not the requested one.
    served_locale: result.served_locale,
  };
}

/* -------------------- acf.cite -------------------- */

export const CiteInputSchema = z.object({
  uri: z.string().regex(/^acf:\/\//),
  style: z
    .enum(["apa", "mla", "chicago", "iso-690", "bibtex"])
    .default("apa"),
  locale: AcfLocaleSchema.optional(),
});
export type CiteInput = z.infer<typeof CiteInputSchema>;

export interface CiteOutput {
  citation: string;
  structured: { author: string; year: string; title: string; url: string };
}

const CITATION_AUTHOR = "Dorange, V.";
const CITATION_YEAR = "2026";
const CITATION_BASE_URL = "https://acfstandard.com";

function uriToUrlSlug(uri: string): string {
  // Strip the acf:// scheme, then turn the remaining path into a clean slug.
  // e.g. acf://framework/principle/P1 → framework-principle-P1
  return uri.replace(/^acf:\/\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
}

export async function handleCiteTool(
  registry: AcfRegistry,
  rawInput: unknown,
): Promise<CiteOutput> {
  const input = CiteInputSchema.parse(rawInput);
  const meta = registry.meta;
  const slug = uriToUrlSlug(input.uri);
  const url = `${CITATION_BASE_URL}/doctrine/v${meta.framework_version}/${slug}`;
  const title = `Agentic Commerce Framework® (ACF®) — ${input.uri}`;
  const structured = {
    author: CITATION_AUTHOR,
    year: CITATION_YEAR,
    title,
    url,
  };
  let citation: string;
  switch (input.style) {
    case "apa":
      citation = `${CITATION_AUTHOR} (${CITATION_YEAR}). ${title}. ACF Standard. ${url}`;
      break;
    case "mla":
      citation = `${CITATION_AUTHOR} "${title}." ACF Standard, ${CITATION_YEAR}, ${url}.`;
      break;
    case "chicago":
      citation = `${CITATION_AUTHOR} "${title}." ACF Standard. ${CITATION_YEAR}. ${url}.`;
      break;
    case "iso-690":
      citation = `${CITATION_AUTHOR} ${title}. ACF Standard, ${CITATION_YEAR}. Available at: ${url}`;
      break;
    case "bibtex":
      citation = [
        `@misc{acf-${slug},`,
        `  author = {${CITATION_AUTHOR}},`,
        `  title = {${title}},`,
        `  year = {${CITATION_YEAR}},`,
        `  url = {${url}}`,
        "}",
      ].join("\n");
      break;
  }
  return { citation, structured };
}
