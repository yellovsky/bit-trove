import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import type { Response } from 'express';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { format, transports } from 'winston';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { setupRedoc } from 'src/shared/utils/redoc.middleware';

import { I18N_SRV } from 'src/modules/i18n';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception-filter';

const API_PREFIX = 'api';

// TODO Get env vars with some package to avoid biome-ignore
// biome-ignore lint/style/noProcessEnv: get process env in main
const API_PORT = process.env.API_PORT;
// biome-ignore lint/style/noProcessEnv: get process env in main
const SESSION_SECRET = process.env.SESSION_SECRET;
// biome-ignore lint/style/noProcessEnv: get process env in main
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const getSwaggerOptions = () =>
  new DocumentBuilder()
    .setTitle('Bittrove')
    .setDescription('API for the Bittrove project')
    .setVersion('1.0')
    .addServer(`http://localhost:${API_PORT}/`, 'Local environment')
    .addBearerAuth({ bearerFormat: 'JWT', in: 'cookie', scheme: 'bearer', type: 'http' }, 'access-token')
    .build();

const winstonLogger = WinstonModule.createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      format: format.combine(
        format.splat(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        nestWinstonModuleUtilities.format.nestLike('api', {
          appName: false,
          processId: false,
        })
      ),
    }),
  ],
});

async function bootstrap() {
  if (!SESSION_SECRET) throw new Error('Define SESSION_SECRET process variable');

  if (typeof CORS_ORIGIN !== 'string') {
    throw new Error('process.env.CORS_ORIGIN must be provided');
  }

  // Parse CORS origins (comma-separated)
  const corsOrigins = CORS_ORIGIN.split(',').map((origin) => origin.trim());

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: corsOrigins },
    logger: winstonLogger,
  });

  app.enableCors({ credentials: true, origin: corsOrigins });
  app.set('trust proxy', 1);
  app.set('query parser', 'extended');

  const i18nSrv = app.get<IdentifierOf<typeof I18N_SRV>>(I18N_SRV);

  await i18nSrv.init();

  app
    .setGlobalPrefix(API_PREFIX)
    .use(cookieParser())
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      })
    )
    .useGlobalFilters(new HttpExceptionFilter(i18nSrv))
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .enableVersioning({ type: VersioningType.URI });

  const document = SwaggerModule.createDocument(app, getSwaggerOptions());
  SwaggerModule.setup(`${API_PREFIX}/:version/docs`, app, document);
  app.use('/swagger-json', (_: unknown, res: Response) => res.json(document));

  // app.enableShutdownHooks();

  setupRedoc(app);

  if (!API_PORT) throw new Error('process.env.API_PORT must be provided');
  await app.listen(API_PORT);

  // biome-ignore lint/suspicious/noConsole: ignore
  console.log(`Backend is running on port ${API_PORT}`);
}

bootstrap();
