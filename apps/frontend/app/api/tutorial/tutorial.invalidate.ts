// global modules
import type { QueryClient } from '@tanstack/react-query';

// local modules
import { QueryNamespace } from '../constants';

export const invalidateTutorialQueries = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [QueryNamespace.TUTORIAL] });
