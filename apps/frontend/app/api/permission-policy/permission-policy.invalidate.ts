// global modules
import type { QueryClient } from '@tanstack/react-query';
import { QueryNamespace } from '../constants';

export const invalidatePermissionPolicyQueries = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [QueryNamespace.PERMISSION_POLICY] });
