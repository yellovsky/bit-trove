import type { Prisma } from '@generated/prisma';

export const dbLocalizedShortThoughtSelect = {
  contentJSON: true,
  createdAt: true,
  id: true,
  languageCode: true,
  publishedAt: true,
  seoDescription: true,
  seoKeywords: true,
  seoTitle: true,
  shortDescription: true,
  thought: {
    select: {
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
      id: true,

      localizations: {
        select: {
          id: true,
          languageCode: true,
          publishedAt: true,
          thought: {
            select: {
              slug: true,
            },
          },
        },
      },
      publishedAt: true,
      slug: true,
      updatedAt: true,
    },
  },
  title: true,
  updatedAt: true,
} as const satisfies Prisma.LocalizedThoughtSelect;

export type DBLocalizedShortThought = Prisma.LocalizedThoughtGetPayload<{
  select: typeof dbLocalizedShortThoughtSelect;
}>;

export const dbLocalizedThoughtSelect = {
  ...dbLocalizedShortThoughtSelect,
} as const satisfies Prisma.LocalizedThoughtSelect;

export type DBLocalizedThought = Prisma.LocalizedThoughtGetPayload<{ select: typeof dbLocalizedThoughtSelect }>;

export const dbShortThoughtSelect = {
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
} as const satisfies Prisma.ThoughtSelect;

export type DBShortThought = Prisma.ThoughtGetPayload<{ select: typeof dbShortThoughtSelect }>;

export const dbThoughtSelect = {
  ...dbShortThoughtSelect,
} as const satisfies Prisma.ThoughtSelect;

export type DBThought = Prisma.ThoughtGetPayload<{ select: typeof dbThoughtSelect }>;
