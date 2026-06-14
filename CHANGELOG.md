# Changelog

## 1.1.0 — 2026-06-14

Initial public release of `acf-mcp` under the **acfstandard** organisation.

The official Model Context Protocol server for the **Agentic Commerce Framework®** (ACF®) — the European standard for governing AI agents in production.

**Surface**

- 12 MCP tools: 7 deterministic REASON (no internal LLM call) + 5 READ
- 34 signed MCP resources: whitepaper, 17 ACF® methodological cards, 5 regulator guides (AI Act, GDPR, DORA, NIS2, ISO 42001), glossary
- 6 problem-first MCP prompts
- Stable Model Context Protocol v2025-12-11 over stdio + optional HTTP transport

**Doctrine**

- Doctrine signed Ed25519 — public key embedded in every release
- Content hash SHA-256, hash chain in the decision register (card ACF-08)
- RFC 3161 qualified timestamping pattern documented

**Distribution**

- Published as [`acf-mcp`](https://www.npmjs.com/package/acf-mcp) on npm under MIT licence
- MCP registry identity: `io.github.acfstandard/acf-mcp`
- Developer documentation: [acfstandard.io](https://acfstandard.io)
