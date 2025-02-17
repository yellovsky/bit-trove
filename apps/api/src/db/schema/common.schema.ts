// global modules
import { text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const timestamps = {
  created_at: timestamp('created_at').defaultNow().notNull(),
  deleted_at: timestamp('deleted_at'),
  updated_at: timestamp('updated_at'),
};

export const seo = {
  seo_description: text('seo_description').notNull(),
  seo_keywords: text('seo_keywords').notNull(),
  seo_title: varchar('seo_title', { length: 256 }).notNull(),
};

export const publishing = {
  published_at: timestamp('published_at'),
};
