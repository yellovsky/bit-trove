import type { Prisma } from '@generated/prisma';

export const dbShortShardSelect = {
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
      createdAt: true,
      id: true,
      publishedAt: true,
      shards: {
        select: {
          id: true,
          languageCode: true,
          publishedAt: true,
          slug: true,
        },
      },
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
} as const satisfies Prisma.ShardSelect;

export type DBShortShard = Prisma.ShardGetPayload<{
  select: typeof dbShortShardSelect;
}>;

export const dbShardSelect = {
  ...dbShortShardSelect,
  contentJSON: true,
  seoDescription: true,
  seoKeywords: true,
  seoTitle: true,
} as const satisfies Prisma.ShardSelect;

export type DBShard = Prisma.ShardGetPayload<{ select: typeof dbShardSelect }>;
