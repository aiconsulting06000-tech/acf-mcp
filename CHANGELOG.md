# Changelog

## 1.1.0 — 2026-06-14

Sovereign doctrine root-of-trust + organisation migration + V2 whitepaper.

**Root-of-trust rekey.** New Ed25519 doctrine keypair, generated and held under
the author's direct control (private key kept off-machine in a dedicated vault).
All releases from 1.1.0 onward verify against the new `doctrine_public_key`
embedded in `content/meta.json` and emitted in every REASON tool footer.
Previously published versions (1.0.x) remain verifiable against their original
public key — the rekey is a forward-looking root change, not a retroactive
invalidation.

**Repository migration.** Code moved from `aiconsulting06000-tech/acf-mcp` to
the dedicated `acfstandard` organisation. GitHub keeps the old URL 301-redirecting
indefinitely, so existing clones, npm references and registry source links keep
resolving.

- `repository.url` → `https://github.com/acfstandard/acf-mcp`
- `homepage` → `https://acfstandard.io` (new developer documentation site)
- `mcpName` → `io.github.acfstandard/acf-mcp`
- `server.json` `name` + `websiteUrl` aligned with the new canonical domain

**Whitepaper V2 (FR).** From-scratch rewrite of `content/whitepaper/fr.md`,
replacing the December 2025 PDF extract. New material reflects the current state
of the framework in June 2026: 17 fiches méthodologiques (vs 8 modules in V1),
the DDAO role formally specified, the 4 autonomy levels N0–N3, the full 17×5
mapping matrix against EU AI Act / ISO 42001 / NIST AI RMF / GDPR / COBIT, the
9-product ecosystem (4 free tools + 4 commercial products + acf-mcp), and the
public cryptographic stack (Ed25519 + SHA-256 chain + RFC 3161). English and
the 11 other locales remain on the v1 extract and will catch up in 1.2.0.

No code-level changes vs 1.0.3 — same 245 tests pass, same 8 REASON tools,
same disclaimer, same transport surface. The doctrine `content_hash` shifts
to reflect the whitepaper rewrite; the new signature attests it.

## 1.0.3 — 2026-06-09

Full V1.0 doctrine content + cryptographic integrity. Shipped content grows from 51 to 74 files; the doctrine is now ed25519-signed and independently verifiable.

- **Content**: whitepaper (FR+EN), full manual (FR), deck, and 5 regulator guides — AI Act, GDPR, DORA, NIS2, ISO 42001 (FR+EN) — plus `regulation-articles.json`. `acf.regulation.article` now returns real article text + ACF® mappings (replaces the V1.0 placeholder stub).
- **Integrity**: `meta.json` carries `doctrine_signature` (ed25519) + `doctrine_public_key`; every REASON footer now exposes `doctrine_signature`. New scripts: `verify-doctrine`, `sign-doctrine`, `keygen:doctrine`. `verify-doctrine` re-checks `content_hash` and signature using the embedded public key alone — no private key required.
- **Reproducibility**: content hashing is now location-independent (paths hashed relative to root), so the `content_hash` is byte-reproducible across the monorepo and this mirror. `content_hash: sha256:aa8911fb…`.
- **Archive**: `build:archive` emits a self-verifying permanent bundle (`dist/archive/doctrine-v1.0.json` — 73 files, full content + per-file + aggregate hashes + signature).
- **Trademark**: "Souveraineté Agentique®" mark applied across content.
- **Validation**: `validate-content` strengthened (structural checks + negative fixtures). 245 tests.

## 1.0.2 — 2026-06-08

Public mirror. Code moved from monorepo subfolder to dedicated public repository at https://github.com/aiconsulting06000-tech/acf-mcp. No functional change vs 1.0.1.

- `repository.url` updated to point to the new dedicated repository
- `homepage` + `bugs` fields added
- No source-level changes — same 219 tests, same 12 tools, same doctrine hash, same disclaimer

## 1.0.1 — 2026-06-08

MCP Registry preparation. Added `mcpName` field to package.json for ownership verification. No code change.

## 1.0.0 — 2026-06-07

Initial release. 12 tools (5 READ + 7 REASON, all canonically signed) + 34 Resources + 6 problem-first prompts. Stateless HTTP transport + npm-distributed stdio entry. Knowledge base externalised in `content/rules/*.json`. Lunr index pre-built at build time. Doctrine hash `sha256:a792ef25…`.

### Highlights

- `acf.classify-agent` — killer feature, 10-field qualified-enum input, full preliminary governance assessment in one call.
- `acf.advisor` — generic case → structured advice.
- 5 specialised REASON tools sharing the same engine.
- Canonical disclaimer + 4-field snapshot tests (CI-enforced).
- 4-tier rate limiting on HTTP.
- Log whitelist sanitization (no PII, ever).
- IP guardrails: validate-content script enforces "no INPI, no Decision Engine, no book mention".
