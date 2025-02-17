// global modules
import { Effect } from 'effect';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

// common modules
import type { DB } from 'src/db';

// local modules
import type { FindManyTutorialsDTO } from '../dto/find-many-tutorials.dto';
import { TutorialRepository } from '../repositories/tutorial.repository';
import type { UpdateCMSTutorialDTO } from '../dto/update-tutorial.dto';

import type {
  DBTutorial,
  DBTutorialShort,
} from '../repositories/tutorial.db-types';

@Injectable()
export class TutorialService {
  constructor(
    @Inject()
    private readonly tutorialRepo: TutorialRepository,
  ) {}

  getOne(db: DB | null, slugOrID: string): Effect.Effect<DBTutorial, Error> {
    return Effect.gen(this, function* () {
      const founded = yield* this.tutorialRepo.findOne(db, slugOrID);
      return founded || (yield* Effect.fail(new NotFoundException()));
    });
  }

  getManyShort(
    db: DB | null,
    dto: FindManyTutorialsDTO,
  ): Effect.Effect<DBTutorialShort[], Error> {
    return this.tutorialRepo.findManyShort(db, dto);
  }

  getTotal(
    db: DB | null,
    dto: FindManyTutorialsDTO,
  ): Effect.Effect<number, Error> {
    return this.tutorialRepo.findTotal(db, dto);
  }

  update(
    tx: DB,
    slugOrID: string,
    dto: UpdateCMSTutorialDTO,
  ): Effect.Effect<DBTutorial, Error> {
    return this.tutorialRepo.update(tx, slugOrID, dto);
  }
}
