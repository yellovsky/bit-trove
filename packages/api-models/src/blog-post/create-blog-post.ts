import * as zod from 'zod';

import { jsonContentSchema } from '../common/json-content';
import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { blogPostSchema } from './blog-post';

export const createBlogPostBodySchema = zod.object({
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

export type CreateBlogPostBody = zod.infer<typeof createBlogPostBodySchema>;

export const createBlogPostResponseSchema = getSuccessResponseSchema(blogPostSchema);

export type CreateBlogPostResponse = zod.infer<typeof createBlogPostResponseSchema>;
