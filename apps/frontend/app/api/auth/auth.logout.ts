// global modules
import type { StatusSuccessResponse } from '@repo/api-models';

// common modules
import type { EndpointFn } from '~/api/endpoint';
import { useEffectMutation } from '~/api/query/query.mutation';

// local modules
import { invalidateAuthQueries } from './auth.query-key';

const logoutWithEmailEP: EndpointFn<StatusSuccessResponse, void> =
  apiClient =>
  ({ signal }) =>
    apiClient.post<StatusSuccessResponse>('/v1/auth/logout', {}, { signal, withCredentials: true });

export const useLogoutMutation = useEffectMutation({
  endpoint: logoutWithEmailEP,
  onSuccess: queryClient => {
    invalidateAuthQueries(queryClient);
  },
});
