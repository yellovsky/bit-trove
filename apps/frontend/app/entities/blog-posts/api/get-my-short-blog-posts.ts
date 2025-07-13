import {
  keepPreviousData,
  type QueryFunction,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import {
  type FailedResponse,
  isShortBlogPostsGetResponse,
  type PageRequest,
  type ShortBlogPostsGetResponse,
} from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import {
  createMyShortArticlesQKey,
  getMyShortArticles,
  type MyShortArticlesGetVariables,
  type MyShortArticlesQKey,
} from '@entities/articles';

export type MyShortBlogPostsGetVariables = Omit<MyShortArticlesGetVariables, 'filter'> & {
  filter?: Omit<MyShortArticlesGetVariables['filter'], 'typeIn'>;
};

const toBlogPostsVariables = (variables: MyShortBlogPostsGetVariables): MyShortArticlesGetVariables => ({
  ...variables,
  filter: { ...variables.filter, typeIn: ['blog_post' as const] },
});

const createMyShortBlogPostsGetKey = (variables: MyShortBlogPostsGetVariables): MyShortArticlesQKey =>
  createMyShortArticlesQKey(toBlogPostsVariables(variables));

const fetchMyShortBlogPosts =
  (apiClient: ApiClient): QueryFunction<ShortBlogPostsGetResponse, MyShortArticlesQKey, PageRequest> =>
  async (params) => {
    const response = await getMyShortArticles(apiClient)(params);
    if (!isShortBlogPostsGetResponse(response)) throw new Response('Not found', { status: 404 });
    return response;
  };

export const useMyShortBlogPostsQuery = (
  variables: MyShortBlogPostsGetVariables,
  options?: Partial<
    UseQueryOptions<ShortBlogPostsGetResponse, FailedResponse, ShortBlogPostsGetResponse, MyShortArticlesQKey>
  >
): UseQueryResult<ShortBlogPostsGetResponse, FailedResponse> => {
  const apiClient = useApiClient();

  return useQuery<ShortBlogPostsGetResponse, FailedResponse, ShortBlogPostsGetResponse, MyShortArticlesQKey>({
    ...options,
    placeholderData: keepPreviousData,
    queryFn: fetchMyShortBlogPosts(apiClient),
    queryKey: createMyShortBlogPostsGetKey(variables),
  });
};
