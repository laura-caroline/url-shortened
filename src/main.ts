import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'warn', 'debug'],
    cors: true,
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    })
  );

  app.setGlobalPrefix('api');

  const configDefault = new DocumentBuilder()
    .setTitle('nest-api api')
    .setVersion('0.1')
    .addBearerAuth({
      type: 'http',
      bearerFormat: 'JWT',
      description:
        'Coloque o jwt token no formato "{TOKEN}" sem o "Bearer/bearer"',
      scheme: 'bearer',
      in: 'header',
      name: 'Authorization',
      openIdConnectUrl: null,
      flows: {
        implicit: {
          authorizationUrl: '/api/auth/login',
          tokenUrl: '/api/auth/login',
          refreshUrl: '/api/auth/refresh',
          scopes: {},
        },
      },
    })
    .build();

  const documentDefault = SwaggerModule.createDocument(app, configDefault);

  documentDefault.components.parameters = {
    'x-forwarded-for': {
      in: 'header',
      name: 'x-forwarded-for',
      schema: {
        type: 'string',
      },
      required: true,
      description: 'O endereço IP original do cliente conectadoP',
    },
  };

  SwaggerModule.setup('api/docs', app, documentDefault);

  await app.listen(3000);
}

bootstrap();
