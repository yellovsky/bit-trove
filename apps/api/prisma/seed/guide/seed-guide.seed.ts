// global modules
import { Effect } from 'effect';
import type { Prisma } from '@prisma/client';

// local modules
import type { PrismaTransaction, Seeder } from '../seed.types';

import { remixLocalizationCreateGuideArgs } from './data/guide-data.remix-localization';

const seedGuideData = (
  tx: PrismaTransaction,
  args: Prisma.GuideCreateArgs,
): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    yield* Effect.logDebug(`Seeding guide ${args.data.slug}`);
    yield* Effect.tryPromise(() => tx.guide.create(args));
    yield* Effect.logDebug('seeded');
  });

const argsArray = [remixLocalizationCreateGuideArgs] as const;

export const seedGuides: Seeder = {
  seed: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start seeding guides');
      yield* Effect.all(argsArray.map((args) => seedGuideData(tx, args)));
      yield* Effect.logDebug('finish seeding guides');
    }),

  clear: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start clearing guides');
      yield* Effect.tryPromise(() =>
        tx.guide.deleteMany({
          where: { slug: { in: argsArray.map((args) => args.data.slug) } },
        }),
      );
      yield* Effect.logDebug('finish clearing guides');
    }),
};
