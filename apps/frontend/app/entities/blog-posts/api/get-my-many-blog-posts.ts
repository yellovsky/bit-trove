import { keepPreviousData, type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetManyBlogPostsQuery, GetManyBlogPostsResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const MY_BLOG_POSTS_QUERY_KEY_TOKEN = 'my_blog_posts';

export type GetMyManyBlogPostsVariables = GetManyBlogPostsQuery;
type GetMyManyBlogPostsQKey = readonly [
  typeof BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN,
  typeof MY_BLOG_POSTS_QUERY_KEY_TOKEN,
  GetMyManyBlogPostsVariables,
];

const makeGetMyManyBlogPostsQKey = (variables: GetMyManyBlogPostsVariables): GetMyManyBlogPostsQKey => [
  BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN,
  MY_BLOG_POSTS_QUERY_KEY_TOKEN,
  variables,
];

const getMyManyBlogPosts =
  (apiClient: ApiClient): QueryFunction<GetManyBlogPostsResponse, GetMyManyBlogPostsQKey> =>
  async ({ queryKey, signal }) => {
    const params: GetMyManyBlogPostsVariables = queryKey[2];
    return apiClient.get<GetManyBlogPostsResponse>('/v1/my/blog-posts', { params, signal, withCredentials: true });
  };

export const useMyManyBlogPostsQuery = (variables: GetMyManyBlogPostsVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetManyBlogPostsResponse, FailedResponse, GetManyBlogPostsResponse, GetMyManyBlogPostsQKey>({
    placeholderData: keepPreviousData,
    queryFn: getMyManyBlogPosts(apiClient),
    queryKey: makeGetMyManyBlogPostsQKey(variables),
  });
};
