import * as zod from 'zod';

import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { blogPostSchema } from './blog-post';

export const updateBlogPostBodySchema = zod.object({
  contentJSON: jsonContentSchema.nullable(),
  languageCode: localeSchema,
  published: zod.boolean(),
  seoDescription: zod.string().nullable(),
  seoKeywords: zod.string().nullable(),
  seoTitle: zod.string().nullable(),
  shortDescription: zod.string().min(1),
  slug: zod.string().min(1),
  title: zod.string().min(1),
});

export type UpdateBlogPostBody = zod.infer<typeof updateBlogPostBodySchema>;

export const updateBlogPostResponseSchema = getSuccessResponseSchema(blogPostSchema);

export type UpdateBlogPostResponse = zod.infer<typeof updateBlogPostResponseSchema>;
