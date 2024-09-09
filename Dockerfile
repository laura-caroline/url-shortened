FROM node:20


WORKDIR /app

COPY  . .

RUN npm install

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
