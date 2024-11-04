// global modules
import * as R from 'ramda';
import type { NonEmptyArray } from 'effect/Array';
import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Cause, Option } from 'effect';
import { FiberFailureCauseId, isFiberFailure } from 'effect/Runtime';

import {
  type ApiErrorName,
  type FailedResponse,
  type ResponseError,
} from '@repo/api-models';

// common modules
import { isAPIError } from 'src/exceptions';

/**
 * Represents an internal server error response.
 *
 * @constant
 * @type {ApiResponseError}
 * @property {string} error_name - The name of the error.
 * @property {number} status_code - The HTTP status code for the error.
 */
const INTERNAL_SERVER_ERROR: ResponseError = {
  error_name: 'internal_server_error',
  status_code: 500,
};

const errorNameByCode: Partial<Record<number, ApiErrorName>> = {
  [HttpStatus.BAD_REQUEST]: 'bad_request',
  [HttpStatus.FORBIDDEN]: 'forbidden',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'internal_server_error',
  [HttpStatus.NOT_FOUND]: 'not_found',
  [HttpStatus.UNAUTHORIZED]: 'unauthorized',
};

const getErrorApiResponseFromException = (
  exception: Error,
): Option.Option<NonEmptyArray<ResponseError>> => {
  if (!(exception instanceof HttpException)) return Option.none();

  const status_code = exception.getStatus();
  const error_name = errorNameByCode[status_code];

  return !error_name
    ? Option.some([INTERNAL_SERVER_ERROR])
    : Option.some([{ error_name, message: exception.message, status_code }]);
};

/**
 * Transforms a Fiber failure error into an API response error.
 *
 * @param error - The error object to be transformed.
 * @returns An Option containing a NonEmptyArray of ApiResponseError if the error is a Fiber failure,
 *          otherwise returns Option.none().
 */
const getErrorApiResponseFromFiberFailure = (
  error: Error,
): Option.Option<NonEmptyArray<ResponseError>> => {
  if (!isFiberFailure(error)) return Option.none();

  const cause = error[FiberFailureCauseId];

  if (!Cause.isFailType(cause)) return Option.some([INTERNAL_SERVER_ERROR]);
  if (!isAPIError(cause.error)) return Option.some([INTERNAL_SERVER_ERROR]);

  return Option.some([
    {
      error_name: cause.error._tag,
      invalid_params: cause.error.invalid_params,
      message: cause.error.message,
      status_code: cause.error.status_code,
    },
  ]);
};

/**
 * Generates an API response based on the provided error.
 *
 * This function attempts to derive an appropriate API response from the given error
 * by checking it against multiple potential error sources. It returns the first
 * matching error response, sorted by status code, or defaults to an internal server
 * error if no specific error response is found.
 *
 * @param error - The error object to generate the API response from.
 * @returns An object containing the HTTP status code and the corresponding error response.
 */
const getErrorApiResponse = (
  error: Error,
): { status: number; response: FailedResponse } => {
  const errors = Option.firstSomeOf([
    getErrorApiResponseFromFiberFailure(error),
    getErrorApiResponseFromException(error),
  ]).pipe(
    Option.map(R.reverse<ResponseError>),
    Option.map(R.sortBy(R.prop('status_code'))),
    Option.getOrElse(() => [INTERNAL_SERVER_ERROR]),
  );

  return {
    response: { errors, meta: { status: errors[0].status_code } },
    status: errors[0].status_code,
  };
};

/**
 * A filter that handles HTTP exceptions and formats the response.
 * Implements the `ExceptionFilter` interface.
 *
 * @class
 * @implements {ExceptionFilter}
 */
@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { response: errorResponse, status } = getErrorApiResponse(exception);

    response.status(status).json(errorResponse);
  }
}
