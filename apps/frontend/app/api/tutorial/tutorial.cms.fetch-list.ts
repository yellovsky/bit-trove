// global modules
import type { PaginationState } from '@tanstack/react-table';
import { type QueryFunction, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type {
  FailedResponse,
  PaginationFP,
  TutorialListFP,
  TutorialListResponse,
} from '@repo/api-models';

// common modules
import { runAsyncEffect } from '~/utils/effect';
import { toPaginationFP } from '~/utils/pagination';
import { type ApiClient, useApiClient } from '~/api/api-client';

// local modules
import { QueryNamespace, RequestName } from '../constants';

export type FetchCMSTutorialListVariables = Omit<TutorialListFP, 'page'>;

type FetcCMSTutorialListQKey = [
  QueryNamespace.TUTORIAL,
  RequestName.FETCH_LIST_CMS,
  FetchCMSTutorialListVariables,
  PaginationFP,
];

const fetchCMSTutorialList = (apiClient: ApiClient, params: TutorialListFP, signal?: AbortSignal) =>
  apiClient.get<TutorialListResponse>(`/v1/cms/tutorials`, {
    params,
    signal,
    withCredentials: true,
  });

const fetchCMSTutorialListQFn =
  (apiClient: ApiClient): QueryFunction<TutorialListResponse, FetcCMSTutorialListQKey> =>
  ({ queryKey, signal }) =>
    runAsyncEffect(fetchCMSTutorialList(apiClient, { ...queryKey[2], page: queryKey[3] }, signal));

export const useCMSTutorialListQuery = (
  variables: FetchCMSTutorialListVariables,
  pageParams: PaginationFP | PaginationState,
  options?: UseQueryOptions<
    TutorialListResponse,
    FailedResponse,
    TutorialListResponse,
    FetcCMSTutorialListQKey
  >,
) => {
  const apiClient = useApiClient();

  return useQuery({
    ...options,
    queryFn: fetchCMSTutorialListQFn(apiClient),
    queryKey: [
      QueryNamespace.TUTORIAL,
      RequestName.FETCH_LIST_CMS,
      variables,
      toPaginationFP(pageParams),
    ],
  });
};
