import type { Effect } from 'effect';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

import type { JWTTokenPayload } from './jwt-token';

export interface AccessTokenService {
  generate(payload: JWTTokenPayload): Effect.Effect<string, Error>;
  parse(token: string): Effect.Effect<JWTTokenPayload, Error>;
  validate(payload: unknown): Effect.Effect<JWTTokenPayload, Error>;
}

export const ACCESS_TOKEN_SRV = 'ACCESS_TOKEN_SRV' as InjectableIdentifier<AccessTokenService>;
