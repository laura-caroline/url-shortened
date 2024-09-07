# Use a imagem oficial do Node.js
FROM --platform=linux/amd64 node:lts-alpine

# Define o diretório de trabalho no container
WORKDIR /usr/src/nestjs-app


# Copia todos os arquivos da aplicação para o container
COPY . .

# Instala as dependências, incluindo o Nodemon
RUN npm install

RUN npx prisma generate

RUN npx prisma deploy

RUN npm run seed

# Expõe a porta que a aplicação usará (ajuste conforme necessário)
EXPOSE 3000

# Define o comando de inicialização da aplicação
# O comando usa o nodemon para reiniciar a aplicação ao detectar mudanças nos arquivos
CMD ["npm", "run", "start"]
