// global modules
import { Effect } from 'effect';

// local modules
import type { DB } from '../../db.types';
import { languages } from '../../schema';

export const seedLanguages = (tx: DB): Effect.Effect<string[], Error> =>
  Effect.tryPromise(() =>
    tx
      .insert(languages)
      .values([{ code: 'en' }, { code: 'ru' }])
      .returning({ code: languages.code }),
  ).pipe(Effect.map((inserted) => inserted.map((i) => i.code)));
