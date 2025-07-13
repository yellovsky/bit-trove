import type { Prisma } from '@generated/prisma';

export const dbShortArticleSelect = {
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
      articles: {
        select: {
          id: true,
          languageCode: true,
          publishedAt: true,
          slug: true,
        },
      },
      authorId: true,
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
  type: true,
  updatedAt: true,
} as const satisfies Prisma.ArticleSelect;

export type DBShortArticle = Prisma.ArticleGetPayload<{
  select: typeof dbShortArticleSelect;
}>;

export const dbArticleSelect = {
  ...dbShortArticleSelect,
  contentJSON: true,
  seoDescription: true,
  seoKeywords: true,
  seoTitle: true,
} as const satisfies Prisma.ArticleSelect;

export type DBArticle = Prisma.ArticleGetPayload<{ select: typeof dbArticleSelect }>;
