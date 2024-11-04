// global modules
import { Effect } from 'effect';

// local modules
import type { BlogPostData } from './seed-blog-post.types';
import { testBlogPostData } from './seed-blog-post.data';
import type { PrismaTransaction, Seeder } from '../seed.types';

const seedBlogPostData = (
  tx: PrismaTransaction,
  data: BlogPostData,
): Effect.Effect<void, Error> =>
  Effect.gen(function* () {
    yield* Effect.logDebug(`Seeding blog post ${data.slug}`);

    const createTranslations = data.article.translations.map((t) => ({
      language_code: t.language_code,
      published_at: t.published_at,
      title: t.title,
    }));

    const createArticle = {
      original_language_code: data.article.original_language_code,
      published_at: data.article.published_at,
      translations: { create: createTranslations },
    };

    yield* Effect.tryPromise(() =>
      tx.blogPost
        .upsert({
          create: {
            article: { create: createArticle },
            published_at: data.published_at,
            slug: data.slug,
          },
          update: {
            article: {
              upsert: {
                create: createArticle,
                update: createArticle,
              },
            },
            published_at: data.published_at,
            slug: data.slug,
          },
          where: { slug: data.slug },
        })
        .catch((error) => {
          console.error('error', error);
          throw error;
        }),
    );

    yield* Effect.logDebug('seeded');
  }).pipe(
    Effect.tapError((error) =>
      Effect.logError('seedBlogPostData error', error),
    ),
  );

const dataArray = [testBlogPostData] as const;

export const seedBlogPosts: Seeder = {
  seed: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start seeding blog posts');
      yield* Effect.all(dataArray.map((data) => seedBlogPostData(tx, data)));
      yield* Effect.logDebug('finish seeding blog posts');
    }),

  clear: (tx) =>
    Effect.gen(function* () {
      yield* Effect.logDebug('Start clearing blog posts');
      yield* Effect.tryPromise(() =>
        tx.blogPost.deleteMany({
          where: { slug: { in: dataArray.map((data) => data.slug) } },
        }),
      );
      yield* Effect.logDebug('finish clearing blog posts');
    }),
};
