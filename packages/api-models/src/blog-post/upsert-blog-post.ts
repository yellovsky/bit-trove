import type * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response';
import { blogPostSchema } from './blog-post';

export const blogPostUpsertResponseSchema = getSuccessResponseSchema(blogPostSchema);
export type BlogPostUpsertResponse = zod.infer<typeof blogPostUpsertResponseSchema>;
