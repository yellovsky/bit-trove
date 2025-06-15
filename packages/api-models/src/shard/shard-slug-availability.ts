import * as zod from 'zod';

import { getSuccessResponseSchema } from '../common/success-response';
import { uuidSchema } from '../common/uuid';

export const shardSlugAvailabilitySchema = zod.object({ available: zod.boolean(), takenBy: uuidSchema.optional() });
export type ShardSlugAvailability = zod.infer<typeof shardSlugAvailabilitySchema>;

export const shardSlugAvailabilityResponseSchema = getSuccessResponseSchema(shardSlugAvailabilitySchema);
export type ShardSlugAvailabilityResponse = zod.infer<typeof shardSlugAvailabilityResponseSchema>;
