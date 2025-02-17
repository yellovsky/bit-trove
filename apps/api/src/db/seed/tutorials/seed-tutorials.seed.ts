// global modules
import { Effect } from 'effect';

// local modules
import type { DB } from '../../db.types';
import type { DBTutorialWithAuthorSeedData } from './seed-tutorials.types';
import { seedArticleWithAuthorEmail } from '../articles';
import { tutorials } from '../../schema';

import { remixLocalizationCreateTutorialArgs } from './data/tutorial-data.remix-localization';

const seedTutorial = (
  tx: DB,
  { authorEmail, article, ...data }: DBTutorialWithAuthorSeedData,
): Effect.Effect<string, Error> =>
  Effect.gen(function* () {
    const [article_id, author_id] = yield* Effect.all([
      seedArticleWithAuthorEmail(tx, article),
      Effect.tryPromise(() =>
        tx.query.accounts.findFirst({
          where: (accounts, { eq }) => eq(accounts.email, authorEmail),
        }),
      ).pipe(
        Effect.map((founded) => founded?.id),
        Effect.flatMap(Effect.fromNullable),
      ),
    ]);

    return yield* Effect.tryPromise(() =>
      tx
        .insert(tutorials)
        .values({ ...data, article_id, author_id })
        .returning({ id: tutorials.id }),
    ).pipe(
      Effect.map((inserted) => inserted.at(0)?.id),
      Effect.flatMap(Effect.fromNullable),
    );
  });

export const seedTutorials = (tx: DB): Effect.Effect<string[], Error> =>
  Effect.all(
    [remixLocalizationCreateTutorialArgs].map((data) => seedTutorial(tx, data)),
  );
