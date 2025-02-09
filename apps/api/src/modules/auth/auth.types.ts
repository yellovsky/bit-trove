// global modules
import type { Effect } from 'effect';
import type { LoginWithEmailFP } from '@repo/api-models';

// common modules
import type { ApiError } from 'src/exceptions';
import type { DBUser } from 'src/db-models/user';

// =================================================================================
//                          S E R V I C E
// =================================================================================
export interface AuthService {
  validateUserByEmail(
    params: LoginWithEmailFP,
  ): Effect.Effect<DBUser, ApiError>;
}
