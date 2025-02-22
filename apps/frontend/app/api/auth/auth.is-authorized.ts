// global modules
import type { FailedResponse, IsAuthorizedResponse } from '@repo/api-models';
import { type QueryFunction, useQuery, type UseQueryOptions } from '@tanstack/react-query';

// common modules
import { runAsyncEffect } from '~/utils/effect';

// local modules
import { type ApiClient, useApiClient } from '../api-client';
import { QueryNamespace, RequestName } from '../constants';

type IsAuthorizedQKey = [QueryNamespace.AUTH, RequestName.IS_AUTHORIZED];

const fetchIsAuthorizedQFn =
  (apiClient: ApiClient): QueryFunction<IsAuthorizedResponse, IsAuthorizedQKey> =>
  ({ signal }) =>
    runAsyncEffect(
      apiClient.get<IsAuthorizedResponse>('/v1/auth/is-authorized', {
        signal,
        withCredentials: true,
      }),
    );

export const useIsAuthorizedQuery = (
  options?: UseQueryOptions<
    IsAuthorizedResponse,
    FailedResponse,
    IsAuthorizedResponse,
    IsAuthorizedQKey
  >,
) => {
  const apiClient = useApiClient();

  return useQuery({
    ...options,
    queryFn: fetchIsAuthorizedQFn(apiClient),
    queryKey: [QueryNamespace.AUTH, RequestName.IS_AUTHORIZED],
  });
};
