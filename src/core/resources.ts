import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { AcfRegistry } from "./registry";
import { parseAcfUri } from "./uri";
import { negotiateLocale } from "./locale";

export interface ResourceListItem {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface ResourceReadResult {
  contents: { uri: string; mimeType: string; text: string }[];
}

const GUIDE_REGULATIONS = [
  "ai-act",
  "gdpr",
  "dora",
  "nis2",
  "iso-42001",
] as const;

export async function listResources(
  registry: AcfRegistry,
): Promise<ResourceListItem[]> {
  const items: ResourceListItem[] = [];

  /* Principles */
  const principles = await registry.content.loadPrinciples();
  for (const p of principles) {
    items.push({
      uri: `acf://framework/principle/${p.code}`,
      name: `Principle ${p.code} — ${p.title.en}`,
      description: p.summary.en,
      mimeType: "application/json",
    });
  }

  /* Autonomy levels */
  const levels = await registry.content.loadAutonomyLevels();
  for (const l of levels) {
    items.push({
      uri: `acf://framework/autonomy-level/${l.code}`,
      name: `Autonomy level ${l.code} — ${l.title.en}`,
      description: l.description.en,
      mimeType: "application/json",
    });
  }

  /* Dimensions */
  const dimensions = await registry.content.loadDimensions();
  for (const d of dimensions) {
    items.push({
      uri: `acf://framework/dimension/${d.code}`,
      name: `Maturity dimension ${d.code} — ${d.title.en}`,
      description: d.description.en,
      mimeType: "application/json",
    });
  }

  /* DDAO */
  items.push({
    uri: "acf://framework/ddao",
    name: "DDAO — Delegated Decision Agent Officer",
    description: "Canonical ACF® role definition for autonomous-agent guardianship.",
    mimeType: "application/json",
  });

  /* Fiches */
  for (let i = 0; i <= 16; i++) {
    const code = `ACF-${String(i).padStart(2, "0")}`;
    items.push({
      uri: `acf://fiche/${code}`,
      name: `ACF® card ${code}`,
      description: `One of the 17 ACF® methodological cards (V1.0).`,
      mimeType: "text/markdown",
    });
  }

  /* Guides */
  const regArticles = await registry.content.loadRegulationArticles();
  for (const reg of GUIDE_REGULATIONS) {
    const label = regArticles.regulations[reg]?.label.en ?? reg;
    items.push({
      uri: `acf://guide/${reg}`,
      name: `Regulatory guide — ${label}`,
      description: `ACF® operational reading of ${label}.`,
      mimeType: "text/markdown",
    });
  }

  /* Whitepaper */
  items.push({
    uri: "acf://whitepaper",
    name: "ACF® Whitepaper",
    description: "Founding doctrine of the ACF® standard (single document).",
    mimeType: "text/markdown",
  });

  /* Manual */
  const manual = await registry.content.loadManual("fr");
  items.push({
    uri: "acf://manual",
    name: "ACF® Manual (full)",
    description: `Pedagogical manual — ${manual.parts.length} parts.`,
    mimeType: "text/markdown",
  });
  items.push({
    uri: "acf://manual/toc",
    name: "ACF® Manual — table of contents",
    description: "List of manual parts with page ranges.",
    mimeType: "application/json",
  });
  for (const part of manual.parts) {
    items.push({
      uri: `acf://manual/section/${part.part}`,
      name: `Manual part ${part.part} — ${part.title}`,
      description: `Manual section (pp. ${part.page_range}).`,
      mimeType: "text/markdown",
    });
  }

  /* Deck */
  items.push({
    uri: "acf://deck",
    name: "ACF® Slide deck",
    description: "Presentation deck for the ACF® standard.",
    mimeType: "text/markdown",
  });

  /* Glossary */
  items.push({
    uri: "acf://glossary",
    name: "ACF® Glossary index",
    description: "List of canonical ACF® terms with cross-refs.",
    mimeType: "application/json",
  });

  /* Meta */
  items.push({
    uri: "acf://meta",
    name: "ACF® doctrine metadata",
    description: "Framework version, content hash, archive URL, supported locales.",
    mimeType: "application/json",
  });

  return items;
}

export async function readResource(
  registry: AcfRegistry,
  uri: string,
  acceptLanguage?: string,
): Promise<ResourceReadResult> {
  const parsed = parseAcfUri(uri);
  const locale = negotiateLocale({
    explicit: parsed.locale,
    acceptLanguage,
    envLocale: process.env["ACF_MCP_LOCALE"],
  });

  switch (parsed.category) {
    case "framework_principle": {
      const list = await registry.content.loadPrinciples();
      const found = list.find((p) => p.code === parsed.id);
      if (!found) throw new Error(`Principle not found: ${parsed.id}`);
      return jsonResource(uri, found);
    }
    case "framework_autonomy_level": {
      const list = await registry.content.loadAutonomyLevels();
      const found = list.find((l) => l.code === parsed.id);
      if (!found) throw new Error(`Autonomy level not found: ${parsed.id}`);
      return jsonResource(uri, found);
    }
    case "framework_dimension": {
      const list = await registry.content.loadDimensions();
      const found = list.find((d) => d.code === parsed.id);
      if (!found) throw new Error(`Dimension not found: ${parsed.id}`);
      return jsonResource(uri, found);
    }
    case "framework_ddao": {
      return jsonResource(uri, await registry.content.loadDdao());
    }
    case "fiche": {
      const fiche = await registry.content.loadFiche(parsed.id ?? "", locale);
      return {
        contents: [
          {
            uri,
            mimeType: "text/markdown",
            text: renderFicheMarkdown(fiche),
          },
        ],
      };
    }
    case "glossary": {
      // loadGlossary returns { entries, served_locale, is_fallback } envelope
      const { entries } = await registry.content.loadGlossary(locale);
      return jsonResource(uri, entries);
    }
    case "glossary_entry": {
      // loadGlossaryEntry returns { entry, served_locale, is_fallback } | null
      const result = await registry.content.loadGlossaryEntry(parsed.id ?? "", locale);
      if (!result) throw new Error(`Glossary entry not found: ${parsed.id}`);
      return jsonResource(uri, result.entry);
    }
    case "meta": {
      return jsonResource(uri, await registry.content.loadMeta());
    }
    case "guide": {
      const guide = await registry.content.loadGuide(parsed.id ?? "", locale);
      return mdResource(
        uri,
        docHeader(guide.served_locale, guide.is_fallback) + guide.body,
      );
    }
    case "whitepaper": {
      const wp = await registry.content.loadWhitepaper(locale);
      return mdResource(
        uri,
        docHeader(wp.served_locale, wp.is_fallback) + wp.body,
      );
    }
    case "whitepaper_toc":
    case "whitepaper_section": {
      throw new Error(
        "Whitepaper is served as a single document in V1.0 (flat PDF extract without section anchors). Use acf://whitepaper.",
      );
    }
    case "manual": {
      const manual = await registry.content.loadManual(locale);
      const body = manual.parts
        .map(
          (p) =>
            `## Part ${String(p.part).padStart(2, "0")} — ${p.title} (pp. ${p.page_range})\n\n${p.body}`,
        )
        .join("\n\n---\n\n");
      return mdResource(
        uri,
        docHeader(manual.served_locale, manual.is_fallback) + body,
      );
    }
    case "manual_toc": {
      const manual = await registry.content.loadManual(locale);
      return jsonResource(uri, {
        served_locale: manual.served_locale,
        is_fallback: manual.is_fallback,
        parts: manual.parts.map((p) => ({
          part: p.part,
          title: p.title,
          page_range: p.page_range,
          uri: `acf://manual/section/${p.part}`,
        })),
      });
    }
    case "manual_section": {
      const manual = await registry.content.loadManual(locale);
      const n = Number(parsed.id);
      const part = manual.parts.find((p) => p.part === n);
      if (!part) throw new Error(`Manual section not found: ${parsed.id}`);
      return mdResource(
        uri,
        docHeader(manual.served_locale, manual.is_fallback) +
          `## Part ${String(part.part).padStart(2, "0")} — ${part.title} (pp. ${part.page_range})\n\n${part.body}`,
      );
    }
    case "deck": {
      const deck = await registry.content.loadDeck(locale);
      return mdResource(
        uri,
        docHeader(deck.served_locale, deck.is_fallback) + deck.body,
      );
    }
    default:
      throw new Error(`Resource not implemented in V1.0: ${parsed.category}`);
  }
}

function jsonResource(uri: string, data: unknown): ResourceReadResult {
  return {
    contents: [
      { uri, mimeType: "application/json", text: JSON.stringify(data, null, 2) },
    ],
  };
}

function mdResource(uri: string, text: string): ResourceReadResult {
  return {
    contents: [{ uri, mimeType: "text/markdown", text }],
  };
}

function docHeader(servedLocale: string, isFallback: boolean): string {
  return [
    "---",
    `served_locale: ${servedLocale}`,
    `is_fallback: ${isFallback}`,
    "---",
    "",
  ].join("\n");
}

function renderFicheMarkdown(fiche: {
  frontmatter: Record<string, unknown>;
  body: string;
  served_locale: string;
  is_fallback: boolean;
}): string {
  const head = [
    "---",
    `served_locale: ${fiche.served_locale}`,
    `is_fallback: ${fiche.is_fallback}`,
    "---",
    "",
  ].join("\n");
  return head + fiche.body;
}

/* -------------------- SDK wiring -------------------- */

export async function registerResources(
  server: Server,
  registry: AcfRegistry,
): Promise<void> {
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: await listResources(registry),
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
    return readResource(registry, req.params.uri);
  });
}
