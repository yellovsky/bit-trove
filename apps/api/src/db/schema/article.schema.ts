// global modules
import { ArticleBlock } from '@repo/api-models';
import {
  integer,
  json,
  pgTable,
  text,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// local modules
import { accounts } from './accout.schema';
import { languages } from './language.schema';
import { relations } from 'drizzle-orm';
import { publishing, seo, timestamps } from './common.schema';

export const articleBlocks = pgTable(
  'article_blocks',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    content: json('content').$type<ArticleBlock['content']>(),
    order: integer('order').notNull(),
    subtitle: varchar('subtitle', { length: 255 }),
    title: varchar('title', { length: 255 }),
    type: varchar('type', { length: 255 }).notNull(),

    article_translations_id: uuid('article_translations_id')
      .notNull()
      .references(() => articleTranslations.id, { onDelete: 'cascade' }),

    ...timestamps,
  },
  (t) => [unique('blocks_order').on(t.article_translations_id, t.order)],
);
export type DBArticleBlockSelect = typeof articleBlocks.$inferSelect;
export type DBArticleBlockInsert = typeof articleBlocks.$inferInsert;

export const articleBlocksRelations = relations(articleBlocks, ({ one }) => ({
  articleTranslations: one(articleTranslations, {
    fields: [articleBlocks.article_translations_id],
    references: [articleTranslations.id],
  }),
}));

export const articleTranslations = pgTable(
  'article_translations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    short_description: text('short_description').notNull(),
    title: varchar('title', { length: 256 }).notNull(),

    article_id: uuid('article_id')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),

    language_code: varchar('language_code')
      .notNull()
      .references(() => languages.code, { onDelete: 'restrict' }),

    ...seo,
    ...publishing,
    ...timestamps,
  },
  (t) => [unique('translation_order').on(t.article_id, t.language_code)],
);

export type DBArticleTranslationSelect =
  typeof articleTranslations.$inferSelect;

export type DBArticleTranslationInsert =
  typeof articleTranslations.$inferInsert;

export const articleTranslationsRelations = relations(
  articleTranslations,
  ({ one, many }) => ({
    article: one(articles, {
      fields: [articleTranslations.article_id],
      references: [articles.id],
    }),
    author: one(accounts, {
      fields: [articleTranslations.article_id],
      references: [accounts.id],
    }),
    blocks: many(articleBlocks),
  }),
);

export const articles = pgTable('articles', {
  id: uuid('id').primaryKey().defaultRandom(),

  original_language_code: varchar('original_language_code')
    .notNull()
    .references(() => languages.code, { onDelete: 'restrict' }),

  author_id: uuid('author_id').references(() => accounts.id, {
    onDelete: 'set null',
  }),

  ...publishing,
  ...timestamps,
});

export const articlesRelations = relations(articles, ({ many }) => ({
  translations: many(articleTranslations),
}));

export type DBArticleSelect = typeof articles.$inferSelect;
export type DBArticleInsert = typeof articles.$inferInsert;
