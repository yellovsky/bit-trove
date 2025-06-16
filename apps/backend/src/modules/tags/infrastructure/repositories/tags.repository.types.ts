import type { Prisma } from '@generated/prisma';

export const dbTagSelect = { id: true, name: true } as const satisfies Prisma.TagSelect;
export type DBTag = Prisma.TagGetPayload<{ select: typeof dbTagSelect }>;
