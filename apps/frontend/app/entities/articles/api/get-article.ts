import {
  type QueryClient,
  type QueryFunction,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import type { ArticleGetQuery, ArticleGetResponse, ArticleType, FailedResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { ARTICLES_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const ARTICLE_QUERY_KEY = 'article';

export type ArticleGetVariables = ArticleGetQuery & { slugOrId: string };

export type ArticleQueryKey = readonly [
  typeof ARTICLES_ENTITY_QUERY_KEY_TOKEN,
  ArticleType,
  typeof ARTICLE_QUERY_KEY,
  ArticleGetVariables,
];

export const createArticleGetKey = (variables: ArticleGetVariables): ArticleQueryKey => [
  ARTICLES_ENTITY_QUERY_KEY_TOKEN,
  variables.type,
  ARTICLE_QUERY_KEY,
  variables,
];

export const getArticle =
  (apiClient: ApiClient): QueryFunction<ArticleGetResponse, ArticleQueryKey> =>
  ({ queryKey, signal }) => {
    const variables: ArticleGetVariables = queryKey[3];
    const { slugOrId, ...params } = variables;
    return apiClient.get<ArticleGetResponse>(`/v1/articles/${slugOrId}`, { params, signal });
  };

export const getArticleFromCache = (
  queryClient: QueryClient,
  variables: ArticleGetVariables
): ArticleGetResponse | null => {
  const result = queryClient.getQueryData<ArticleGetResponse>(createArticleGetKey(variables));
  return result || null;
};

export const prefetchArticle = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: ArticleGetVariables
): Promise<ArticleGetResponse> => {
  await queryClient.prefetchQuery({
    queryFn: getArticle(apiClient),
    queryKey: createArticleGetKey(variables),
  });

  const response = getArticleFromCache(queryClient, variables);
  if (!response) throw new Response('Not found', { status: 404 });

  return response;
};

export const useArticleQuery = (
  variables: ArticleGetVariables,
  options?: Partial<UseQueryOptions<ArticleGetResponse, FailedResponse, ArticleGetResponse, ArticleQueryKey>>
): UseQueryResult<ArticleGetResponse, FailedResponse> => {
  const apiClient = useApiClient();

  return useQuery<ArticleGetResponse, FailedResponse, ArticleGetResponse, ArticleQueryKey>({
    ...options,
    queryFn: getArticle(apiClient),
    queryKey: createArticleGetKey(variables),
  });
};
