# Utiliza una imagen oficial de Node.js
FROM node:20

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto 3000 para acceder a la API
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "dev"]
