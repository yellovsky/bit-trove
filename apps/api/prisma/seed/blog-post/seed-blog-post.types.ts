// global modules
import { Prisma } from '@prisma/client';

export const dietRestrictionDataFields = {
  published_at: true,
  slug: true,

  article: {
    select: {
      original_language_code: true,
      published_at: true,
      translations: {
        select: {
          language_code: true,
          published_at: true,
          title: true,
        },
      },
    },
  },
} satisfies Prisma.BlogPostSelect;

export type BlogPostData = Prisma.BlogPostGetPayload<{
  select: typeof dietRestrictionDataFields;
}>;
