## Instalação

### Pré-requisitos

Liste as ferramentas e softwares necessários para rodar o projeto:

- Node.js versão 20
- NPM ou Yarn
- Docker

## URL aplicação

http://a6077a97b7ef343babcd6aca84354cf2-1822707660.us-east-1.elb.amazonaws.com/api/docs

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/laura-caroline/url-shortened
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd url-shortened
   ```
3. Modifique a branch para master:
   ```bash
   git checkout master
   ```
4. Instale as dependências:

   ```bash
   npm install
   ```

5. Crie arquivo .env
   DATABASE_URL="postgresql://postgres:12345678@db:5432/postgres"
   AT_SECRET=AT_SECRET
   RT_SECRET=RT_SECRET
   JWT_ACCESS_LIFETIME=321423412341234
   JWT_REFRESH_LIFETIME=321423412341234
6. Subir a aplicação e o banco de dados pelo docker-compose

   ```bash
   docker-compose build
   docker-compose up
   ```

6.1 URL local: http://localhost:3000/api/docs

7. Rode os testes:

   ```bash
   npm run test
   ```

8. Rodar lint:

   ```bash
   npm run test
   ```

Caso não queira subir pelo docker.. 8. Rodar aplicação

```bash
npm run start
```

### Funcionalidades extras

- Api para fazer refresh token
- Api para obter dados do usuário autenticado
