import { type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetAllTagsQuery, GetAllTagsResponse, PageRequest } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { TAGS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const ALL_TAGS_QUERY_KEY_TOKEN = 'all_tags';

export type GetAllTagsVariables = GetAllTagsQuery;
type GetAllTagsQKey = readonly [
  typeof TAGS_ENTITY_QUERY_KEY_TOKEN,
  typeof ALL_TAGS_QUERY_KEY_TOKEN,
  GetAllTagsVariables,
];

const makeGetAllTagsQKey = (variables: GetAllTagsVariables): GetAllTagsQKey => [
  TAGS_ENTITY_QUERY_KEY_TOKEN,
  ALL_TAGS_QUERY_KEY_TOKEN,
  variables,
];

const getAllTags =
  (apiClient: ApiClient): QueryFunction<GetAllTagsResponse, GetAllTagsQKey, PageRequest> =>
  async ({ queryKey, signal }) => {
    const params: GetAllTagsVariables = queryKey[2];
    return apiClient.get<GetAllTagsResponse>('/v1/tags', { params, signal });
  };

export const useAllTagsQuery = (variables: GetAllTagsVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetAllTagsResponse, FailedResponse, GetAllTagsResponse, GetAllTagsQKey>({
    queryFn: getAllTags(apiClient),
    queryKey: makeGetAllTagsQKey(variables),
  });
};
