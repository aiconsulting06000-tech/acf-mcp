---
regulation: ai-act
title: "ACF® Guide — AI Act (Regulation (EU) 2024/1689)"
title_en: "ACF® Guide — AI Act (Regulation (EU) 2024/1689)"
version: "1.0"
last_update: "2026-06-08"
applicable_dates:
  - obligation: "Obligations for high-risk AI systems (Annex III) — Digital Omnibus deferral"
    date: "2027-12-02"
  - obligation: "General-purpose AI (GPAI) model obligations"
    date: "2025-08-02"
---

# ACF® Guide — AI Act (Regulation (EU) 2024/1689)

> **Status.** Preliminary ACF® ↔ AI Act mapping guide. This is **not legal advice**. The obligations below require **human review** (`requires_human_review`) and verification against the official text of Regulation (EU) 2024/1689. Each article's "text" field is a faithful summary of the provision, not its verbatim legal wording. Do not use for autonomous regulatory decision-making.

## 1. Scope and applicability

The AI Act tiers AI systems by risk level (unacceptable, high-risk, limited, minimal) and imposes on **high-risk** systems a baseline of obligations (Articles 8 to 15) covering risk management, data governance, documentation, logging, transparency, human oversight and robustness.

For an **agentic** deployment — an agent that decides and/or executes in a commercial environment — the operational question is: *does the agent fall under a high-risk use case (Annex III)?* If so, the Art. 9-15 baseline applies to the provider, and deployer duties attach to the deployer.

> **Timeline.** The "Digital Omnibus" deferral moves Annex III obligations to **2027-12-02**. GPAI obligations apply since **2025-08-02**. Check the consolidated timeline via the `acf.map-ai-act-obligations` tool.

## 2. The ACF® governance lens

ACF® does not restate the AI Act: it provides the **operational apparatus** that makes its requirements executable on autonomous agents. Four principles structure the reading:

- **P1 — Decision Sovereignty.** Accountability is never delegated to the agent. The AI Act grants no legal personality to the agent; the organisation remains accountable.
- **P2 — Doctrinal Traceability.** Every agentic decision is reconstructible. This underpins Art. 10, Art. 12 (logs) and documentation.
- **P3 — Ultimate Human Control.** The kill switch and escalation stay active — a direct expression of Art. 14.
- **P4 — Proportional Governance.** Control intensity follows criticality — echoing the Art. 9 risk management system.

Maturity dimensions chiefly engaged: **D3** (design & technical control), **D4** (accountability & roles), **D5** (regulatory compliance), **D6** (audit & continuous improvement).

## 3. ACF® ↔ AI Act mapping (key articles)

| Article | Subject | Principles | Dimensions | ACF® cards | Operational translation |
| --- | --- | --- | --- | --- | --- |
| **Art. 9** | Risk management system | P2, P4 | D5, D6 | ACF-02, ACF-11 | Criticality matrix (ACF-02) + risk assessment (ACF-11), bounded by proportionality (P4). |
| **Art. 10** | Data and data governance | P2 | D5 | ACF-05, ACF-13 | Decision register (ACF-05) + retention policy (ACF-13). |
| **Art. 12** | Record-keeping (logging) | P2 | D5, D6 | ACF-05, ACF-10 | Time-stamped register (ACF-05) + reconstructible audit trail (ACF-10) — a direct expression of P2. |
| **Art. 13** | Transparency & information to deployers | P3 | D3, D4 | ACF-04, ACF-12 | Documented agent card (ACF-04) + written mandate (ACF-12) stating perimeter and limits. |
| **Art. 14** | Human oversight | P3 | D3, D4 | ACF-07, ACF-09, ACF-14 | Kill switch (ACF-07) + escalation thresholds (ACF-09) + human-takeover drills (ACF-14). |

> Article-by-article detail (summary text + mapping) is available via the `acf.regulation.article` tool (`regulation: "ai-act"`, `article: "9" | "10" | "12" | "13" | "14"`).

## 4. Lifecycle obligations for agentic deployments

### Pre-go-live
- Qualify the use case: high-risk (Annex III) or not. Tools: `acf.classify-agent`, then `acf.map-ai-act-obligations` if high-risk.
- Establish the risk management system (Art. 9) — ACF-02 + ACF-11.
- Document the agent mandate and instructions for use (Art. 13) — ACF-12 + ACF-04. Verifiable via `acf.evaluate-agent-mandate`.
- Design human oversight and the kill switch (Art. 14) — ACF-07. Size via `acf.assess-autonomy`.

### Continuous
- Maintain logging and the decision register (Art. 12) — ACF-05 + ACF-10.
- Re-assess risk on every material change to the system (Art. 9, iterative).
- Monitor governance gaps — `acf.identify-governance-gaps`.

### On-incident
- Trigger escalation and, if needed, the kill switch (Art. 14) — ACF-09, ACF-07.
- Reconstruct the decision from the audit trail (Art. 12) — ACF-10.
- Document and feed the improvement loop — ACF-16.

## 5. Associated MCP tools

- `acf.regulation.article` — summary text + ACF® mapping for an AI Act article.
- `acf.map-ai-act-obligations` — exhaustive high-risk obligation set by lifecycle phase, with deadlines (incl. Digital Omnibus deferrals).
- `acf.classify-agent` — preliminary qualification (autonomy level, risk class, regulations, controls, sign-off).
- `acf.assess-autonomy`, `acf.assign-ddao-controls`, `acf.evaluate-agent-mandate` — human-control and mandate design.

## 6. Limits and disclaimer

This guide is a **preliminary qualification** produced within the ACF® doctrinal framework. It **does not constitute legal advice** and does not replace analysis by a qualified lawyer or reading of the official text. Card/principle/dimension mappings reflect ACF® v1.0 doctrine. Any regulatory decision must undergo **human review**. Always verify against Regulation (EU) 2024/1689, its implementing acts, and the applicable timeline in force.
