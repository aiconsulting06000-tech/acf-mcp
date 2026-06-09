---
regulation: ai-act
title: "Guide ACF® — AI Act (Règlement (UE) 2024/1689)"
title_en: "ACF® Guide — AI Act (Regulation (EU) 2024/1689)"
version: "1.0"
last_update: "2026-06-08"
applicable_dates:
  - obligation: "Obligations applicables aux systèmes d'IA à haut risque (Annexe III) — report Digital Omnibus"
    date: "2027-12-02"
  - obligation: "Obligations relatives aux modèles d'IA à usage général (GPAI)"
    date: "2025-08-02"
---

# Guide ACF® — AI Act (Règlement (UE) 2024/1689)

> **Statut.** Guide préliminaire de correspondance (mapping) ACF® ↔ AI Act. Ce n'est **pas un conseil juridique**. Les obligations ci-dessous exigent une **revue humaine** (`requires_human_review`) et une vérification au texte officiel du Règlement (UE) 2024/1689. Le champ « texte » des articles est un résumé fidèle de la disposition, pas son libellé légal verbatim. Ne pas utiliser pour une décision réglementaire autonome.

## 1. Portée et applicabilité

L'AI Act structure les systèmes d'IA par niveau de risque (inacceptable, haut risque, risque limité, risque minimal) et impose aux systèmes **à haut risque** un socle d'obligations (art. 8 à 15) portant sur la gestion des risques, la gouvernance des données, la documentation, la journalisation, la transparence, le contrôle humain et la robustesse.

Pour un déploiement **agentique** — un agent qui décide et/ou exécute dans un environnement commercial — la question opérationnelle est : *l'agent relève-t-il d'un cas d'usage à haut risque (Annexe III) ?* Si oui, le socle art. 9-15 s'applique au fournisseur, et des devoirs de déploiement pèsent sur le déployeur.

> **Calendrier.** Le report « Digital Omnibus » décale l'application des obligations Annexe III au **2027-12-02**. Les obligations GPAI s'appliquent depuis le **2025-08-02**. Vérifier le calendrier consolidé via l'outil `acf.map-ai-act-obligations`.

## 2. Le prisme de gouvernance ACF®

L'ACF® ne reformule pas l'AI Act : il fournit l'**appareil opérationnel** qui rend ses exigences exécutables sur des agents autonomes. Quatre principes structurent la lecture :

- **P1 — Souveraineté décisionnelle.** La responsabilité ne se délègue jamais à l'agent. L'AI Act ne crée aucune personnalité juridique de l'agent ; l'organisation reste responsable.
- **P2 — Traçabilité doctrinale.** Toute décision agentique est reconstituable. C'est le socle des art. 10, 12 (logs) et de la documentation.
- **P3 — Contrôle humain ultime.** Le kill switch et l'escalade restent actifs — expression directe de l'art. 14.
- **P4 — Proportionnalité de la gouvernance.** L'intensité du contrôle suit la criticité — écho du système de gestion des risques de l'art. 9.

Dimensions de maturité principalement sollicitées : **D3** (conception & contrôle technique), **D4** (responsabilités & rôles), **D5** (conformité réglementaire), **D6** (audit & amélioration continue).

## 3. Correspondance ACF® ↔ AI Act (articles clés)

| Article | Objet | Principes | Dimensions | Fiches ACF® | Traduction opérationnelle |
| --- | --- | --- | --- | --- | --- |
| **Art. 9** | Système de gestion des risques | P2, P4 | D5, D6 | ACF-02, ACF-11 | Matrice de criticité (ACF-02) + évaluation du risque (ACF-11), bornées par la proportionnalité (P4). |
| **Art. 10** | Données et gouvernance des données | P2 | D5 | ACF-05, ACF-13 | Registre des décisions (ACF-05) + politique de rétention (ACF-13). |
| **Art. 12** | Enregistrement (journalisation) | P2 | D5, D6 | ACF-05, ACF-10 | Registre horodaté (ACF-05) + piste d'audit reconstituable (ACF-10) — expression directe de P2. |
| **Art. 13** | Transparence & information des déployeurs | P3 | D3, D4 | ACF-04, ACF-12 | Fiche agent documentée (ACF-04) + mandat écrit (ACF-12) précisant périmètre et limites. |
| **Art. 14** | Contrôle humain | P3 | D3, D4 | ACF-07, ACF-09, ACF-14 | Kill switch (ACF-07) + seuils d'escalade (ACF-09) + drills de reprise humaine (ACF-14). |

> Le détail article par article (texte résumé + mapping) est disponible via l'outil `acf.regulation.article` (`regulation: "ai-act"`, `article: "9" | "10" | "12" | "13" | "14"`).

## 4. Obligations sur le cycle de vie agentique

### Avant la mise en service (pre-go-live)
- Qualifier le cas d'usage : haut risque (Annexe III) ou non. Outils : `acf.classify-agent`, puis `acf.map-ai-act-obligations` si haut risque.
- Établir le système de gestion des risques (art. 9) — ACF-02 + ACF-11.
- Documenter le mandat de l'agent et sa notice d'utilisation (art. 13) — ACF-12 + ACF-04. Vérifiable via `acf.evaluate-agent-mandate`.
- Concevoir le contrôle humain et le kill switch (art. 14) — ACF-07. Dimensionner via `acf.assess-autonomy`.

### En continu (continuous)
- Tenir la journalisation et le registre des décisions (art. 12) — ACF-05 + ACF-10.
- Réévaluer le risque à chaque changement matériel du système (art. 9, itératif).
- Surveiller les écarts de gouvernance — `acf.identify-governance-gaps`.

### Sur incident (on-incident)
- Activer l'escalade et, si nécessaire, le kill switch (art. 14) — ACF-09, ACF-07.
- Reconstituer la décision à partir de la piste d'audit (art. 12) — ACF-10.
- Documenter et alimenter la boucle d'amélioration — ACF-16.

## 5. Outils MCP associés

- `acf.regulation.article` — texte résumé + mapping ACF® d'un article AI Act.
- `acf.map-ai-act-obligations` — liste exhaustive des obligations haut risque par phase de cycle de vie, avec échéances (y compris reports Digital Omnibus).
- `acf.classify-agent` — qualification préliminaire (niveau d'autonomie, classe de risque, régulations, contrôles, sign-off).
- `acf.assess-autonomy`, `acf.assign-ddao-controls`, `acf.evaluate-agent-mandate` — conception du contrôle humain et des mandats.

## 6. Limites et avertissement

Ce guide est une **qualification préliminaire** produite dans le cadre doctrinal ACF®. Il **ne constitue pas un conseil juridique** et ne remplace pas l'analyse d'un juriste qualifié ni la lecture du texte officiel. Les correspondances fiches/principes/dimensions reflètent la doctrine ACF® v1.0. Toute décision réglementaire doit faire l'objet d'une **revue humaine**. Vérifier systématiquement le Règlement (UE) 2024/1689 et ses actes d'exécution, ainsi que le calendrier d'application en vigueur.
