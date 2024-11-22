# Start med en offisiell Node.js base image
FROM node:18

# Sett arbeidskatalogen i containeren
WORKDIR /app

# Kopier package.json og package-lock.json til arbeidskatalogen
COPY package*.json ./

# Installer avhengigheter
RUN npm install

# Kopier resten av applikasjonen
COPY . .

# Eksponer porten applikasjonen kjører på
EXPOSE 3000

# Start applikasjonen
CMD ["npm", "start"]
