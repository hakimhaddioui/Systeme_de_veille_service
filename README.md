---

## 🎥 Démonstrations Vidéo
*Aperçu visuel des fonctionnalités implémentées (Web & PWA).*

| **Démo Technique & Métier (5 min)** | **Démo Mobile & Interface (3 min)** |
| :--- | :--- |
| Focus : Backend, Sécurité, Gestion KN1/2/3. | Focus : PWA, Responsive, Saisie FEI/FEM. |
| [▶️ Voir la vidéo 1](src/assets/Videos/VOTRE_VIDEO_1.mp4) | [▶️ Voir la vidéo 2](src/assets/Videos/VOTRE_VIDEO_2.mp4) |

---

## 📌 Présentation et Enjeux
Le système **SVS** répond à la stratégie de transformation digitale de l'**ONCF**. Il permet d'évaluer la qualité de service en temps réel via des Fiches d'Évaluation Individuelles (**FEI**) et Mensuelles (**FEM**), garantissant une remontée d'information fluide entre les différents niveaux de contrôle (**KN1 : Local, KN2 : Régional, KN3 : Central**).

---

## 🏗️ Architecture Technique
L'application adopte une **architecture N-Tiers (3-Tiers)** pour assurer la séparation des responsabilités :
1. **Couche Présentation (Frontend) :** React.js & Bootstrap.
2. **Couche Métier (Backend) :** Spring Boot (API REST).
3. **Couche Accès aux Données :** PostgreSQL via Spring Data JPA.

---

## 🛠️ Configuration et Installation

### 1. Configuration du Backend (Spring Boot)
* **Base de données :** Créez une base de données nommée `svs_db` sur votre instance PostgreSQL.
* **Fichier de configuration :** Modifiez le fichier `src/main/resources/application.properties` avec vos identifiants :

```properties
# Configuration Database
spring.datasource.url=jdbc:postgresql://localhost:5432/svs_db
spring.datasource.username=VOTRE_USER
spring.datasource.password=VOTRE_MDP

# Configuration Hibernate/JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
Lancement du serveur :

Bash

mvn clean install
mvn spring-boot:run
2. Configuration du Frontend (React)
Accès au dossier : cd client (ou le nom de votre dossier front)

Installation des dépendances : ```bash npm install

* **Lancement de l'application :** ```bash
npm start
📈 Méthodologie de Travail
Le projet a été mené selon la méthodologie Agile (SCRUM), structurée comme suit :

Analyse des besoins : Rédaction des User Stories.

Conception UML : Réalisation des diagrammes de cas d’utilisation, de séquences et de classes.

Sprints : Développement itératif et incrémental pour chaque module (FEI, FEM, Reporting).
