// global modules
import { useCallback } from 'react';
import type { FailedResponse, ListResponse, PaginationFP } from '@repo/api-models';
import type { InfiniteData, QueryFunction, QueryFunctionContext } from '@tanstack/react-query';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

// common modules
import { useApiClient } from '~/api/api-client';
import { getNextPageParam, initialPageParam } from '~/api/pagination';

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
    makeQueryFn,
    makeQueryKey,
    onSuccess,
  }: MakeUseQueryParams<TListResponse, TQKey>): UseInfiniteListQuery<TListResponse, TQKey> =>
  (fp, options) => {
    const apiClient = useApiClient();
    const queryClient = useQueryClient();

    const queryFn: QueryFunction<TListResponse, TQKey, PaginationFP> = useCallback(
      async (context: QueryFunctionContext<TQKey, PaginationFP>) => {
        const response = (await makeQueryFn(apiClient)(context)) as TListResponse;

        if (onSuccess) {
          await onSuccess(queryClient, response, getQueryKeyVariables(context.queryKey), context);
        }

        return response;
      },
      [makeQueryFn, apiClient],
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
