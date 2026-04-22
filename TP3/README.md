# TP3 — Manipuler les conteneurs Docker

## 1. Introduction

L'objectif de ce TP est de conteneuriser l'application microservices du TP2 avec Docker. Chaque service est transformé en image Docker et orchestré avec Docker Compose.

---

## 2. Sommaire

1. Introduction
2. Stack technique
3. Structure du projet
4. Dockerfile
5. Docker Compose
6. Lancement
7. Tests
8. Conclusion
9. Bilan personnel

---

## 3. Stack technique

| Outil | Rôle |
|---|---|
| Docker | Conteneurisation des services |
| Docker Compose | Orchestration des conteneurs |
| Node.js | Runtime des services |
| MongoDB | Base de données dans un conteneur |

---

## 4. Structure du projet



---

## 5. Dockerfile

Chaque service utilise le même Dockerfile :

```dockerfile
FROM node:latest
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
```

Le `.dockerignore` exclut `node_modules` pour ne pas copier les dépendances locales dans l'image — elles sont réinstallées directement dans le conteneur via `npm install`.

---

## 6. Docker Compose

Le fichier `docker-compose.yml` orchestre 4 conteneurs :

| Conteneur | Image | Port externe | Port interne |
|---|---|---|---|
| db | mongo | 27018 | 27017 |
| produit-service | tp2-produits | 5001 | 4000 |
| auth-service | tp2-authentification | 5003 | 4002 |
| commande-service | tp2-commande | 5002 | 4001 |

Les services communiquent entre eux via leur nom de service Docker (`db`, `produits`, `authentification`, `commande`) au lieu de `localhost`.

---

## 7. Lancement

```bash
# Se placer dans le dossier TP2
cd TP2

# Construire les images et lancer les conteneurs
docker-compose up --build

# Arrêter les conteneurs
docker-compose down
```

---

## 8. Tests

### Docker Desktop — conteneurs en cours d'exécution
![Docker Desktop](/TP3/ScreenShoots/DOCKER_RUNNING.png)

### Register
![Register](/TP3/ScreenShoots/REGISTER_DOCKER.png)

### Login
![Login](/TP3/ScreenShoots/LOGIN_DOCKER_TOKEN.png)

### Ajouter un produit
![Produit](/TP3/ScreenShoots/POST_ADD_PODUCT_WITH_TOKEN.png)

### Créer une commande
![Commande](/TP3/ScreenShoots/POST_COMMANDE_AJOUTER_DOCKER.png)

---

## 9. Conclusion

Ce TP a permis de conteneuriser l'application microservices du TP2. Chaque service tourne dans son propre conteneur Docker, isolé et indépendant. Docker Compose orchestre le démarrage dans le bon ordre et gère la communication entre les services.

---

## 10. Bilan personnel

Ce TP m'a permis de comprendre la différence entre une machine virtuelle et un conteneur, et comment Docker permet de déployer une application de manière portable et reproductible. J'ai appris à écrire un Dockerfile, à configurer Docker Compose et à gérer les conflits de ports entre les services.