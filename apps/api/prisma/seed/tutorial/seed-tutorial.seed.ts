// global modules
import { Effect } from 'effect';
import type { Prisma } from '@prisma/client';

// local modules
import type { PrismaTransaction, Seeder } from '../seed.types';

import { remixLocalizationCreateTutorialArgs } from './data/tutorial-data.remix-localization';

const seedTutorialData = (
  tx: PrismaTransaction,
  args: Prisma.TutorialCreateArgs,
): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    yield* Effect.logDebug(`Seeding tutorial ${args.data.slug}`);
    yield* Effect.tryPromise(() => tx.tutorial.create(args));
    yield* Effect.logDebug('seeded');
  });

const argsArray = [remixLocalizationCreateTutorialArgs] as const;

export const seedTutorials: Seeder = {
  seed: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start seeding tutorials');
      yield* Effect.all(argsArray.map((args) => seedTutorialData(tx, args)));
      yield* Effect.logDebug('finish seeding tutorials');
    }),

  clear: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start clearing tutorials');
      yield* Effect.tryPromise(() =>
        tx.tutorial.deleteMany({
          where: { slug: { in: argsArray.map((args) => args.data.slug) } },
        }),
      );
      yield* Effect.logDebug('finish clearing tutorials');
    }),
};
