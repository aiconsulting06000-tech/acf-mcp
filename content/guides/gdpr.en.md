---
regulation: gdpr
title: "ACF® Guide — GDPR (Regulation (EU) 2016/679)"
title_en: "ACF® Guide — GDPR (Regulation (EU) 2016/679)"
version: "1.0"
last_update: "2026-06-08"
applicable_dates:
  - obligation: "Regulation in force (applicable)"
    date: "2018-05-25"
---

# ACF® Guide — GDPR (Regulation (EU) 2016/679)

> **Status.** Preliminary ACF® ↔ GDPR mapping guide. This is **not legal advice**. The mappings require **human review** (`requires_human_review`) and verification against the official text of Regulation (EU) 2016/679. Each article's "text" field is a faithful summary of the provision, not its verbatim legal wording. Do not use for autonomous regulatory decision-making.

## 1. Scope and applicability

The GDPR applies as soon as an autonomous agent processes **personal data**: lead qualification, scoring, complaint handling, profiling. Two articles are structural for agentic systems: **Art. 22** (automated individual decision-making) and **Art. 35** (impact assessment). The principles baseline (Art. 5), data protection by design (Art. 25) and the record of processing (Art. 30) complete the picture.

## 2. The ACF® governance lens

- **P1 — Decision Sovereignty.** The organisation remains the controller; the agent is never "responsible" in the legal sense.
- **P2 — Doctrinal Traceability.** The ACF® decision register cross-checks the record of processing (Art. 30) and feeds the DPIA (Art. 35).
- **P3 — Ultimate Human Control.** Art. 22 is a direct pillar: whenever an automated decision produces a legal or similarly significant effect, a human must be able to intervene.
- **P4 — Proportional Governance.** Safeguard intensity follows the risk to rights and freedoms.

Dimensions chiefly engaged: **D4** (accountability & roles), **D5** (regulatory compliance), **D6** (audit & continuous improvement).

## 3. ACF® ↔ GDPR mapping (key articles)

| Article | Subject | Principles | Dimensions | ACF® cards | Operational translation |
| --- | --- | --- | --- | --- | --- |
| **Art. 5** | Principles relating to processing | P1, P2 | D5 | ACF-03, ACF-13 | Constitution forbidding non-purposeful PII access (ACF-03) + storage limitation (ACF-13). |
| **Art. 22** | Automated individual decision-making | P1, P3 | D4, D5 | ACF-09, ACF-12 | Autonomy bounding (ACF-12 mandate) + mandatory human escalation (ACF-09) on significant effect. |
| **Art. 25** | Data protection by design and by default | P2 | D3, D5 | ACF-03, ACF-13 | Agentic constitution (ACF-03) + retention policy (ACF-13). |
| **Art. 30** | Records of processing activities | P2 | D5, D6 | ACF-05, ACF-10 | The decision register (ACF-05) feeds and cross-checks the Art. 30 record. |
| **Art. 35** | Data protection impact assessment (DPIA) | P2 | D5 | ACF-11 | The risk assessment (ACF-11) feeds the DPIA template. |

> Article-by-article detail is available via `acf.regulation.article` (`regulation: "gdpr"`, `article: "5" | "22" | "25" | "30" | "35"`).

## 4. Lifecycle obligations for agentic deployments

### Pre-go-live
- Identify whether the agent makes decisions within Art. 22; if so, provide for human intervention (ACF-09) and mandate bounding (ACF-12).
- Carry out a DPIA where processing is likely to result in a high risk (Art. 35) — ACF-11.
- Embed data protection by design (Art. 25) in the agentic constitution (ACF-03).

### Continuous
- Keep the record of processing up to date (Art. 30), cross-checked with the decision register (ACF-05).
- Apply storage limitation (Art. 5, Art. 25) — ACF-13.
- Monitor gaps — `acf.identify-governance-gaps`.

### On-incident
- Where an automated decision is contested, reconstruct the decision (ACF-10) and enable human review (Art. 22).
- Document and, where applicable, notify under the relevant obligations (personal data breach — outside this mapping's scope).

## 5. Associated MCP tools

- `acf.regulation.article` — summary text + ACF® mapping for a GDPR article.
- `acf.classify-agent` — flags whether an agent involves high-risk processing.
- `acf.evaluate-agent-mandate` — checks the mandate provides for the human intervention required by Art. 22.

## 6. Limits and disclaimer

This guide is a **preliminary qualification** produced within the ACF® doctrinal framework. It **does not constitute legal advice** and does not replace analysis by a DPO or qualified lawyer, or reading of the official text. Mappings reflect ACF® v1.0 doctrine and must undergo **human review**. Always verify against Regulation (EU) 2016/679 and the applicable guidelines (EDPB, national authorities).
