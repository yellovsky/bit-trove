// global modules
import * as bcrypt from 'bcrypt';
import { Effect } from 'effect';
import { Injectable } from '@nestjs/common';

const ROUNDS_OF_HASHING = 10;

/**
 * Service for handling bcrypt hashing and comparison operations.
 */
@Injectable()
export class BcryptService {
  /**
   * Hashes a password using bcrypt.
   *
   * @param pwd - The password to hash.
   * @param roundsOfHashing - The number of rounds of hashing to apply. Defaults to `ROUNDS_OF_HASHING`.
   * @returns An `Effect` that resolves to the hashed password or an error.
   */
  hash(
    pwd: string,
    roundsOfHashing = ROUNDS_OF_HASHING,
  ): Effect.Effect<string, Error> {
    return Effect.tryPromise(() => bcrypt.hash(pwd, roundsOfHashing));
  }

  /**
   * Compares a password with a hashed password using bcrypt.
   *
   * @param pwd - The plain text password to compare.
   * @param pwdToCompare - The hashed password to compare against.
   * @returns An `Effect` that resolves to a boolean indicating whether the passwords match or an error.
   */
  compare(pwd: string, pwdToCompare: string): Effect.Effect<boolean, Error> {
    return Effect.tryPromise(() => bcrypt.compare(pwd, pwdToCompare));
  }
}
