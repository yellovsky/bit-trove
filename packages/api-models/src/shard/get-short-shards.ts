import type * as zod from 'zod';

import type { ShortArticlesGetResponse } from '../article';
import { getItemsWithPaginationSchema, getSuccessResponseSchema } from '../common/success-response';
import { isShard, shortShardSchema } from './shard';

export const shortShardsGetResponseSchema = getSuccessResponseSchema(getItemsWithPaginationSchema(shortShardSchema));
export type ShortShardsGetResponse = zod.infer<typeof shortShardsGetResponseSchema>;
export const isShortShardsGetResponse = (response: ShortArticlesGetResponse): response is ShortShardsGetResponse =>
  response.data.items.every(isShard);
