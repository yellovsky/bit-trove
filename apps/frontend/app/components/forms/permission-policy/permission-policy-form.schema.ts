// global modules
import * as zod from 'zod';
import type { UpsertPermissionPolicyFP } from '@repo/api-models';

export const upsertPermissionPolicyFPSchema: zod.ZodType<UpsertPermissionPolicyFP> = zod.object({
  act: zod.string().min(1),
  cond: zod.string().min(1),
  note: zod.string().nullable(),
  obj_type: zod.string().min(1),
  sub: zod.string().min(1),
});
