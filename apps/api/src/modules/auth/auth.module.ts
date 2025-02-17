// global modules
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

// common modules
import { ArticleModule } from 'src/modules/article';
import { DrizzleModule } from 'src/modules/drizzle';
import { RuntimeModule } from 'src/modules/runtime';
import { AppConfigModule, AppConfigService } from 'src/modules/app-config';

// local modules
import { AccessTokenService } from './services/access-token.service';
import { AccountRepository } from './repositories/account.repository';
import { AuthService } from './services/auth.service';
import { AuthV1Controller } from './controllers/auth.controller-v1';
import { BcryptService } from './services/bcrypt.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthV1Controller],
  exports: [AuthService, JwtModule],
  imports: [
    DrizzleModule,
    RuntimeModule,
    ArticleModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigSrv: AppConfigService) => ({
        secret: appConfigSrv.jwtSecret,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AccountRepository,
    AccessTokenService,
    BcryptService,
  ],
})
export class AuthModule {}
