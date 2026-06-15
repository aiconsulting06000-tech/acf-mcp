---
title: "ACF® — White Paper"
doc_type: whitepaper
lang: en
version: "2.1"
published_at: "2026-06"
author: "Vincent Dorange"
publisher: "Vincent Dorange"
classification: "Public"
canonical_url: "https://acfstandard.com/whitepaper-en.pdf"
supersedes: "2.0 (June 2026 — initial edition)"
---

# ACF® — AGENTIC COMMERCE FRAMEWORK®
## The Decision Trust Infrastructure for agentic decisioning
### Govern. Measure. Prove.

**White Paper · June 2026 Edition · Vincent Dorange**

*www.acfstandard.com · www.acfstandard.io*

---

## Contents

1. Executive summary — *Govern. Measure. Prove.*
2. The 2026-2027 challenge — why now
3. The "agentic governance" category and where ACF® fits — *Decision Trust Infrastructure*
4. The ACF® framework — principles, layers, levels, roles
5. The 17 methodological cards
6. Deployment methodology
7. The three-tier emergency stop protocol
8. ACF® against existing frameworks — the mapping matrix
9. The ACF® ecosystem — one infrastructure, four manifestations
10. Technical differentiators — cryptographic proof
11. About & contact
12. Notices

---

## 1. Executive summary

The **Agentic Commerce Framework®** (ACF®) is not yet another framework. It is the European **Decision Trust Infrastructure**: the trust infrastructure to which an organisation adheres so that the decisions made by its AI agents remain **enforceable years later** — before a regulator, an auditor, a court, or an insurer. Just as TLS is the trust infrastructure of the web and SWIFT that of interbank settlement, ACF® positions itself as the common layer that organisations join when they put consequential AI agents into production (commerce, finance, services, healthcare, energy, HR, marketing, operations…).

Led by **Vincent Dorange**, ACF® is summed up in three verbs: **Govern. Measure. Prove.** The standard **governs** (the doctrine, the cards, the DDAO role); the **ACF Sovereignty Score™** **measures** (the 0-100 metric of preserved decisional sovereignty); **ACF Compliance** **proves** (the enforceable cryptographic trace that an independent third party can verify). This articulation answers a precise gap: existing frameworks — EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR, COBIT — state **what must be done** but do not state **how to operate**, **how to measure**, or **how to prove**. ACF® closes that gap.

ACF® articulates **4 founding principles**, **4 operational layers**, **4 autonomy levels** (N0 to N3), **17 ready-to-use methodological cards** and **a named role** — the **DDAO** (Delegated Decision Agent Officer) — who bears human responsibility for every agent in production. The whole is backed by an enforceable **cryptographic traceability** (Ed25519 signatures, SHA-256 hash chain, RFC 3161 qualified timestamping) that makes every agentic decision auditable, independently of the deployer's infrastructure.

The framework does not replace existing standards. It **operationalises** them at the decision level: each of the 17 ACF® cards maps to an EU AI Act article, an ISO/IEC 42001 clause, a NIST AI RMF function, a GDPR article and a COBIT 2019 domain. Any compliance team can therefore integrate ACF® into its existing audit trail within minutes.

The **EU AI Act high-risk enforcement comes into force on 2 December 2027** for agentic systems operating in essential services (credit, insurance, energy, healthcare, justice). Organisations that have deployed commercial agents by then without an operational governance framework will face a retroactive compliance obligation, with no documentation and no admissible audit trail. ACF® is designed so that no audit line is missing at that moment.

The ACF® ecosystem is organised around **four manifestations** of the trust infrastructure: the **ACF Sovereignty Score™** (the metric), **ACF Compliance** (the proof), the **`acf-mcp`** MCP server (the execution engine), and the **doctrine** (the corpus — 17 cards × 4 layers × N0-N3). To these are added four freely accessible tools — **ACF Score** (self-diagnostic), **ACF AI Act Checker**, **Compliance Flash Audit** and **Personalised Compliance Plan** — three complementary commercial products (**ACF Auditor**, **ACF Control**, **ACF Certification**), and the MCP server that exposes the ACF® doctrine as a native resource to AI copilots (Claude, Cursor, Windsurf, Continue, Zed) with eight signed deterministic REASON tools.

---

## 2. The 2026-2027 challenge — why now

### 2.1. Commercial agents are no longer a demonstration

In 2024-2025, agentic commerce played out in demonstrations. In 2026, it entered production. Seven competing protocols were published in eighteen months — **MCP** (Anthropic, November 2024), **Operator** (OpenAI, January 2025), **Mariner** (Google, December 2024), **TAP** (Visa, October 2025), **Agent Pay** (Mastercard, 2025), **ACP** (Stripe + OpenAI, 2025), **TACP** (Forter, 2025). Walmart, Wells Fargo, Klarna, Expedia and Sephora have announced or deployed agents acting directly on real-value transactions. According to Bain & Company, one in five e-commerce purchases in the United States could be initiated by an autonomous agent by 2028.

For European merchants, the topic is no longer prospective. It is competitive and regulatory.

### 2.2. The silent risk: the absence of an operational framework

None of these protocols states who supervises the agent, against which criteria, with what traceability. All of them assume that an internal team will rebuild that layer on top. For an SME, a mid-cap, or a European group, **that reconstruction is not sustainable**: it presupposes an ongoing dialogue between IT, the DPO, the CISO, compliance, business and legal, with no shared reading grid and no template documentation.

The result is visible in the field. On a sample of cases observed by the author in late 2025-early 2026 — under confidentiality cover, the organisations concerned cannot be named — out of ten companies operating an agent in production:

- **8 out of 10** have no individually named owner of the agent's decisions;
- **9 out of 10** have no cryptographically signed log of agentic decisions;
- **10 out of 10** cannot produce, on an auditor's request, the full trace of a specific decision made by the agent on a Tuesday at 2:12 p.m.

These three combined gaps constitute what the EU AI Act calls, in Article 14 and Article 26(6), a failure of human oversight and a failure to maintain event logs. **From 2 December 2027 onwards**, high-risk enforcement applies: these failures become sanctionable — up to 35 million euros or 7% of worldwide annual turnover.

### 2.3. An 18-month window for action

The calendar is now settled. Between June 2026 and December 2027, organisations have roughly **18 months** to structure their agentic governance: name a responsible officer, document each agent, build the decision log, formalise a kill switch, and demonstrate to internal governance bodies (audit committee, risk committee, board) that a framework is in place.

ACF® was designed to make those 18 months workable without starting from scratch. The framework is a set of executed gestures — not a statement of intent.

---

## 3. The "agentic governance" category and where ACF® fits

### 3.1. Every domain has its dominant framework

The domains of digital governance have crystallised around a structuring framework:

| Domain | Dominant framework |
| --- | --- |
| Cybersecurity | ISO/IEC 27001 |
| Privacy | GDPR |
| Artificial intelligence | ISO/IEC 42001 |
| Regulated AI | EU AI Act |
| **Agentic governance** | **ACF®** |

ISO 27001 did not replace existing security practices: it made them readable, certifiable, comparable. GDPR did not invent data protection: it turned it into a universal obligation across the Union. ISO/IEC 42001 does not rewrite data science: it equips it with an enforceable management system. The EU AI Act does not create AI: it frames its high-risk uses.

ACF® belongs to that lineage. **System autonomy is not a sub-topic of AI**; it is a domain in its own right, with its own risks (drift, operational hallucination, uncontrolled escalation), its own roles (DDAO), and its own safeguards (kill switch, autonomy levels N0-N3, cryptographic decision registry).

### 3.2. ACF® is not a challenger to existing standards. It is their execution layer.

Existing frameworks govern **AI**. ACF® governs **decisions made by autonomous systems**.

The EU AI Act tells you that the AI system is regulated. ISO/IEC 42001 tells you how to manage your AI portfolio. The NIST AI RMF tells you which risks to surface. GDPR tells you who must consent. The moment an agent **acts** — sets a price, grants credit, books a flight, calls an API — none of these frameworks tells you who signed that specific decision, against which agentic constitution, with which kill switch, audited by whom, and retained for how long.

That is the layer ACF® formalises. The 17 methodological cards are its operational vocabulary.

### 3.3. ACF® as Decision Trust Infrastructure

One more word is needed, because it changes the strategic reading. ACF® is not a framework you deploy in the sense that you deploy software — it is a **trust infrastructure** to which an organisation **adheres**, in the same way that TLS is one for the web or SWIFT is one for interbank settlement. No one rewrites TLS in their back office; they plug into it. No one reinvents SWIFT to issue a cross-border transfer; they join the network. ACF® positions itself as the same layer for agentic decisioning: a public, open, cryptographically signed infrastructure on which organisations rely to make their agentic decisions **enforceable years later**.

This is what we call a **Decision Trust Infrastructure**. The distinction is more than editorial. The standard does not live in your servers; it lives in the capacity of any third party — regulator, auditor, insurer, court — to independently verify, years later, that an agentic decision did take place, who carried it by name, under which signed doctrine, and against which applicable frameworks.

Three properties characterise a Decision Trust Infrastructure, and all three are already implemented by ACF®:

1. **Signed identity** — every agentic decision carries an Ed25519 signature and the name of the civilly engaged DDAO. No anonymous autonomy is admitted by the standard.
2. **Replicable verification** — the SHA-256 chain and the signed resources of the `acf-mcp` server allow a third party, years later, to replay the verification without depending on the deployer.
3. **Enforceable trace** — the 17 × 5 matrix mapping to EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR and COBIT turns the trace into enforceable legal proof, not a mere technical log.

---

## 4. The ACF® framework — principles, layers, levels, roles

### 4.1. The 4 founding principles

ACF® rests on four axiomatic principles, independent of the underlying technical protocol.

**P1 — Separation of decision and execution.** The agent may execute; it may not decide alone on critical strategic decisions (contractual commitment, financial exposure beyond a threshold, international data transfer, irreversible action on a real asset). Such decisions are always human, or suspended.

**P2 — Non-delegable zones.** Certain decisions are never delegable, whatever the agent's autonomy level and whatever the maturity of the organisation. They are enumerated in each organisation's agentic constitution (card ACF-03).

**P3 — Traceability and interruptibility.** Every agentic action is journalled in a cryptographically signed registry (card ACF-08). Every action can be interrupted at any moment via an operational kill switch (card ACF-06) whose effectiveness is tested.

**P4 — Living governance.** The governance framework evolves with agent capabilities. A formal review at least quarterly (cards ACF-05 and ACF-10) adjusts autonomy levels, escalation thresholds and non-delegable zones.

### 4.2. The 4 operational layers

ACF® deploys across four nested layers:

- **C1 — Strategic.** Agentic sovereignty charter, governance committee, organisational RACI matrix, DDAO designation.
- **C2 — Tactical.** Weighted objectives per agent, automatic arbitration rules, human escalation thresholds.
- **C3 — Operational.** Each agent's mandate (card ACF-12), authorised interaction perimeter, classification by criticality level (card ACF-02).
- **C4 — Technical.** Adaptive gating, multi-tier alerts, real-time sovereignty KPIs, dashboards operable by the DDAO and his or her team.

### 4.3. The 4 autonomy levels — N0 to N3

ACF® classifies agents by autonomy level. Level **N2** is the recommended target for the majority of production use cases in 2026-2027.

- **N0 — Classical automation.** Fixed rules, no learning. Any change goes through a human change.
- **N1 — Assisted agents.** The agent analyses, prioritises and recommends. The final decision remains systematically human.
- **N2 — Governed agents.** The agent decides within a strict framework (agentic constitution + locked non-delegable zones + tested kill switch + signed registry). This is the default target level for agentic commerce in production.
- **N3 — Supervised autonomy.** The agent decides and learns. Reserved for specific cases. Requires the most mature governance posture (monthly review, dual DDAO, semi-annual external audit).

The recommended progression is N0 → N1 → N2 → N3. Each step up triggers the controls of card ACF-00 (Sovereignty Score).

### 4.4. The DDAO role — Delegated Decision Agent Officer

The **DDAO** is the human cornerstone of ACF®. It is the individual or collegial body individually designated as responsible for an agent (or a portfolio of agents) in production.

The DDAO carries four operational missions:

1. **Validation of critical decisions** that the agent is designed to escalate.
2. **Arbitration in case of unforeseen escalation** (out-of-mandate situation, drift behaviour, alert signal from the registry).
3. **Drift monitoring** over time (model drift, case distribution drift, cost drift).
4. **Periodic reviews** over the assigned perimeter.

The DDAO role draws on two functions already recognised in law and organisational practice: the **DPO** (Data Protection Officer, GDPR articles 37-39) and the **CISO** (Chief Information Security Officer). Like them, the DDAO is independent from the hierarchical chain of the agent supervised, has direct access to governance bodies, and engages the legal responsibility of the company. The role is defined by card **ACF-12 (Agent Mandate)** and instrumented by simulation **ACF-15 (Governance Simulation)**.

---

## 5. The 17 methodological cards

ACF® is not a theoretical doctrine. The standard is deployed through seventeen methodological cards numbered **ACF-00 to ACF-16**, ready to be printed, filled in, signed, archived. Each card is an enforceable governance artefact.

| Code | Title | Object |
| --- | --- | --- |
| ACF-00 | Sovereignty Score | Assesses the level of decisional sovereignty preserved. |
| ACF-01 | Decision Map | Maps the agent's decisions and the approval chain. |
| ACF-02 | Criticality Matrix | Classifies each agent by criticality, impact, irreversibility. |
| ACF-03 | Agentic Constitution | Internal charter — who decides what, how, with which limits. |
| ACF-04 | Agent Card | Operational identity: perimeter, data, tools, autonomy. |
| ACF-05 | Supervision & Governance | Continuous supervision mechanisms. |
| ACF-06 | Kill Switch | Emergency stop procedure (three tiers). |
| ACF-07 | First Agent Dossier | Qualification dossier before go-live. |
| ACF-08 | Registry of Agentic Decisions | Cryptographically signed journal. |
| ACF-09 | Action & Improvement Plan | Post-deployment plan. |
| ACF-10 | 30-day Governance Audit | Periodic internal audit. |
| ACF-11 | Agentic Risk Assessment | Specific analysis: drift, hallucination, escalation. |
| ACF-12 | Agent Mandate | Formal delegation to the DDAO. |
| ACF-13 | Guided Practical Case | Annotated use case for training and dry-run audit. |
| ACF-14 | Teacher's Guide | Pedagogical script for trainers. |
| ACF-15 | Governance Simulation | Sandbox exercise. |
| ACF-16 | Accountability by Design | Cross-cutting accountability principle. |

The cards are public for teachers, trainers, researchers and training institutions (under a Pedagogical Use Charter). For organisations in deployment, they come with a **130-page ACF® Toolkit manual**, an **introductory deck** and **five calibrated pedagogical cases** (business school, engineering school, MBA, EMBA, AI master). The whole is versioned, traceable, citable.

---

## 6. Deployment methodology

### 6.1. Three phases over 6 to 18 months

An ACF® deployment is structured in three phases. Each phase produces enforceable deliverables, dated, signed by the DDAO and by the functions concerned.

**Phase 1 — Scoping (months 1 to 3).** Initial Sovereignty Score calculation (ACF-00). Decision mapping of existing or planned agents (ACF-01). Building the criticality matrix (ACF-02). Drafting the agentic constitution (ACF-03). DDAO designation and formalisation of the governance committee.

**Phase 2 — Deployment (months 4 to 9).** For each agent: drafting of the first agent dossier (ACF-07), production of the agent card (ACF-04), implementation of the mandate (ACF-12), implementation of the tested kill switch (ACF-06), connection of the signed registry (ACF-08), initial 30-day governance audit (ACF-10).

**Phase 3 — Steady state (months 10 to 18).** Continuous action and improvement plan (ACF-09). Continuous risk assessment (ACF-11). Quarterly governance simulation (ACF-15). Annual review. Preparation for the external audit and — for organisations who wish — ACF® certification (Level 1, 2 or 3).

### 6.2. The six key people of a deployment

An ACF® deployment typically mobilises six internal functions coordinated by the DDAO:

- **Executive management** (sponsor, signs off the agentic constitution),
- **IT** (instruments the signed registry and the kill switch),
- **CISO** (signs off the cryptographic architecture),
- **DPO** (verifies the GDPR articulation, in particular Article 22),
- **Legal** (oversees EU AI Act compliance and mandate drafting),
- **Business sponsor** (describes the use case, signs off escalation thresholds).

The agent itself is not a member of the committee.

---

## 7. The three-tier emergency stop protocol

An effective agentic stop mechanism is not a simple switch. ACF® specifies three tiers of interruption, with defined response times and escalation procedures. Card **ACF-06 (Kill Switch)** documents their implementation. Card **ACF-15 (Governance Simulation)** mandates a quarterly exercise.

**Tier 1 — Operational pause.** Response time: under 30 seconds. Suspension of non-critical operations. The agent completes ongoing actions but initiates no new ones. Triggered automatically (on a registry alert signal) or manually (DDAO or first-line operator).

**Tier 2 — Decisional stop.** Response time: under 5 seconds. Complete suspension of all decision-making. All pending decisions are redirected to human operators. Triggered by the DDAO or a member of the governance committee.

**Tier 3 — Total system stop.** Response time: under 1 second. Complete interruption of all agentic systems. Fallback to manual backup processes. Reserved for the governance committee or executive management.

Each tier is tested through quarterly simulation exercises. A documented but untested kill switch is not a kill switch.

---

## 8. ACF® against existing frameworks — the mapping matrix

Each ACF® card is mapped to the five major frameworks: **EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR, COBIT 2019**. The mapping is deliberately conservative — when a card concerns several articles, only the primary article is cited. The complete mapping (with secondary references) is reproduced in the ACF® Toolkit manual and exposed in machine-readable form by the `acf-mcp` MCP server.

| ACF® card | EU AI Act | ISO/IEC 42001 | NIST AI RMF | GDPR | COBIT 2019 |
| --- | --- | --- | --- | --- | --- |
| ACF-00 Sovereignty Score | Art. 9 | 6.1.2 | MAP-3 | Art. 35 | EDM-01 |
| ACF-01 Decision Map | Art. 14 | 8.4 / A.6 | GOVERN-1.1 | Art. 22 | EDM-03 |
| ACF-02 Criticality Matrix | Art. 6 + Ann. III | 6.1.2 | MAP-2 | Art. 35 | APO-12 |
| ACF-03 Agentic Constitution | Art. 5 + 26 | 5.2 | GOVERN-2 | Art. 25 | EDM-01 |
| ACF-04 Agent Card | Art. 11 + 26(6) | 7.5 + 8.1 | MAP-1 | Art. 30 | BAI-09 |
| ACF-05 Supervision & Governance | Art. 14 + 26(5) | 5.3 + 9.1 | GOVERN-3 / MANAGE-2.3 | Art. 22 + 37-39 | MEA-02 |
| ACF-06 Kill Switch | Art. 14(4) + 26(5) | 8.3 | MANAGE-4 | Art. 22(3) | DSS-02 |
| ACF-07 First Agent Dossier | Art. 11-13 + 17 | 8.1 + 6.2 | MAP-2 + GOVERN-4 | Art. 30 + 35 | BAI-01 |
| ACF-08 Decision Registry | Art. 12 + 19 + 26(6) | 9.1 + 7.5.3 | MEASURE-2 | Art. 30 | MEA-01 |
| ACF-09 Action & Improvement Plan | Art. 9(4) + 17 | 10.1 + 10.2 | MANAGE-2 | Art. 24 + 32 | BAI-08 |
| ACF-10 30-day Governance Audit | Art. 17 + 71 | 9.2 + 9.3 | GOVERN-5 + MANAGE-3.1 | Art. 32 | MEA-02 + MEA-03 |
| ACF-11 Risk Assessment | Art. 9 | 6.1.2 | MAP-3 + MAP-4 | Art. 35 | APO-12 |
| ACF-12 Agent Mandate | Art. 16 + 17 + 26 | 5.3 | GOVERN-3 + GOVERN-6 | Art. 28 + 24 | APO-05 |
| ACF-13 Guided Practical Case | Art. 6 + 13 | 7.2 + 7.3 | MAP-2 | Art. 22 | BAI-05 |
| ACF-14 Teacher's Guide | Art. 4 | 7.2 + 7.3 | GOVERN-1.6 + GOVERN-6 | Art. 39 | APO-07 |
| ACF-15 Governance Simulation | Art. 9 + 57-63 | 9.1 + 6.2 | MANAGE-3 + MEASURE-3 | Art. 32 | BAI-06 |
| ACF-16 Accountability by Design | Art. 5 + 13 + 16(b) | 5.2 | GOVERN-1 + MANAGE-1 | Art. 5(2) + 24 + 25 | EDM-01 |

**Reading.** Card ACF-08 (Registry of Agentic Decisions) directly implements the obligation of Article 12 of the EU AI Act on automatic event logging and Article 26(6) on the deployer's six-month log retention; on the ISO/IEC 42001 side it falls under clause 9.1 (monitoring, measurement, analysis, evaluation); on the NIST AI RMF side under function MEASURE-2 (Performance & Trustworthiness); on the GDPR side under Article 30 (record of processing activities); and on the COBIT side under objective MEA-01 (Performance Monitoring). A compliance team that deploys ACF-08 simultaneously produces the artefacts required by those five frameworks.

---

## 9. The ACF® ecosystem — one infrastructure, four manifestations

ACF® is not a product. It is a trust infrastructure that manifests through **four distinctly named components**, each answering a precise verb:

| Verb | Component | Role |
|---|---|---|
| **Govern** | ACF® (the doctrine) | The framework — 4 principles, 4 layers, N0–N3, DDAO, 17 cards |
| **Measure** | **ACF Sovereignty Score™** | The metric — 0–100 across six weighted dimensions |
| **Prove** | **ACF Compliance** | The proof — Ed25519-signed registry, SHA-256 chain, RFC 3161 timestamping |
| **Run** | **`acf-mcp`** | The engine — open-source MCP server that exposes the doctrine to AI copilots |

To this backbone is added a crown of **free entry tools** (ACF AI Act Checker, Flash Audit, Compliance Plan) and **complementary commercial products** (ACF Auditor, ACF Control, ACF Certification). An organisation can enter ACF® through any door; it ends up touching all four.

### Free tools

#### 9.1. ACF Sovereignty Score™ — the reference metric

The ACF Sovereignty Score™ is the **0-100 metric of decisional sovereignty** that an organisation preserves over its AI agents. It is calibrated on **six weighted dimensions** anchored to the ACF® cards: decisional identifiability (18%), override capacity (18%), audit traceability (18%), threshold control (14%), kill switch effectiveness (18%), drift visibility (14%). Freely accessible tool, no registration, computable in under 15 minutes. Above 60, the organisation sits in *controlled sovereignty*; above 80, in *full sovereignty*. Target audience: executive management, IT, CRSO, DPO seeking a first diagnostic comparable to a public benchmark. `www.acf-score.com`.

The ACF Sovereignty Score™ is to agentic governance what NPS is to customer satisfaction: a single, shareable, enforceable number that an executive committee can reason on without opening a fifty-page report.

#### 9.2. ACF AI Act Checker — AI Act compliance verification

Rapid verification of a system's exposure to the EU AI Act: risk classification (prohibited / high-risk / limited risk / minimal risk), applicable articles and associated obligations. Freely accessible tool. Target audience: legal, compliance, DPO at first reading. `www.acfstandard.com/fr/compliance-checker`.

#### 9.3. Compliance Flash Audit — 15-minute diagnostic

Compact diagnostic, structured on the critical axes of agentic governance (human oversight, traceability, kill switch, DDAO role, decision registry). Immediate output as a downloadable report. Target audience: business team, project sponsor, CRSO, DPO seeking to frame a file before an audit or a committee. `compliance.acfstandard.com/fr/start`.

#### 9.4. Personalised Compliance Plan — roadmap

Based on the Flash Audit results, generation of a compliance roadmap prioritised over three phases (scoping / deployment / steady state), articulated on the 17 ACF® cards and distributed by internal function (executive management, IT, CISO, DPO, legal, business). Free tool. Target audience: incoming DDAO, transformation team, project steering committee.

### Commercial products

#### 9.5. ACF Auditor — guided audit

Guided audit platform assessing an organisation's digital and agentic maturity across seven weighted dimensions (sector calibration available). Generates an Agentic Readiness Score, a detailed Sovereignty Score and a three-phase roadmap. Target audience: IT and transformation functions.

#### 9.6. ACF Control — governance dashboard

Real-time console that monitors sovereignty KPIs with adaptive gating and automated escalation. Tamper-evident audit logs (Ed25519 + hash chain). Target audience: IT/CISO teams in operations.

#### 9.7. ACF Compliance — the enforceable cryptographic proof

The flagship SaaS product of the ecosystem, available at `compliance.acfstandard.com`. This is **the component that proves**: the platform produces the enforceable cryptographic trace of every agentic decision (Ed25519 signature, SHA-256 chain, RFC 3161 timestamping), implements each of the ACF® / standards mappings as a multi-tenant registry, and issues on demand a signed PDF verifiable by any third party with the ACF® public key. Three plans: Starter (€490/month), Business (€1,490/month, popular), Enterprise (on quote). Target audience: CRSO, DPO, legal, compliance teams, and any organisation that must answer a regulator in 12 minutes rather than 12 weeks.

#### 9.8. ACF Certification — independent attestation

Independent certification programme in three tiers (Level 1, 2, 3). Publicly verifiable badge, annual renewal, continuous monitoring. Target audience: organisations seeking to render their governance posture enforceable against third parties (clients, regulators, insurers).

### Open-source MCP server

#### 9.9. acf-mcp — Model Context Protocol server

ACF®'s official MCP server, released open source under the MIT licence (npm package `acf-mcp`; developer documentation, integration manual and reference literature on `acfstandard.io`). It exposes the ACF® doctrine — four principles, four autonomy levels, the DDAO role, the seventeen methodological cards, five regulatory guides (AI Act, GDPR, DORA, NIS2, ISO 42001), the glossary and the white paper — as native MCP resources consumable by Claude Desktop, Cursor, Windsurf, Continue.

The server ships with **eight deterministic reasoning tools** (REASON tools), built on a versioned and signed knowledge base — with no internal LLM call:

1. `acf.advisor` — structured advice from a generic case
2. `acf.classify-agent` — preliminary qualification of an agent from ten enumerated fields
3. `acf.assess-autonomy` — N0-N3 recommendation + go/no-go + kill switch design
4. `acf.identify-governance-gaps` — 6-dimension maturity score + prioritised remediations
5. `acf.map-ai-act-obligations` — set of EU AI Act obligations distributed by lifecycle phase
6. `acf.assign-ddao-controls` — recommended DDAO controls per level and risk
7. `acf.evaluate-agent-mandate` — eight-check audit of an existing mandate
8. `acf.map-to-standards` — ACF® × existing frameworks correspondence for a given case

Every REASON tool output is signed (`doctrine_version`, `doctrine_hash`, `doctrine_archive_url`, `regulatory_snapshot`, `generated_at`) and explicitly positioned as **preliminary qualification, not legal advice** — `requires_human_review: true` is constant.

---

## 10. Technical differentiators — cryptographic proof

ACF® is not only a reading grid. It is a proof infrastructure whose three cornerstones are public and reproducible.

### 10.1. Ed25519 signature of every decision

Every agentic decision recorded in the registry (card ACF-08) is signed by an Ed25519 key pair controlled by the organisation. The public key is publishable. The private key is held according to ANSSI standards (HSM or equivalent). Any signature is independently verifiable, with no access to the deployer's infrastructure.

### 10.2. SHA-256 hash chain

Each registry entry embeds the SHA-256 hash of the previous entry, forming a chronological hash chain. Any retroactive modification attempt is detected by recomputing the chain. The registry becomes **enforceable**: an auditor, a regulator or a court can recompute the chain and rule.

### 10.3. RFC 3161 qualified timestamping

Each registry entry is timestamped by an RFC 3161 qualified service (Time Stamp Authority qualified within the meaning of eIDAS). This gives every decision an enforceable date, verifiable independently of the deployer and its infrastructure provider. The practice recommended by ACF® is to use an ANSSI-referenced PSCE timestamping authority.

### 10.4. Signed certified PDF export

The registry can produce on demand a certified PDF export, electronically signed (PAdES). The PDF embeds the hash chain, the timestamps and the organisation's public key. It is designed to be presentable to an auditor or a supervisory authority in its native format, without requiring any additional tool.

---

## 11. About & contact

The **Agentic Commerce Framework®** is created and led by **Vincent Dorange**. The framework results from several years of research and practice on the governance of autonomous systems, and from the direct observation of their first production deployments in 2025-2026 — in commerce, finance, business services, healthcare and energy.

ACF® is published by Vincent Dorange. The documentary standard (principles, cards, doctrine) is released under an open licence. The free tools (ACF Sovereignty Score™, ACF AI Act Checker, Flash Audit, Compliance Plan) and the commercial products (ACF Auditor, ACF Control, ACF Compliance, ACF Certification) are accessible at the URLs below. The `acf-mcp` MCP server is open source (MIT licence) and published on npm.

**ACF®**, **Agentic Commerce Framework®**, **Souveraineté Agentique®**, **ACF Sovereignty Score™** and **ACF Sovereignty KPI™** are trademarks registered or pending registration at the French Industrial Property Office (INPI) by Vincent Dorange.

**Contact**
Official site — `www.acfstandard.com`
AI Act Checker (free) — `www.acfstandard.com/fr/compliance-checker`
Flash Audit & Compliance Plan (free) — `compliance.acfstandard.com/fr/start`
ACF Compliance (SaaS) — `compliance.acfstandard.com`
ACF Sovereignty Score™ (free diagnostic) — `www.acf-score.com`
Developer documentation & MCP — `acfstandard.io`
ACF® Standard · June 2026 Edition

---

## 12. Notices

**ACF®**, **Agentic Commerce Framework®** and **Souveraineté Agentique®** are trademarks of Vincent Dorange registered at the French Industrial Property Office (INPI). **ACF Sovereignty Score™** and **ACF Sovereignty KPI™** are trademarks pending registration at the INPI in classes 9, 35, 36, 41 and 42. The methodology (cards, doctrine, schemas) is protected and released under an open licence for pedagogical, research and internal compliance use. Any commercial use of the ACF® name or its derived trademarks in a third-party product or service requires prior written agreement from the publisher.

The full set of mappings to EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR and COBIT 2019 published in this document is deliberately conservative. The complete mapping, including secondary references and interpretive notes, is reproduced in the ACF® Toolkit manual and exposed in machine-readable form by the `acf-mcp` server (tool `acf.map-to-standards`).

This document is a white paper. It is not intended to substitute for legal, accounting or regulatory advice. Any operational implementation must be adapted to the organisation's context and validated by the competent internal functions.

© 2026 Agentic Commerce Framework® — Vincent Dorange.
All rights reserved. ACF® is a registered trademark.

---

*Sources: EU AI Act (Regulation (EU) 2024/1689) · ISO/IEC 42001:2023 · NIST AI RMF 1.0 (2023) · GDPR (Regulation (EU) 2016/679) · COBIT 2019. Sector data: Bain & Company, Gartner, Forrester, IFOP, official communications from the publishers cited (Visa, Mastercard, Stripe, OpenAI, Anthropic, Google, Walmart, Wells Fargo, Klarna, Expedia, Sephora) — state as of 1 June 2026.*
