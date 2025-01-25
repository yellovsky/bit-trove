// global modules
import { Effect } from 'effect';
import type { BlogPostListFP, BlogPostListResponse, FailedResponse } from '@repo/api-models';

// common modules
import type { ApiClient } from '~/api/api-client';
import { runtime } from '~/utils/runtime';
import { type MakeQueryFn, makeUseQuery } from '~/api/query';

// local modules
import { tokenizeBlogPostQKey, type TokenizedBlogPostQKey } from './blog-post.query-key';

export const fetchBlogPostList = (
  apiClient: ApiClient,
  params: BlogPostListFP,
  signal?: AbortSignal,
): Effect.Effect<BlogPostListResponse, FailedResponse> =>
  apiClient.get<BlogPostListResponse>(`/v1/blog-posts`, { params, signal });

const FETCH_CMS_BLOG_POST_LIST_QUERY_TOKEN = 'cms_blog_post_list';
type FetcCMSBlogPostListQKey = TokenizedBlogPostQKey<
  typeof FETCH_CMS_BLOG_POST_LIST_QUERY_TOKEN,
  BlogPostListFP
>;
const makeFetcCMSBlogPostListQKey = tokenizeBlogPostQKey(
  FETCH_CMS_BLOG_POST_LIST_QUERY_TOKEN,
)<BlogPostListFP>;

const fetchCMSBlogPostListQFn: MakeQueryFn<
  BlogPostListResponse,
  FetcCMSBlogPostListQKey
> = apiClient => {
  return ({ queryKey, signal }) =>
    runtime.runPromise(fetchBlogPostList(apiClient, queryKey[2], signal));
};

export const useCMSBlogPostList = makeUseQuery({
  makeQueryFn: fetchCMSBlogPostListQFn,
  makeQueryKey: makeFetcCMSBlogPostListQKey,
});
