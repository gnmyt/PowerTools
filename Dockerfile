FROM node:18-alpine

WORKDIR /app

COPY --chown=node:node ./server ./server
COPY --chown=node:node ./package.json ./package.json

RUN npm install

RUN chown -R node:node /app

USER node

EXPOSE 7182

CMD ["node", "server"]