// global modules
import { Effect } from 'effect';

// common modules
import type { ApiError } from 'src/exceptions';
import type { SerializerContext } from 'src/types/context';

export type Serialize<TInput, TOutput> = (
  ctx: SerializerContext,
  dbTutorial: TInput,
) => Effect.Effect<TOutput, ApiError>;
