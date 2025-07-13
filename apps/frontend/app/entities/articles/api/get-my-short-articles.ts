import {
  keepPreviousData,
  type QueryFunction,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import type { FailedResponse, ShortArticlesGetQuery, ShortArticlesGetResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { ARTICLES_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const MY_ARTICLES_QUERY_KEY_TOKEN = 'my_articles';

export type MyShortArticlesGetVariables = ShortArticlesGetQuery;

export type MyShortArticlesQKey = readonly [
  typeof ARTICLES_ENTITY_QUERY_KEY_TOKEN,
  typeof MY_ARTICLES_QUERY_KEY_TOKEN,
  MyShortArticlesGetVariables,
];

export const createMyShortArticlesQKey = (variables: MyShortArticlesGetVariables): MyShortArticlesQKey => [
  ARTICLES_ENTITY_QUERY_KEY_TOKEN,
  MY_ARTICLES_QUERY_KEY_TOKEN,
  variables,
];

export const getMyShortArticles =
  (apiClient: ApiClient): QueryFunction<ShortArticlesGetResponse, MyShortArticlesQKey> =>
  async ({ queryKey, signal }) => {
    const params: MyShortArticlesGetVariables = queryKey[2];
    return apiClient.get<ShortArticlesGetResponse>('/v1/my/articles', { params, signal, withCredentials: true });
  };

export const useMyShortArticlesQuery = (
  variables: MyShortArticlesGetVariables,
  options?: Partial<
    UseQueryOptions<ShortArticlesGetResponse, FailedResponse, ShortArticlesGetResponse, MyShortArticlesQKey>
  >
): UseQueryResult<ShortArticlesGetResponse, FailedResponse> => {
  const apiClient = useApiClient();

  return useQuery<ShortArticlesGetResponse, FailedResponse, ShortArticlesGetResponse, MyShortArticlesQKey>({
    ...options,
    placeholderData: keepPreviousData,
    queryFn: getMyShortArticles(apiClient),
    queryKey: createMyShortArticlesQKey(variables),
  });
};
