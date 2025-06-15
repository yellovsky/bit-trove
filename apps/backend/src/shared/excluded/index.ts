import { Data, type Either } from 'effect';
import type { UnknownException } from 'effect/Cause';

import { FailedResponseDto } from '../dto/failure-response.dto';

enum ExclusionReasonKind {
  NOT_FOUND = 'NOT_FOUND',
  ACCESS_DENIED = 'ACCESS_DENIED',
  NOT_PUBLISHED = 'NOT_PUBLISHED',
  INSUFFICIENT_DATA_TO_TRANSLATE = 'INSUFFICIENT_DATA_TO_TRANSLATE',
  UNKNOWN = 'UNKNOWN',
  NOT_ENOUGH_DATA = 'NOT_ENOUGH_DATA',
}

interface ReasonMeta {
  httpMessage?: string;
  message?: string;
}

type ReasonParams = ReasonMeta & { reason: ExclusionReasonKind };

export abstract class ExclusionReason extends Data.TaggedError('ExclusionReason')<ReasonParams> {
  abstract toFailedResponseDto(): FailedResponseDto;
}

export class UnknownReason extends ExclusionReason {
  constructor(params?: ReasonMeta) {
    super({ ...params, reason: ExclusionReasonKind.UNKNOWN });
  }

  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'unknown_error',
      httpCode: 500,
      message: this.httpMessage || 'Unknown error',
      timestamp: Date.now(),
    });
  }
}

export class NotFoundReason extends ExclusionReason {
  constructor(params?: ReasonMeta) {
    super({ ...params, reason: ExclusionReasonKind.NOT_FOUND });
  }

  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'not_found',
      httpCode: 404,
      message: this.httpMessage || 'Not found',
      timestamp: Date.now(),
    });
  }
}

export class AccessDeniedReason extends ExclusionReason {
  constructor(params?: ReasonMeta) {
    super({ ...params, reason: ExclusionReasonKind.ACCESS_DENIED });
  }

  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'forbidden',
      httpCode: 403,
      message: this.httpMessage || 'Access denied',
      timestamp: Date.now(),
    });
  }
}

export class NotPublishedReason extends ExclusionReason {
  constructor(params?: ReasonMeta) {
    super({ ...params, reason: ExclusionReasonKind.NOT_PUBLISHED });
  }

  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'not_found',
      httpCode: 404,
      message: this.httpMessage || 'Not published',
      timestamp: Date.now(),
    });
  }
}

export class TranslationDataMissingReason extends ExclusionReason {
  constructor(params?: ReasonMeta) {
    super({ ...params, reason: ExclusionReasonKind.INSUFFICIENT_DATA_TO_TRANSLATE });
  }

  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'not_found',
      httpCode: 404,
      message: this.httpMessage || 'Insufficient data to translate',
      timestamp: Date.now(),
    });
  }
}

export class NotEnoughDataReason extends ExclusionReason {
  constructor(params?: ReasonMeta) {
    super({ ...params, reason: ExclusionReasonKind.NOT_ENOUGH_DATA });
  }

  toFailedResponseDto(): FailedResponseDto {
    return FailedResponseDto.from({
      code: 'unknown_error',
      httpCode: 500,
      message: this.httpMessage || 'Unknown error',
      timestamp: Date.now(),
    });
  }
}

// The Either variant
export type ResultOrExcluded<T> = Either.Either<T, ExclusionReason>;

export const ensureKnownReason = (err: ExclusionReason | UnknownException): ExclusionReason =>
  err instanceof ExclusionReason ? err : new UnknownReason();
