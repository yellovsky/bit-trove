// global modules
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBUser } from 'src/db-models/user';
import type { JWTTokenPayload } from 'src/modules/oauth';
import { APP_CONFIG_SRV, type AppConfigService } from 'src/modules/app-config';

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
    @Inject(APP_CONFIG_SRV)
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

  async validate(payload: JWTTokenPayload): Promise<DBUser> {
    return { email: payload.email };
  }
}
