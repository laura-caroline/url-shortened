module.exports = {
  preset: 'ts-jest', // Usa o ts-jest para compilar TypeScript
  testEnvironment: 'node', // Define o ambiente de testes para Node.js
  moduleFileExtensions: ['ts', 'js', 'json'], // Define as extensões de arquivo suportadas
  rootDir: '.', // Define o diretório raiz
  testRegex: '.*\\.spec\\.ts$', // Define a expressão regular para encontrar os arquivos de teste (especificamente arquivos .spec.ts)
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest', // Transforma arquivos TypeScript e JavaScript usando ts-jest
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Resolve caminhos de módulo como 'src/utils/handlerError'
  },
  collectCoverageFrom: ['**/*.(t|j)s'], // Define de onde o Jest coleta cobertura de código
  coverageDirectory: './coverage', // Define o diretório para armazenar os relatórios de cobertura de código
};
