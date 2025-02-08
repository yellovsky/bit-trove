// global modules
import { Effect } from 'effect';
import type { LoginWithEmailFP } from '@repo/api-models';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBUser } from 'src/db-models/user';
import { type ApiError, UnauthorizedAPIError } from 'src/exceptions';
import { APP_CONFIG_SRV, type AppConfigService } from 'src/modules/app-config';

// local modules
import type { AuthService } from './auth.types';

@Injectable()
export class AuthServiceClass implements AuthService {
  constructor(
    @Inject(APP_CONFIG_SRV)
    private readonly appConfigSrv: AppConfigService,
  ) {}

  validateUserByEmail(
    params: LoginWithEmailFP,
  ): Effect.Effect<DBUser, ApiError> {
    return Effect.gen(this, function* () {
      if (
        params.email === this.appConfigSrv.adminEmail &&
        params.password === this.appConfigSrv.adminPassword
      ) {
        return { email: params.email };
      }

      return yield* new UnauthorizedAPIError({});
    });
  }
}
