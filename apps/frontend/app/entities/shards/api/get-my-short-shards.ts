import {
  keepPreviousData,
  type QueryFunction,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import {
  type FailedResponse,
  isShortShardsGetResponse,
  type PageRequest,
  type ShortShardsGetResponse,
} from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import {
  createMyShortArticlesQKey,
  getMyShortArticles,
  type MyShortArticlesGetVariables,
  type MyShortArticlesQKey,
} from '@entities/articles';

export type MyShortShardsGetVariables = Omit<MyShortArticlesGetVariables, 'filter'> & {
  filter?: Omit<MyShortArticlesGetVariables['filter'], 'typeIn'>;
};

const toShardsVariables = (variables: MyShortShardsGetVariables): MyShortArticlesGetVariables => ({
  ...variables,
  filter: { ...variables.filter, typeIn: ['shard' as const] },
});

const createMyShortShardsGetKey = (variables: MyShortShardsGetVariables): MyShortArticlesQKey =>
  createMyShortArticlesQKey(toShardsVariables(variables));

const fetchMyShortShards =
  (apiClient: ApiClient): QueryFunction<ShortShardsGetResponse, MyShortArticlesQKey, PageRequest> =>
  async (params) => {
    const response = await getMyShortArticles(apiClient)(params);
    if (!isShortShardsGetResponse(response)) throw new Response('Not found', { status: 404 });
    return response;
  };

export const useMyShortShardsQuery = (
  variables: MyShortShardsGetVariables,
  options?: Partial<
    UseQueryOptions<ShortShardsGetResponse, FailedResponse, ShortShardsGetResponse, MyShortArticlesQKey>
  >
): UseQueryResult<ShortShardsGetResponse, FailedResponse> => {
  const apiClient = useApiClient();

  return useQuery<ShortShardsGetResponse, FailedResponse, ShortShardsGetResponse, MyShortArticlesQKey>({
    ...options,
    placeholderData: keepPreviousData,
    queryFn: fetchMyShortShards(apiClient),
    queryKey: createMyShortShardsGetKey(variables),
  });
};
