import type { OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useSearchParams } from 'react-router';

const DEFAULT_PAGE_SIZE = 24;

// TODO add memoization as it is used with 'use no memo' directive;
export const useTableQueryPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('pageIndex') || 0);
  const pageSize = Number(searchParams.get('pageSize') || DEFAULT_PAGE_SIZE);

  const pagination = { pageIndex, pageSize };

  const setPagination: OnChangeFn<PaginationState> = (updater) => {
    const updated = typeof updater === 'function' ? updater(pagination) : updater;
    if (!updated) return;

    searchParams.set('pageIndex', updated.pageIndex.toString());
    searchParams.set('pageSize', updated.pageSize.toString());

    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return { pagination, setPagination };
};
