// global modules
import 'dotenv/config';

import * as schema from '../schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Effect } from 'effect';
import { reset } from 'drizzle-seed';

// local modules
import { seedAccounts } from './accounts.seed';
import { seedCasbinRules } from './casbin-rules';
import { seedLanguages } from './languages';
import { seedTutorials } from './tutorials/seed-tutorials.seed';

const main = async () => {
  const pipeline = Effect.gen(function* () {
    const db = drizzle(process.env.DATABASE_URL1!, { logger: true, schema });

    yield* Effect.tryPromise(() => reset(db, schema));

    yield* Effect.all([seedLanguages(db), seedCasbinRules(db)]);
    yield* seedAccounts(db);
    yield* seedTutorials(db);
  });

  await Effect.runPromise(pipeline);
};

main();
