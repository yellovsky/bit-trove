import type * as zod from 'zod';

import type { ShortArticlesGetResponse } from '../article';
import { getItemsWithPaginationSchema, getSuccessResponseSchema } from '../common/success-response';
import { isBlogPost, shortBlogPostSchema } from './blog-post';

export const shortBlogPostsGetResponseSchema = getSuccessResponseSchema(
  getItemsWithPaginationSchema(shortBlogPostSchema)
);
export type ShortBlogPostsGetResponse = zod.infer<typeof shortBlogPostsGetResponseSchema>;
export const isShortBlogPostsGetResponse = (
  response: ShortArticlesGetResponse
): response is ShortBlogPostsGetResponse => response.data.items.every(isBlogPost);
