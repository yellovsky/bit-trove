// global modules
import { Cause, type Effect } from 'effect';
import type { FailedResponse, PaginationFP } from '@repo/api-models';
import { FiberFailureCauseId, isFiberFailure } from 'effect/Runtime';
import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

// local modules
import { type ApiClient, isFailedResponse, UNKNOWN_FAILED_RESPONSE } from './api-client';

export type EndpointFn<TResponse, TVariables, TPageParam = never> = (apiClient: ApiClient) => (
  params: Pick<QueryFunctionContext<QueryKey, TPageParam>, 'pageParam'> & {
    signal?: AbortSignal;
    variables: TVariables;
  },
) => Effect.Effect<TResponse, FailedResponse>;

export type EndpointQFn<TResponse, TQueryKey extends QueryKey, TPageParam = never> = (
  apiClient: ApiClient,
) => (
  context: QueryFunctionContext<TQueryKey, TPageParam>,
) => Effect.Effect<TResponse, FailedResponse>;

export type EndpointListQFn<TResponse, TQueryKey extends QueryKey> = EndpointQFn<
  TResponse,
  TQueryKey,
  PaginationFP
>;

export type EndpointListFn<TResponse, TQueryKey> = EndpointFn<TResponse, TQueryKey, PaginationFP>;

export const catchFailedResponse = (error: unknown) => {
  if (isFiberFailure(error)) {
    const cause = error[FiberFailureCauseId];
    if (Cause.isFailType(cause) && isFailedResponse(cause.error)) throw cause.error;
  }

  throw UNKNOWN_FAILED_RESPONSE;
};
