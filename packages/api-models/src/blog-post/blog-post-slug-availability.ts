import * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response';
import { uuidSchema } from '../common/uuid';

export const blogPostSlugAvailabilitySchema = zod.object({
  available: zod.boolean(),
  takenBy: uuidSchema.optional(),
});
export type BlogPostSlugAvailability = zod.infer<typeof blogPostSlugAvailabilitySchema>;

export const blogPostSlugAvailabilityResponseSchema = getSuccessResponseSchema(blogPostSlugAvailabilitySchema);
export type BlogPostSlugAvailabilityResponse = zod.infer<typeof blogPostSlugAvailabilityResponseSchema>;
