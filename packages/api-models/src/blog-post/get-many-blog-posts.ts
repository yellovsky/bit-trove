import * as zod from 'zod';

import { localeSchema } from '../common/locale';
import { pageRequestSchema } from '../common/page-request';
import { getItemsWithPaginationSchema, getSuccessResponseSchema } from '../common/success-response';
import { shortBlogPostSchema } from './blog-post';

export const getManyBlogPostsSortSchema = zod.union([
  zod.literal('createdAt'),
  zod.literal('-createdAt'),

  zod.literal('publishedAt'),
  zod.literal('-publishedAt'),

  zod.literal('title'),
  zod.literal('-title'),
]);

const getManyBlogPostsQueryFilterSchema = zod.object({
  languageCodeIn: localeSchema.array().optional(),
});

export const getManyBlogPostsQuerySchema = zod.object({
  filter: getManyBlogPostsQueryFilterSchema.optional(),
  locale: localeSchema,
  page: pageRequestSchema,
  sort: getManyBlogPostsSortSchema,
});
export type GetManyBlogPostsQuery = zod.infer<typeof getManyBlogPostsQuerySchema>;

export const getManyBlogPostsResponseSchema = getSuccessResponseSchema(
  getItemsWithPaginationSchema(shortBlogPostSchema)
);
export type GetManyBlogPostsResponse = zod.infer<typeof getManyBlogPostsResponseSchema>;
