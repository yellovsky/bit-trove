// global modules
import axios, { type AxiosInstance } from 'axios';
import { apiHost } from '@repo/utils/api-host';

export type Populate<TKey extends string> = Record<TKey, string | object>;

export interface PaginationParams {
  start: number;
  limit: number;
}

export interface PaginationMeta {
  limit: number;
  start: number;
  total: number;
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

export const DEFAULT_PAGE_LIMIT = 1;

export const initialPageParam = { start: 0, limit: DEFAULT_PAGE_LIMIT };

export const getNextPageParam = (lastPage: WithPaginationMeta) => {
  const { start, limit, total } = lastPage.meta.pagination;
  const nextParams = { start: start + DEFAULT_PAGE_LIMIT * limit, limit: limit };
  return nextParams.start < total ? nextParams : undefined;
};
