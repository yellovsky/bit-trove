import { type InfiniteData, type QueryClient, type QueryFunction, useInfiniteQuery } from '@tanstack/react-query';

import type { FailedResponse, GetManyBlogPostsQuery, GetManyBlogPostsResponse, PageRequest } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getNextPageParam, initialPageParam } from '@shared/lib/page-params';

import { BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const BLOG_POSTS_QUERY_KEY_TOKEN = 'blog_posts';

export type GetManyBlogPostsVariables = Omit<GetManyBlogPostsQuery, 'page'>;
type GetManyBlogPostsQKey = readonly [
  typeof BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN,
  typeof BLOG_POSTS_QUERY_KEY_TOKEN,
  GetManyBlogPostsVariables,
];

const makeGetManyBlogPostsQKey = (variables: GetManyBlogPostsVariables): GetManyBlogPostsQKey => [
  BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN,
  BLOG_POSTS_QUERY_KEY_TOKEN,
  variables,
];

const getManyBlogPosts =
  (apiClient: ApiClient): QueryFunction<GetManyBlogPostsResponse, GetManyBlogPostsQKey, PageRequest> =>
  async ({ queryKey, pageParam, signal }) => {
    const variables: GetManyBlogPostsVariables = queryKey[2];
    const params = { ...variables, page: pageParam };
    return apiClient.get<GetManyBlogPostsResponse>('/v1/blog-posts', { params, signal });
  };

export const prefetchManyBlogPostsQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetManyBlogPostsVariables
): Promise<void> => {
  await queryClient.prefetchInfiniteQuery({
    getNextPageParam,
    initialPageParam,
    queryFn: getManyBlogPosts(apiClient),
    queryKey: makeGetManyBlogPostsQKey(variables),
  });
};

export const useManyBlogPostsQuery = (variables: GetManyBlogPostsVariables) => {
  const apiClient = useApiClient();

  return useInfiniteQuery<
    GetManyBlogPostsResponse,
    FailedResponse,
    InfiniteData<GetManyBlogPostsResponse>,
    GetManyBlogPostsQKey,
    PageRequest
  >({
    getNextPageParam,

    initialPageParam,
    queryFn: getManyBlogPosts(apiClient),
    queryKey: makeGetManyBlogPostsQKey(variables),
  });
};
