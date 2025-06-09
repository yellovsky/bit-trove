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

export type DBLocalizedShortBlogPost = Prisma.BlogPostGetPayload<{ select: typeof dbLocalizedShortBlogPostSelect }>;

export const dbLocalizedBlogPostSelect = {
  ...dbLocalizedShortBlogPostSelect,
} as const satisfies Prisma.LocalizedBlogPostSelect;

export type DBLocalizedBlogPost = Prisma.LocalizedBlogPostGetPayload<{ select: typeof dbLocalizedBlogPostSelect }>;

export const dbShortBlogPostSelect = {
  createdAt: true,
  id: true,
  localizations: {
    select: {
      createdAt: true,
      id: true,
      languageCode: true,
      publishedAt: true,
      seoDescription: true,
      seoKeywords: true,
      seoTitle: true,
      title: true,
      updatedAt: true,
    },
  },
  publishedAt: true,
  slug: true,
  updatedAt: true,
} as const satisfies Prisma.BlogPostSelect;

export type DBShortBlogPost = Prisma.BlogPostGetPayload<{ select: typeof dbShortBlogPostSelect }>;

export const dbBlogPostSelect = {
  ...dbShortBlogPostSelect,
} as const satisfies Prisma.BlogPostSelect;

export type DBBlogPost = Prisma.BlogPostGetPayload<{ select: typeof dbBlogPostSelect }>;
