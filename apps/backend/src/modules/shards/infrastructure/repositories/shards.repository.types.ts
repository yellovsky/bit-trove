import type { Prisma } from '@generated/prisma';

export const dbLocalizedShortShardSelect = {
  contentJSON: true,
  createdAt: true,
  id: true,
  languageCode: true,
  publishedAt: true,
  seoDescription: true,
  seoKeywords: true,
  seoTitle: true,
  shard: {
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
          shard: {
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
  shortDescription: true,
  title: true,
  updatedAt: true,
} as const satisfies Prisma.LocalizedShardSelect;

export type DBLocalizedShortShard = Prisma.LocalizedShardGetPayload<{
  select: typeof dbLocalizedShortShardSelect;
}>;

export const dbLocalizedShardSelect = {
  ...dbLocalizedShortShardSelect,
} as const satisfies Prisma.LocalizedShardSelect;

export type DBLocalizedShard = Prisma.LocalizedShardGetPayload<{ select: typeof dbLocalizedShardSelect }>;

export const dbShortShardSelect = {
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
} as const satisfies Prisma.ShardSelect;

export type DBShortShard = Prisma.ShardGetPayload<{ select: typeof dbShortShardSelect }>;

export const dbShardSelect = {
  ...dbShortShardSelect,
} as const satisfies Prisma.ShardSelect;

export type DBShard = Prisma.ShardGetPayload<{ select: typeof dbShardSelect }>;
