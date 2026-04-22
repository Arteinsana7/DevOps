# TP4 — Déployer en Azure App Service

## 1. Introduction

L'objectif de ce TP est de déployer l'application microservices du TP2/TP3 sur le cloud Azure App Service en utilisant Docker Hub comme registre d'images.

---

## 2. Sommaire

1. Introduction
2. Stack technique
3. Architecture
4. Docker Hub
5. Frontend Service
6. Déploiement Azure
7. Conclusion
8. Bilan personnel

---

## 3. Stack technique

| Outil | Rôle |
|---|---|
| Docker Hub | Registre public d'images Docker |
| Azure App Service | Plateforme cloud de déploiement |
| Azure CLI | Gestion Azure en ligne de commande |
| Node.js + Express | Frontend service |

---

## 4. Architecture
Code Source     Images Docker      Cloud
(GitHub)    →   (Docker Hub)   →   (Azure)
docker-compose.yml    arteinsana/devops-app:auth.v1
Dockerfiles      →    arteinsana/devops-app:produits.v1   →   Azure App Service
frontend/        →    arteinsana/devops-app:commande.v1       devops-arteinsana.azurewebsites.net
arteinsana/devops-app:frontend.v1

---

## 5. Docker Hub

### 5.1 Connexion

```bash
docker login
```

### 5.2 Tagger les images

```bash
docker tag tp2-produits arteinsana/devops-app:produits.v1
docker tag tp2-authentification arteinsana/devops-app:auth.v1
docker tag tp2-commande arteinsana/devops-app:commande.v1
```

### 5.3 Pousser les images

```bash
docker push arteinsana/devops-app:produits.v1
docker push arteinsana/devops-app:commande.v1
docker push arteinsana/devops-app:auth.v1
docker push arteinsana/devops-app:frontend.v1
```

---

## 6. Frontend Service

Un service Express simple sur le port 8080 qui sert une page HTML présentant les 4 TPs du cours.
frontend-service/
├── index.js
├── index.html
├── style.css
├── package.json
└── Dockerfile

Le Dockerfile utilise `node:14-alpine` recommandé pour Azure App Service.

---

## 7. Déploiement Azure

### 7.1 Installation Azure CLI

```bash
brew install azure-cli
```

### 7.2 Connexion

```bash
az login
```

### 7.3 Créer le groupe de ressources

```bash
az group create --name devops-tp4 --location westeurope
```

### 7.4 Créer le plan App Service

```bash
az appservice plan create \
  --name devops-tp4-plan \
  --resource-group devops-tp4 \
  --sku F1 \
  --is-linux
```

### 7.5 Créer l'application web

```bash
az webapp create \
  --name devops-arteinsana \
  --resource-group devops-tp4 \
  --plan devops-tp4-plan \
  --deployment-container-image-name arteinsana/devops-app:frontend.v1
```

### 7.6 Configurer le port

```bash
az webapp config appsettings set \
  --name devops-arteinsana \
  --resource-group devops-tp4 \
  --settings WEBSITES_PORT=8080
```

### 7.7 URL de l'application
https://devops-arteinsana.azurewebsites.net

### 7.7 Problème rencontré — Quota dépassé = "state": "QuotaExceeded"

Le plan gratuit **Free F1** d'Azure a une limite de 60 minutes CPU par jour. Le simple démarrage du conteneur Docker a suffi à dépasser ce quota, rendant l'application inaccessible.

### 7.8 Alternative — Render

Render est une plateforme cloud gratuite qui supporte nativement les conteneurs Docker et Docker Hub sans limitations de quota. Le processus est similaire :

1. Connecter le repository Docker Hub
2. Sélectionner l'image `arteinsana/devops-app:frontend.v1`
3. Déployer automatiquement

---

---

## 8. Captures d'écran

### Docker Hub — Images publiées
![Docker Hub](/TP4/ScreenShoot/DOCKER_HUB.png)

### Azure App Service — Application déployée
![Azure](/TP4/)

### Frontend en ligne
![Frontend](./screenshots/FRONTEND_LIVE.png)

---

## 9. Conclusion

Ce TP m'a permis de comprendre le processus complet de déploiement cloud : construire des images Docker, les publier sur Docker Hub comme registre centralisé, puis les déployer sur Azure App Service. Cette chaîne DevOps complète (code → image → cloud) est celle utilisée en production dans les entreprises.

---

## 10. Bilan personnel

Ce TP m'a permis de comprendre concrètement ce qu'est le DevOps : réunir le développement et l'exploitation dans un même flux automatisé. La notion de registre d'images Docker Hub comme intermédiaire entre le développement local et le déploiement cloud est un concept clé que j'ai pu mettre en pratique.
