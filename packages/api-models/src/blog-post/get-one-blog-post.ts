import * as zod from 'zod';

import { localeSchema } from '../common/locale';
import { getSuccessResponseSchema } from '../common/success-response';
import { blogPostSchema } from './blog-post';

export const getOneBlogPostQuerySchema = zod.object({
  locale: localeSchema.min(1),
});
export type GetOneBlogPostQuery = zod.infer<typeof getOneBlogPostQuerySchema>;

export const getOneBlogPostResponseSchema = getSuccessResponseSchema(blogPostSchema);
export type GetOneBlogPostResponse = zod.infer<typeof getOneBlogPostResponseSchema>;
