// global modules
import { apiHost } from '@bit-trove/utils/api-host';
import type { QueryFunction } from '@tanstack/react-query';
import axios, { type AxiosInstance } from 'axios';

export type IDProperty = { id: number };

export interface APIResponseData<TAttributes extends object> extends IDProperty {
  attributes: TAttributes;
}

export interface PaginationMeta {
  limit: number;
  start: number;
  total: number;
}

export interface APIResponseCollectionMetadata {
  pagination: PaginationMeta;
}

export interface APIResponse<TAttributes extends object> {
  data: APIResponseData<TAttributes> | null;
}

export interface WithAPIResponseCollectionMetadata {
  meta: APIResponseCollectionMetadata;
}

export interface APIResponseCollection<TAttributes extends object>
  extends WithAPIResponseCollectionMetadata {
  data: APIResponseData<TAttributes>[];
}

export type Populate<TKey extends string> = Record<TKey, string | object>;

export interface PaginationParams {
  start: number;
  limit: number;
}

let client: AxiosInstance | undefined;
export const getApiClient = (): AxiosInstance => {
  // console.log('window', window);
  console.log('getApiClient', getApiClient);
  console.log("apiHost('/api')", apiHost('/api'));
  if (!client) client = axios.create({ baseURL: apiHost('/api') });
  return client;
};

export const DEFAULT_PAGE_LIMIT = 24;

export const initialPageParam = { limit: DEFAULT_PAGE_LIMIT, start: 0 };

export const getNextPageParam = (lastPage: WithAPIResponseCollectionMetadata) => {
  const { start, limit, total } = lastPage.meta.pagination;
  const nextParams = { limit, start: start + DEFAULT_PAGE_LIMIT * limit };
  return nextParams.start < total ? nextParams : undefined;
};

export type QueryKeyOf<TQueryFn> =
  TQueryFn extends QueryFunction<unknown, infer TKey> ? TKey : never;
