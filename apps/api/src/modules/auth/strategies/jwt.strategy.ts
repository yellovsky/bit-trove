// global modules
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { AppConfigService } from 'src/modules/app-config';
import type { DBAccount } from 'src/modules/account';
import { RuntimeService } from 'src/modules/runtime';

// local modules
import { AuthService } from '../services/auth.service';
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
    readonly appConfigSrv: AppConfigService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwtFromCookies,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: appConfigSrv.jwtSecret,
    });
  }

  async validate(payload: JWTTokenPayload): Promise<DBAccount> {
    return this.runtime.runPromise(
      this.authSrv.validateAccountByJWTTokenPayload(payload),
    );
  }
}
