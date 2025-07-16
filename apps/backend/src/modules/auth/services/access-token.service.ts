import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Effect } from 'effect';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { APP_CONFIG_SRV } from 'src/modules/app-config';

import { AuthInvalidTokenError } from '../errors/auth-invalid-token.error';
import type { AccessTokenService } from '../interfaces/access-token.service.interface';
import type { JWTTokenPayload } from '../interfaces/jwt-token';

const isJWTTokenPayload = (payload: unknown): payload is JWTTokenPayload =>
  !!payload && typeof payload === 'object' && 'accountId' in payload && typeof payload.accountId === 'string';

@Injectable()
export class AccessTokenServiceImpl implements AccessTokenService {
  constructor(
    @Inject(JwtService)
    private readonly jwtSrv: JwtService,

    @Inject(APP_CONFIG_SRV)
    private readonly appConfigSrv: IdentifierOf<typeof APP_CONFIG_SRV>
  ) {}

  generate(payload: JWTTokenPayload): Effect.Effect<string, Error> {
    return Effect.tryPromise(() => this.jwtSrv.signAsync(payload, { secret: this.appConfigSrv.jwtSecret }));
  }

  parse(token: string): Effect.Effect<JWTTokenPayload, Error> {
    return Effect.tryPromise(() => this.jwtSrv.verifyAsync(token, { secret: this.appConfigSrv.jwtSecret }));
  }

  validate(payload: unknown): Effect.Effect<JWTTokenPayload, Error> {
    return Effect.gen(this, function* () {
      if (!isJWTTokenPayload(payload)) return yield* Effect.fail(new AuthInvalidTokenError());
      return payload;
    });
  }
}
