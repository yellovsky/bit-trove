// global modules
import type { GetNextPageParamFunction } from '@tanstack/react-query';
import type { PaginationState } from '@tanstack/react-table';
import type { PaginationFP, WithListResponseMeta } from '@repo/api-models';

export const DEFAULT_PAGE_SIZE = 20;
export const initialPageParam: PaginationFP = { limit: DEFAULT_PAGE_SIZE, offset: 0 };
export const initialPaginationState: PaginationState = {
  pageIndex: 0,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const getPaginationStateByIndex = (index: number): PaginationState => ({
  pageIndex: index,
  pageSize: DEFAULT_PAGE_SIZE,
});

export const getPageParamByIndex = (index: number): PaginationFP => ({
  limit: DEFAULT_PAGE_SIZE,
  offset: index * DEFAULT_PAGE_SIZE,
});

export const getNextPageParam: GetNextPageParamFunction<PaginationFP, WithListResponseMeta> = (
  lastPage,
  allPages,
) => {
  const total = lastPage.meta.pagination.total;
  const pageSize = DEFAULT_PAGE_SIZE;
  const limit = pageSize;
  const offset = allPages.length * pageSize;

  return offset >= total ? null : { limit, offset };
};
