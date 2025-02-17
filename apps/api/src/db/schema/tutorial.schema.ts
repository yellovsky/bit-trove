// global modules
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

// local modules
import { accounts } from './accout.schema';
import { articles } from './article.schema';
import { relations } from 'drizzle-orm';
import { publishing, timestamps } from './common.schema';

export const tutorials = pgTable('tutorials', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),

  author_id: uuid('author_id').references(() => accounts.id, {
    onDelete: 'set null',
  }),

  article_id: uuid('article_id')
    .notNull()
    .references(() => articles.id, { onDelete: 'restrict' }),

  ...publishing,
  ...timestamps,
});
export type DBTutorialSelect = typeof tutorials.$inferSelect;
export type DBTutorialInsert = typeof tutorials.$inferInsert;

export const tutorialsRelations = relations(tutorials, ({ one }) => ({
  article: one(articles, {
    fields: [tutorials.article_id],
    references: [articles.id],
  }),
}));
