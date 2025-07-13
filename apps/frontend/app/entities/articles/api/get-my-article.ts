import { type QueryClient, type QueryFunction, type UseQueryOptions, useQuery } from '@tanstack/react-query';

import type { ArticleGetQuery, ArticleGetResponse, FailedResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { ARTICLES_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const MY_ARTICLE_Q_KEY_TOKEN = 'my_article';

export type MyArticleGetVariables = ArticleGetQuery & { id: string };

export type MyArticleGetQKey = readonly [
  typeof ARTICLES_ENTITY_QUERY_KEY_TOKEN,
  typeof MY_ARTICLE_Q_KEY_TOKEN,
  MyArticleGetVariables,
];

const makeMyArticleGetQKey = (variables: MyArticleGetVariables): MyArticleGetQKey => [
  ARTICLES_ENTITY_QUERY_KEY_TOKEN,
  MY_ARTICLE_Q_KEY_TOKEN,
  variables,
];

const getMyArticle =
  (apiClient: ApiClient): QueryFunction<ArticleGetResponse, MyArticleGetQKey> =>
  async ({ queryKey, signal }) => {
    const variables: MyArticleGetVariables = queryKey[2];
    const { id } = variables;

    return await apiClient.get<ArticleGetResponse>(`/v1/my/articles/${id}`, {
      signal,
      withCredentials: true,
    });
  };

const getMyArticleQueryResult = (
  queryClient: QueryClient,
  variables: MyArticleGetVariables
): ArticleGetResponse | null => {
  const result = queryClient.getQueryData<ArticleGetResponse>(makeMyArticleGetQKey(variables));
  return result || null;
};

export const prefetchMyArticleQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: MyArticleGetVariables
): Promise<ArticleGetResponse> => {
  await queryClient.prefetchQuery({
    queryFn: getMyArticle(apiClient),
    queryKey: makeMyArticleGetQKey(variables),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const response = getMyArticleQueryResult(queryClient, variables);
  if (!response) throw new Response('Not found', { status: 404 });

  return response;
};

export const useMyArticleQuery = (
  variables: MyArticleGetVariables,
  options?: Partial<UseQueryOptions<ArticleGetResponse, FailedResponse, ArticleGetResponse, MyArticleGetQKey>>
) => {
  const apiClient = useApiClient();

  return useQuery<ArticleGetResponse, FailedResponse, ArticleGetResponse, MyArticleGetQKey>({
    ...options,
    gcTime: 10 * 60 * 1000,
    queryFn: getMyArticle(apiClient),
    queryKey: makeMyArticleGetQKey(variables), // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on 404 (not found) or 403 (forbidden)
      if (error.error.httpCode === 404 || error.error.httpCode === 403) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    }, // 10 minutes
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // Exponential backoff
  });
};
