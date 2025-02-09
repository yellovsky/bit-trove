// global modules
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

// common modules
import { ArticleModule } from 'src/modules/article';
import { PrismaModule } from 'src/modules/prisma';
import { RuntimeModule } from 'src/modules/runtime';

import {
  APP_CONFIG_SRV,
  AppConfigModule,
  type AppConfigService,
} from 'src/modules/app-config';

// local modules
import { AUTH_SRV } from './auth.constants';
import { AuthEmailStrategy } from './auth.email-strategy';
import { AuthServiceClass } from './auth.service';
import { JwtStrategy } from './auth.jwt-strategy';

const serviceRef = {
  provide: AUTH_SRV,
  useClass: AuthServiceClass,
};

@Module({
  exports: [serviceRef, JwtModule],
  imports: [
    RuntimeModule,
    PrismaModule,
    ArticleModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [APP_CONFIG_SRV],
      useFactory: async (appConfigSrv: AppConfigService) => ({
        secret: appConfigSrv.jwtSecret,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [serviceRef, AuthEmailStrategy, JwtStrategy],
})
export class AuthModule {}
