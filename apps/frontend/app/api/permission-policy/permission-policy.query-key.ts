// global modules
import type { QueryClient } from '@tanstack/react-query';

export const PERMISSION_POLICY_QUERY_TOKEN = 'permission_policy';

export const invalidatePermissionPolicyQueries = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [PERMISSION_POLICY_QUERY_TOKEN] });
