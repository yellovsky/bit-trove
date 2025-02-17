// global modules
import { Effect } from 'effect';
import { JwtService } from '@nestjs/jwt';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

// common modules
import { annotateLogs } from 'src/modules/runtime';
import { AppConfigService } from 'src/modules/app-config';

export interface JWTTokenPayload {
  email: string;
}

export const isJWTTokenPayload = (
  payload: unknown,
): payload is JWTTokenPayload =>
  !!payload &&
  typeof payload === 'object' &&
  'email' in payload &&
  typeof payload.email === 'string';

/**
 * Service for handling OAuth access tokens using JWT.
 *
 * This service provides methods to generate and parse JWT access tokens.
 */
@Injectable()
export class AccessTokenService {
  constructor(
    private readonly jwtSrv: JwtService,

    @Inject()
    private readonly appConfigSrv: AppConfigService,
  ) {}

  /**
   * Generates a JWT access token based on the provided payload.
   *
   * @param payload - The payload to be included in the JWT token.
   * @returns An Effect that resolves to a signed JWT token string or an Error.
   */
  generate(payload: JWTTokenPayload): Effect.Effect<string, Error> {
    return Effect.gen(this, function* () {
      yield* Effect.logDebug('payload', payload);

      return yield* Effect.tryPromise(() =>
        this.jwtSrv.signAsync(payload, {
          secret: this.appConfigSrv.jwtSecret,
        }),
      );
    }).pipe(annotateLogs(AccessTokenService, 'generate'));
  }

  /**
   * Parses a given JWT token and returns its payload.
   *
   * @param token - The JWT token to be parsed.
   * @returns An Effect that resolves to the JWT token payload or an Error.
   */
  parse(token: string): Effect.Effect<JWTTokenPayload, Error> {
    return Effect.gen(this, function* () {
      const payload = yield* Effect.tryPromise(() =>
        this.jwtSrv.verifyAsync(token, {
          secret: this.appConfigSrv.jwtSecret,
        }),
      );

      return yield* this.validate(payload);
    }).pipe(annotateLogs(AccessTokenService, 'parse'));
  }

  validate(payload: unknown): Effect.Effect<JWTTokenPayload, Error> {
    return isJWTTokenPayload(payload)
      ? Effect.succeed(payload)
      : Effect.fail(new InternalServerErrorException());
  }
}
