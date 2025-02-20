// global modules
import type { PaginationState } from '@tanstack/react-table';

import {
  keepPreviousData,
  type QueryFunction,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type {
  FailedResponse,
  GetPermissionPolicyListFP,
  GetPermissionPolicyListResponse,
  PaginationFP,
} from '@repo/api-models';

// common modules
import { runAsyncEffect } from '~/utils/effect';
import { toPaginationFP } from '~/utils/pagination';
import { type ApiClient, useApiClient } from '~/api/api-client';

// local modules
import { PERMISSION_POLICY_QUERY_TOKEN } from './permission-policy.query-key';

// ============================================================================
//                          Q U E R Y   K E Y
// ============================================================================
const GET_CMS_PERMISSION_POLICY_LIST_QUERY_TOKEN = 'cms_permisiion_policy_list';

export type GetCMSPermissionPolicyListVariables = Omit<GetPermissionPolicyListFP, 'page'>;

type GetCMSPermissionPolicyListQKey = [
  typeof PERMISSION_POLICY_QUERY_TOKEN,
  typeof GET_CMS_PERMISSION_POLICY_LIST_QUERY_TOKEN,
  GetCMSPermissionPolicyListVariables,
  PaginationFP,
];

// ============================================================================
//                            E N D P O I N T
// ============================================================================
const getCMSPermissionPolicyListQFn =
  (
    apiClient: ApiClient,
  ): QueryFunction<GetPermissionPolicyListResponse, GetCMSPermissionPolicyListQKey> =>
  ({ queryKey, signal }) =>
    runAsyncEffect(
      apiClient.get<GetPermissionPolicyListResponse>(`/v1/cms/permission-policies`, {
        params: { ...queryKey[2], page: queryKey[3] },
        signal,
        withCredentials: true,
      }),
    );

export const useCMSPermissionPolicyListQuery = (
  fp: GetCMSPermissionPolicyListVariables,
  pagination: PaginationFP | PaginationState,
  options?: UseQueryOptions<
    GetPermissionPolicyListResponse,
    FailedResponse,
    GetPermissionPolicyListResponse,
    GetCMSPermissionPolicyListQKey
  >,
) => {
  const apiClient = useApiClient();

  return useQuery({
    ...options,
    placeholderData: keepPreviousData,
    queryFn: getCMSPermissionPolicyListQFn(apiClient),
    queryKey: [
      PERMISSION_POLICY_QUERY_TOKEN,
      GET_CMS_PERMISSION_POLICY_LIST_QUERY_TOKEN,
      fp,
      toPaginationFP(pagination),
    ] as const,
  });
};
