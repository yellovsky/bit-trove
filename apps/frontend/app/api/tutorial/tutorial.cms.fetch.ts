// global modules
import type { CMSTutorialResponse, FailedResponse, GetOneTutorialFP } from '@repo/api-models';
import { type QueryFunction, useQuery, type UseQueryOptions } from '@tanstack/react-query';

// common modules
import { runAsyncEffect } from '~/utils/effect';
import { type ApiClient, useApiClient } from '~/api/api-client';

// local modules
import { QueryNamespace, RequestName } from '../constants';

export interface FetchCMSTutorialVariables extends GetOneTutorialFP {
  slug: string;
}

type FetchCMSTutorialQKey = [
  QueryNamespace.TUTORIAL,
  RequestName.FETCH_ONE_CMS,
  FetchCMSTutorialVariables,
];

const fetchCMSTutorialQFn =
  (apiClient: ApiClient): QueryFunction<CMSTutorialResponse, FetchCMSTutorialQKey> =>
  ({ queryKey, signal }) => {
    const { slug, ...params } = queryKey[2];

    return runAsyncEffect(
      apiClient.get<CMSTutorialResponse>(`/v1/cms/tutorials/${slug}`, {
        params,
        signal,
        withCredentials: true,
      }),
    );
  };

export const useCMSTutorialQuery = (
  variables: FetchCMSTutorialVariables,
  options?: UseQueryOptions<
    CMSTutorialResponse,
    FailedResponse,
    CMSTutorialResponse,
    FetchCMSTutorialQKey
  >,
) => {
  const apiClient = useApiClient();

  return useQuery({
    ...options,
    queryFn: fetchCMSTutorialQFn(apiClient),
    queryKey: [QueryNamespace.TUTORIAL, RequestName.FETCH_ONE_CMS, variables],
  });
};
