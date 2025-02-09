// global modules
import type { FailedResponse, ListResponse, PaginationFP } from '@repo/api-models';

import type {
  InfiniteData,
  QueryClient,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

// common modules
import type { ApiClient } from '~/api/api-client';

// local modules
import type { MakeQueryKey, QKey, QueryKeyVariables } from './query.key';

export type InvalidateQuery = (queryClient: QueryClient) => Promise<void>;

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

export type UseInfiniteListQuery<
  TListResponse extends ListResponse<unknown>,
  TQKey extends QKey,
> = (
  fp: QueryKeyVariables<TQKey>,
  options?: UseInfiniteQueryShortOptions<TListResponse, TQKey>,
) => UseInfiniteQueryResult<InfiniteData<TListResponse>, FailedResponse>;

export type MakeQueryFn<TResponse, TQKey extends QKey> = (
  apiClient: ApiClient,
) => TResponse extends ListResponse<unknown>
  ? QueryFunction<TResponse, TQKey, PaginationFP>
  : QueryFunction<TResponse, TQKey>;

export interface MakeUseQueryParams<TListResponse, TQKey extends QKey> {
  makeQueryFn: MakeQueryFn<TListResponse, TQKey>;
  makeQueryKey: MakeQueryKey<TQKey>;
  onSuccess?: (
    queryClient: QueryClient,
    response: TListResponse,
    variables: TQKey[2],
    context: unknown,
  ) => void;
}
