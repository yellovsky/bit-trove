import type { QueryClient } from '@tanstack/query-core';

import { SHARDS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

export const invalidateShardsQuery = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [SHARDS_ENTITY_QUERY_KEY_TOKEN] });
