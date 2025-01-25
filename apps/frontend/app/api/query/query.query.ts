// global modules
import { useCallback } from 'react';
import type { FailedResponse, ListResponse, PaginationFP } from '@repo/api-models';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  InfiniteData,
  QueryClient,
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';

// common modules
import { useLoggedIn } from '~/utils/auth/auth.use-logged-in';
import { type ApiClient, useApiClient } from '~/api/api-client';
import { getNextPageParam, initialPageParam } from '~/api/pagination';

// local modules
import { getQueryKeyVariables, type MakeQueryKey, type QKey } from './query.key';

/**
 * Creates a function that invalidates queries in the query client based on a token.
 * @param token The token used to identify the queries to invalidate.
 * @returns A function that takes a query client and returns a promise that resolves when the queries are invalidated.
 */
export const makeInvalidateQuery =
  <TToken extends string>(token: TToken) =>
  (queryClient: QueryClient): Promise<void> =>
    queryClient.invalidateQueries({
      predicate: query =>
        typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith(`#${token}--`),
    });

type UseInfiniteQueryShortOptions<
  TListResponse extends ListResponse<unknown>,
  TQKey extends QueryKey,
> = Omit<
  UseInfiniteQueryOptions<
    TListResponse,
    FailedResponse,
    InfiniteData<TListResponse>,
    TListResponse,
    TQKey,
    PaginationFP
  >,
  'getNextPageParam' | 'initialPageParam' | 'queryFn' | 'queryKey'
>;

export type MakeQueryFn<TResponse, TQKey extends QKey> = (
  apiClient: ApiClient,
) => TResponse extends ListResponse<unknown>
  ? QueryFunction<TResponse, TQKey, PaginationFP>
  : QueryFunction<TResponse, TQKey>;

interface MakeUseQueryParams<TListResponse, TQKey extends QKey> {
  makeQueryFn: MakeQueryFn<TListResponse, TQKey>;
  makeQueryKey: MakeQueryKey<TQKey>;
  getUnauthorizedResponse?: () => TListResponse;
  onSuccess?: (
    queryClient: QueryClient,
    response: TListResponse,
    variables: TQKey[2],
    context: unknown,
  ) => void;
}

export type UseInfiniteListQuery<
  TListResponse extends ListResponse<unknown>,
  TQKey extends QueryKey,
> = (
  fp: TQKey[2],
  options?: UseInfiniteQueryShortOptions<TListResponse, TQKey>,
) => UseInfiniteQueryResult<InfiniteData<TListResponse>, FailedResponse>;

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
    getUnauthorizedResponse,
    onSuccess,
  }: MakeUseQueryParams<TListResponse, TQKey>): UseInfiniteListQuery<TListResponse, TQKey> =>
  (fp, options) => {
    const loggedIn = useLoggedIn();
    const apiClient = useApiClient();
    const queryClient = useQueryClient();

    const queryFn: QueryFunction<TListResponse, TQKey, PaginationFP> = useCallback(
      async (context: QueryFunctionContext<TQKey, PaginationFP>) => {
        if (getUnauthorizedResponse && !loggedIn) return getUnauthorizedResponse();

        const response = (await makeQueryFn(apiClient)(context)) as TListResponse;

        if (onSuccess) {
          await onSuccess(queryClient, response, getQueryKeyVariables(context.queryKey), context);
        }

        return response;
      },
      [getUnauthorizedResponse, loggedIn, makeQueryFn, apiClient],
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
    getUnauthorizedResponse,
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
    const loggedIn = useLoggedIn();

    const queryFn: QueryFunction<TResponse, TQKey, PaginationFP> = useCallback(
      async (context: QueryFunctionContext<TQKey, PaginationFP>) => {
        if (getUnauthorizedResponse && !loggedIn) return getUnauthorizedResponse();

        const response = await makeQueryFn(apiClient)(context);

        if (onSuccess) {
          await onSuccess(queryClient, response, getQueryKeyVariables(context.queryKey), context);
        }

        return response;
      },
      [getUnauthorizedResponse, loggedIn, makeQueryFn, apiClient],
    );

    return useQuery<TResponse, FailedResponse, TResponse, TQKey>({
      queryFn,
      queryKey: makeQueryKey(fp),
      ...options,
    });
  };
