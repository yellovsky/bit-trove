// global modules
import { Effect } from 'effect';
import { useCallback } from 'react';
import type { FailedResponse, ListResponse, PaginationFP } from '@repo/api-models';

import {
  type InfiniteData,
  type QueryFunction,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

// common modules
import { runAsyncEffect } from '~/utils/effect';
import { getNextPageParam, initialPageParam } from '~/api/pagination';
import { isFailedResponse, UNKNOWN_FAILED_RESPONSE, useApiClient } from '~/api/api-client';

// local modules
import { getQueryKeyVariables, type QKey } from './query.key';
import type { MakeUseQueryParams, UseInfiniteListQuery } from './query.types';

/**
 * Creates a custom hook for making an infinite list query.
 *
 * @template TListResponse - The type of the list response.
 * @template TQKey - The type of the query key.
 * @param {MakeUseQueryParams<TListResponse, TQKey>} params - The parameters for creating the hook.
 * @returns {UseInfiniteListQuery<TListResponse, TQKey>} - The custom hook for making an infinite list query.
 */
export const makeUseInfiniteListQuery =
  <TListResponse extends ListResponse<unknown>, TQKey extends QKey>({
    endpointQFn,
    makeQueryKey,
    onSuccess,
  }: MakeUseQueryParams<TListResponse, TQKey, PaginationFP>): UseInfiniteListQuery<
    TListResponse,
    TQKey
  > =>
  (fp, options) => {
    const apiClient = useApiClient();
    const queryClient = useQueryClient();

    const queryFn: QueryFunction<TListResponse, TQKey, PaginationFP> = useCallback(
      context => {
        const pipeline: Effect.Effect<TListResponse, FailedResponse> = Effect.gen(function* () {
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

    return useInfiniteQuery<
      TListResponse,
      FailedResponse,
      InfiniteData<TListResponse>,
      TQKey,
      PaginationFP
    >({
      getNextPageParam,
      initialPageParam,
      queryFn,
      queryKey: makeQueryKey(fp),
      ...options,
    });
  };
