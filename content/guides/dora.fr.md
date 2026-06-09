---
regulation: dora
title: "Guide ACF® — DORA (Règlement (UE) 2022/2554)"
title_en: "ACF® Guide — DORA (Regulation (EU) 2022/2554)"
version: "1.0"
last_update: "2026-06-08"
applicable_dates:
  - obligation: "Règlement applicable aux entités financières"
    date: "2025-01-17"
---

# Guide ACF® — DORA (Règlement (UE) 2022/2554)

> **Statut.** Guide préliminaire de correspondance (mapping) ACF® ↔ DORA. Ce n'est **pas un conseil juridique**. Les correspondances exigent une **revue humaine** (`requires_human_review`) et une vérification au texte officiel du Règlement (UE) 2022/2554. Le champ « texte » des articles est un résumé fidèle de la disposition, pas son libellé légal verbatim. Ne pas utiliser pour une décision réglementaire autonome.

## 1. Portée et applicabilité

DORA — *Digital Operational Resilience Act* — s'applique aux **entités financières** (banques, assurances, prestataires de services d'investissement, etc.) et impose un cadre de résilience opérationnelle numérique : gouvernance du risque TIC, gestion des incidents, tests de résilience, gestion du risque lié aux prestataires tiers TIC. Lorsqu'un **agent autonome** intervient dans une chaîne de décision financière, ses risques TIC et sa gouvernance entrent dans le périmètre DORA.

## 2. Le prisme de gouvernance ACF®

- **P1 — Souveraineté décisionnelle.** Converge avec l'art. 5 : la responsabilité ultime reste à l'organe de direction. ACF® rattache chaque agent N2+ à un DDAO (Delegated Decision Agent Officer) et à un mandat.
- **P2 — Traçabilité doctrinale.** Le registre des décisions et la piste d'audit fournissent la matière de la gestion d'incident (art. 17).
- **P3 — Contrôle humain ultime.** Le kill switch et les drills de reprise sont la déclinaison agentique des plans de réponse et de rétablissement (art. 11).
- **P4 — Proportionnalité de la gouvernance.** Calibre l'intensité du cadre TIC selon la criticité de l'agent (art. 6).

Dimensions principalement sollicitées : **D1** (stratégie & gouvernance), **D3** (conception & contrôle technique), **D5** (conformité réglementaire), **D6** (audit & amélioration continue).

## 3. Correspondance ACF® ↔ DORA (articles clés)

| Article | Objet | Principes | Dimensions | Fiches ACF® | Traduction opérationnelle |
| --- | --- | --- | --- | --- | --- |
| **Art. 5** | Gouvernance et organisation (risque TIC) | P1 | D1, D4 | ACF-00, ACF-12 | Responsabilité ultime de l'organe de direction ; chaque agent N2+ rattaché à un DDAO + mandat (ACF-12). |
| **Art. 6** | Cadre de gestion du risque TIC | P4 | D5, D6 | ACF-02, ACF-11 | ACF-02/ACF-11 fournissent la composante « risque agentique » du cadre TIC. |
| **Art. 11** | Réponse et rétablissement | P3 | D3, D6 | ACF-07, ACF-14 | Kill switch (ACF-07) + drills de reprise humaine (ACF-14). |
| **Art. 17** | Gestion des incidents TIC | P2 | D6 | ACF-05, ACF-10 | Registre des décisions (ACF-05) + piste d'audit (ACF-10) pour détecter et notifier l'incident agentique. |
| **Art. 28** | Risque lié aux prestataires tiers TIC | P1, P4 | D5 | ACF-15 | Lorsqu'un agent s'appuie sur un modèle/service tiers, ACF-15 documente la dépendance et la responsabilité résiduelle. |

> Le détail article par article est disponible via `acf.regulation.article` (`regulation: "dora"`, `article: "5" | "6" | "11" | "17" | "28"`).

## 4. Obligations sur le cycle de vie agentique

### Avant la mise en service (pre-go-live)
- Rattacher l'agent à un DDAO et à un mandat approuvé par l'organe de direction (art. 5) — ACF-12.
- Intégrer le risque agentique au cadre de gestion du risque TIC (art. 6) — ACF-02, ACF-11.
- Documenter les dépendances tierces (modèles, API) et la responsabilité résiduelle (art. 28) — ACF-15.

### En continu (continuous)
- Tester périodiquement le kill switch et les plans de reprise (art. 11) — ACF-07, ACF-14.
- Maintenir la piste d'audit pour la détection d'incident (art. 17) — ACF-10.
- Surveiller les écarts de gouvernance — `acf.identify-governance-gaps`.

### Sur incident (on-incident)
- Déclencher le processus de gestion des incidents TIC (art. 17) : détection, classification, notification dans les délais prévus.
- Activer la réponse/rétablissement (art. 11) — kill switch + bascule manuelle.
- Reconstituer la décision agentique à partir du registre (ACF-05) et de la piste d'audit (ACF-10).

## 5. Outils MCP associés

- `acf.regulation.article` — texte résumé + mapping ACF® d'un article DORA.
- `acf.assign-ddao-controls` — affecte les contrôles (kill switch, escalade, audit) à l'agent selon sa criticité.
- `acf.evaluate-agent-mandate` — vérifie l'approbation et le périmètre du mandat (art. 5).

## 6. Limites et avertissement

Ce guide est une **qualification préliminaire** produite dans le cadre doctrinal ACF®. Il **ne constitue pas un conseil juridique** ni un avis de conformité financière, et ne remplace pas l'analyse d'un expert qualifié ni la lecture du texte officiel et des normes techniques de réglementation (RTS/ITS) associées. Les correspondances reflètent la doctrine ACF® v1.0 et doivent faire l'objet d'une **revue humaine**. Vérifier systématiquement le Règlement (UE) 2022/2554.
