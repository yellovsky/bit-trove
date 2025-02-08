// global modules
import { Effect } from 'effect';

// =============================================================================
//                       A C C E S S   T O K E N
// =============================================================================
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
export interface OauthAccessTokenService {
  /**
   * Generates a JWT access token based on the provided payload.
   *
   * @param payload - The payload to be included in the JWT token.
   * @returns An Effect that resolves to a signed JWT token string or an Error.
   */
  generate(payload: JWTTokenPayload): Effect.Effect<string, Error>;

  /**
   * Parses a given JWT token and returns its payload.
   *
   * @param token - The JWT token to be parsed.
   * @returns An Effect that resolves to the JWT token payload or an Error.
   */
  parse(token: string): Effect.Effect<JWTTokenPayload, Error>;

  validate(payload: unknown): Effect.Effect<JWTTokenPayload, Error>;
}

// =============================================================================
//                       B C R Y P T   S E R V I C E
// =============================================================================
export interface OauthBcryptService {
  /**
   * Hashes a password using bcrypt.
   *
   * @param pwd - The password to hash.
   * @param roundsOfHashing - The number of rounds of hashing to apply. Defaults to `ROUNDS_OF_HASHING`.
   * @returns An `Effect` that resolves to the hashed password or an error.
   */
  hash(pwd: string, roundsOfHashing?: number): Effect.Effect<string, Error>;

  /**
   * Compares a password with a hashed password using bcrypt.
   *
   * @param pwd - The plain text password to compare.
   * @param pwdToCompare - The hashed password to compare against.
   * @returns An `Effect` that resolves to a boolean indicating whether the passwords match or an error.
   */
  compare(pwd: string, pwdToCompare: string): Effect.Effect<boolean, Error>;
}
