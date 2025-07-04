import * as zod from 'zod';

export type SortBy<TKey extends string> = TKey extends `-${infer TRest}` ? SortBy<TRest> : TKey | `-${TKey}`;

export const makeSortBySchema = <TKey extends string>(key: TKey) =>
  zod.union([zod.literal<`-${TKey}`>(`-${key}`), zod.literal<TKey>(key)]);
