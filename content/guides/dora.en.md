---
regulation: dora
title: "ACF® Guide — DORA (Regulation (EU) 2022/2554)"
title_en: "ACF® Guide — DORA (Regulation (EU) 2022/2554)"
version: "1.0"
last_update: "2026-06-08"
applicable_dates:
  - obligation: "Regulation applicable to financial entities"
    date: "2025-01-17"
---

# ACF® Guide — DORA (Regulation (EU) 2022/2554)

> **Status.** Preliminary ACF® ↔ DORA mapping guide. This is **not legal advice**. The mappings require **human review** (`requires_human_review`) and verification against the official text of Regulation (EU) 2022/2554. Each article's "text" field is a faithful summary of the provision, not its verbatim legal wording. Do not use for autonomous regulatory decision-making.

## 1. Scope and applicability

DORA — the *Digital Operational Resilience Act* — applies to **financial entities** (banks, insurers, investment firms, etc.) and imposes a digital operational resilience framework: ICT risk governance, incident management, resilience testing, and ICT third-party risk management. When an **autonomous agent** sits in a financial decision chain, its ICT risk and governance fall within DORA's scope.

## 2. The ACF® governance lens

- **P1 — Decision Sovereignty.** Converges with Art. 5: ultimate responsibility stays with the management body. ACF® attaches every N2+ agent to a DDAO (Delegated Decision Agent Officer) and a mandate.
- **P2 — Doctrinal Traceability.** The decision register and audit trail supply the evidence for incident management (Art. 17).
- **P3 — Ultimate Human Control.** The kill switch and takeover drills are the agentic instantiation of response and recovery plans (Art. 11).
- **P4 — Proportional Governance.** Calibrates the intensity of the ICT framework to the agent's criticality (Art. 6).

Dimensions chiefly engaged: **D1** (strategy & governance), **D3** (design & technical control), **D5** (regulatory compliance), **D6** (audit & continuous improvement).

## 3. ACF® ↔ DORA mapping (key articles)

| Article | Subject | Principles | Dimensions | ACF® cards | Operational translation |
| --- | --- | --- | --- | --- | --- |
| **Art. 5** | Governance and organisation (ICT risk) | P1 | D1, D4 | ACF-00, ACF-12 | Management body's ultimate responsibility; every N2+ agent attached to a DDAO + mandate (ACF-12). |
| **Art. 6** | ICT risk management framework | P4 | D5, D6 | ACF-02, ACF-11 | ACF-02/ACF-11 provide the "agentic risk" component of the ICT framework. |
| **Art. 11** | Response and recovery | P3 | D3, D6 | ACF-07, ACF-14 | Kill switch (ACF-07) + human-takeover drills (ACF-14). |
| **Art. 17** | ICT-related incident management | P2 | D6 | ACF-05, ACF-10 | Decision register (ACF-05) + audit trail (ACF-10) to detect and notify the agentic incident. |
| **Art. 28** | ICT third-party risk | P1, P4 | D5 | ACF-15 | Where an agent relies on a third-party model/service, ACF-15 documents the dependency and residual accountability. |

> Article-by-article detail is available via `acf.regulation.article` (`regulation: "dora"`, `article: "5" | "6" | "11" | "17" | "28"`).

## 4. Lifecycle obligations for agentic deployments

### Pre-go-live
- Attach the agent to a DDAO and a mandate approved by the management body (Art. 5) — ACF-12.
- Integrate agentic risk into the ICT risk management framework (Art. 6) — ACF-02, ACF-11.
- Document third-party dependencies (models, APIs) and residual accountability (Art. 28) — ACF-15.

### Continuous
- Periodically test the kill switch and recovery plans (Art. 11) — ACF-07, ACF-14.
- Maintain the audit trail for incident detection (Art. 17) — ACF-10.
- Monitor governance gaps — `acf.identify-governance-gaps`.

### On-incident
- Trigger the ICT incident management process (Art. 17): detection, classification, notification within the set deadlines.
- Activate response/recovery (Art. 11) — kill switch + manual fallback.
- Reconstruct the agentic decision from the register (ACF-05) and audit trail (ACF-10).

## 5. Associated MCP tools

- `acf.regulation.article` — summary text + ACF® mapping for a DORA article.
- `acf.assign-ddao-controls` — assigns controls (kill switch, escalation, audit) to the agent by criticality.
- `acf.evaluate-agent-mandate` — checks mandate approval and perimeter (Art. 5).

## 6. Limits and disclaimer

This guide is a **preliminary qualification** produced within the ACF® doctrinal framework. It **does not constitute legal advice** or a financial-compliance opinion, and does not replace analysis by a qualified expert or reading of the official text and the associated regulatory technical standards (RTS/ITS). Mappings reflect ACF® v1.0 doctrine and must undergo **human review**. Always verify against Regulation (EU) 2022/2554.
