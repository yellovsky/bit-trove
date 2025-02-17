// global modules
import type { DB } from 'src/db';
import { Effect } from 'effect';
import { validate as validateUUID } from 'uuid';
import { count, eq } from 'drizzle-orm';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

// common modules
import { ArticleRepository } from 'src/modules/article';
import { DRIZZLE_SRV } from 'src/modules/drizzle';
import { tutorials } from 'src/db/schema';

// local modules
import type { FindManyTutorialsDTO } from '../dto/find-many-tutorials.dto';
import type { UpdateCMSTutorialDTO } from '../dto/update-tutorial.dto';
import type { DBTutorial, DBTutorialShort } from './tutorial.db-types';

@Injectable()
export class TutorialRepository {
  constructor(
    @Inject(DRIZZLE_SRV)
    private readonly db: DB,

    @Inject()
    private readonly articleRepo: ArticleRepository,
  ) {}

  findOne(
    db: DB | null,
    slugOrID: string,
  ): Effect.Effect<DBTutorial | undefined, Error> {
    return Effect.tryPromise(() =>
      (db || this.db).query.tutorials.findFirst({
        where: this.#getFindOneWhere(slugOrID),
        with: {
          article: { with: { translations: { with: { blocks: true } } } },
        },
      }),
    );
  }

  findOneShort(
    db: DB | null,
    slugOrID: string,
  ): Effect.Effect<DBTutorialShort | undefined, Error> {
    return Effect.tryPromise(() =>
      (db || this.db).query.tutorials.findFirst({
        where: this.#getFindOneWhere(slugOrID),

        with: {
          article: { with: { translations: true } },
        },
      }),
    );
  }

  findManyShort(
    db: DB | null,
    dto: FindManyTutorialsDTO,
  ): Effect.Effect<DBTutorialShort[], Error> {
    return Effect.tryPromise(() =>
      (db || this.db).query.tutorials.findMany({
        limit: dto.page.limit,
        offset: dto.page.offset,
        orderBy: (tutorials, { desc }) => [desc(tutorials.created_at)],
        with: {
          article: { with: { translations: true } },
        },
      }),
    );
  }

  findTotal(
    db: DB | null,
    dto: FindManyTutorialsDTO,
  ): Effect.Effect<number, Error> {
    return Effect.tryPromise(() =>
      (db || this.db)
        .select({ count: count() })
        .from(tutorials)
        .limit(dto.page.limit)
        .offset(dto.page.offset),
    ).pipe(Effect.map(() => 100));
  }

  update(
    tx: DB,
    slugOrID: string,
    dto: UpdateCMSTutorialDTO,
  ): Effect.Effect<DBTutorial, Error> {
    return Effect.gen(this, function* () {
      const tutorial = yield* this.findOneShort(tx, slugOrID);
      if (!tutorial) return yield* Effect.fail(new NotFoundException());

      const updatedArticle = yield* this.articleRepo.update(
        tx,
        tutorial?.article_id,
        dto,
      );

      return { ...tutorial, article: updatedArticle };
    });
  }

  #getFindOneWhere(slugOrID: string) {
    return validateUUID(slugOrID)
      ? eq(tutorials.id, slugOrID)
      : eq(tutorials.slug, slugOrID);
  }
}
