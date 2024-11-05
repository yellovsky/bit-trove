// global modules
import type { Prisma } from '@prisma/client';
import type { SortWithDirection } from '@repo/api-models';

export const sortToOrderBy = <TSort extends string>(
  sort: SortWithDirection<TSort>,
): Record<TSort, Prisma.SortOrder> => {
  const name = sort.replace(/^-/, '') as TSort;
  return { [name]: sort.startsWith('-') ? 'desc' : 'asc' } as Record<
    TSort,
    Prisma.SortOrder
  >;
};
