// global modules
import * as zod from 'zod';
import type { ArticleCodeBlock, CodeBlockVariant } from '@repo/api-models';

export const codeBlockVariantSchema: zod.ZodType<CodeBlockVariant> = zod.object({
  filename: zod.string().nullable(),
  label: zod.string().nullable(),
  language: zod.string().min(1),
  text: zod.string().min(1),
});

export const articleCodeBlockSchema: zod.ZodType<ArticleCodeBlock> = zod.object({
  order: zod.number().int(),
  subtitle: zod.string().nullable(),
  title: zod.string().nullable(),
  type: zod.literal('code'),

  content: zod.object({
    variants: codeBlockVariantSchema.array(),
  }),
});
