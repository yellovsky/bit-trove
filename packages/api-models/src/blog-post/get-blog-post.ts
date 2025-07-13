import type * as zod from 'zod';

import { type ArticleGetResponse, articleGetQuerySchema } from '../article';
import { getSuccessResponseSchema } from '../common/success-response';
import { blogPostSchema, isBlogPost } from './blog-post';

export const blogPostGetQuerySchema = articleGetQuerySchema;
export type BlogPostGetQuery = zod.infer<typeof blogPostGetQuerySchema>;

export const blogPostGetResponseSchema = getSuccessResponseSchema(blogPostSchema);
export type BlogPostGetResponse = zod.infer<typeof blogPostGetResponseSchema>;

export const isBlogPostGetResponse = (maybeResponse: ArticleGetResponse): maybeResponse is BlogPostGetResponse =>
  isBlogPost(maybeResponse.data);
