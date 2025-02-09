// global modules
import { Effect } from 'effect';
import { useCallback } from 'react';
import type { FailedResponse, PaginationFP } from '@repo/api-models';
import type { QueryFunction, UseQueryOptions } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// common modules
import { runAsyncEffect } from '~/utils/effect';
import { isFailedResponse, UNKNOWN_FAILED_RESPONSE, useApiClient } from '~/api/api-client';

// local modules
import type { MakeUseQueryParams } from './query.types';
import { getQueryKeyVariables, type QKey } from './query.key';

/**
 * Creates a custom hook for making queries using `useQuery` from `react-query`.
 *
 * @template TResponse - The type of the response data.
 * @template TQKey - The type of the query key.
 * @param {MakeUseQueryParams<TResponse, TQKey>} params - The parameters for creating the hook.
 * @returns {Function} - The custom hook for making queries.
 */
export const makeUseQuery =
  <TResponse, TQKey extends QKey>({
    endpointQFn,
    makeQueryKey,
    onSuccess,
  }: MakeUseQueryParams<TResponse, TQKey>) =>
  (
    fp: TQKey[2],
    options?: Omit<
      UseQueryOptions<TResponse, FailedResponse, TResponse, TQKey>,
      'queryFn' | 'queryKey'
    >,
  ) => {
    const apiClient = useApiClient();
    const queryClient = useQueryClient();

    const queryFn: QueryFunction<TResponse, TQKey, PaginationFP> = useCallback(
      context => {
        const pipeline: Effect.Effect<TResponse, FailedResponse> = Effect.gen(function* () {
          const response = yield* endpointQFn(apiClient)(context);

          if (onSuccess) {
            yield* Effect.tryPromise(async () =>
              onSuccess(queryClient, response, getQueryKeyVariables(context.queryKey), context),
            );
          }

          return response;
        }).pipe(
          Effect.mapError(error => (isFailedResponse(error) ? error : UNKNOWN_FAILED_RESPONSE)),
        );

        return runAsyncEffect(pipeline);
      },
      [endpointQFn, apiClient],
    );

    return useQuery<TResponse, FailedResponse, TResponse, TQKey>({
      queryFn,
      queryKey: makeQueryKey(fp),
      ...options,
    });
  };
