import { type MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { AppConfigModule } from 'src/modules/app-config';
import { ArticlesModule } from 'src/modules/articles';
import { AuthModule, JwtGuard, JwtStrategy } from 'src/modules/auth';
import { AppCacheModule } from 'src/modules/cache';
import { CasbinModule } from 'src/modules/casbin';
import { I18nModule } from 'src/modules/i18n';
import { PermissionPoliciesModule } from 'src/modules/permission-policies';
import { PrismaModule } from 'src/modules/prisma';

import { TagsModule } from './modules/tags';
import { RequestLoggerMiddleware } from './request-logger.middleware';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            nestWinstonModuleUtilities.format.nestLike('api', {
              appName: false,
              processId: false,
            })
          ),
        }),
      ],
    }),
    PassportModule.register({ session: true }),
    AppConfigModule,
    ArticlesModule,
    I18nModule,
    PrismaModule,
    TagsModule,
    AuthModule,
    CasbinModule,
    PermissionPoliciesModule,
    AppCacheModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }, JwtStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*path');
  }
}
