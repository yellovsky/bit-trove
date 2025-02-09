// global modules
import { useCallback } from 'react';
import type { FailedResponse, PaginationFP } from '@repo/api-models';
import type { QueryFunction, QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// common modules
import { useApiClient } from '~/api/api-client';

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
    makeQueryFn,
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
      async (context: QueryFunctionContext<TQKey, PaginationFP>) => {
        const response = await makeQueryFn(apiClient)(context);

        if (onSuccess) {
          await onSuccess(queryClient, response, getQueryKeyVariables(context.queryKey), context);
        }

        return response;
      },
      [makeQueryFn, apiClient],
    );

    return useQuery<TResponse, FailedResponse, TResponse, TQKey>({
      queryFn,
      queryKey: makeQueryKey(fp),
      ...options,
    });
  };
