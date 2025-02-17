// global modules
import { Effect } from 'effect';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBAccount } from 'src/modules/account';
import { annotateLogs, RuntimeService } from 'src/modules/runtime';

// local modules
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject()
    private readonly runtime: RuntimeService,

    @Inject()
    private readonly authSrv: AuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<DBAccount> {
    const program: Effect.Effect<DBAccount, Error> = Effect.gen(
      this,
      function* () {
        const dbAccount = yield* this.authSrv.validateAccountByEmail({
          email,
          password,
        });

        return dbAccount;
      },
    ).pipe(annotateLogs(LocalStrategy, 'validate'));
    return this.runtime.runPromise(program);
  }
}
