// global modules
import { Effect } from 'effect';

// common modules
import type { Serialize } from 'src/types/serializer';

// local modules
import { CMSTutorialResponseEntity } from '../entities/cms-tutorial-response.entity';
import type { DBTutorial } from '../repositories/tutorial.db-models';
import { serializeCMSTutorial } from './cms-tutorial.serializer';

export const serializeCMSTutorialResponse: Serialize<
  DBTutorial,
  CMSTutorialResponseEntity
> = (ctx, dbTutorial) =>
  serializeCMSTutorial(ctx, dbTutorial).pipe(
    Effect.map((data) => new CMSTutorialResponseEntity({ data })),
  );
