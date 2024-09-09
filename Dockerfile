FROM --platform=linux/amd64 node:20

WORKDIR /app

COPY  . .

RUN npm install

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

USER root
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
