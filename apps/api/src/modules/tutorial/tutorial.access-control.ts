// global modules
import { Either } from 'effect';
import { subject } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { AccessControlContext } from 'src/types/context';
import type { DBTutorialAccessControl } from 'src/db-models/tutorial';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import { type ApiError, ForbiddenAPIError } from 'src/exceptions';

import {
  ARTICLE_ACCESS_CONTROL_SRV,
  type ArticleAccessControlService,
} from 'src/modules/article';

// local modules
import { TutorialAccessControlService } from './tutorial.types';

@Injectable()
export class TutorialAccessControlServiceClass
  implements TutorialAccessControlService
{
  constructor(
    @Inject(ARTICLE_ACCESS_CONTROL_SRV)
    private readonly articleAccessControlSrv: ArticleAccessControlService,
  ) {}

  canReadTutorial<TTutorial extends DBTutorialAccessControl>(
    ctx: AccessControlContext,
    dbTutorial: TTutorial,
  ): Either.Either<TTutorial, ApiError> {
    const canRead =
      ctx.can('read', subject('tutorial', dbTutorial)) &&
      this.articleAccessControlSrv.canReadArticle(ctx, dbTutorial.article);

    return !canRead
      ? Either.left(new ForbiddenAPIError({}))
      : Either.right(dbTutorial);
  }

  canReadTutorialItems<TTutorial extends DBTutorialAccessControl>(
    ctx: AccessControlContext,
    dbTutorialList: Array<TTutorial | null>,
  ): Either.Either<Array<TTutorial | null>, ApiError> {
    return Either.all(
      dbTutorialList.map((item) =>
        !item
          ? Either.right(null)
          : this.canReadTutorial(ctx, item).pipe(
              Either.orElse(() => Either.right(null)),
            ),
      ),
    );
  }

  canReadTutorialItemsWithTotal<TTutorial extends DBTutorialAccessControl>(
    ctx: AccessControlContext,
    dbTutorialSegmantList: ItemsWithTotal<TTutorial | null>,
  ): Either.Either<ItemsWithTotal<TTutorial | null>, ApiError> {
    return this.canReadTutorialItems(ctx, dbTutorialSegmantList.items).pipe(
      Either.map((items) => ({ items, total: dbTutorialSegmantList.total })),
    );
  }
}
