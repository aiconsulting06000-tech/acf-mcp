---
regulation: nis2
title: "ACF® Guide — NIS2 (Directive (EU) 2022/2555)"
title_en: "ACF® Guide — NIS2 (Directive (EU) 2022/2555)"
version: "1.0"
last_update: "2026-06-08"
applicable_dates:
  - obligation: "National transposition deadline of the directive"
    date: "2024-10-17"
---

# ACF® Guide — NIS2 (Directive (EU) 2022/2555)

> **Status.** Preliminary ACF® ↔ NIS2 mapping guide. This is **not legal advice**. NIS2 is a **directive**: the applicable obligations are those of the **national transposition law**, which may differ between Member States. The mappings require **human review** (`requires_human_review`). Each article's "text" field is a faithful summary of the provision, not its verbatim legal wording. Do not use for autonomous regulatory decision-making.

## 1. Scope and applicability

NIS2 raises the cybersecurity level of **essential and important entities** (energy, transport, health, digital infrastructure, etc.). Three axes are structural for agentic systems: **management accountability** (Art. 20), **all-hazards risk-management measures** (Art. 21), and **incident reporting obligations** (Art. 23). When an autonomous agent operates a network or information system within the scope of a covered entity, its governance falls under these measures.

## 2. The ACF® governance lens

- **P1 — Decision Sovereignty.** Aligns with Art. 20: explicit management-body accountability. ACF® records approval and oversight on the agent side via the mandate (ACF-12).
- **P2 — Doctrinal Traceability.** The reconstructible audit trail supplies the factual basis for timely incident notifications (Art. 23).
- **P4 — Proportional Governance.** Echoes the "appropriate and proportionate" test of Art. 21; ACF-02/ACF-11 size the measures to the agent's criticality.

Dimensions chiefly engaged: **D1** (strategy & governance), **D3** (design & technical control), **D5** (regulatory compliance), **D6** (audit & continuous improvement).

## 3. ACF® ↔ NIS2 mapping (key articles)

| Article | Subject | Principles | Dimensions | ACF® cards | Operational translation |
| --- | --- | --- | --- | --- | --- |
| **Art. 20** | Governance — management bodies' responsibility | P1 | D1, D4 | ACF-00, ACF-12 | Explicit management accountability; ACF-12 records approval and oversight on the agent side. |
| **Art. 21** | Cybersecurity risk-management measures (all-hazards) | P4 | D3, D5 | ACF-02, ACF-11 | P4 (proportionality) ↔ "appropriate and proportionate"; ACF-02/ACF-11 size the measures. |
| **Art. 23** | Incident reporting obligations | P2 | D6 | ACF-05, ACF-10 | Audit trail (P2, ACF-05/ACF-10) ↦ factual basis for timely notifications. |

> Article-by-article detail is available via `acf.regulation.article` (`regulation: "nis2"`, `article: "20" | "21" | "23"`).

## 4. Lifecycle obligations for agentic deployments

### Pre-go-live
- Have risk-management measures approved by the management body and train the leadership (Art. 20) — ACF-00, ACF-12.
- Size technical/organisational measures to the agent's criticality (Art. 21) — ACF-02, ACF-11.

### Continuous
- Maintain a usable audit trail for incident notification (Art. 23) — ACF-10.
- Revise measures as threats evolve (Art. 21).
- Monitor governance gaps — `acf.identify-governance-gaps`.

### On-incident
- Follow the notification chain (early warning, notification, final report) within the deadlines set by the national transposition law (Art. 23).
- Reconstruct the agentic timeline from the register (ACF-05) and audit trail (ACF-10).

## 5. Associated MCP tools

- `acf.regulation.article` — summary text + ACF® mapping for a NIS2 article.
- `acf.identify-governance-gaps` — flags expected-but-absent measures.
- `acf.assign-ddao-controls` — assigns controls proportionate to criticality.

## 6. Limits and disclaimer

This guide is a **preliminary qualification** produced within the ACF® doctrinal framework. It **does not constitute legal advice** and does not replace analysis by a qualified expert or reading of the applicable **national transposition law**. Mappings reflect ACF® v1.0 doctrine and must undergo **human review**. Always verify against Directive (EU) 2022/2555 as transposed in your jurisdiction.
