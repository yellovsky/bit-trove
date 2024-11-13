// global modules
import cookieParser from 'cookie-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';

import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

// local modules
import { AppModule } from './app.module';
import { BadRequestAPIError } from './exceptions';
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
    cors: true,
  });

  app.enableCors({ credentials: true, origin: 'http://localhost:5173' });
  app.set('trust proxy', 1);

  app
    .setGlobalPrefix(API_PREFIX)
    .use(cookieParser())
    .use(
      session({
        resave: false,
        saveUninitialized: false,
        secret,

        cookie: {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        },
      }),
    )
    .useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: () => new BadRequestAPIError({}),
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
  await app.listen(3001);
}
bootstrap();
