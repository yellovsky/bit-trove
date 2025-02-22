// global modules
import * as winston from 'winston';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

// common modules
import { AppConfigModule } from 'src/modules/app-config';
import { BlogPostModule } from 'src/modules/blog-post';
import { CasbinModule } from 'src/modules/casbin';
import { PermissionPolicyModule } from './modules/permission-policy';
import { RuntimeModule } from 'src/modules/runtime';
import { TutorialModule } from 'src/modules/tutorial';
import { AuthModule, JwtGuard, JwtStrategy } from 'src/modules/auth';

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
            }),
          ),
        }),
      ],
    }),
    PassportModule.register({ session: true }),
    RuntimeModule,
    AppConfigModule,
    AuthModule,
    TutorialModule,
    BlogPostModule,
    CasbinModule,
    PermissionPolicyModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }, JwtStrategy],
})
export class AppModule {}
