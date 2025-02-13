// global modules
import { Effect, pipe } from 'effect';

// common modules
import type { ItemsWithTotalAndPagination } from 'src/types/items-with-total';
import { ListResponseMetaEntity } from 'src/common/entities/response';
import type { Serialize } from 'src/types/serializer';

// local modules
import type { DBTutorialSegment } from '../repositories/tutorial.db-models';
import { serializeTutorialSegment } from './tutorial-segment.serializer';
import { TutorialListResponseEntity } from '../entities/tutorial-list-response.entity';

export const serializeTutorialListResponse: Serialize<
  ItemsWithTotalAndPagination<DBTutorialSegment | null>,
  TutorialListResponseEntity
> = (ctx, dbTutorialList) => {
  const items = Effect.all(
    dbTutorialList.items.map((item) =>
      pipe(
        Effect.fromNullable(item),
        Effect.flatMap((item) => serializeTutorialSegment(ctx, item)),
        Effect.catchAll(() => Effect.succeed(null)),
      ),
    ),
  );

  return items.pipe(
    Effect.map(
      (data) =>
        new TutorialListResponseEntity({
          data,
          meta: new ListResponseMetaEntity({
            pagination: {
              limit: dbTutorialList.limit,
              offset: dbTutorialList.offset,
              total: dbTutorialList.total,
            },
          }),
        }),
    ),
  );
};
