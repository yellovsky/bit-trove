/// global modules
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const casbinRules = pgTable('casbin_rules', {
  id: uuid('id').primaryKey().defaultRandom(),
  note: varchar('note', { length: 255 }),
  ptype: varchar('ptype', { length: 255 }).notNull(),

  created_at: timestamp('created_at').defaultNow().notNull(),

  v0: varchar('v0', { length: 255 }),
  v1: varchar('v1', { length: 255 }),
  v2: varchar('v2', { length: 255 }),
  v3: varchar('v3', { length: 255 }),
  v4: varchar('v4', { length: 255 }),
  v5: varchar('v5', { length: 255 }),
});
export type DBCasbinRule = typeof casbinRules.$inferSelect;
export type DBCasbinRuleInsert = typeof casbinRules.$inferInsert;
