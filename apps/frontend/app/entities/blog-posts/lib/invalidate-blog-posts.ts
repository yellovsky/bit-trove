import type { QueryClient } from '@tanstack/react-query';

import { BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

export const invalidateBlogPostsQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: [BLOG_POSTS_ENTITY_QUERY_KEY_TOKEN] });
};
