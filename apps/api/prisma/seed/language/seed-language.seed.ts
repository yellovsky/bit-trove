// global modules
import { Effect } from 'effect';

// local modules
import type { LanguageData } from './seed-language.types';
import { languageENData, languageRUData } from './seed-language.data';
import type { PrismaTransaction, Seeder } from '../seed.types';

const seedLanguageData = (
  tx: PrismaTransaction,
  data: LanguageData,
): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    yield* Effect.logDebug(`Seeding language ${data.code}`);

    yield* Effect.tryPromise(() =>
      tx.language.upsert({
        create: { code: data.code },
        update: { code: data.code },
        where: { code: data.code },
      }),
    );

    yield* Effect.logDebug('seeded');
  }).pipe(
    Effect.tapError((error) =>
      Effect.logError('seedLanguageData error', error),
    ),
  );

export const seedLanguages: Seeder = {
  seed: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start seeding languages');

      yield* Effect.all(
        [languageENData, languageRUData].map((data) =>
          seedLanguageData(tx, data),
        ),
      );
      yield* Effect.logDebug('finish seeding languages');
    }),
};
