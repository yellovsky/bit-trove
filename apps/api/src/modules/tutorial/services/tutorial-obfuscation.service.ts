// global modules
import { Effect } from 'effect';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

// common modules
import { ArticleObfuscationService } from 'src/modules/article';
import type { DBAccount } from 'src/modules/account';
import type { PublishingFilter } from 'src/types/publishing-filter';

// local modules
import type {
  DBTutorial,
  DBTutorialShort,
} from '../repositories/tutorial.db-types';

@Injectable()
export class TutorialObfuscationService {
  constructor(
    @Inject()
    private readonly articleObfuscationSrv: ArticleObfuscationService,
  ) {}

  obfuscateShortList(
    account: DBAccount | null,
    publishingFilter: PublishingFilter,
    tutorials: Array<DBTutorialShort | null>,
  ): Effect.Effect<Array<DBTutorialShort | null>, Error> {
    return Effect.all(
      tutorials.map((tutorial) =>
        !tutorial
          ? Effect.succeed(null)
          : this.obfuscateShort(account, publishingFilter, tutorial),
      ),
    );
  }

  obfuscateShort(
    account: DBAccount | null,
    publishingFilter: PublishingFilter,
    tutorialShort: DBTutorialShort,
  ): Effect.Effect<DBTutorialShort, Error> {
    return Effect.gen(this, function* () {
      if (publishingFilter === 'published' && !tutorialShort.published_at) {
        return yield* Effect.fail(new ForbiddenException());
      }

      return {
        ...tutorialShort,
        article: yield* this.articleObfuscationSrv.obfuscateShort(
          account,
          publishingFilter,
          tutorialShort.article,
        ),
      };
    });
  }

  obfuscate(
    account: DBAccount | null,
    publishingFilter: PublishingFilter,
    tutorial: DBTutorial,
  ): Effect.Effect<DBTutorial, Error> {
    return Effect.gen(this, function* () {
      if (publishingFilter === 'published' && !tutorial.published_at) {
        return yield* Effect.fail(new ForbiddenException());
      }

      return {
        ...tutorial,
        article: yield* this.articleObfuscationSrv.obfuscate(
          account,
          publishingFilter,
          tutorial.article,
        ),
      };
    });
  }
}
