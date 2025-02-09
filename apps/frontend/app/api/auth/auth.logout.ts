// global modules
import type { StatusSuccessResponse } from '@repo/api-models';

// common modules
import type { EndpointFn } from '~/api/endpoint';
import { useEffectMutation } from '~/api/query/query.mutation';

// local modules
import { invalidateAuthQueries } from './auth.query-key';

export type LogoutWithEmailVariables = void;

// ============================================================================
//                           E N D P O I N T
// ============================================================================
const logoutWithEmailEP: EndpointFn<StatusSuccessResponse, LogoutWithEmailVariables> =
  apiClient =>
  ({ signal }) =>
    apiClient.post<StatusSuccessResponse>('/v1/auth/logout', {}, { signal, withCredentials: true });

// ============================================================================
//                      U S E   M U T A T I O N
// ============================================================================
export const useLogoutMutation = useEffectMutation({
  endpoint: logoutWithEmailEP,
  onSuccess: queryClient => {
    invalidateAuthQueries(queryClient);
  },
});
