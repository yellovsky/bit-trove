/**
 * Represents a query key.
 *
 * @template TToken The type of the token.
 * @template TQKeyName The type of the query key.
 * @template TVariables The type of the variables.
 */
export type QKey<
  TToken extends string = string,
  TQKeyName extends string = string,
  TVariables = unknown,
> = [TToken, TQKeyName, TVariables];

/**
 * Retrieves the query key variables from a given query key.
 *
 * @param queryKey - The query key from which to extract the variables.
 * @returns The query key variables.
 */
export const getQueryKeyVariables = <TQKey extends QKey<string, string, unknown>>(
  queryKey: TQKey,
) => queryKey[2] as TQKey extends QKey<string, string, infer TVariables> ? TVariables : unknown;

/**
 * Represents a function that creates a query key based on the provided variables.
 * @template TQKey - The type of the query key.
 * @param variables - The variables used to create the query key.
 * @returns The created query key.
 */
export type MakeQueryKey<TQKey extends QKey> = (variables: TQKey[2]) => TQKey;

/**
 * Creates a query key generator function that tokenizes the query key and variables.
 *
 * @param token - The token to be used for tokenization.
 * @returns A function that generates a query key based on the provided token, query key, and variables.
 */
export const makeTokenizeQueryKey =
  <TToken extends string>(token: TToken) =>
  <TQKey extends string>(queryKey: TQKey) =>
  <TVariables>(variables: TVariables): QKey<TToken, TQKey, TVariables> => [
    token,
    queryKey,
    variables,
  ];
