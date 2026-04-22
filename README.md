# DevOps — Cours pratique

Projet de cours DevOps couvrant les concepts fondamentaux du développement, de la containerisation et du déploiement cloud.

## Structure du projet
DevOps/
├── TP1/    — API REST Node.js/Express + MongoDB + JWT
├── TP2/    — Architecture microservices Node.js
├── TP3/    — Containerisation avec Docker et Docker Compose
└── TP4/    — Déploiement cloud sur Azure App Service

## Contenu des TPs

**TP1 — API REST**
- API REST complète avec Node.js et Express
- Base de données MongoDB avec Mongoose
- Authentification JWT et hashage bcryptjs
- Routes CRUD pour joueurs et équipes
- Middleware d'authentification

**TP2 — Microservices**
- 3 services indépendants : auth, produit, commande
- Communication HTTP entre services via Axios
- Base de données MongoDB par service
- Authentification JWT partagée

**TP3 — Docker**
- Dockerfile pour chaque service
- Docker Compose comme orchestrateur
- 5 conteneurs : db, auth, produit, commande, frontend
- Images taguées et publiées sur Docker Hub

**TP4 — Azure Cloud**
- Frontend service Express sur le port 8080
- 4 images Docker pushées sur Docker Hub
- Déploiement sur Azure App Service via Azure CLI

## Lancer le projet

```bash
cd TP2
docker-compose up --build
```

## Stack technique

- Node.js / Express — Backend et microservices
- MongoDB / Mongoose — Base de données
- JWT / bcryptjs — Authentification
- Docker / Docker Compose — Containerisation
- Docker Hub — Registre d'images
- Azure App Service — Déploiement cloud

## Auteur

Eliana Yepez / Apprentie développeuse  ecv - M1