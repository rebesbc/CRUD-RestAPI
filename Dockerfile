# versión de Node que utilizaremos como base
FROM node:20.9.0
# directorio del contenedor
WORKDIR /usr/code
# copiar el siguiente archivo al workdir
COPY package.json .
# instalar todas las dependencias y crear los módulos de Node
RUN npm install
# copia todo lo que hay en el directorio hacia el workdir
COPY . .
# variable de entorno con valor por defecto
ENV SERVER_PORT 3000
# exponer el puerto desde el contenedor para utilizarlo abiertamente
EXPOSE $SERVER_PORT
# comando a ejecutar para inicializar el contenedor
CMD ["npm", "run", "start:prod"]