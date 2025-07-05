import { type QueryClient, type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetOneBlogPostResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const MY_BLOG_POST_Q_KEY_TOKEN = 'my_blog_post';

export type GetMyOneBlogPostVariables = { id: string };

type GetMyOneBlogPostQKey = readonly [
  typeof BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN,
  typeof MY_BLOG_POST_Q_KEY_TOKEN,
  GetMyOneBlogPostVariables,
];

const makeGetMyOneBlogPostQKey = (variables: GetMyOneBlogPostVariables): GetMyOneBlogPostQKey => [
  BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN,
  MY_BLOG_POST_Q_KEY_TOKEN,
  variables,
];

const getMyOneBlogPost =
  (apiClient: ApiClient): QueryFunction<GetOneBlogPostResponse, GetMyOneBlogPostQKey> =>
  async ({ queryKey, signal }) => {
    const variables: GetMyOneBlogPostVariables = queryKey[2];
    const { id } = variables;

    try {
      return await apiClient.get<GetOneBlogPostResponse>(`/v1/my/blog-posts/${id}`, {
        signal,
        withCredentials: true,
      });
    } catch (error) {
      // Log error for debugging
      console.error('Failed to fetch my blog post:', error);
      throw error;
    }
  };

const getMyBlogPostQueryResult = (
  queryClient: QueryClient,
  variables: GetMyOneBlogPostVariables
): GetOneBlogPostResponse | null => {
  const result = queryClient.getQueryData<GetOneBlogPostResponse>(makeGetMyOneBlogPostQKey(variables));
  return result || null;
};

export const prefetchMyOneBlogPostQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetMyOneBlogPostVariables
): Promise<GetOneBlogPostResponse> => {
  await queryClient.prefetchQuery({
    queryFn: getMyOneBlogPost(apiClient),
    queryKey: makeGetMyOneBlogPostQKey(variables),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const response = getMyBlogPostQueryResult(queryClient, variables);
  if (!response) throw new Response('Not found', { status: 404 });

  return response;
};

export const useMyBlogPostQuery = (variables: GetMyOneBlogPostVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetOneBlogPostResponse, FailedResponse, GetOneBlogPostResponse, GetMyOneBlogPostQKey>({
    gcTime: 10 * 60 * 1000,
    queryFn: getMyOneBlogPost(apiClient),
    queryKey: makeGetMyOneBlogPostQKey(variables), // 5 minutes
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
