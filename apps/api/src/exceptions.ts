// @ts-nocheck
// global modules
import { HttpStatus } from '@nestjs/common';
import type { ApiErrorName, FailedResponse } from '@repo/api-models';
import { type Cause, Data } from 'effect';

const HttpStatusLookup: Record<ApiErrorName, HttpStatus> = {
  bad_request: HttpStatus.BAD_REQUEST,
  forbidden: HttpStatus.FORBIDDEN,
  internal_server_error: HttpStatus.INTERNAL_SERVER_ERROR,
  not_found: HttpStatus.NOT_FOUND,
  unauthorized: HttpStatus.UNAUTHORIZED,
} as const;

type InvalidParams = FailedResponse['error']['invalid_params'];

/**
 * Represents an API error with additional metadata.
 *
 * @typedef {Object} ApiError
 * @property {ApiErrorName} _tag - A unique tag identifying the type of API error.
 * @property {HttpStatus} status - The HTTP status code associated with the error.
 * @property {string} [message] - An optional message providing more details about the error.
 * @property {InvalidParams} [invalid_params] - Optional invalid parameters related to the error.
 *
 * @extends {Cause.YieldableError}
 */
export type ApiError = Cause.YieldableError & {
  readonly _tag: ApiErrorName;
} & Readonly<{
    status_code: HttpStatus;
    message?: string;
    invalid_params?: InvalidParams;
  }>;

/**
 * Creates a new API error class with a specified error name and HTTP status.
 *
 * @param errorName - The name of the API error.
 * @param status - The HTTP status code associated with the error.
 * @returns A new class that extends `Data.TaggedError` and implements `ApiError`.
 *
 * The returned class constructor accepts an object with the following optional properties:
 * - `message`: A custom error message.
 * - `invalid_params`: An array of invalid parameters related to the error.
 */
const makeAPIError = (
  errorName: ApiErrorName,
): new (args: {
  message?: string;
  invalid_params?: InvalidParams;
}) => ApiError => {
  class APIErrorClass
    extends Data.TaggedError(errorName)<{
      message?: string;
      invalid_params?: InvalidParams;
    }>
    implements ApiError
  {
    status_code = HttpStatusLookup[errorName];
  }

  return APIErrorClass;
};

/**
 * Represents an API error indicating that a requested resource was not found.
 *
 * This error is typically used when a client requests a resource that does not exist.
 * It is associated with the HTTP status code 404 (Not Found).
 *
 * @constant {APIError} NotFoundAPIError - The API error for resource not found.
 */
export const NotFoundAPIError = makeAPIError('not_found');

/**
 * Represents a Bad Request API error.
 * This error is typically used to indicate that the server cannot process the request due to a client error.
 *
 * @constant {APIError} BadRequestAPIError - The Bad Request API error instance.
 */
export const BadRequestAPIError = makeAPIError('bad_request');

/**
 * Represents an API error indicating that the requested action is forbidden.
 *
 * This error is generated using the `makeAPIError` function with the error type
 * set to 'forbidden' and the HTTP status code set to `HttpStatus.FORBIDDEN`.
 *
 * @constant
 * @type {APIError}
 */
export const ForbiddenAPIError = makeAPIError('forbidden');

/**
 * Represents an internal server error in the API.
 * This error is used to indicate that the server encountered an unexpected condition
 * that prevented it from fulfilling the request.
 *
 * @constant
 * @type {APIError}
 * @see {@link HttpStatus.INTERNAL_SERVER_ERROR}
 */
export const InternalServerAPIError = makeAPIError('internal_server_error');

/**
 * Represents an API error for unauthorized access.
 *
 * This error is used to indicate that the client is not authorized to access the requested resource.
 * It is associated with the HTTP status code 401 (Unauthorized).
 *
 * @constant {APIError} UnauthorizedAPIError
 */
export const UnauthorizedAPIError = makeAPIError('unauthorized');

/**
 * Represents an API error indicating that the access token has expired.
 * This error is typically thrown when an API request is made with an expired access token.
 *
 * @constant {APIError} AccessTokenExpiredAPIError
 */
export const AccessTokenExpiredAPIError = makeAPIError('access_token_expired');

/**
 * Type guard to check if a given error is an instance of `ApiError`.
 *
 * @param error - The error to check.
 * @returns `true` if the error is an `ApiError`, otherwise `false`.
 */
export const isAPIError = (error: unknown): error is ApiError =>
  error instanceof NotFoundAPIError ||
  error instanceof BadRequestAPIError ||
  error instanceof ForbiddenAPIError ||
  error instanceof InternalServerAPIError ||
  error instanceof UnauthorizedAPIError ||
  error instanceof AccessTokenExpiredAPIError;

export const toApiError = (error: Error | ApiError): ApiError =>
  isAPIError(error)
    ? error
    : new InternalServerAPIError({ message: error.message });
