// biome-ignore syntax/correctness/noTypeOnlyImportAttributes: it's a type
import type { JSONContent } from '@tiptap/core' with { 'resolution-mode': 'import' };
import * as zod from 'zod';

export const jsonContentSchema: zod.ZodType<JSONContent> = zod.any();
export type { JSONContent };
