// global modules
import cookieParser from 'cookie-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

// local modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.enableCors({ credentials: true, origin: 'http://localhost:5173' });
  app.set('trust proxy', 1);

  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('Define SESSION_SECRET process variable');

  app
    .setGlobalPrefix('api')
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
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .enableVersioning({ type: VersioningType.URI });

  // app.enableShutdownHooks();
  await app.listen(3001);
}
bootstrap();
