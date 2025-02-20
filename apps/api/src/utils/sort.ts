// global modules
import { asc, desc } from 'drizzle-orm';
import type { SortWithDirection, SortWithoutDirection } from '@repo/api-models';

export const removeSortDirection = <TKey extends string>(
  withDirection: SortWithDirection<TKey>,
): SortWithoutDirection<TKey> =>
  withDirection.replace(/^-/, '') as SortWithoutDirection<TKey>;

export const getSortDirectionFn = (sort: string) =>
  sort.startsWith('-') ? desc : asc;
