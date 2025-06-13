import * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response';

export const shardSlugAvailabilitySchema = zod.object({
  available: zod.boolean(),
});
export type ShardSlugAvailability = zod.infer<typeof shardSlugAvailabilitySchema>;

export const shardSlugAvailabilityResponseSchema = getSuccessResponseSchema(shardSlugAvailabilitySchema);
export type ShardSlugAvailabilityResponse = zod.infer<typeof shardSlugAvailabilityResponseSchema>;
