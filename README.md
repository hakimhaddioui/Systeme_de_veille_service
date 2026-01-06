# 🚉 SVS - Système de Veille Service (ONCF)

> **Projet de Fin d'Études (Ingénieur d'État - UPF 2024-2025)**
> Digitalisation de l'évaluation de la qualité de service pour l'Office National des Chemins de Fer.

## 📝 Présentation du Projet
Le projet **SVS** a pour objectif de moderniser le suivi de la qualité de service en gare et à bord des trains. En remplaçant les processus manuels par cette application **PWA (Progressive Web App)**, l'ONCF optimise la collecte et l'analyse des données de performance (KPI).

## 🎥 Démonstrations Vidéo
*Note : Si les vidéos ne s'affichent pas, vérifiez le chemin dans le dossier `src/assets/Videos`.*

### 🔹 Démo 1 : Fonctionnalités & Processus Métier (5 min)
*Présentation du Dashboard, gestion des fiches FEI/FEM et niveaux de contrôle KN1/KN2/KN3.*

https://github.com/hakimhaddioui/Systeme_de_veille_service/raw/main/src/assets/Videos/VOTRE_VIDEO_1.mp4

### 🔹 Démo 2 : Interface Mobile & PWA (3 min)
*Démonstration de la réactivité de l'interface sur tablette et smartphone.*

https://github.com/hakimhaddioui/Systeme_de_veille_service/raw/main/src/assets/Videos/VOTRE_VIDEO_2.mp4

---

## ✨ Fonctionnalités Clés
- **Digitalisation complète** : Saisie des fiches d'évaluation individuelles et mensuelles.
- **Workflow de validation** : Gestion hiérarchique des contrôles qualité.
- **Reporting Automatisé** : Génération de rapports d'anomalies en PDF/Excel.
- **Mode Offline** : Utilisation possible en mobilité grâce à la technologie PWA.

## 🛠️ Stack Technique
- **Frontend** : React.js, Bootstrap, Reactstrap.
- **Backend** : Java / Spring Boot, JPA, Hibernate.
- **Base de données** : PostgreSQL.
- **Gestion de projet** : Méthode Agile (Scrum).

## ⚙️ Prérequis
- Java 17+
- Node.js (v18+)
- PostgreSQL installé

## 🚀 Installation et Lancement

### 1. Base de données
Créer une base de données `svs_db` sur PostgreSQL.

### 2. Backend (Spring Boot)
```bash
# Se placer dans le dossier backend
mvn spring-boot:run
