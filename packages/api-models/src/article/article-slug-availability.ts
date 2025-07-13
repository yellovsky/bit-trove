import * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response';
import { uuidSchema } from '../common/uuid';

export const articleSlugAvailabilitySchema = zod.object({
  available: zod.boolean(),
  takenBy: uuidSchema.optional(),
});
export type ArticleSlugAvailability = zod.infer<typeof articleSlugAvailabilitySchema>;

export const articleSlugAvailabilityResponseSchema = getSuccessResponseSchema(articleSlugAvailabilitySchema);
export type ArticleSlugAvailabilityResponse = zod.infer<typeof articleSlugAvailabilityResponseSchema>;
