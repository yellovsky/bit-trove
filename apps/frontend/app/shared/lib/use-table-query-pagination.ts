import type { OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

const DEFAULT_PAGE_SIZE = 24;

export const useTableQueryPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('pageIndex') || 0);
  const pageSize = Number(searchParams.get('pageSize') || DEFAULT_PAGE_SIZE);

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

  const setPagination: OnChangeFn<PaginationState> = useCallback(
    (updater) => {
      const updated = typeof updater === 'function' ? updater(pagination) : updater;
      if (!updated) return;

      setSearchParams(
        (prev) => {
          prev.set('pageIndex', updated.pageIndex.toString());
          prev.set('pageSize', updated.pageSize.toString());
          return prev;
        },
        { preventScrollReset: true }
      );
    },
    [setSearchParams, pagination]
  );

  const setPage = useCallback(
    (pageNumber: number) =>
      setSearchParams(
        (prev) => {
          prev.set('pageIndex', (pageNumber - 1).toString());
          return prev;
        },
        { preventScrollReset: true }
      ),
    [setSearchParams]
  );

  return useMemo(() => ({ pagination, setPage, setPagination }), [pagination, setPage, setPagination]);
};
