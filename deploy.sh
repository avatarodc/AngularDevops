#!/bin/bash
echo "Début du déploiement..."

# Nettoyage si nécessaire
echo "Nettoyage des anciens conteneurs..."
docker stop angular-app 2>/dev/null || true
docker rm angular-app 2>/dev/null || true

# Build de l'application Angular localement
echo "Build de l'application Angular..."
npm run build

# Build de l'image Docker
echo "Construction de l'image Docker..."
docker build -t angular-app:latest .

# Lancement du conteneur
echo "Lancement du conteneur..."
docker run -d --name angular-app -p 8080:8080 angular-app:latest

echo "Déploiement terminé ! L'application est accessible sur http://localhost:8080"
