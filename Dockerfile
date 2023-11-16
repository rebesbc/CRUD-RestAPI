# versión de Node que utilizaremos como base
FROM node:20.9.0 AS node

# build stage
FROM node AS builder
WORKDIR /usr/code
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node AS production
RUN mkdir -p /home/node/usr/code/dist && chown -R node:node /home/node/usr/code
WORKDIR /home/node/usr/code
COPY package*.json ./
USER node
RUN npm install --only=production
COPY --chown=node:node --from=builder /usr/code/dist ./dist
ENV SERVER_PORT 3000
EXPOSE $SERVER_PORT
ENTRYPOINT ["node", "./dist/index.js"]
# CMD ["npm", "run", "start:prod"]