// global modules
import { Effect } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { CasbinService } from 'src/modules/casbin';
import type { DBAccount } from 'src/modules/account';

// local modules
import type {
  DBTutorial,
  DBTutorialShort,
} from '../repositories/tutorial.db-types';

@Injectable()
export class TutorialAccessService {
  constructor(
    @Inject()
    private readonly casbinSrv: CasbinService,
  ) {}

  canRead<TTutorial extends DBTutorial | DBTutorialShort>(
    account: DBAccount | null,
    tutorial: TTutorial,
  ): Effect.Effect<boolean, Error> {
    return this.casbinSrv.checkPermission(
      account?.id,
      'read',
      'tutorial',
      tutorial,
    );
  }

  canReadCMS<TTutorial extends DBTutorial | DBTutorialShort>(
    account: DBAccount | null,
    tutorial: TTutorial,
  ): Effect.Effect<boolean, Error> {
    return this.casbinSrv.checkPermission(
      account?.id,
      'read_cms',
      'tutorial',
      tutorial,
    );
  }

  canReadFilter<TTutorial extends DBTutorial | DBTutorialShort>(
    user: DBAccount | null,
    tutorials: TTutorial[],
  ): Effect.Effect<Array<TTutorial | null>, Error> {
    return Effect.all(
      tutorials.map((tutorial) =>
        this.casbinSrv
          .checkPermission(user?.id, 'read', 'tutorial', tutorial)
          .pipe(Effect.map((allowed) => (allowed ? tutorial : null))),
      ),
    );
  }

  canReadCMSFilter<TTutorial extends DBTutorial | DBTutorialShort>(
    user: DBAccount | null,
    tutorials: TTutorial[],
  ): Effect.Effect<Array<TTutorial | null>, Error> {
    return Effect.all(
      tutorials.map((tutorial) =>
        this.casbinSrv
          .checkPermission(user?.id, 'read_cms', 'tutorial', tutorial)
          .pipe(Effect.map((allowed) => (allowed ? tutorial : null))),
      ),
    );
  }

  canUpdate<TTutorial extends DBTutorial | DBTutorialShort>(
    account: DBAccount | null,
    tutorial: TTutorial,
  ): Effect.Effect<boolean, Error> {
    return this.casbinSrv.checkPermission(
      account?.id,
      'update',
      'tutorial',
      tutorial,
    );
  }
}
