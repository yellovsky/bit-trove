// global modules
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

// common modules
import { AuthModule } from 'src/modules/auth';
import { OauthModule } from 'src/modules/oauth';
import { RequestContextModule } from 'src/modules/request-context';
import { RuntimeModule } from 'src/modules/runtime';
import { JwtGuard, JwtStrategy } from 'src/modules/auth';

// local modules
import { AuthApiV1Controller } from './auth-api.controller-v1';

@Module({
  controllers: [AuthApiV1Controller],
  imports: [RequestContextModule, OauthModule, RuntimeModule, AuthModule],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }, JwtStrategy],
})
export class AuthApiModule {}
