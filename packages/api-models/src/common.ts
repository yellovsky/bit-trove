// global modules
import { apiHost } from '@repo/utils/api-host';
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
  pagination: {
    limit: number;
    start: number;
    total: number;
  };
}

export interface APIResponse<TAttributes extends object> {
  data: APIResponseData<TAttributes> | null;
}

export interface APIResponseCollection<TAttributes extends object> {
  data: APIResponseData<TAttributes>[];
  meta: APIResponseCollectionMetadata;
}

export type Populate<TKey extends string> = Record<TKey, string | object>;

export interface PaginationParams {
  start: number;
  limit: number;
}

export interface WithPaginationMeta {
  meta: {
    pagination: PaginationMeta;
  };
}

let client: AxiosInstance | undefined;
export const getApiClient = (): AxiosInstance => {
  if (!client) client = axios.create({ baseURL: apiHost('/api') });
  return client;
};

export const DEFAULT_PAGE_LIMIT = 24;

export const initialPageParam = { start: 0, limit: DEFAULT_PAGE_LIMIT };

export const getNextPageParam = (lastPage: WithPaginationMeta) => {
  const { start, limit, total } = lastPage.meta.pagination;
  const nextParams = { start: start + DEFAULT_PAGE_LIMIT * limit, limit: limit };
  return nextParams.start < total ? nextParams : undefined;
};

export type QueryKeyOf<TQueryFn> =
  TQueryFn extends QueryFunction<unknown, infer TKey> ? TKey : never;
