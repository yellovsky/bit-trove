// global modules
import type { LoginWithEmailFP, StatusSuccessResponse } from '@repo/api-models';

// common modules
import type { EndpointFn } from '~/api/endpoint';
import { useEffectMutation } from '~/api/query/query.mutation';

// local modules
import { invalidateAuthQueries } from './auth.query-key';

export type LoginWithEmailVariables = LoginWithEmailFP;

// ============================================================================
//                           E N D P O I N T
// ============================================================================
const loginWithEmailEP: EndpointFn<StatusSuccessResponse, LoginWithEmailVariables> =
  apiClient =>
  ({ variables, signal }) =>
    apiClient.post<StatusSuccessResponse>('/v1/auth/login', variables, {
      signal,
      withCredentials: true,
    });

// ============================================================================
//                      U S E   M U T A T I O N
// ============================================================================
export const useLoginWithEmailMutation = useEffectMutation({
  endpoint: loginWithEmailEP,
  onSuccess: queryClient => {
    invalidateAuthQueries(queryClient);
  },
});
