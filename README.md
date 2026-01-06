# 🚉 SVS - Système de Veille Service (Digitalisation ONCF)

> **Projet de Fin d'Études** pour l'obtention du diplôme d'Ingénieur d'État en Systèmes d'Information et Transformation Digitale (UPF).
> **Partenaire :** Office National des Chemins de Fer (ONCF).

---

## 📌 Présentation du Projet
Le projet **SVS** est une solution Full-Stack (Web & Mobile) conçue pour moderniser et automatiser le suivi de la qualité de service au sein de l'ONCF. L'objectif principal est de remplacer les supports papier et les processus manuels par un système numérique réactif permettant une remontée d'information instantanée depuis le terrain (gares et trains).

### 🎯 Problématique & Objectifs
- **Digitalisation :** Remplacer les fiches d'évaluation physiques par des formulaires dynamiques.
- **Réactivité :** Détection immédiate des anomalies de service.
- **Analyse :** Centralisation des données pour générer des indicateurs de performance (KPI) fiables.
- **Multi-Niveaux :** Intégration du système de contrôle qualité ONCF à trois niveaux (**KN1, KN2, KN3**).

---

## 🎥 Démonstrations Vidéo
*Note : Les vidéos ci-dessous illustrent les parcours utilisateurs complets.*

| **Démo 1 : Administration & Métier (5 min)** | **Démo 2 : Vue Terrain & Mobile (3 min)** |
| :--- | :--- |
| Focus sur le Backend, la sécurité JWT, et la gestion des évaluateurs. | Focus sur l'interface PWA, la saisie des fiches FEI/FEM et le responsive. |
| [Lien vers Vidéo 1](src/assets/Videos/NOM_DE_TA_VIDEO_1.mp4) | [Lien vers Vidéo 2](src/assets/Videos/NOM_DE_TA_VIDEO_2.mp4) |

---

## ✨ Fonctionnalités Détaillées

### 1. Gestion des Évaluations (FEI & FEM)
- **Fiche d'Évaluation Individuelle (FEI) :** Évaluation des agents Front Office (FO) sur des critères comportementaux et métier.
- **Fiche d'Évaluation Mensuelle (FEM) :** Synthèse périodique des performances.
- **Workflow de Validation :** Passage des contrôles entre les niveaux hiérarchiques KN1, KN2 et KN3.

### 2. Dashboard & Pilotage (KPI)
- Visualisation en temps réel des taux de conformité.
- Graphiques d'évolution de la qualité par gare ou par ligne.
- Alertes automatiques en cas d'anomalies critiques.

### 3. Reporting & Export
- Génération automatique de rapports de synthèse.
- Exportation des données aux formats **PDF** et **Excel**.

### 4. Technologie PWA (Progressive Web App)
- Installation sur mobile/tablette sans passer par les stores.
- Interface optimisée pour une utilisation en mobilité par les contrôleurs.

---

## 🏗️ Architecture Technique
L'application repose sur une **architecture N-Tiers** garantissant scalabilité et sécurité.

- **Frontend :** - Framework : `React.js`
  - Style : `Bootstrap` / `Reactstrap`
  - Gestion d'état : `Hooks` & `Context API`
- **Backend :** - Framework : `Spring Boot 3.x`
  - Sécurité : `Spring Security` avec Authentification `JWT` (JSON Web Token)
  - Langage : `Java 17`
- **Base de données :** - `PostgreSQL` (Relationnel)
  - Persistence : `Spring Data JPA` / `Hibernate`

---

## ⚙️ Installation et Configuration

### Prérequis
- **Java JDK 17** ou supérieur
- **Node.js v18+**
- **PostgreSQL**
- **Maven**

### Étapes d'installation

1. **Clonage du projet :**
   ```bash
   git clone [https://github.com/hakimhaddioui/Systeme_de_veille_service.git](https://github.com/hakimhaddioui/Systeme_de_veille_service.git)
   cd Systeme_de_veille_service
Configuration du Backend :

Créez une base de données svs_db sur PostgreSQL.

Modifiez src/main/resources/application.properties avec vos identifiants :

Properties

spring.datasource.url=jdbc:postgresql://localhost:5432/svs_db
spring.datasource.username=VOTRE_USER
spring.datasource.password=VOTRE_MDP
Lancez le serveur : mvn spring-boot:run

Configuration du Frontend :

Accédez au dossier front : cd client (ou votre nom de dossier)

Installez les dépendances : npm install

Lancez l'application : npm start

📈 Méthodologie de Travail
Le projet a été mené selon la méthodologie Agile (SCRUM) :

Analyse des besoins (User Stories).

Conception UML (Diagrammes de cas d’utilisation, séquences, classes).

Sprints de développement itératif.

👥 Équipe de Réalisation
Développeurs : Hakim HADDIOUI & Aymane ELBOUFARHI

Encadrant Pédagogique : M. Mohammed OUANAN (UPF)

Encadrant Professionnel : M. Mohammed ZERROUKI (ONCF)


---

### 💡 Conseils supplémentaires pour finaliser :

1.  **Vérifiez les noms des vidéos :** Remplacez `NOM_DE_TA_VIDEO_1.mp4` par le nom exact du fichier présent dans ton dossier `src/assets/Videos`.
2.  **Ajoutez des Screenshots :** Juste avant la section "Fonctionnalités", ajoutez 2 ou 3 images (Dashboard, Formulaire) avec cette syntaxe :
    `![Nom](./src/assets/screenshots/image.png)`
3.  **Fichier `.gitignore` :** Assurez-vous que votre dossier `node_modules` et vos fichiers `.env` ne sont pas sur GitHub, cela ferait "amateur".

Est-ce que cette version détaillée vous convient mieux ?
