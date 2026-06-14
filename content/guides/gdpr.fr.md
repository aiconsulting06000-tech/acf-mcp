---
regulation: gdpr
title: "Guide ACF® — RGPD (Règlement (UE) 2016/679)"
title_en: "ACF® Guide — GDPR (Regulation (EU) 2016/679)"
version: "1.0"
last_update: "2026-06-08"
applicable_dates:
  - obligation: "Règlement en vigueur (applicable)"
    date: "2018-05-25"
---

# Guide ACF® — RGPD (Règlement (UE) 2016/679)

> **Statut.** Guide préliminaire de correspondance (mapping) ACF® ↔ RGPD. Ce n'est **pas un conseil juridique**. Les correspondances exigent une **revue humaine** (`requires_human_review`) et une vérification au texte officiel du Règlement (UE) 2016/679. Le champ « texte » des articles est un résumé fidèle de la disposition, pas son libellé légal verbatim. Ne pas utiliser pour une décision réglementaire autonome.

## 1. Portée et applicabilité

Le RGPD s'applique dès qu'un agent autonome traite des **données à caractère personnel** : qualification de leads, scoring, traitement de réclamations, profilage. Deux articles sont structurants pour l'agentique : l'**art. 22** (décision individuelle automatisée) et l'**art. 35** (analyse d'impact). Le socle des principes (art. 5), la protection dès la conception (art. 25) et le registre des traitements (art. 30) complètent le dispositif.

## 2. Le prisme de gouvernance ACF®

- **P1 — Souveraineté décisionnelle.** L'organisation reste responsable du traitement ; l'agent n'est jamais « responsable » au sens juridique.
- **P2 — Traçabilité doctrinale.** Le registre des décisions ACF® recoupe le registre des traitements (art. 30) et nourrit l'AIPD (art. 35).
- **P3 — Contrôle humain ultime.** L'art. 22 est un pilier direct : dès qu'une décision automatisée produit un effet juridique ou significatif, l'humain doit pouvoir intervenir.
- **P4 — Proportionnalité de la gouvernance.** L'intensité des garanties suit le risque pour les droits et libertés.

Dimensions principalement sollicitées : **D4** (responsabilités & rôles), **D5** (conformité réglementaire), **D6** (audit & amélioration continue).

## 3. Correspondance ACF® ↔ RGPD (articles clés)

| Article | Objet | Principes | Dimensions | Fiches ACF® | Traduction opérationnelle |
| --- | --- | --- | --- | --- | --- |
| **Art. 5** | Principes relatifs au traitement | P1, P2 | D5 | ACF-03, ACF-13 | Constitution interdisant les accès PII hors finalité (ACF-03) + limitation de conservation (ACF-13). |
| **Art. 22** | Décision individuelle automatisée | P1, P3 | D4, D5 | ACF-09, ACF-12 | Bornage de l'autonomie (mandat ACF-12) + remontée humaine obligatoire (ACF-09) dès effet significatif. |
| **Art. 25** | Protection des données dès la conception | P2 | D3, D5 | ACF-03, ACF-13 | Constitution agentique (ACF-03) + politique de rétention (ACF-13). |
| **Art. 30** | Registre des activités de traitement | P2 | D5, D6 | ACF-05, ACF-10 | Le registre des décisions (ACF-05) alimente et recoupe le registre art. 30. |
| **Art. 35** | Analyse d'impact (AIPD/DPIA) | P2 | D5 | ACF-11 | L'évaluation du risque (ACF-11) alimente le gabarit AIPD. |

> Le détail article par article est disponible via `acf.regulation.article` (`regulation: "gdpr"`, `article: "5" | "22" | "25" | "30" | "35"`).

## 4. Obligations sur le cycle de vie agentique

### Avant la mise en service (pre-go-live)
- Identifier si l'agent prend des décisions relevant de l'art. 22 ; si oui, prévoir l'intervention humaine (ACF-09) et le bornage du mandat (ACF-12).
- Réaliser une AIPD lorsque le traitement est susceptible d'engendrer un risque élevé (art. 35) — ACF-11.
- Intégrer la protection dès la conception (art. 25) dans la constitution agentique (ACF-03).

### En continu (continuous)
- Tenir à jour le registre des traitements (art. 30), recoupé avec le registre des décisions (ACF-05).
- Appliquer la limitation de conservation (art. 5, art. 25) — ACF-13.
- Surveiller les écarts — `acf.identify-governance-gaps`.

### Sur incident (on-incident)
- En cas de décision automatisée contestée, reconstituer la décision (ACF-10) et permettre le réexamen humain (art. 22).
- Documenter et, le cas échéant, notifier conformément aux obligations applicables (violation de données — hors périmètre de ce mapping).

## 5. Outils MCP associés

- `acf.regulation.article` — texte résumé + mapping ACF® d'un article RGPD.
- `acf.classify-agent` — repère si un agent relève d'un traitement à risque élevé.
- `acf.evaluate-agent-mandate` — vérifie que le mandat prévoit l'intervention humaine exigée par l'art. 22.

## 6. Limites et avertissement

Ce guide est une **qualification préliminaire** produite dans le cadre doctrinal ACF®. Il **ne constitue pas un conseil juridique** et ne remplace pas l'analyse d'un DPO ou d'un juriste qualifié, ni la lecture du texte officiel. Les correspondances reflètent la doctrine ACF® v1.0 et doivent faire l'objet d'une **revue humaine**. Vérifier systématiquement le Règlement (UE) 2016/679 et les lignes directrices applicables (CEPD/EDPB, autorités nationales).
