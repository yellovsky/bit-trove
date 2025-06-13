import * as zod from 'zod';

import { localeSchema } from '../common/locale';
import { pageRequestSchema } from '../common/page-request';
import { getItemsWithPaginationSchema, getSuccessResponseSchema } from '../common/success-response';
import { shortShardSchema } from './shard';

export const getManyShardsSortSchema = zod.union([
  zod.literal('title'),
  zod.literal('-title'),

  zod.literal('createdAt'),
  zod.literal('-createdAt'),

  zod.literal('publishedAt'),
  zod.literal('-publishedAt'),
]);

const getManyShardsQueryFilterSchema = zod.object({
  languageCodeIn: localeSchema.array().optional(),
});

export const getManyShardsQuerySchema = zod.object({
  filter: getManyShardsQueryFilterSchema.optional(),
  locale: localeSchema,
  page: pageRequestSchema,
  sort: getManyShardsSortSchema,
});
export type GetManyShardsQuery = zod.infer<typeof getManyShardsQuerySchema>;

export const getManyShardsResponseSchema = getSuccessResponseSchema(getItemsWithPaginationSchema(shortShardSchema));
export type GetManyShardsResponse = zod.infer<typeof getManyShardsResponseSchema>;
