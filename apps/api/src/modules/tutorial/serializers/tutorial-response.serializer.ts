// global modules
import { Effect } from 'effect';

// common modules
import type { Serialize } from 'src/types/serializer';

// local modules
import type { DBTutorial } from '../repositories/tutorial.db-models';
import { serializeTutorial } from './tutorial.serializer';
import { TutorialResponseEntity } from '../entities/tutorial-response.entity';

export const serializeTutorialResponse: Serialize<
  DBTutorial,
  TutorialResponseEntity
> = (ctx, dbTutorial) =>
  serializeTutorial(ctx, dbTutorial).pipe(
    Effect.map((data) => new TutorialResponseEntity({ data })),
  );
