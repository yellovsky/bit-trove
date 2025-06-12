import { type InfiniteData, type QueryClient, type QueryFunction, useInfiniteQuery } from '@tanstack/react-query';

import type { FailedResponse, GetManyThoughtsQuery, GetManyThoughtsResponse, PageRequest } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getNextPageParam, initialPageParam } from '@shared/lib/page-params';

import { THOUGHTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const THOUGHTS_QUERY_KEY_TOKEN = 'thoughts';

export type GetManyThoughtsVariables = Omit<GetManyThoughtsQuery, 'page'>;
type GetManyThoughtsQKey = readonly [
  typeof THOUGHTS_ENTITY_QUERY_KEY_TOKEN,
  typeof THOUGHTS_QUERY_KEY_TOKEN,
  GetManyThoughtsVariables,
];

const makeGetManyThoughtsQKey = (variables: GetManyThoughtsVariables): GetManyThoughtsQKey => [
  THOUGHTS_ENTITY_QUERY_KEY_TOKEN,
  THOUGHTS_QUERY_KEY_TOKEN,
  variables,
];

const getManyThoughts =
  (apiClient: ApiClient): QueryFunction<GetManyThoughtsResponse, GetManyThoughtsQKey, PageRequest> =>
  async ({ queryKey, pageParam, signal }) => {
    const variables: GetManyThoughtsVariables = queryKey[2];
    const params = { ...variables, page: pageParam };
    return apiClient.get<GetManyThoughtsResponse>('/v1/thoughts', { params, signal });
  };

export const prefetchInfiniteThoughtsQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetManyThoughtsVariables
): Promise<void> => {
  await queryClient.prefetchInfiniteQuery({
    getNextPageParam,
    initialPageParam,
    queryFn: getManyThoughts(apiClient),
    queryKey: makeGetManyThoughtsQKey(variables),
  });
};

export const useInfiniteThoughtsQuery = (variables: GetManyThoughtsVariables) => {
  const apiClient = useApiClient();

  return useInfiniteQuery<
    GetManyThoughtsResponse,
    FailedResponse,
    InfiniteData<GetManyThoughtsResponse>,
    GetManyThoughtsQKey,
    PageRequest
  >({
    getNextPageParam,

    initialPageParam,
    queryFn: getManyThoughts(apiClient),
    queryKey: makeGetManyThoughtsQKey(variables),
  });
};
