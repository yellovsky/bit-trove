import {
  type QueryClient,
  type QueryFunction,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import { type BlogPostGetResponse, type FailedResponse, isBlogPostGetResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import {
  type ArticleGetVariables,
  type ArticleQueryKey,
  createArticleGetKey,
  getArticle,
  prefetchArticle,
} from '@entities/articles';

export type BlogPostGetVariables = Omit<ArticleGetVariables, 'type'>;

const createBlogPostGetKey = (variables: BlogPostGetVariables): ArticleQueryKey =>
  createArticleGetKey({ ...variables, type: 'blog_post' });

const getBlogPost =
  (apiClient: ApiClient): QueryFunction<BlogPostGetResponse, ArticleQueryKey> =>
  async (params) => {
    const response = await getArticle(apiClient)(params);
    if (!isBlogPostGetResponse(response)) throw new Response('Not found', { status: 404 });
    return response;
  };

export const prefetchBlogPostQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: BlogPostGetVariables
): Promise<BlogPostGetResponse> => {
  const response = await prefetchArticle(apiClient, queryClient, { ...variables, type: 'blog_post' });
  if (!isBlogPostGetResponse(response)) throw new Response('Not found', { status: 404 });
  return response;
};

export const useBlogPostQuery = (
  variables: BlogPostGetVariables,
  options?: Partial<UseQueryOptions<BlogPostGetResponse, FailedResponse, BlogPostGetResponse, ArticleQueryKey>>
): UseQueryResult<BlogPostGetResponse, FailedResponse> => {
  const apiClient = useApiClient();

  return useQuery<BlogPostGetResponse, FailedResponse, BlogPostGetResponse, ArticleQueryKey>({
    ...options,
    queryFn: getBlogPost(apiClient),
    queryKey: createBlogPostGetKey(variables),
  });
};
