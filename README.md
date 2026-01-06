# 🚉 SVS - Système de Veille Service (ONCF)

Application web et mobile (PWA) pour la digitalisation du contrôle qualité de service, développée pour l'**ONCF** avec une architecture Full-Stack Java/Spring Boot et React.

## 🎥 Démonstrations Vidéo

| **Démo Technique & Métier (5 min)** | **Démo Interface Mobile & PWA (3 min)** |
| :--- | :--- |
| Focus : Backend, Sécurité, Gestion KN1/2/3. | Focus : PWA, Responsive, Saisie FEI/FEM. |
| [▶️ Voir la vidéo 1](src/assets/Videos/VOTRE_VIDEO_1.mp4) | [▶️ Voir la vidéo 2](src/assets/Videos/VOTRE_VIDEO_2.mp4) |

## 🚀 Fonctionnalités

### Gestion des Évaluations (FEI & FEM)
- ✅ **Fiches Individuelles (FEI)** : Saisie des évaluations des agents Front Office.
- ✅ **Fiches Mensuelles (FEM)** : Génération des synthèses de performance périodiques.
- ✅ **Workflow de Validation** : Système de contrôle hiérarchique à trois niveaux (**KN1, KN2, KN3**).

### Fonctionnalités Avancées
- ✅ **Tableau de Bord KPI** : Visualisation en temps réel des indicateurs de performance (Chart.js).
- ✅ **Reporting Automatisé** : Génération de rapports d'anomalies et bilans qualité.
- ✅ **Export de Données** : Impression et export des rapports au format **PDF** et **Excel**.
- ✅ **Mode PWA** : Installation sur mobile et tablette pour une utilisation sur le terrain.
- ✅ **Sécurité** : Authentification et autorisation sécurisées via **JWT (JSON Web Tokens)**.

## 📋 Prérequis

- **Java JDK 17** ou supérieur
- **Node.js** v18 ou supérieur
- **PostgreSQL** 15 ou supérieur
- **Maven** 3.x

## 🔧 Installation

### 1. Cloner le projet
```bash
git clone [https://github.com/hakimhaddioui/Systeme_de_veille_service.git](https://github.com/hakimhaddioui/Systeme_de_veille_service.git)
cd Systeme_de_veille_service
```

### 2. Configuration du Backend (Spring Boot)
Créer une base de données PostgreSQL :

```sql

CREATE DATABASE svs_db;
```
Configurer le fichier src/main/resources/application.properties avec vos identifiants :

Properties

spring.datasource.url=jdbc:postgresql://localhost:5432/svs_db
spring.datasource.username=VOTRE_USER
spring.datasource.password=VOTRE_MDP
spring.jpa.hibernate.ddl-auto=update
Lancer le serveur Backend :

Bash

mvn spring-boot:run
### 3. Configuration du Frontend (React)
Accéder au dossier client :

Bash

cd client
Installer les dépendances :

Bash

npm install
Lancer l'application :

Bash

npm start
### 📁 Structure du Projet
Systeme_de_veille_service/
├── src/main/java/com/svs/        # Backend Spring Boot
│   ├── controllers/              # API Rest Endpoints
│   ├── models/                   # Entités JPA (FEI, FEM, User, etc.)
│   ├── repositories/             # Interfaces Spring Data JPA
│   ├── services/                 # Logique métier
│   └── security/                 # Configuration JWT & Spring Security
├── client/                       # Frontend React (PWA)
│   ├── public/                   # Manifest PWA & Icons
│   ├── src/
│   │   ├── components/           # Composants réutilisables
│   │   ├── pages/                # Vues (Dashboard, Formulaires FEI/FEM)
│   │   ├── assets/               # CSS, Images et Vidéos
│   │   └── services/             # Appels API (Axios)
├── README.md                     # Ce fichier
## Utilisation
### 1. Évaluation Terrain
Un contrôleur (KN1) se connecte via sa tablette (PWA).

Il sélectionne un agent et remplit une fiche FEI.

Les données sont synchronisées instantanément avec le serveur.

### 2. Validation Hiérarchique
Le responsable régional (KN2) consulte les évaluations et les valide.

Le niveau central (KN3) accède aux rapports consolidés pour l'ensemble du réseau ONCF.

### 3. Analyse & Synthèse
Consultation du Dashboard pour identifier les gares ou agents nécessitant une action corrective.

Exportation des fiches en PDF pour archivage ou réunion de coordination.

### 🛠️ Technologies Utilisées
Backend : Java 17, Spring Boot 3, Spring Security, JWT.

Base de données : PostgreSQL.

Frontend : React.js, Bootstrap 5, Chart.js.

Mobile : Progressive Web App (PWA).

Méthodologie : Agile (Scrum).

### 📄 Licence
Projet développé pour l'ONCF, Université Privée de Fès (UPF), Département Informatique, Système d'Information et Transformation Digitale.
