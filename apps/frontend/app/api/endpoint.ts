// global modules
import type { FailedResponse } from '@repo/api-models';
import { Cause, type Effect } from 'effect';
import { FiberFailureCauseId, isFiberFailure } from 'effect/Runtime';

// local modules
import { type ApiClient, isFailedResponse, UNKNOWN_FAILED_RESPONSE } from './api-client';

export type EndpointFn<TResponse, TParams> = (
  apiClient: ApiClient,
) => (params: {
  params: TParams;
  signal?: AbortSignal;
}) => Effect.Effect<TResponse, FailedResponse>;

export const catchFailedResponse = (error: unknown) => {
  if (isFiberFailure(error)) {
    const cause = error[FiberFailureCauseId];
    if (Cause.isFailType(cause) && isFailedResponse(cause.error)) throw cause.error;
  }

  throw UNKNOWN_FAILED_RESPONSE;
};
