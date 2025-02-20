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
import { PERMISSION_POLICY_QUERY_TOKEN } from './permission-policy.query-key';

const GET_CMS_PERMISSION_POLICY_QUERY_TOKEN = 'cms_permisiion_policy';
type GetCMSPermissionPolicyQKey = [
  typeof PERMISSION_POLICY_QUERY_TOKEN,
  typeof GET_CMS_PERMISSION_POLICY_QUERY_TOKEN,
  string,
];

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
    queryKey: [
      PERMISSION_POLICY_QUERY_TOKEN,
      GET_CMS_PERMISSION_POLICY_QUERY_TOKEN,
      id,
    ] satisfies GetCMSPermissionPolicyQKey,
  });
};
