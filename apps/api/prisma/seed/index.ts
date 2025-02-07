// global modules
import * as R from 'ramda';
import { PrismaClient } from '@prisma/client';
import { Effect, Logger, LogLevel } from 'effect';

// local modules
import { seedBlogPosts } from './blog-post';
import { seedLanguages } from './language';
import { seedTutorials } from './tutorial';

const prisma = new PrismaClient({ transactionOptions: { timeout: 100500 } });

const seeders = [seedLanguages, seedBlogPosts, seedTutorials];

const main = () => {
  return prisma.$transaction(async (tx) => {
    const program = Effect.gen(function* () {
      yield* Effect.logDebug('Start seeding');

      const clearFns = R.reverse(seeders)
        .map((seeder) => seeder.clear)
        .filter((fn) => fn !== undefined)
        .map((fn) => fn(tx));

      yield* Effect.all(clearFns);

      const seedFns = seeders.map((seeder) => seeder.seed(tx));
      yield* Effect.all(seedFns);

      yield* Effect.logDebug('Seeding complete');
    }).pipe(
      Effect.tapError(Effect.logError),
      Logger.withMinimumLogLevel(LogLevel.Debug),
    );

    return Effect.runPromise(program);
  });
};

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
