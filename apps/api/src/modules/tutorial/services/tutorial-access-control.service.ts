// global modules
import { Either } from 'effect';
import { subject } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { AccessControlContext } from 'src/types/context';
import { ArticleAccessControlService } from 'src/modules/article';
import type { DBTutorialAccessControl } from '../repositories/tutorial.db-models';
import type { ItemsWithTotal } from 'src/types/items-with-total';
import { type ApiError, ForbiddenAPIError } from 'src/exceptions';

@Injectable()
export class TutorialAccessControlService {
  constructor(
    @Inject()
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

  canUpdateTutorial<TTutorial extends DBTutorialAccessControl>(
    ctx: AccessControlContext,
    dbTutorial: TTutorial,
  ): Either.Either<TTutorial, ApiError> {
    const canUpdate =
      ctx.can('update', subject('tutorial', dbTutorial)) &&
      this.articleAccessControlSrv.canUpdateArticle(ctx, dbTutorial.article);

    return !canUpdate
      ? Either.left(new ForbiddenAPIError({}))
      : Either.right(dbTutorial);
  }
}
