# Usa una imagen base de Node.js para construir la app
FROM node:18 as builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:1.23

# Copia los archivos de construcción al directorio público de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar archivo de configuración de Nginx para redirigir solicitudes al backend
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]