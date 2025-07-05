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
  ({ queryKey, signal }) => {
    const variables: GetMyOneBlogPostVariables = queryKey[2];
    const { id } = variables;
    return apiClient.get<GetOneBlogPostResponse>(`/v1/my/blog-posts/${id}`, { signal });
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
  });

  const response = getMyBlogPostQueryResult(queryClient, variables);
  if (!response) throw new Response('Not found', { status: 404 });

  return response;
};

export const useMyBlogPostQuery = (variables: GetMyOneBlogPostVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetOneBlogPostResponse, FailedResponse, GetOneBlogPostResponse, GetMyOneBlogPostQKey>({
    queryFn: getMyOneBlogPost(apiClient),
    queryKey: makeGetMyOneBlogPostQKey(variables),
  });
};
