---
regulation: nis2
title: "Guide ACF® — NIS2 (Directive (UE) 2022/2555)"
title_en: "ACF® Guide — NIS2 (Directive (EU) 2022/2555)"
version: "1.0"
last_update: "2026-06-08"
applicable_dates:
  - obligation: "Échéance de transposition nationale de la directive"
    date: "2024-10-17"
---

# Guide ACF® — NIS2 (Directive (UE) 2022/2555)

> **Statut.** Guide préliminaire de correspondance (mapping) ACF® ↔ NIS2. Ce n'est **pas un conseil juridique**. NIS2 est une **directive** : les obligations applicables sont celles de **la loi nationale de transposition**, qui peut différer d'un État membre à l'autre. Les correspondances exigent une **revue humaine** (`requires_human_review`). Le champ « texte » des articles est un résumé fidèle de la disposition, pas son libellé légal verbatim. Ne pas utiliser pour une décision réglementaire autonome.

## 1. Portée et applicabilité

NIS2 renforce le niveau de cybersécurité des **entités essentielles et importantes** (énergie, transport, santé, infrastructures numériques, etc.). Trois axes sont structurants pour l'agentique : la **responsabilité des dirigeants** (art. 20), les **mesures de gestion des risques** « tous risques » (art. 21) et les **obligations de notification d'incidents** (art. 23). Lorsqu'un agent autonome opère un réseau ou système d'information entrant dans le périmètre d'une entité concernée, sa gouvernance relève de ces mesures.

## 2. Le prisme de gouvernance ACF®

- **P1 — Souveraineté décisionnelle.** Aligne avec l'art. 20 : responsabilité explicite des organes de direction. ACF® trace l'approbation et la supervision côté agents via le mandat (ACF-12).
- **P2 — Traçabilité doctrinale.** La piste d'audit reconstituable fournit la matière factuelle des notifications d'incident dans les délais (art. 23).
- **P4 — Proportionnalité de la gouvernance.** Fait écho au critère « approprié et proportionné » de l'art. 21 ; ACF-02/ACF-11 dimensionnent les mesures selon la criticité de l'agent.

Dimensions principalement sollicitées : **D1** (stratégie & gouvernance), **D3** (conception & contrôle technique), **D5** (conformité réglementaire), **D6** (audit & amélioration continue).

## 3. Correspondance ACF® ↔ NIS2 (articles clés)

| Article | Objet | Principes | Dimensions | Fiches ACF® | Traduction opérationnelle |
| --- | --- | --- | --- | --- | --- |
| **Art. 20** | Gouvernance — responsabilité des dirigeants | P1 | D1, D4 | ACF-00, ACF-12 | Responsabilité explicite des dirigeants ; ACF-12 trace approbation et supervision côté agents. |
| **Art. 21** | Mesures de gestion des risques (tous risques) | P4 | D3, D5 | ACF-02, ACF-11 | P4 (proportionnalité) ↔ « approprié et proportionné » ; ACF-02/ACF-11 dimensionnent les mesures. |
| **Art. 23** | Obligations de notification d'incidents | P2 | D6 | ACF-05, ACF-10 | Piste d'audit (P2, ACF-05/ACF-10) ↦ matière factuelle des notifications dans les délais. |

> Le détail article par article est disponible via `acf.regulation.article` (`regulation: "nis2"`, `article: "20" | "21" | "23"`).

## 4. Obligations sur le cycle de vie agentique

### Avant la mise en service (pre-go-live)
- Faire approuver les mesures de gestion des risques par l'organe de direction et former les dirigeants (art. 20) — ACF-00, ACF-12.
- Dimensionner les mesures techniques/organisationnelles selon la criticité de l'agent (art. 21) — ACF-02, ACF-11.

### En continu (continuous)
- Maintenir une piste d'audit exploitable pour la notification d'incident (art. 23) — ACF-10.
- Réviser les mesures à mesure de l'évolution des menaces (art. 21).
- Surveiller les écarts de gouvernance — `acf.identify-governance-gaps`.

### Sur incident (on-incident)
- Respecter la chaîne de notification (alerte précoce, notification, rapport final) selon les délais prévus par la loi nationale de transposition (art. 23).
- Reconstituer la chronologie agentique à partir du registre (ACF-05) et de la piste d'audit (ACF-10).

## 5. Outils MCP associés

- `acf.regulation.article` — texte résumé + mapping ACF® d'un article NIS2.
- `acf.identify-governance-gaps` — repère les mesures attendues mais absentes.
- `acf.assign-ddao-controls` — affecte les contrôles proportionnés à la criticité.

## 6. Limites et avertissement

Ce guide est une **qualification préliminaire** produite dans le cadre doctrinal ACF®. Il **ne constitue pas un conseil juridique** et ne remplace pas l'analyse d'un expert qualifié ni la lecture de **la loi nationale de transposition** applicable. Les correspondances reflètent la doctrine ACF® v1.0 et doivent faire l'objet d'une **revue humaine**. Vérifier systématiquement la Directive (UE) 2022/2555 telle que transposée dans votre juridiction.
