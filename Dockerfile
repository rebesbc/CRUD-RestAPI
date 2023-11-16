# versión de Node que utilizaremos como base
FROM node:20.9.0 AS node

# build stage
FROM node AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
ENV SERVER_PORT 3000
EXPOSE $SERVER_PORT

# production stage
FROM node AS production
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install --only=production
COPY --chown=node:node --from=builder /app/dist ./dist
ENTRYPOINT ["node", "./dist/index.js"]
# CMD ["npm", "run", "start:prod"]