# Utiliser une version LTS de Node.js
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json (si présent)
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install --legacy-peer-deps

# Copier le reste du projet dans le conteneur
COPY . .

# Exposer le port utilisé par Vite (9658)
EXPOSE 9658

# Démarrer le serveur de développement
CMD ["npm", "run", "dev"]
