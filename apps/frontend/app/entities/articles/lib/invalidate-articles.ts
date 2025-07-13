import type { QueryClient } from '@tanstack/react-query';

import { ARTICLES_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

export const invalidateArticlesQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: [ARTICLES_ENTITY_QUERY_KEY_TOKEN] });
};
