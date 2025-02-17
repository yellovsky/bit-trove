// global modules
import { Effect } from 'effect';

// local modules
import type { DB } from '../../db.types';
import { articleBlocks, articles, articleTranslations } from '../../schema';

import type {
  DBArticleBlockSeedData,
  DBArticleTranslationSeedData,
  DBArticleWithAutjorEmailSeedData,
} from './seed-articles.types';

const seedArticleBlocks = (
  tx: DB,
  blocks: Array<DBArticleBlockSeedData>,
  relations: { article_translations_id: string },
): Effect.Effect<Array<{ id: string }>, Error> =>
  Effect.tryPromise(() =>
    tx
      .insert(articleBlocks)
      .values(blocks.map((block, order) => ({ ...block, ...relations, order })))
      .returning({ id: articles.id }),
  );

const seedArticleTranslations = (
  tx: DB,
  data: DBArticleTranslationSeedData,
  relations: { article_id: string },
): Effect.Effect<string, Error> =>
  Effect.gen(function* () {
    const article_translations_id = yield* Effect.tryPromise(() =>
      tx
        .insert(articleTranslations)
        .values({ ...data, ...relations })
        .returning({ id: articles.id }),
    ).pipe(Effect.map((inserted) => inserted.at(0)?.id));

    if (!article_translations_id) {
      return yield* Effect.fail(
        new Error('Failed to insert article translations'),
      );
    }

    yield* seedArticleBlocks(tx, data.blocks, { article_translations_id });

    return article_translations_id;
  });

export const seedArticleWithAuthorEmail = (
  tx: DB,
  { authorEmail, ...data }: DBArticleWithAutjorEmailSeedData,
): Effect.Effect<string, Error> =>
  Effect.gen(function* () {
    const author_id = yield* Effect.tryPromise(() =>
      tx.query.accounts.findFirst({
        where: (accounts, { eq }) => eq(accounts.email, authorEmail),
      }),
    ).pipe(Effect.map((founded) => founded?.id));

    if (!author_id) {
      return yield* Effect.fail(new Error('Article author not found'));
    }

    const article_id = yield* Effect.tryPromise(() =>
      tx
        .insert(articles)
        .values({ ...data, author_id })
        .returning({ id: articles.id }),
    ).pipe(Effect.map((inserted) => inserted.at(0)?.id));

    if (!article_id) {
      return yield* Effect.fail(new Error('Article not inserted'));
    }

    for (const translation of data.translations) {
      yield* seedArticleTranslations(tx, translation, { article_id });
    }

    return article_id;
  });
