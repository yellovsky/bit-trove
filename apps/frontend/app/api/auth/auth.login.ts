// global modules
import { annotateSrv } from '@repo/runtime';
import { Effect, pipe } from 'effect';
import type { LoginWithEmailFP, StatusSuccessResponse } from '@repo/api-models';

// common modules
import type { EndpointFn } from '~/api/endpoint';
import { useEffectMutation } from '~/api/query/query.mutation';

// local modules
import { invalidateAuthQueries } from './auth.query-key';

const loginWithEmailEP: EndpointFn<StatusSuccessResponse, LoginWithEmailFP> =
  apiClient =>
  ({ params, signal }) =>
    pipe(
      apiClient.post<StatusSuccessResponse>('/v1/auth/login', params, {
        signal,
        withCredentials: true,
      }),
      Effect.tapError(Effect.logError),
    ).pipe(annotateSrv('loginWithEmail'));

export const useLoginWithEmailMutation = useEffectMutation({
  endpoint: loginWithEmailEP,
  onSuccess: queryClient => {
    invalidateAuthQueries(queryClient);
  },
});
