import * as zod from 'zod';

import { localeSchema } from '../common/locale';
import { pageRequestSchema } from '../common/page-request';
import { getItemsWithPaginationSchema, getSuccessResponseSchema } from '../common/success-response';
import { shortThoughtSchema } from './thought';

export const getManyThoughtsSortSchema = zod.union([
  zod.literal('title'),
  zod.literal('-title'),

  zod.literal('createdAt'),
  zod.literal('-createdAt'),

  zod.literal('publishedAt'),
  zod.literal('-publishedAt'),
]);

const getManyThoughtsQueryFilterSchema = zod.object({
  languageCodeIn: localeSchema.array().optional(),
});

export const getManyThoughtsQuerySchema = zod.object({
  filter: getManyThoughtsQueryFilterSchema.optional(),
  locale: localeSchema,
  page: pageRequestSchema,
  sort: getManyThoughtsSortSchema,
});
export type GetManyThoughtsQuery = zod.infer<typeof getManyThoughtsQuerySchema>;

export const getManyThoughtsResponseSchema = getSuccessResponseSchema(getItemsWithPaginationSchema(shortThoughtSchema));
export type GetManyThoughtsResponse = zod.infer<typeof getManyThoughtsResponseSchema>;
