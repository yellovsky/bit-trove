// global modules
import { Effect } from 'effect';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBUser } from 'src/db-models/user';
import { UnauthorizedAPIError } from 'src/exceptions';

import {
  annotateLogs,
  RUNTIME_SRV,
  type RuntimeService,
} from 'src/modules/runtime';

// local modules
import { AUTH_SRV } from './auth.constants';
import type { AuthService } from './auth.types';

@Injectable()
export class AuthEmailStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(RUNTIME_SRV)
    private readonly runtime: RuntimeService,

    @Inject(AUTH_SRV)
    private readonly authSrv: AuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<DBUser> {
    const program: Effect.Effect<DBUser, Error> = Effect.gen(
      this,
      function* () {
        yield* Effect.logDebug('email', email);
        const dbUser = yield* this.authSrv.validateUserByEmail({
          email,
          password,
        });

        if (!dbUser) return yield* new UnauthorizedAPIError({});
        return dbUser;
      },
    ).pipe(annotateLogs(AuthEmailStrategy, 'validate'));
    return this.runtime.runPromise(program);
  }
}
