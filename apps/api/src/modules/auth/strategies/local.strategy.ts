// global modules
import { Effect } from 'effect';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { RequestContextService } from 'src/modules/request-context';
import { annotateLogs, RuntimeService } from 'src/modules/runtime';

// local modules
import { AuthService } from '../services/auth.service';
import type { DBAccount } from '../repositories/account.db-models';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject()
    private readonly runtime: RuntimeService,

    @Inject()
    private readonly authSrv: AuthService,

    @Inject()
    private readonly requestContextSrv: RequestContextService,
  ) {
    super({ passReqToCallback: true, usernameField: 'email' });
  }

  async validate(
    request: Request,
    email: string,
    password: string,
  ): Promise<DBAccount> {
    const program: Effect.Effect<DBAccount, Error> = Effect.gen(
      this,
      function* () {
        yield* Effect.logDebug('email', email);
        const reqCtx = yield* this.requestContextSrv.get(request);
        const dbAccount = yield* this.authSrv.validateAccountByEmail(reqCtx, {
          email,
          password,
        });

        return dbAccount;
      },
    ).pipe(annotateLogs(LocalStrategy, 'validate'));
    return this.runtime.runPromise(program);
  }
}
