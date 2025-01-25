// global modules
import { annotateSrv } from '@repo/runtime';
import { Effect, pipe } from 'effect';
import type { LoginResponse, LoginWithEmailFP } from '@repo/api-models';

// common modules
import type { EndpointFn } from '~/api/endpoint';
import { setMyProfileResponseQuery } from '~/api/my';
import { useEffectMutation } from '~/api/query/query.mutation';

const loginWithEmailEP: EndpointFn<LoginResponse, LoginWithEmailFP> =
  apiClient =>
  ({ params, signal }) =>
    pipe(
      apiClient.post<LoginResponse>('/v1/auth/email/login', params, { signal }),
      Effect.tapError(Effect.logError),
    ).pipe(annotateSrv('loginWithEmail'));

export const useLoginWithEmailMutation = useEffectMutation({
  endpoint: loginWithEmailEP,
  onSuccess: setMyProfileResponseQuery,
});
