// global modules
import { Cause } from 'effect';
import type { FailedResponse } from '@repo/api-models';
import { Response } from 'express';

import {
  type FiberFailure,
  FiberFailureCauseId,
  isFiberFailure,
} from 'effect/Runtime';

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

const getFiberFailureError = (failure: FiberFailure) => {
  const cause = failure[FiberFailureCauseId];

  if (!Cause.isFailType(cause)) return new Error('Faiber failure is not cause');

  return cause.error instanceof Error
    ? cause.error
    : new Error('Cause not an error');
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
    const error = isFiberFailure(exception)
      ? getFiberFailureError(exception)
      : exception;

    if (error instanceof NotFoundException) {
      return response.status(HttpStatus.NOT_FOUND).json({
        error: { error_name: 'not_found', status_code: HttpStatus.NOT_FOUND },
        meta: { status: HttpStatus.NOT_FOUND },
      } satisfies FailedResponse);
    } else if (error instanceof ForbiddenException) {
      return response.status(HttpStatus.FORBIDDEN).json({
        error: { error_name: 'forbidden', status_code: HttpStatus.FORBIDDEN },
        meta: { status: HttpStatus.FORBIDDEN },
      } satisfies FailedResponse);
    } else if (error instanceof UnauthorizedException) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        error: {
          error_name: 'unauthorized',
          status_code: HttpStatus.UNAUTHORIZED,
        },
        meta: { status: HttpStatus.UNAUTHORIZED },
      } satisfies FailedResponse);
    } else if (error instanceof BadRequestException) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error: {
          error_name: 'bad_request',
          status_code: HttpStatus.BAD_REQUEST,
        },
        meta: { status: HttpStatus.BAD_REQUEST },
      } satisfies FailedResponse);
    } else {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: {
          error_name: 'internal_server_error',
          status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        meta: { status: HttpStatus.INTERNAL_SERVER_ERROR },
      } satisfies FailedResponse);
    }
  }
}
