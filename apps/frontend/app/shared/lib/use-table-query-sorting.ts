import { useSearchParams } from 'react-router';
import type * as zod from 'zod';

type ExctractSearch<TSearch extends string> = TSearch extends `-${infer S}` ? S : TSearch;
type SearchWithoutDirection<TSort extends string> = ExctractSearch<TSort>;

const removeSortDirection = <TSort extends string>(sort: TSort): SearchWithoutDirection<TSort> =>
  (sort.startsWith('-') ? sort.slice(1) : sort) as SearchWithoutDirection<TSort>;

const sortingStateToSort = <TSort extends string>(
  state: SortingState,
  schema: zod.ZodSchema<TSort>,
  defaultSort: TSort
): TSort => {
  const firstOne = state.at(0);
  if (!firstOne) return defaultSort;
  const sort = [firstOne.desc ? '-' : '', firstOne.id].filter(Boolean).join('');
  return schema.safeParse(sort).data || defaultSort;
};

import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

export const useTableQuerySorting = <TSort extends string>(schema: zod.ZodSchema<TSort>, defaultSort: TSort) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSorting = searchParams.get('sort');
  const sortingStr: TSort = schema.safeParse(urlSorting).data || defaultSort;

  const sorting: SortingState = useMemo(
    () => [{ desc: sortingStr.startsWith('-'), id: removeSortDirection(sortingStr) }],
    [sortingStr]
  );

  const setSorting: OnChangeFn<SortingState> = useCallback(
    (updater) => {
      const updated = (typeof updater === 'function' ? updater(sorting) : updater).at(0);
      if (!updated) return;

      searchParams.set('sort', [updated.desc ? '-' : '', updated.id].filter(Boolean).join(''));
      setSearchParams(searchParams, { preventScrollReset: true });
    },
    [setSearchParams, searchParams, sorting]
  );

  return useMemo(
    () => ({ setSorting, sort: sortingStateToSort(sorting, schema, defaultSort), sorting }),
    [setSorting, sorting, schema, defaultSort]
  );
};
