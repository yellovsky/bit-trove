import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Effect } from 'effect';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import { requestContextFromRequest } from 'src/shared/utils/request-context';

import type { ProfileModel } from 'src/modules/acount';
import { APP_CONFIG_SRV } from 'src/modules/app-config';
import { PRISMA_SRV } from 'src/modules/prisma';

import { ACCESS_TOKEN_COOKIE_KEY } from '../config/constants';
import { AUTH_SRV } from '../interfaces/auth.service.interface';
import type { JWTTokenPayload } from '../interfaces/jwt-token';

const ExtractJwtFromCookies = (req: Request): string | null => {
  const access_token = req.cookies?.[ACCESS_TOKEN_COOKIE_KEY];
  return typeof access_token === 'string' && access_token.length ? access_token : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  #logger = new Logger(JwtStrategy.name);

  constructor(
    @Inject(AUTH_SRV)
    private readonly authSrv: IdentifierOf<typeof AUTH_SRV>,

    @Inject(APP_CONFIG_SRV)
    readonly appConfigSrv: IdentifierOf<typeof APP_CONFIG_SRV>,

    @Inject(PRISMA_SRV)
    private readonly prismaSrv: IdentifierOf<typeof PRISMA_SRV>
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwtFromCookies, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      passReqToCallback: true,
      secretOrKey: appConfigSrv.jwtSecret,
    });
  }

  async validate(request: Request, payload: JWTTokenPayload): Promise<ProfileModel> {
    const reqCtx = requestContextFromRequest(request);

    this.#logger.debug('Validating JWT token');
    this.#logger.debug(`  > payload: ${JSON.stringify(payload)}`);

    const pipeline: Effect.Effect<ProfileModel, Error> = this.authSrv
      .validateProfileByJWTTokenPayload(reqCtx.withTx(this.prismaSrv), payload)
      .pipe(Effect.mapError(() => new Error(`Account ${payload.accountId} has no ${payload.profileId} profile`)));

    return Effect.runPromise(pipeline);
  }
}
