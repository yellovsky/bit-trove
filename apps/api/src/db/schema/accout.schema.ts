// global modules
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

// local modules
import { timestamps } from './common.schema';

export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),

  email: varchar('email', { length: 255 }).notNull().unique(),
  pwd_hash: varchar('pwd_hash', { length: 255 }).notNull(),

  ...timestamps,
});

export type DBAccountSelect = typeof accounts.$inferSelect;
export type DBAccountInsert = typeof accounts.$inferInsert;
