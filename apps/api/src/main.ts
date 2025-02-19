// global modules
import cookieParser from 'cookie-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';

import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

// local modules
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

const API_PREFIX = 'api';

const getSwaggerOptions = () =>
  new DocumentBuilder()
    .setTitle('Eltsy')
    .setDescription('API for the Eltsy project')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('Your API Tag')
    .addBearerAuth(
      { bearerFormat: 'JWT', in: 'header', scheme: 'bearer', type: 'http' },
      'access-token',
    )
    .addGlobalParameters({
      description: 'User locale',
      in: 'query',
      name: 'locale',
      style: 'simple',
    })
    .build();

async function bootstrap() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('Define SESSION_SECRET process variable');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: ['http://127.0.0.1:5173'] },
  });

  app.enableCors({ credentials: true, origin: 'http://127.0.0.1:5173' });
  app.set('trust proxy', 1);

  app
    .setGlobalPrefix(API_PREFIX)
    .use(cookieParser())
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .enableVersioning({ type: VersioningType.URI });

  const document = SwaggerModule.createDocument(app, getSwaggerOptions());
  SwaggerModule.setup(`${API_PREFIX}/:version/docs`, app, document);

  // app.enableShutdownHooks();
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3001);
}
bootstrap();
