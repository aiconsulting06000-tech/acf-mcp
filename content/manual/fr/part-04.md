---
title: "ACF — Manuel Toolkit 2026 — 4/9"
doc_type: manual
lang: fr
part: 4
parts: 9
page_range: "46-60"
source_pdf: "ACF_Manuel_Toolkit_2026.pdf"
source_pages: 129
extracted_at: 2026-06-08T19:17:56.259Z
extraction: "pdf-text-layer (pdfjs-dist) — faithful extract, not re-authored"
---

OBJECTIF
Mettre l'agent sous contrôle continu : mesurer sa performance, repérer les dérives, vérifier sa
conformité et tracer chaque décision. La supervision transforme un agent déployé (ACF-04) en
agent gouverné dans la durée.
1 KPIS DE SUPERVISION
INDICATEUR CIBLE VALEUR ACTUELLE TENDANCE STATUT
Taux de résolution autonome
CSAT (satisfaction client)
Délai de 1re réponse
Taux d'erreur
Taux d'escalade
2 ALERTES & INCIDENTS
DATE TYPE DESCRIPTION GRAVITÉ ÉTAT
LÉGENDE STATUT
Conforme / OK À surveiller
Critique / action Non applicable
BONNES PRATIQUES
ACF-05
SUPERVISION &
GOUVERNANCE
Surveiller, mesurer et garder l'agent conforme
NIVEAU Pilotage
DURÉE 30-60 min
USAGE Supervision continue
PARCOURS Étape 6 / 6
Mettre à jour le tableau de bord chaque semaine.✓
Documenter chaque incident et chaque décision.✓
Réévaluer KPIs et seuils périodiquement.✓
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

3 MATRICE DE CONFORMITÉ
PRINCIPE CLÉ (AI ACT) ÉTAT COMMENTAIRE
Sécurité & protection
Transparence & traçabilité
Équité & non-discrimination
Responsabilité & redevabilité
Conformité légale (RGPD / AI Act)
Respect de la vie privée
Fiabilité & robustesse
4 JOURNAL DES DÉCISIONS & ESCALADES
DATE DÉCISION / ESCALADE RAISON ISSUE RESPONSABLE
ACF-05
SUPERVISION &
GOUVERNANCE
Surveiller, mesurer et garder l'agent conforme
NIVEAU Pilotage
DURÉE 30-60 min
USAGE Supervision continue
PARCOURS Étape 6 / 6
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

5 PLAN D'ACTION & AMÉLIORATION CONTINUE
ACTION OBJECTIF RESPONSABLE ÉCHÉANCE STATUT
6 REVUE PÉRIODIQUE & VALIDATION
FRÉQUENCE DE REVUE
PARTICIPANTS
RÉSULTATS DE LA REVUE
Objectifs atteints
Progrès satisfaisants
Ajustements nécessaires (seuils, FAQ)
Problèmes majeurs identifiés
RESPONSABLE SUPERVISION RESPONSABLE GOUVERNANCE (DDAO)
À garder sous la main : l'arrêt d'urgence ACF-06 — Kill Switch (définir le seuil de déclenchement) et l'ACF-11 —
Évaluation des Risques Agentiques pour les risques émergents.
ACF-05
SUPERVISION &
GOUVERNANCE
Surveiller, mesurer et garder l'agent conforme
NIVEAU Pilotage
DURÉE 30-60 min
USAGE Supervision continue
PARCOURS Étape 6 / 6
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

EXEMPLE FIL ROUGE Lendari arme un Kill Switch pour « Margaux » (SAV niveau 1) dès la mise en production.
Responsable : Camille Roussel (DDAO). PAGE 1/4
OBJECTIF Pouvoir arrêter immédiatement un agent ou un système agentique en cas de dérive, d'incident,
de perte de contrôle ou de risque critique.
1 AGENT CONCERNÉ
NOM DE L'AGENT
Margaux
ID / RÉFÉRENCE
LEN-SAV-01
MISSION PRINCIPALE
SAV & retours niveau 1 — e-commerce mode
SYSTÈME / SERVICE ASSOCIÉ
Plateforme SAV Lendari (instance UE)
PROPRIÉTAIRE (RESPONSABLE HUMAIN)
Camille Roussel — DDAO
DATE DE CRÉATION
26/05/2026
2 NIVEAU DE RISQUE DE L'AGENT
Évaluation du risque global en cas de dérive.
Critique — impact majeur sur finances, clients,
données ou conformité.
Élevé — impact significatif sur opérations ou
réputation.
Modéré — impact limité et réversible. (plafond
remboursement 100 €)
Faible — impact minimal.
3 CONDITIONS D'ACTIVATION
Le Kill Switch doit être activé si l'une des conditions suivantes est remplie :
Dérive comportementale détectée Dépassement de limites définies
Décision non conforme aux règles Impact financier anormal
Plainte client / réclamation critique Violation de données ou d'accès
Perte de contrôle / bug critique Instruction humaine explicite
Autre : taux d'erreur > 2 % sur 24 h
ACF-06
KILL SWITCH
Protocole d'arrêt d'urgence
NIVEAU Sécurité
DURÉE 20-40 min
USAGE Arrêt d'urgence
✓
✓ ✓
✓
✓
✓
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

EXEMPLE FIL ROUGE Lendari — procédure d'arrêt en 5 temps, actions automatiques et chaîne de notification de
Margaux. PAGE 2/4
4 PROCÉDURE D'ARRÊT D'URGENCE
ÉTAPE ACTION RESPONSABLE DÉLAI / DÉTAIL
1. Détecter Identifier le signal d'alerte ou
l'incident Superviseur SAV Dashboard supervision
(taux d'erreur, alertes)
2. Valider Confirmer que la condition
d'activation est remplie Léa Fontaine (métier) Délai max : 15 min
3. Activer Déclencher le Kill Switch — action
critique Camille Roussel (DDAO) Délai max : 5 min
4. Isoler Isoler l'agent et couper ses accès IT / Ops (astreinte) Couper l'API SAV, révoquer
les tokens
5. Contrôler Contrôler l'arrêt et surveiller les
effets Camille Roussel (DDAO) Bascule vers SAV humain
vérifiée
5 ACTIONS AUTOMATIQUES À L'ACTIVATION
Suspendre toutes les tâches en cours Révoquer les accès et tokens
Bloquer les intégrations / API Mettre en lecture seule les données critiques
Notifier les responsables humains Basculer en mode dégradé (SAV humain)
6 NOTIFICATIONS
RÔLE / PERSONNE MOYEN (EMAIL / SMS / SLACK / AUTRE)
Camille Roussel (DDAO) SMS + Email
Étienne Mercier (DG) Email
Karim Belkacem (DPO) Email (si données concernées)
Superviseur SAV Slack (canal #sav-incident)
ACF-06
KILL SWITCH
Protocole d'arrêt d'urgence
NIVEAU Sécurité
DURÉE 20-40 min
USAGE Arrêt d'urgence
✓ ✓
✓
✓ ✓
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

EXEMPLE FIL ROUGE Lendari — revue post-incident, traçabilité des activations et accès restreint au Kill Switch de
Margaux. PAGE 3/4
7 REVUE POST-INCIDENT
À réaliser après chaque activation du Kill Switch.
Analyse des causes racines Évaluation de l'impact réel
Actions correctives à mettre en place Mise à jour des règles / limites
Apprentissage et documentation
RESPONSABLE DE LA REVUE
Camille Roussel — DDAO
DÉLAI DE REVUE
48 h après activation
8 HISTORIQUE DES ACTIVATIONS
DATE /
HEURE AGENT RAISON ACTIVÉ PAR DURÉE IMPACT REVUE
14:20 Margaux Test programmé (simulation) C. Roussel 4 min Aucun (test) Oui
9 ACCÈS AU KILL SWITCH
Qui peut activer le Kill Switch ? (au moins 2 personnes recommandées)
NOM / RÔLE CONTACT
Camille Roussel — DDAO camille.roussel@lendari.fr
Superviseur SAV — métier astreinte-sav@lendari.fr
Astreinte IT — Ops +33 6 00 00 00 00 (24/7)
Méthode : interface dédiée Méthode : commande système
ACF-06
KILL SWITCH
Protocole d'arrêt d'urgence
NIVEAU Sécurité
DURÉE 20-40 min
USAGE Arrêt d'urgence
✓ ✓
✓ ✓
✓
✓ ✓
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

EXEMPLE FIL ROUGE Lendari — tests périodiques du Kill Switch et validation formelle du protocole pour Margaux. PAGE 4/4
10 TEST RÉGULIER
Un Kill Switch jamais testé est un Kill Switch incertain. Planifier un test périodique en conditions réelles.
FRÉQUENCE
Trimestrielle
DERNIER TEST RÉALISÉ LE / PAR
02/06/2026 — C. Roussel
RÉSULTAT DU TEST
OK (fonctionnel)
PROCHAIN TEST PRÉVU LE
02/09/2026
Un agent puissant sans Kill Switch est un risque, pas un atout.
Prévoir l'arrêt, c'est protéger la valeur et la confiance. — Voir ACF-05 Supervision et ACF-11 Évaluation des
Risques Agentiques.
✓ VALIDATION DU PROTOCOLE
Responsable agent — Camille Roussel (DDAO) · validé le 03/06/2026 Direction générale — Étienne Mercier · approuvé le 03/06/2026
ACF-06
KILL SWITCH
Protocole d'arrêt d'urgence
NIVEAU Sécurité
DURÉE 20-40 min
USAGE Arrêt d'urgence
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

OBJECTIF Pouvoir arrêter immédiatement un agent ou un système agentique en cas de dérive, d'incident,
de perte de contrôle ou de risque critique.
1 AGENT CONCERNÉ
NOM DE L'AGENT ID / RÉFÉRENCE
MISSION PRINCIPALE SYSTÈME / SERVICE ASSOCIÉ
PROPRIÉTAIRE (RESPONSABLE HUMAIN) DATE DE CRÉATION
2 NIVEAU DE RISQUE DE L'AGENT
Évaluation du risque global en cas de dérive (cocher une option).
Critique — impact majeur sur finances, clients,
données ou conformité.
Élevé — impact significatif sur opérations ou
réputation.
Modéré — impact limité et réversible. Faible — impact minimal.
3 CONDITIONS D'ACTIVATION
Le Kill Switch doit être activé si l'une des conditions suivantes est remplie :
Dérive comportementale détectée Dépassement de limites définies
Décision non conforme aux règles Impact financier anormal
Plainte client / réclamation critique Violation de données ou d'accès
Perte de contrôle / bug critique Instruction humaine explicite
Autre (préciser) :
ACF-06
KILL SWITCH
Protocole d'arrêt d'urgence
NIVEAU Sécurité
DURÉE 20-40 min
USAGE Arrêt d'urgence
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

4 PROCÉDURE D'ARRÊT D'URGENCE
ÉTAPE ACTION RESPONSABLE DÉLAI / DÉTAIL
1. Détecter Identifier le signal d'alerte ou
l'incident
2. Valider Confirmer que la condition
d'activation est remplie
3. Activer Déclencher le Kill Switch — action
critique
4. Isoler Isoler l'agent et couper ses accès
5. Contrôler Contrôler l'arrêt et surveiller les
effets
5 ACTIONS AUTOMATIQUES À L'ACTIVATION
Suspendre toutes les tâches en cours Révoquer les accès et tokens
Bloquer les intégrations / API Mettre en lecture seule les données critiques
Notifier les responsables humains Basculer en mode dégradé
6 NOTIFICATIONS
Qui prévenir, et par quel moyen ? (p. ex. responsable agent / DDAO, direction, DPO si données, métier)
RÔLE / PERSONNE MOYEN (EMAIL / SMS / SLACK / AUTRE)
ACF-06
KILL SWITCH
Protocole d'arrêt d'urgence
NIVEAU Sécurité
DURÉE 20-40 min
USAGE Arrêt d'urgence
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

7 REVUE POST-INCIDENT
À réaliser après chaque activation du Kill Switch.
Analyse des causes racines Évaluation de l'impact réel
Actions correctives à mettre en place Mise à jour des règles / limites
Apprentissage et documentation
RESPONSABLE DE LA REVUE DÉLAI DE REVUE
8 HISTORIQUE DES ACTIVATIONS
DATE /
HEURE AGENT RAISON ACTIVÉ PAR DURÉE IMPACT REVUE
9 ACCÈS AU KILL SWITCH
Qui peut activer le Kill Switch ? (au moins 2 personnes recommandées)
NOM / RÔLE CONTACT
Méthode : interface dédiée Méthode : commande système
ACF-06
KILL SWITCH
Protocole d'arrêt d'urgence
NIVEAU Sécurité
DURÉE 20-40 min
USAGE Arrêt d'urgence
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

10 TEST RÉGULIER
Un Kill Switch jamais testé est un Kill Switch incertain. Planifier un test périodique en conditions réelles.
FRÉQUENCE (MENSUELLE / TRIMESTRIELLE / SEMESTRIELLE /
ANNUELLE)
DERNIER TEST RÉALISÉ LE / PAR
RÉSULTAT DU TEST PROCHAIN TEST PRÉVU LE
Un agent puissant sans Kill Switch est un risque, pas un atout.
Prévoir l'arrêt, c'est protéger la valeur et la confiance. — Voir ACF-05 Supervision et ACF-11 Évaluation des
Risques Agentiques.
✓ VALIDATION DU PROTOCOLE
RESPONSABLE AGENT (DDAO) — NOM / DATE / SIGNATURE DIRECTION GÉNÉRALE — NOM / DATE / SIGNATURE
ACF-06
KILL SWITCH
Protocole d'arrêt d'urgence
NIVEAU Sécurité
DURÉE 20-40 min
USAGE Arrêt d'urgence
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

EXEMPLE FIL ROUGE Lendari documente le dossier de son premier agent, « Margaux » (SAV niveau 1), avant
déploiement. Porteur : Camille Roussel (DDAO). PAGE 1/6
OBJECTIF Rassembler en un seul document tout ce qui cadre un agent avant son lancement : identité,
finalité, périmètre, données, risques, validation. Un agent bien cadré est un agent gouvernable.
1 IDENTITÉ DU PROJET AGENTIQUE
NOM DE L'AGENT
Margaux
PROJET ASSOCIÉ / SERVICE
SAV & retours — e-commerce mode
PORTEUR DU PROJET
Camille Roussel — DDAO
ÉQUIPE IMPLIQUÉE
L. Fontaine (SAV), IT/Ops, K. Belkacem (DPO)
DATE DE CRÉATION DU DOSSIER
26/05/2026
VERSION DU DOSSIER
v1.0
2 FINALITÉ & OBJECTIFS DE L'AGENT
FINALITÉ PRINCIPALE
Quel est le but fondamental de cet agent ?
Automatiser le SAV de niveau 1 pour répondre vite
aux demandes simples (suivi, retours,
remboursements < 100 €) et libérer les conseillers
pour les cas complexes.
OBJECTIFS OPÉRATIONNELS
Que doit accomplir l'agent concrètement ?
EXEMPLES D'AGENTS POINTS DE VIGILANCE
ACF-07
DOSSIER PREMIER
AGENT
Documenter, cadrer et préparer le déploiement de
votre premier agent
NIVEAU Projet
DURÉE 60-90 min
USAGE Cadrage / déploiement
Résoudre ≥ 70 % des demandes niveau 1 sans humain1.
Délai de 1re réponse < 2 min2.
Traiter remboursements / avoirs < 100 € (supervisé)3.
Maintenir un CSAT ≥ 4,2 / 54.
Escalader proprement tout cas hors périmètre5.
Agent support client intelligent→
Agent d'analyse commerciale→
Agent de génération de rapports→
Agent de veille concurrentielle→
Objectifs trop larges ou flous!
Périmètre non maîtrisé!
Données sensibles non identifiées!
Manque d'adhésion des parties prenantes!
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

EXEMPLE FIL ROUGE Lendari — qui utilise Margaux et jusqu'où elle agit : utilisateurs, parties prenantes et périmètre. PAGE 2/6
3 UTILISATEURS & PARTIES PRENANTES
UTILISATEURS FINAUX
Qui interagira avec l'agent ?
PARTIES PRENANTES CLÉS
Qui doit être impliqué ou informé ?
4 PÉRIMÈTRE & FONCTIONNALITÉS
FONCTIONNALITÉS INCLUSES
Ce que l'agent fera.
FONCTIONNALITÉS EXCLUES
Ce que l'agent ne fera pas.
LIMITES DU PÉRIMÈTRE
Plafond de remboursement 100 € / décision · aucun accès aux données de paiement · périmètre UE uniquement ·
escalade obligatoire au doute.
BONNES PRATIQUES POINTS DE VIGILANCE
ACF-07
DOSSIER PREMIER
AGENT
Documenter, cadrer et préparer le déploiement de
votre premier agent
NIVEAU Projet
DURÉE 60-90 min
USAGE Cadrage / déploiement
Clients Lendari (site web + application)
Conseillers SAV (supervision & reprise)
Camille Roussel — DDAO (porteur)
Étienne Mercier — DG (sponsor)
Karim Belkacem — DPO (conformité)
Léa Fontaine — responsable SAV (métier)
Suivi de commande & livraison
Gestion des retours & étiquettes
Remboursement / avoir < 100 €
Réponses FAQ produit & politique
Litiges & remboursements > 100 €
Détection de fraude, réclamations juridiques
Gestes commerciaux exceptionnels
Modification d'une commande déjà payée
Démarrer petit, sur un périmètre minimal viable.✓
Documenter chaque décision et chaque limite.✓
Tester tôt et souvent, avec les utilisateurs.✓
Périmètre trop large au départ.!
Frontière floue entre inclus et exclus.!
Cas limites non tranchés à l'avance.!
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

EXEMPLE FIL ROUGE Lendari — les ressources de Margaux : données mobilisées, sources d'accès et architecture
envisagée. PAGE 3/6
5 DONNÉES & RESSOURCES
DONNÉES NÉCESSAIRES SOURCES & ACCÈS
CONTRAINTES DE DONNÉES
RGPD — clients UE, instance UE · minimisation · aucune donnée de paiement · journalisation des accès &
décisions.
6 ARCHITECTURE & OUTILS ENVISAGÉS
COMPOSANTS PRINCIPAUX OUTILS & TECHNOLOGIES
INTÉGRATIONS & INTERFACES
ERP (commandes) · CRM (clients) · API transporteur (tracking) · Slack #sav-incident · tableau de bord supervision.
LIVRABLES ATTENDUS BONNES PRATIQUES
ACF-07
DOSSIER PREMIER
AGENT
Documenter, cadrer et préparer le déploiement de
votre premier agent
NIVEAU Projet
DURÉE 60-90 min
USAGE Cadrage / déploiement
Historique des commandes
Statut de livraison (transporteur)
Catalogue produit & politique retours
ERP commandes (API lecture)
API transporteur (tracking)
CRM client (lecture) · base FAQ
LLM gouverné + moteur de règles (plafonds)
Connecteurs ERP / CRM / transporteur
Module d'escalade vers SAV humain
Plateforme SAV Lendari (instance UE)
Modèle souverain hébergé UE
APIs internes + kill switch (ACF-06)
Spécification fonctionnelle de l'agent→
Documentation technique→
Plan de tests & de déploiement→
Plan de supervision + guide utilisateur→
Préférer un modèle & un hébergement souverains.✓
Donner à l'agent le minimum de données utile.✓
Prévoir le kill switch dès l'architecture.✓
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

EXEMPLE FIL ROUGE Lendari — plan de déploiement par étapes et cartographie des risques de Margaux. PAGE 4/6
7 PLAN DE DÉPLOIEMENT
ÉTAPE DESCRIPTION RESPONSABLE STATUT
Préparation Cadrage & dossier premier agent C. Roussel Terminé
Développement Connecteurs, règles, garde-fous IT / Ops Terminé
Tests &
validation Scénarios + tests utilisateurs (UAT) L. Fontaine En cours
Déploiement
pilote 10 % du trafic SAV niveau 1 C. Roussel À faire
Déploiement
complet 100 % du niveau 1 (si KPIs OK) C. Roussel À faire
Suivi &
optimisation Revue hebdo des KPIs L. Fontaine À faire
8 RISQUES & ATTÉNUATIONS
RISQUE IDENTIFIÉ IMPACT PROBA PLAN D'ATTÉNUATION RESPONSABLE
Hallucination dans
une réponse Élevé 3 Réponses sourcées + escalade au doute C. Roussel
Remboursement
erroné Critique 2 Plafond 100 € + kill switch C. Roussel
Fuite de données
client Critique 2 Instance UE + minimisation + RLS K. Belkacem
Dérive
comportementale Élevé 2 Supervision quotidienne S1 + alertes C. Roussel
Impact : Faible / Modéré / Élevé / Critique · Probabilité : 1 (faible) à 5 (élevée)
ACF-07
DOSSIER PREMIER
AGENT
Documenter, cadrer et préparer le déploiement de
votre premier agent
NIVEAU Projet
DURÉE 60-90 min
USAGE Cadrage / déploiement
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com
