// global modules
import * as zod from 'zod';
import type { ArticleImageBlock } from '@repo/api-models';

// common modules
import { articleCodeBlockSchema } from '~/components/forms/article-code-block';
import { articleTextBlockSchema } from '~/components/forms/article-text-block';
import type { UpdateTutorialVariables } from '~/api/tutorial';

const articleImageBlockSchema: zod.ZodType<ArticleImageBlock> = zod.object({
  order: zod.number().int(),
  subtitle: zod.string().nullable(),
  title: zod.string().nullable(),
  type: zod.literal('image'),

  content: zod.object({ url: zod.string().min(1) }),
});

export const upsertTutorialFPSchema: zod.ZodType<UpdateTutorialVariables> = zod.object({
  translations: zod
    .object({
      blocks: zod
        .union([articleCodeBlockSchema, articleTextBlockSchema, articleImageBlockSchema])
        .array(),
      language_code: zod.string().min(1),
      seo_description: zod.string().nullable(),
      seo_keywords: zod.string().nullable(),
      seo_title: zod.string().nullable(),
      short_description: zod.string().min(1),
      title: zod.string().min(1),
    })
    .array(),
});
