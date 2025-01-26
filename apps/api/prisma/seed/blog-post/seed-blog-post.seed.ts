// global modules
import { Effect } from 'effect';
import type { Prisma } from '@prisma/client';

// local modules
import type { PrismaTransaction, Seeder } from '../seed.types';

import { effectFinalizerCreateBlogPostArgs } from './data/blog-post-data.effect-finalizers';
import { mobxIntroCreateBlogPostArgs } from './data/blog-post-data.mobx-intro';
import { tailwindGlobalPaddingsCreateBlogPostArgs } from './data/blog-post-data.tailwind-page-padding';
import { test1CreateBlogPostArgs } from './data/blog-post-data.test-1';

const seedBlogPostData = (
  tx: PrismaTransaction,
  args: Prisma.BlogPostCreateArgs,
): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    yield* Effect.logDebug(`Seeding blog post ${args.data.slug}`);
    yield* Effect.tryPromise(() => tx.blogPost.create(args));
    yield* Effect.logDebug('seeded');
  });

const argsArray = [
  mobxIntroCreateBlogPostArgs,
  test1CreateBlogPostArgs,
  tailwindGlobalPaddingsCreateBlogPostArgs,
  effectFinalizerCreateBlogPostArgs,
] as const;

export const seedBlogPosts: Seeder = {
  seed: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start seeding blog posts');
      yield* Effect.all(argsArray.map((args) => seedBlogPostData(tx, args)));
      yield* Effect.logDebug('finish seeding blog posts');
    }),

  clear: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start clearing blog posts');
      yield* Effect.tryPromise(() =>
        tx.blogPost.deleteMany({
          where: { slug: { in: argsArray.map((args) => args.data.slug) } },
        }),
      );
      yield* Effect.logDebug('finish clearing blog posts');
    }),
};
