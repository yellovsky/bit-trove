// global modules
import type { FailedResponse, GetPermissionPolicyResponse } from '@repo/api-models';

import {
  keepPreviousData,
  type QueryFunction,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';

// common modules
import { runAsyncEffect } from '~/utils/effect';
import { type ApiClient, useApiClient } from '~/api/api-client';

// local modules
import { QueryNamespace, RequestName } from '../constants';

type GetCMSPermissionPolicyQKey = [QueryNamespace.PERMISSION_POLICY, RequestName.FETCH_ONE, string];

const getCMSPermissionPolicyQFn =
  (apiClient: ApiClient): QueryFunction<GetPermissionPolicyResponse, GetCMSPermissionPolicyQKey> =>
  ({ queryKey, signal }) =>
    runAsyncEffect(
      apiClient.get<GetPermissionPolicyResponse>(`/v1/cms/permission-policies/${queryKey[2]}`, {
        signal,
        withCredentials: true,
      }),
    );

export const useCMSPermissionPolicyQuery = (
  id: string,
  options?: UseQueryOptions<
    GetPermissionPolicyResponse,
    FailedResponse,
    GetPermissionPolicyResponse,
    GetCMSPermissionPolicyQKey
  >,
) => {
  const apiClient = useApiClient();

  return useQuery({
    ...options,
    placeholderData: keepPreviousData,
    queryFn: getCMSPermissionPolicyQFn(apiClient),
    queryKey: [QueryNamespace.PERMISSION_POLICY, RequestName.FETCH_ONE, id],
  });
};
