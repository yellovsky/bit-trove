import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { ExclusionReason } from 'src/shared/excluded';
import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { TxRequestContext } from 'src/shared/utils/request-context';

import type { ProfileModel } from 'src/modules/acount';

import type { JWTTokenPayload } from './jwt-token';

export interface AuthService {
  validateProfileByEmail(
    txReqCtx: TxRequestContext,
    email: string,
    password: string
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException>;

  validateProfileByJWTTokenPayload(
    txReqCtx: TxRequestContext,
    payload: JWTTokenPayload
  ): Effect.Effect<ProfileModel, ExclusionReason | UnknownException>;
}

export const AUTH_SRV = 'AUTH_SRV' as InjectableIdentifier<AuthService>;
