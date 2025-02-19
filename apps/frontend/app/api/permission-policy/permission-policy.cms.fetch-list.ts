// global modules
import type { PaginationState } from '@tanstack/react-table';
import { keepPreviousData, type QueryFunction, useQuery } from '@tanstack/react-query';

import type {
  GetPermissionPolicyListFP,
  PaginationFP,
  PermissionPolicyListResponse,
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

export type FetchCMSPermissionPolicyListVariables = Omit<GetPermissionPolicyListFP, 'page'>;

type FetcCMSPermissionPolicyListQKey = [
  typeof PERMISSION_POLICY_QUERY_TOKEN,
  typeof GET_CMS_PERMISSION_POLICY_LIST_QUERY_TOKEN,
  FetchCMSPermissionPolicyListVariables,
  PaginationFP,
];

// ============================================================================
//                            E N D P O I N T
// ============================================================================
const getCMSPermissionPolicyListQFn =
  (
    apiClient: ApiClient,
  ): QueryFunction<PermissionPolicyListResponse, FetcCMSPermissionPolicyListQKey> =>
  ({ queryKey, signal }) =>
    runAsyncEffect(
      apiClient.get<PermissionPolicyListResponse>(`/v1/cms/permission-policies`, {
        params: { ...queryKey[2], page: queryKey[3] },
        signal,
        withCredentials: true,
      }),
    );

export const useCMSPermissionPolicyListQuery = (
  fp: FetchCMSPermissionPolicyListVariables,
  pagination: PaginationFP | PaginationState,
) => {
  const apiClient = useApiClient();

  return useQuery({
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
