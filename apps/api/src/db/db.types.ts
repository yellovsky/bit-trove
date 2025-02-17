// global modules
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

// local modules
import * as schema from './schema';

export type DB = NodePgDatabase<typeof schema>;
