import type { O } from 'ts-toolbelt';

export type SortBy<TKey extends string> = TKey | `-${TKey}`;
export type OrderBy<TKey extends string> = O.AtLeast<Record<TKey, 'asc' | 'desc'>>;

export const sortToOrderBy = <TKey extends string>(sort: SortBy<TKey>): OrderBy<TKey> => {
  const [key, direction] = sort.startsWith('-')
    ? [sort.split('-')[1] as TKey, 'desc' as const]
    : [sort as TKey, 'asc' as const];

  return { [key]: direction } as OrderBy<TKey>;
};
