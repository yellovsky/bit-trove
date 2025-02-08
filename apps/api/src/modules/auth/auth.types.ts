// global modules
import type { Effect } from 'effect';
import type { LoginWithEmailFP } from '@repo/api-models';

// common modules
import type { ApiError } from 'src/exceptions';
import type { DBUser } from 'src/db-models/user';
import type { LoginResponseEntity } from 'src/entities/auth';
import type { SerializerContext } from 'src/types/context';

// =================================================================================
//                         S E R I A L I Z E R
// =================================================================================
export interface AuthSerializerService {
  loginResponse(
    ctx: SerializerContext,
    accessToken: string,
  ): Effect.Effect<LoginResponseEntity, ApiError>;
}

// =================================================================================
//                          S E R V I C E
// =================================================================================
export interface AuthService {
  validateUserByEmail(
    params: LoginWithEmailFP,
  ): Effect.Effect<DBUser, ApiError>;
}
