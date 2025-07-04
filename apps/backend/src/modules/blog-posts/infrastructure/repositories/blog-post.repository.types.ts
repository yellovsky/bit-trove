import type { Prisma } from '@generated/prisma';

export const dbLocalizedShortBlogPostSelect = {
  blogPost: {
    select: {
      createdAt: true,
      id: true,

      localizations: {
        select: {
          blogPost: {
            select: {
              slug: true,
            },
          },
          id: true,
          languageCode: true,
          publishedAt: true,
        },
      },
      publishedAt: true,
      slug: true,
      updatedAt: true,
    },
  },
  contentJSON: true,
  createdAt: true,
  id: true,
  languageCode: true,
  publishedAt: true,
  seoDescription: true,
  seoKeywords: true,
  seoTitle: true,
  shortDescription: true,
  title: true,
  updatedAt: true,
} as const satisfies Prisma.LocalizedBlogPostSelect;

export const dbLocalizedBlogPostSelect = {
  ...dbLocalizedShortBlogPostSelect,
} as const satisfies Prisma.LocalizedBlogPostSelect;

export type DBLocalizedBlogPost = Prisma.LocalizedBlogPostGetPayload<{ select: typeof dbLocalizedBlogPostSelect }>;
