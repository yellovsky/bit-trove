// global modules
import type { QueryClient } from '@tanstack/react-query';

// common modules
import { makeTokenizeQueryKey, type QKey } from '~/api/query';

export const BLOG_POST_QUERY_TOKEN = 'blog_post';

export type TokenizedBlogPostQKey<TQKey extends string, TVariables> = QKey<
  typeof BLOG_POST_QUERY_TOKEN,
  TQKey,
  TVariables
>;

export const tokenizeBlogPostQKey = makeTokenizeQueryKey(BLOG_POST_QUERY_TOKEN);

export const invalidateBlogPostQueries = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [BLOG_POST_QUERY_TOKEN] });
