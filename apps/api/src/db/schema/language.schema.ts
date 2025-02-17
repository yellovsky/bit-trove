// global modules
import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const languages = pgTable('languages', {
  code: varchar('code', { length: 10 }).primaryKey(),
});

export type DBLanguage = typeof languages.$inferSelect;
export type DBLanguageInsert = typeof languages.$inferInsert;
