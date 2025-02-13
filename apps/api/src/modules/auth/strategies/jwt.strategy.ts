// global modules
import { Effect } from 'effect';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { AppConfigService } from 'src/modules/app-config';
import { RequestContextService } from 'src/modules/request-context';
import { UnauthorizedAPIError } from 'src/exceptions';
import { annotateLogs, RuntimeService } from 'src/modules/runtime';

// local modules
import { AuthService } from '../services/auth.service';
import type { DBAccount } from '../repositories/account.db-models';
import type { JWTTokenPayload } from '../services/access-token.service';

export const ACCESS_TOKEN_COOKIE_KEY = 'access_token';

const ExtractJwtFromCookies = (req: Request): string | null => {
  const access_token = req.cookies?.[ACCESS_TOKEN_COOKIE_KEY];
  return typeof access_token === 'string' && access_token.length
    ? access_token
    : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject()
    private readonly runtime: RuntimeService,

    @Inject()
    private readonly authSrv: AuthService,

    @Inject()
    private readonly requestContextSrv: RequestContextService,

    @Inject()
    readonly appConfigSrv: AppConfigService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwtFromCookies,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      passReqToCallback: true,
      secretOrKey: appConfigSrv.jwtSecret,
    });
  }

  async validate(
    _request: Request,
    _payload: JWTTokenPayload,
  ): Promise<DBAccount> {
    const program: Effect.Effect<DBAccount, Error> = Effect.gen(
      this,
      function* () {
        // const reqCtx = yield* this.requestContextSrv.get(request);
        // const dbUser = yield* this.authSrv.validateAccountByEmail(reqCtx, {
        //   email,
        //   password,
        // });

        // if (!dbUser) return yield* new UnauthorizedAPIError({});
        // return dbUser;

        return yield* new UnauthorizedAPIError({});
      },
    ).pipe(annotateLogs(JwtStrategy, 'validate'));

    return this.runtime.runPromise(program);
  }
}
