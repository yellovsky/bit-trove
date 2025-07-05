import * as zod from 'zod';

import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { blogPostSchema } from './blog-post';

export const upsertBlogPostBodySchema = zod.object({
  contentJSON: jsonContentSchema,
  entryId: zod.string().nullable(),
  languageCode: localeSchema,
  published: zod.boolean(),
  seoDescription: zod.string().nullable(),
  seoKeywords: zod.string().nullable(),
  seoTitle: zod.string().nullable(),
  shortDescription: zod.string().nullable(),
  slug: zod.string().min(1),
  tags: zod.string().array(),
  title: zod.string().min(1),
});
export type UpsertBlogPostBody = zod.infer<typeof upsertBlogPostBodySchema>;

export const upsertBlogPostResponseSchema = getSuccessResponseSchema(blogPostSchema);
export type UpsertBlogPostResponse = zod.infer<typeof upsertBlogPostResponseSchema>;
