import {
  type QueryClient,
  type QueryFunction,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import type { FailedResponse, RelatedArticleResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { ARTICLES_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const RELATED_ARTICLES_QUERY_KEY = 'related_articles';
export type RelatedArticlesVariables = {
  id: string;
  locale: string;
};

export type RelatedArticlesQueryKey = readonly [
  typeof ARTICLES_ENTITY_QUERY_KEY_TOKEN,
  typeof RELATED_ARTICLES_QUERY_KEY,
  RelatedArticlesVariables,
];

export const createRelatedArticlesQKey = (variables: RelatedArticlesVariables): RelatedArticlesQueryKey => [
  ARTICLES_ENTITY_QUERY_KEY_TOKEN,
  RELATED_ARTICLES_QUERY_KEY,
  variables,
];

export const getRelatedArticles =
  (apiClient: ApiClient): QueryFunction<RelatedArticleResponse, RelatedArticlesQueryKey> =>
  ({ queryKey, signal }) => {
    const { id, ...params } = queryKey[2];
    return apiClient.get<RelatedArticleResponse>(`/v1/articles/${id}/related`, { params, signal });
  };

export const getRelatedArticlesFromCache = (
  queryClient: QueryClient,
  variables: RelatedArticlesVariables
): RelatedArticleResponse | null => {
  const result = queryClient.getQueryData<RelatedArticleResponse>(createRelatedArticlesQKey(variables));
  return result || null;
};

export const prefetchRelatedArticles = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: RelatedArticlesVariables
): Promise<RelatedArticleResponse> => {
  await queryClient.prefetchQuery({
    queryFn: getRelatedArticles(apiClient),
    queryKey: createRelatedArticlesQKey(variables),
  });

  const response = getRelatedArticlesFromCache(queryClient, variables);
  if (!response) throw new Response('Not found', { status: 404 });

  return response;
};

export const useRelatedArticlesQuery = (
  variables: RelatedArticlesVariables,
  options?: Partial<
    UseQueryOptions<RelatedArticleResponse, FailedResponse, RelatedArticleResponse, RelatedArticlesQueryKey>
  >
): UseQueryResult<RelatedArticleResponse, FailedResponse> => {
  const apiClient = useApiClient();

  return useQuery<RelatedArticleResponse, FailedResponse, RelatedArticleResponse, RelatedArticlesQueryKey>({
    ...options,
    queryFn: getRelatedArticles(apiClient),
    queryKey: createRelatedArticlesQKey(variables),
  });
};
