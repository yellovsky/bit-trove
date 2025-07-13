import * as zod from 'zod';

import { localeSchema } from '../common/locale';
import { pageRequestSchema } from '../common/page-request';
import { makeSortBySchema } from '../common/sort-by';
import { getItemsWithPaginationSchema, getSuccessResponseSchema } from '../common/success-response';
import { articleTypeSchema, shortArticleSchema } from './article';

export const shortArticlesGetSortSchema = zod.union([
  makeSortBySchema('title'),
  makeSortBySchema('createdAt'),
  makeSortBySchema('publishedAt'),
]);
export type ShortArticlesGetSort = zod.infer<typeof shortArticlesGetSortSchema>;

const shortArticlesGetQueryFilterSchema = zod.object({
  languageCodeIn: localeSchema.array().optional(),
  typeIn: articleTypeSchema.array().optional(),
});
export type ShortArticlesGetQueryFilter = zod.infer<typeof shortArticlesGetQueryFilterSchema>;

export const shortArticlesGetQuerySchema = zod.object({
  filter: shortArticlesGetQueryFilterSchema.optional(),
  locale: localeSchema,
  page: pageRequestSchema,
  search: zod.string().min(3).optional(),
  sort: shortArticlesGetSortSchema,
});
export type ShortArticlesGetQuery = zod.infer<typeof shortArticlesGetQuerySchema>;

export const shortArticlesGetResponseSchema = getSuccessResponseSchema(
  getItemsWithPaginationSchema(shortArticleSchema)
);
export type ShortArticlesGetResponse = zod.infer<typeof shortArticlesGetResponseSchema>;
