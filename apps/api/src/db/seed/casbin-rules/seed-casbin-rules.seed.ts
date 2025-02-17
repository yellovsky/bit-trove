// global modules
import { Effect } from 'effect';

// local modules
import { casbinRules } from '../../schema';
import type { DB } from '../../db.types';

import { rules } from './data';

export const seedCasbinRules = (tx: DB): Effect.Effect<string[], Error> =>
  Effect.tryPromise(() =>
    tx.insert(casbinRules).values(rules).returning({ id: casbinRules.id }),
  ).pipe(Effect.map((inserted) => inserted.map((i) => i.id)));
