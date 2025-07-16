import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Effect } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { ROUNDS_OF_HASHING } from '../config/constants';
import type { BcryptService } from '../interfaces/bcrypt.service.interface';

@Injectable()
export class BcryptServiceImpl implements BcryptService {
  hash(pwd: string, roundsOfHashing = ROUNDS_OF_HASHING): Effect.Effect<string, UnknownException> {
    return Effect.tryPromise(() => bcrypt.hash(pwd, roundsOfHashing));
  }

  compare(pwd: string, pwdToCompare: string): Effect.Effect<boolean, UnknownException> {
    return Effect.tryPromise(() => bcrypt.compare(pwd, pwdToCompare));
  }
}
