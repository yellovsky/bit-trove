import { type QueryClient, type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetOneBlogPostQuery, GetOneBlogPostResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const BLOG_POST_Q_KEY_TOKEN = 'blog_post';

export type GetOneBlogPostVariables = GetOneBlogPostQuery & { slugOrId: string };

type GetOneBlogPostQKey = readonly [
  typeof BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN,
  typeof BLOG_POST_Q_KEY_TOKEN,
  GetOneBlogPostVariables,
];

const makeGetOneBlogPostQKey = (variables: GetOneBlogPostVariables): GetOneBlogPostQKey => [
  BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN,
  BLOG_POST_Q_KEY_TOKEN,
  variables,
];

const getOneBlogPost =
  (apiClient: ApiClient): QueryFunction<GetOneBlogPostResponse, GetOneBlogPostQKey> =>
  ({ queryKey, signal }) => {
    const variables: GetOneBlogPostVariables = queryKey[2];
    const { slugOrId, ...params } = variables;

    return apiClient.get<GetOneBlogPostResponse>(`/v1/blog-posts/${slugOrId}`, {
      params,
      signal,
    });
  };

const getBlogPostQueryResult = (
  queryClient: QueryClient,
  variables: GetOneBlogPostVariables
): GetOneBlogPostResponse | null => {
  const result = queryClient.getQueryData<GetOneBlogPostResponse>(makeGetOneBlogPostQKey(variables));
  return result || null;
};

export const prefetchOneBlogPostQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetOneBlogPostVariables
): Promise<GetOneBlogPostResponse> => {
  await queryClient.prefetchQuery({
    queryFn: getOneBlogPost(apiClient),
    queryKey: makeGetOneBlogPostQKey(variables),
  });

  const response = getBlogPostQueryResult(queryClient, variables);
  if (!response) throw new Response('Not found', { status: 404 });

  return response;
};

export const useBlogPostQuery = (variables: GetOneBlogPostVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetOneBlogPostResponse, FailedResponse, GetOneBlogPostResponse, GetOneBlogPostQKey>({
    queryFn: getOneBlogPost(apiClient),
    queryKey: makeGetOneBlogPostQKey(variables),
  });
};
