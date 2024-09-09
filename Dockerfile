FROM node:20

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY --chown=node:node package*.json ./

USER node

COPY --chown=node:node . .

RUN npm install

COPY ./.env /.env

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

USER root
RUN chmod +x /docker-entrypoint.sh
USER node

ENTRYPOINT ["/docker-entrypoint.sh"]
