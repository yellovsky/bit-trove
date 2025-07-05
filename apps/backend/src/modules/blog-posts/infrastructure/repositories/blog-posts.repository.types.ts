import type { Prisma } from '@generated/prisma';

export const dbShortBlogPostSelect = {
  author: {
    select: {
      id: true,
      profiles: {
        select: {
          isRoot: true,
          name: true,
        },
      },
    },
  },
  createdAt: true,
  entry: {
    select: {
      authorId: true,
      blogPosts: {
        select: {
          id: true,
          languageCode: true,
          publishedAt: true,
          slug: true,
        },
      },
      createdAt: true,
      id: true,
      publishedAt: true,
      updatedAt: true,
    },
  },
  id: true,
  languageCode: true,
  publishedAt: true,
  readingTime: true,
  shortDescription: true,
  slug: true,
  tags: {
    select: {
      order: true,
      tag: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  },
  title: true,
  updatedAt: true,
} as const satisfies Prisma.BlogPostSelect;

export type DBShortBlogPost = Prisma.BlogPostGetPayload<{
  select: typeof dbShortBlogPostSelect;
}>;

export const dbBlogPostSelect = {
  ...dbShortBlogPostSelect,
  contentJSON: true,
  seoDescription: true,
  seoKeywords: true,
  seoTitle: true,
} as const satisfies Prisma.BlogPostSelect;

export type DBBlogPost = Prisma.BlogPostGetPayload<{ select: typeof dbBlogPostSelect }>;
