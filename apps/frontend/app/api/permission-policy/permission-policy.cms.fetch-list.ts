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
import { QueryNamespace, RequestName } from '../constants';

export type GetCMSPermissionPolicyListVariables = Omit<GetPermissionPolicyListFP, 'page'>;

type GetCMSPermissionPolicyListQKey = [
  QueryNamespace.PERMISSION_POLICY,
  RequestName.FETCH_LIST,
  GetCMSPermissionPolicyListVariables,
  PaginationFP,
];

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
      QueryNamespace.PERMISSION_POLICY,
      RequestName.FETCH_LIST,
      fp,
      toPaginationFP(pagination),
    ] as const,
  });
};
