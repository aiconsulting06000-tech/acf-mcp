---
title: "ACF — Manuel Toolkit 2026 — 9/9"
doc_type: manual
lang: fr
part: 9
parts: 9
page_range: "121-129"
source_pdf: "ACF_Manuel_Toolkit_2026.pdf"
source_pages: 129
extracted_at: 2026-06-08T19:17:56.261Z
extraction: "pdf-text-layer (pdfjs-dist) — faithful extract, not re-authored · book pre-announcements redacted (IP)"
---

OBJECTIF
Garantir que tout système agentique intègre, dès sa conception, les cinq piliers de la
responsabilité opérationnelle — pour passer d'un principe doctrinal à un dispositif
organisationnel auditable et opposable.
1 FILIATION DOCTRINALE
La responsibility-by-design (Frank Pasquale, New Laws of Robotics, Harvard, 2020) prolonge deux principes établis du
design responsable :
CONCEPT ORIGINE CADRE LÉGAL
Privacy by Design Ann Cavoukian (Canada, 1995) RGPD art. 25 (2018)
Security by Design NIST · OWASP (années 2000) ISO 27001 · NIS2
Responsibility by Design Frank Pasquale (Harvard, 2020) AI Act art. 9 & 14 · DORA art. 5-8
2 LES CINQ PILIERS OPÉRATIONNELS
IDENTIFICATION
Créateurs, contrôleurs
et propriétaires
publiquement
identifiables — chaîne
de responsabilité
opposable.
AUDIT LOGS
Traces append-only,
horodatées et signées
— impossibles à effacer
par l'opérateur.
RECOURS
L'utilisateur peut
toujours contester
auprès d'un humain
identifié — délai et
processus définis dès le
code.
ANTICIPATION
Cartographie ex-ante
des scénarios de dérive
— contrôles intégrés au
design, pas ajoutés
post-incident.
RÉVERSIBILITÉ
Capacité de désactiver,
corriger ou retirer le
système — coût
organisationnel et
temporel défini.
ACF-16
RESPONSABILITÉ PAR
DESIGN
Responsibility by Design — concevoir la
responsabilité dès l'origine
NIVEAU Avancé
DURÉE 45-60 min
FORMAT Audit · DDAO + équipe
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

3 ARTICULATION AVEC LE TOOLKIT ACF
La responsibility-by-design ne crée pas un dispositif isolé — elle articule les fiches existantes du toolkit dans un cadre
unifié et opposable :
PILIER FICHES ACF
MOBILISÉES
PRATIQUE OPÉRATIONNELLE
Identification ACF-03 · ACF-12 4 signatures responsables (métier, technique, compliance, DDAO — Delegated
Decision Agent Officer)
Audit Logs ACF-08 Registre des décisions agentiques — append-only, horodaté, signé
Recours ACF-05 · ACF-09 Procédure de revue + plan d'action correcteur documenté
Anticipation ACF-02 · ACF-11 Matrice de criticité + évaluation des risques agentiques
Réversibilité ACF-06 Kill Switch — procédure d'arrêt en 5 étapes avec SLA défini
4 LES 4 LOIS DE PASQUALE — RAPPEL DOCTRINAL
N E W L AW S O F RO B OT I C S — H A RVA R D, 2 0 2 0
1 L'IA doit COMPLÉTER les professionnels, pas les remplacer.
2 L'IA ne doit pas CONTREFAIRE L'HUMANITÉ — pas d'agent se faisant passer pour un humain.
3 L'IA ne doit pas INTENSIFIER LA COURSE AUX ARMEMENTS à somme nulle.
4 L'IA doit toujours INDIQUER L'IDENTITÉ de ses créateurs, responsables et propriétaires.
La 4ᵉ loi fonde directement le pilier Identification : sans transparence sur les responsables, aucune chaîne de
responsabilité n'est opposable. C'est le socle de toute la responsibility-by-design.
ACF-16
RESPONSABILITÉ PAR
DESIGN
Responsibility by Design — concevoir la
responsabilité dès l'origine
NIVEAU Avancé
DURÉE 45-60 min
FORMAT Audit · DDAO + équipe
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

5 CHECKLIST D'AUTO-ÉVALUATION
À remplir par le DDAO avec l'équipe responsable du système. Conforme RbD = tous les piliers validés. À défaut,
déclencher un plan d'action ACF-09.
QUESTION OUI PART. NON
PILIER 1 — IDENTIFICATION
Le système indique-t-il publiquement ses créateurs, contrôleurs et propriétaires ?
Les responsables sont-ils opposables juridiquement (4 signatures Constitution ACF-03) ?
PILIER 2 — AUDIT LOGS
Les décisions sont-elles tracées dans un registre append-only et signé (ACF-08) ?
L'opérateur du système peut-il modifier ou effacer ces traces ? (réponse attendue : NON)
PILIER 3 — RECOURS
L'utilisateur peut-il contester une décision auprès d'un humain identifié ?
Le délai et le processus de recours sont-ils définis dès la conception ?
PILIER 4 — ANTICIPATION
Les scénarios de dérive ont-ils été cartographiés ex-ante (ACF-02 + ACF-11) ?
Les contre-mesures sont-elles intégrées au design, pas ajoutées post-incident ?
PILIER 5 — RÉVERSIBILITÉ
Un Kill Switch (ACF-06) existe-t-il et est-il testé périodiquement ?
Le coût organisationnel et temporel du retour arrière est-il documenté ?
6 BONNES PRATIQUES & POINTS DE VIGILANCE
BONNES PRATIQUES POINTS DE VIGILANCE
ACF-16
RESPONSABILITÉ PAR
DESIGN
Responsibility by Design — concevoir la
responsabilité dès l'origine
NIVEAU Avancé
DURÉE 45-60 min
FORMAT Audit · DDAO + équipe
Faire signer la Constitution ACF-03 par 4
responsables nommés
✓
Audit hebdomadaire du Registre ACF-08 pendant
90 j post-déploiement
✓
Test trimestriel du Kill Switch ACF-06 avec rapport
au Conseil
✓
Voie de recours documentée et accessible dans le
produit
✓
Mise à jour de l'évaluation des risques ACF-11 à
chaque évolution majeure
✓
Cumul DDAO + responsable produit IA (conflit de
loyauté)
!
Logs auditables uniquement par l'opérateur (brise
le pilier 2)
!
Recours seulement dans les CGU, pas dans le
produit
!
Anticipation traitée comme formalité, pas comme
design
!
Kill Switch jamais testé — pratique fictive, non
opposable
!
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

7 RÔLE DU DDAO DANS LA RBD
Le DDAO incarne organisationnellement la responsibility-by-design. Il porte les 5 piliers comme exigences non
négociables et dispose d'un droit d'opposition motivé sur tout déploiement qui ne les respecte pas. Son
rattachement hiérarchique préserve son indépendance.
PILIER RBD ACTION CONCRÈTE DU DDAO
1 · Identification Vérifie que la Constitution ACF-03 et le Mandat ACF-12 sont signés avant tout
déploiement.
2 · Audit Logs Audite mensuellement le Registre ACF-08 — détecte les anomalies, suspend si
besoin.
3 · Recours Garantit la procédure de contestation utilisateur, traite personnellement les
escalades.
4 · Anticipation Valide la matrice de criticité ACF-02 et l'évaluation des risques ACF-11 ex-ante.
5 · Réversibilité Teste le Kill Switch ACF-06 trimestriellement, rapporte au Conseil ou Comité
d'audit.
8 VALIDATION & SIGNATURES
RÔLE NOM DATE SIGNATURE
Responsable métier
Responsable technique
Compliance Officer
DDAO
Fiches liées — ACF-02 Matrice de criticité · ACF-03 Constitution agentique · ACF-05 Supervision & gouvernance ·
ACF-06 Kill Switch · ACF-08 Registre des décisions agentiques · ACF-09 Plan d'action & amélioration · ACF-11
Évaluation des risques agentiques · ACF-12 Mandat d'agent.
« Les régulateurs vont devoir exiger une responsabilité dès la conception. Cela impliquera d'imposer certains audit
logs codés en dur, ou des pratiques de licence qui prennent explicitement en compte les résultats problématiques.
»
— Frank Pasquale, New Laws of Robotics, Harvard, 2020
ACF-16
RESPONSABILITÉ PAR
DESIGN
Responsibility by Design — concevoir la
responsabilité dès l'origine
NIVEAU Avancé
DURÉE 45-60 min
FORMAT Audit · DDAO + équipe
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

F O I R E A U X Q U E S T I O N S · 1 / 2
20 questions
sur ACF
Les interrogations les plus fréquentes sur le framework — son périmètre, sa différence avec la
réglementation, et la façon de s'en servir. Cadre & positionnement, puis « quand et pour qui ».
01 ACF remplace-t-il l'AI Act ?
Non. L'AI Act fixe des obligations légales ; ACF
est le cadre opérationnel qui aide à les mettre
en œuvre sur des agents. Il rend AI-Act-ready, il
ne s'y substitue pas.
02 ACF est-il une norme officielle ?
Non. C'est un référentiel privé, compatible avec
NIST AI RMF, ISO 42001 et ISO 23894 — qu'il
traduit en gestes concrets pour le commerce
agentique.
03 Peut-on utiliser ACF sans IA ?
Oui. ACF gouverne la délégation de décision,
qu'elle aille à un agent IA, à un script ou à un
humain. La grille criticité / autonomie
s'applique à toute décision déléguée.
04 ACF est-il réservé au e-commerce ?
Non. « Commerce » désigne tout échange de
valeur engageant l'organisation : décisions
financières, RH, juridiques, opérationnelles.
05 ACF est-il payant ?
Le framework et les 17 fiches sont libres pour
l'enseignement et l'usage non lucratif.
L'écosystème entreprise (plateforme,
accompagnement) est sous contrat.
06 À partir de combien d'agents gouverner ?
Dès le premier. Le risque ne vient pas du
nombre d'agents mais de la criticité des
décisions déléguées. Un seul agent sur une
décision irréversible suffit.
07 Faut-il être une grande entreprise ?
Non. ACF est dimensionnable : une TPE remplit
le strict nécessaire (ACF-00, 02, 12), une grande
organisation déploie le cycle complet.
08 Qui doit porter ACF en interne ?
Un responsable nommé, le DDAO, épaulé par
la direction. La souveraineté décisionnelle est
un sujet de gouvernance, pas seulement d'IT.
09 Combien de temps pour démarrer ?
Un diagnostic (ACF-00) et une première
cartographie (ACF-01/02) tiennent en une
demi-journée. Le premier agent gouverné
(ACF-07) en quelques semaines.
10 ACF ralentit-il l'innovation ?
Non : il sécurise le déploiement. Cadrer en
amont évite l'incident qui, lui, gèle
durablement les projets.
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

F O I R E A U X Q U E S T I O N S · 2 / 2
Concepts &
mise en œuvre
La seconde moitié des questions porte sur les notions clés du framework — souveraineté, criticité, niveaux
— et sur les garanties concrètes en cas de dérive.
11 Autonomie ou souveraineté ?
L'autonomie se délègue (l'agent agit) ; la
souveraineté ne se cède pas (l'humain garde le
dernier mot sur les décisions critiques).
12 Qu'est-ce que le score de criticité ?
Impact × Fréquence × Irréversibilité ÷ 10. En
dessous de 15 : agentifiable ; 15-25 : agent
gouverné ; au-delà de 25 : humain obligatoire.
13 Criticité (ACF-02) ou risque (ACF-11) ?
La criticité fixe le niveau d'autonomie permis ;
la matrice de risque (Probabilité × Gravité)
évalue un risque opérationnel. Deux échelles
distinctes.
14 Qu'est-ce qu'un DDAO ?
Delegated Decision Agent Officer : le
responsable humain qui répond des décisions
déléguées — il cadre, supervise et détient le kill
switch.
15 Combien de niveaux d'autonomie ?
Quatre, par décision : Suggestif, Co-décision,
Autonome supervisé, Autonome. Distincts des
4 niveaux de maturité (N0-N3), qui qualifient
l'agent globalement.
16 Que faire si un agent dérape ?
Le contrôle humain ultime impose une reprise
en main et un kill switch (ACF-06). La
réversibilité est exigée par conception (ACF-16).
17 Comment prouver qui a décidé ?
Par la responsabilité traçable : toute action
autonome est journalisée, auditable et
attribuable à un responsable (5 piliers, ACF-
16).
18 ACF impose-t-il une technologie ?
Non. ACF est neutre technologiquement : il
s'applique quels que soient le modèle, l'éditeur
ou l'architecture employés.
19 Le Decision Engine est-il requis ?
Non. Le framework et les fiches suffisent à
gouverner. Le ACF Decision Engine est une
brique entreprise optionnelle, non détaillée
publiquement.
20 Par où commencer concrètement ?
Par la fiche ACF-00 (Score de Souveraineté),
puis le parcours en 6 étapes. Le manuel et le
mode d'emploi guident pas à pas.
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

P O U R A L L E R P L U S L O I N · S O U R C E S
Ressources &
références
ACF n'invente pas une énième norme : il dialogue avec les cadres existants et les rend applicables sur le
terrain. Voici les textes, recherches et outils sur lesquels il s'appuie.
C A D R E S R É G L E M E N T A I R E S & N O R M A T I F S
AI Act — Règlement (UE) 2024/1689 · UE
Cadre légal européen de l'IA, par niveaux de risque.
ACF aide à l'opérationnaliser.
NIST AI Risk Management Framework 1.0 · USA
Cadre volontaire de gestion des risques IA : Govern,
Map, Measure, Manage.
ISO/IEC 42001:2023 · ISO
Système de management de l'IA (AIMS) —
gouvernance certifiable des systèmes d'IA.
ISO/IEC 23894:2023 · ISO
Lignes directrices sur le management du risque lié à
l'intelligence artificielle.
Principes de l'OCDE sur l'IA · OCDE
Référentiel international d'une IA digne de confiance
(2019, révisé 2024).
Convention-cadre du Conseil de l'Europe sur l'IA
· CoE 2024
Premier traité international contraignant sur l'IA, les
droits humains et l'État de droit.
D O C T R I N E & R E C H E R C H E
Frank Pasquale — New Laws of Robotics · 2020
Les 4 nouvelles lois de la robotique :
complémentarité, authenticité, non-armement,
attribution.
Travaux ISN & iDFRights — B. Benhamou · 2026
IA, souveraineté numérique et droits
fondamentaux en Europe.
A L L E R P L U S L O I N A V E C A C F
Le manuel & les 17 fiches ACF · ACF-00→16
Diagnostic, cartographie, mandats, supervision,
audit — prêts à imprimer.
acfstandard.com · en ligne
Le standard, ses mises à jour et l'écosystème
entreprise.
ACF se veut un pont entre ces cadres et le terrain. Là où l'AI Act, NIST ou ISO disent quoi exiger, ACF
outille le comment faire — fiche après fiche, décision après décision.
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

L ’ É C O S Y S T È M E · P O U R A L L E R P L U S L O I N
Les outils ACF
Le cadre est libre. Les outils vous aident à l’appliquer — du diagnostic gratuit à la plateforme d’entreprise.
Commencer gratuitement G R A T U I T
ACF Score
Mesurez votre Souveraineté Agentique® en
quelques minutes.
Gratuit · sans inscription
AI Act Compliance Checker
Situez-vous face au Règlement européen sur l’IA.
Gratuit
Diagnostic Flash
Un premier état des lieux de votre gouvernance.
Gratuit · résultat immédiat
Plan Personnalisé
Votre feuille de route ACF, générée pour vous.
Gratuit
Passer à l’échelle E N T R E P R I S E
ACF Auditor
Audit de gouvernance approfondi et conformité
documentée.
Sur devis
ACF Control
Supervision continue de vos agents en
production.
Sur devis
ACF Decision Engine
Le moteur de décision gouvernée au cœur de vos
agents.
Réservé aux organisations clientes
Déploiement sur mesure
Intégration, formation du DDAO,
accompagnement.
Sur devis
Le cadre et les 17 fiches restent libres. Scannez pour commencer — tout l’écosystème est sur
acfstandard.com.
Votre score de souveraineté
acf-score.com · gratuit
Tous les outils & l’offre
entreprise
acfstandard.com
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com

---

C O N C L U S I O N
Déléguer l'autonomie,
garder la souveraineté
Les agents décident déjà. La vraie question n'est plus de savoir s'il faut leur déléguer, mais jusqu'où —
et à quelles conditions. ACF apporte la réponse opérationnelle : un cadre pour confier l'autonomie sans
jamais abandonner la main.
« La question n'est plus de savoir s'il faut déployer des agents.
C'est comment les déployer sans abandonner sa souveraineté. »
Commencer — votre score
acf-score.com
Tous les outils ACF
acfstandard.com
ACF® · AGENTIC COMMERCE FRAMEWORK® GOUVERNER L'AUTONOMIE, PROTÉGER LA SOUVERAINETÉ. acfstandard.com
La délégation n'est pas tout ou rien
Elle se règle décision par décision,
selon la criticité — du simple conseil à
l'action autonome.
La gouvernance se conçoit en
amont
Mandats, seuils et garde-fous se
définissent avant le déploiement, pas
après l'incident.
Tout reste réversible
Supervision, reprise en main, kill switch
: le contrôle humain ultime n'est jamais
cédé.
4 Une décision, un responsable
Toute action déléguée reste attribuable
à un humain nommé — le DDAO.
