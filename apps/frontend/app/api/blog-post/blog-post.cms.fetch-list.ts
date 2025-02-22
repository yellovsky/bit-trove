// global modules
import type { PaginationState } from '@tanstack/react-table';
import { type QueryFunction, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type {
  BlogPostListFP,
  BlogPostListResponse,
  FailedResponse,
  PaginationFP,
} from '@repo/api-models';

// common modules
import { runAsyncEffect } from '~/utils/effect';
import { toPaginationFP } from '~/utils/pagination';
import { type ApiClient, useApiClient } from '~/api/api-client';

// local modules
import { QueryNamespace, RequestName } from '../constants';

export type FetchCMSBlogPostListVariables = Omit<BlogPostListFP, 'page'>;

type FetchCMSBlogPostListQKey = [
  QueryNamespace.BLOG_POST,
  RequestName.FETCH_LIST_CMS,
  FetchCMSBlogPostListVariables,
  PaginationFP,
];

const fetchCMSBlogPostListQFn =
  (apiClient: ApiClient): QueryFunction<BlogPostListResponse, FetchCMSBlogPostListQKey> =>
  ({ queryKey, signal }) =>
    runAsyncEffect(
      apiClient.get<BlogPostListResponse>(`/v1/blog-posts`, {
        params: { ...queryKey[2], page: queryKey[3] },
        signal,
      }),
    );

export const useCMSBlogPostListQuery = (
  variables: FetchCMSBlogPostListVariables,
  pageParams: PaginationFP | PaginationState,
  options?: UseQueryOptions<
    BlogPostListResponse,
    FailedResponse,
    BlogPostListResponse,
    FetchCMSBlogPostListQKey
  >,
) => {
  const apiClient = useApiClient();

  return useQuery({
    ...options,
    queryFn: fetchCMSBlogPostListQFn(apiClient),
    queryKey: [
      QueryNamespace.BLOG_POST,
      RequestName.FETCH_LIST_CMS,
      variables,
      toPaginationFP(pageParams),
    ],
  });
};
