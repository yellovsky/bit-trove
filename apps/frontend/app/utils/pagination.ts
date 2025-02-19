// global modules
import type { PaginationFP } from '@repo/api-models';
import { useSearchParams } from '@remix-run/react';
import { type Dispatch, type SetStateAction, useCallback, useMemo } from 'react';
import type { OnChangeFn, PaginationState } from '@tanstack/react-table';

// common modules
import { DEFAULT_PAGE_SIZE } from '~/api/pagination';

export const toPaginationFP = (pagination: PaginationFP | PaginationState): PaginationFP =>
  'limit' in pagination
    ? pagination
    : { limit: pagination.pageSize, offset: pagination.pageIndex * pagination.pageSize };

const DEFAILT_PAGE_INDEX = 1;

export const useSearchPaginationState = (
  defaultPageIndex = DEFAILT_PAGE_INDEX,
): [PaginationState, Dispatch<SetStateAction<PaginationState>>] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = Number(searchParams.get('page')) || defaultPageIndex;
  const paginationState = useMemo(
    (): PaginationState => ({ pageIndex: pageIndex - 1, pageSize: DEFAULT_PAGE_SIZE }),
    [pageIndex],
  );

  const setPagination: OnChangeFn<PaginationState> = useCallback(
    updater => {
      const updated =
        typeof updater === 'function' ? updater(paginationState).pageIndex : updater.pageIndex;

      searchParams.set('page', String(updated + 1));
      setSearchParams(searchParams, { preventScrollReset: true });
    },
    [searchParams, setSearchParams],
  );

  return [paginationState, setPagination];
};
