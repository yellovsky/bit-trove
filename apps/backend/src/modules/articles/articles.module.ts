import { Module } from '@nestjs/common';

import { CasbinModule } from 'src/modules/casbin';
import { PrismaModule } from 'src/modules/prisma';
import { TagsModule } from 'src/modules/tags';

import { ARTICLE_RELATION_REPOSITORY } from './domain/repositories/article-relation.repository';
import { ARTICLES_REPOSITORY } from './domain/repositories/articles.repository';

import { ArticleAccessServiceImpl } from './application/services/article-access.service';
import { ARTICLE_ACCESS_SRV } from './application/services/article-access.service.interface';
import { ArticleRelationServiceImpl } from './application/services/article-relation.service';
import { ARTICLE_RELATION_SERVICE } from './application/services/article-relation.service.interface';
import { ArticlesServiceImpl } from './application/services/articles.service';
import { ARTICLES_SRV } from './application/services/articles.service.interface';
import { ArticleGetUseCase } from './application/use-cases/article-get.use-case';
import { CMSArticlesCheckSlugAvailabilityUseCase } from './application/use-cases/cms-articles-check-slug-availability.use-case';
import { MyArticleCreateUseCase } from './application/use-cases/my-article-create.use-case';
import { MyArticleGetUseCase } from './application/use-cases/my-article-get.use-case';
import { MyArticlePublishUseCase } from './application/use-cases/my-article-publish.use-case';
import { MyArticleUnpublishUseCase } from './application/use-cases/my-article-unpublish.use-case';
import { MyArticleUpdateUseCase } from './application/use-cases/my-article-update.use-case';
import { MyShortArticlesGetUseCase } from './application/use-cases/my-short-articles-get.use-case';
import { RelatedArticlesGetUseCase } from './application/use-cases/related-articles-get.use-case';
import { ShortArticlesGetUseCase } from './application/use-cases/short-articles-get.use-case';

import { PrismaArticleRelationsRepository } from './infrastructure/repositories/article-relations.repository';
import { PrismaArticlesRepository } from './infrastructure/repositories/articles.repository';

import { ArticlesController } from './presentation/articles.controller';
import { CMSArticlesController } from './presentation/cms-articles.controller';
import { MyArticlesController } from './presentation/my-articles.controller';

@Module({
  controllers: [ArticlesController, MyArticlesController, CMSArticlesController],
  exports: [ARTICLES_REPOSITORY, ARTICLE_RELATION_REPOSITORY],
  imports: [PrismaModule, CasbinModule, TagsModule],
  providers: [
    { provide: ARTICLES_REPOSITORY, useClass: PrismaArticlesRepository },
    { provide: ARTICLE_RELATION_REPOSITORY, useClass: PrismaArticleRelationsRepository },
    { provide: ARTICLE_ACCESS_SRV, useClass: ArticleAccessServiceImpl },
    { provide: ARTICLE_RELATION_SERVICE, useClass: ArticleRelationServiceImpl },
    { provide: ARTICLES_SRV, useClass: ArticlesServiceImpl },
    MyArticleCreateUseCase,
    MyArticleUpdateUseCase,
    CMSArticlesCheckSlugAvailabilityUseCase,
    ArticleGetUseCase,
    ShortArticlesGetUseCase,
    MyArticleGetUseCase,
    MyShortArticlesGetUseCase,
    MyArticlePublishUseCase,
    MyArticleUnpublishUseCase,
    RelatedArticlesGetUseCase,
  ],
})
export class ArticlesModule {}
