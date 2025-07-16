import type { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

export interface BcryptService {
  hash(pwd: string, roundsOfHashing?: number): Effect.Effect<string, UnknownException>;
  compare(pwd: string, pwdToCompare: string): Effect.Effect<boolean, UnknownException>;
}

export const BCRYPT_SRV = 'BCRYPT_SRV' as InjectableIdentifier<BcryptService>;
