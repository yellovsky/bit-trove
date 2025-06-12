import * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response';

export const thoughtSlugAvailabilitySchema = zod.object({
  available: zod.boolean(),
});
export type ThoughtSlugAvailability = zod.infer<typeof thoughtSlugAvailabilitySchema>;

export const thoughtSlugAvailabilityResponseSchema = getSuccessResponseSchema(thoughtSlugAvailabilitySchema);
export type ThoughtSlugAvailabilityResponse = zod.infer<typeof thoughtSlugAvailabilityResponseSchema>;
