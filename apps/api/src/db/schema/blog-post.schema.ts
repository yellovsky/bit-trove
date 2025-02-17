// global modules
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

// local modules
import { accounts } from './accout.schema';
import { articles } from './article.schema';
import { relations } from 'drizzle-orm';
import { publishing, timestamps } from './common.schema';

export const blogPosts = pgTable('blog_post', {
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
export type DBBlogPostSelect = typeof blogPosts.$inferSelect;
export type DBBlogPostInsert = typeof blogPosts.$inferInsert;

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  article: one(articles, {
    fields: [blogPosts.article_id],
    references: [articles.id],
  }),
}));
