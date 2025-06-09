import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException } from '@nestjs/common';
import * as parser from 'accept-language-parser';
import { Cause } from 'effect/index';
import { type FiberFailure, FiberFailureCauseId, isFiberFailure } from 'effect/Runtime';
import type { Request, Response } from 'express';
import type { TFunction } from 'i18next';
import { ZodError } from 'zod';

import { FailedResponseDto } from 'src/shared/dto/failure-response.dto';

import type { I18nService } from 'src/modules/i18n';

import { ExclusionReason } from './shared/excluded';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18nSrv: I18nService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const failedResponse = this.#getResponse(exception, host);
    return response.status(failedResponse.error.httpCode).json(failedResponse);
  }

  #getFiberFailureError(failure: FiberFailure): Error {
    const cause = failure[FiberFailureCauseId];
    if (!Cause.isFailType(cause)) return new Error('Faiber failure is not cause');
    return cause.error instanceof Error ? cause.error : new Error('Cause not an error');
  }

  #getResponse(exception: Error, host: ArgumentsHost): FailedResponseDto {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    if (isFiberFailure(exception)) {
      return this.#getResponse(this.#getFiberFailureError(exception), host);
    }

    if (exception instanceof ExclusionReason) {
      return exception.toFailedResponseDto();
    }

    if (exception instanceof FailedResponseDto) {
      return exception;
    }

    if (exception instanceof HttpException) {
      return FailedResponseDto.fromHttpException(exception);
    }

    if (exception instanceof ZodError) {
      const locale = this.#getRequestLocale(request);
      const t: TFunction = this.i18nSrv.getFixedT(locale);

      return FailedResponseDto.fromZodError(t, exception);
    }

    // TODO: add logger
    console.error('Unhandled error', exception);
    return FailedResponseDto.from({
      code: 'unknown_error',
      httpCode: 500,
      message: 'Unknown error',
      timestamp: new Date(),
    });
  }

  #getRequestLocale(request: Request): string {
    const queryLocale = request.query.locale;
    if (queryLocale && typeof queryLocale === 'string') return queryLocale;

    const header = request.headers['accept-language'];
    const headerLocale = header ? parser.pick(this.i18nSrv.supportedLngs, header) : undefined;
    if (headerLocale) return headerLocale;

    return this.i18nSrv.fallbackLng;
  }
}
