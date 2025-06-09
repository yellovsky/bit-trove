import type { QueryClient } from '@tanstack/query-core';

import { BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

export const invalidateBlogPostsQuery = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN] });
