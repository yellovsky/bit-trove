import type { QueryClient } from '@tanstack/query-core';

import { THOUGHTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

export const invalidateThoughtsQuery = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [THOUGHTS_ENTITY_QUERY_KEY_TOKEN] });
