// global modules
import type { SortWithDirection } from '@repo/api-models';
import { useSearchParams } from '@remix-run/react';
import { type Dispatch, type SetStateAction, useCallback, useMemo } from 'react';
import type { OnChangeFn, SortingState } from '@tanstack/react-table';

export const useSearchSortingState = <TSort extends string>(
  defaultSorting: SortWithDirection<TSort>,
  typeGuard: (val: string) => val is SortWithDirection<TSort>,
): [SortingState, SortWithDirection<TSort>, Dispatch<SetStateAction<SortingState>>] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSorting = searchParams.get('sort') || defaultSorting;
  const sorting = typeGuard(urlSorting) ? urlSorting : defaultSorting;
  const sortingState = useMemo(
    (): SortingState => [{ desc: sorting.startsWith('-'), id: sorting.replace(/^-/, '') }],
    [sorting],
  );

  const setSorting: OnChangeFn<SortingState> = useCallback(
    updater => {
      const updated = (typeof updater === 'function' ? updater(sortingState) : updater).at(0);

      if (!updated) return;
      searchParams.set('sort', [updated.desc ? '-' : '', updated.id].filter(Boolean).join(''));
      setSearchParams(searchParams, { preventScrollReset: true });
    },
    [searchParams, setSearchParams],
  );

  return [sortingState, sorting, setSorting];
};
