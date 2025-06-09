export const sortToOrderBy = <TKey extends string>(sort: TKey | `-${TKey}`): Record<TKey, 'asc' | 'desc'> => {
  const [key, direction] = sort.startsWith('-')
    ? [sort.split('-')[1] as TKey, 'desc' as const]
    : [sort as TKey, 'asc' as const];

  return { [key]: direction } as Record<TKey, 'asc' | 'desc'>;
};
