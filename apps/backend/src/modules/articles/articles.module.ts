import { Module } from '@nestjs/common';

import { CasbinModule } from 'src/modules/casbin';
import { PrismaModule } from 'src/modules/prisma';
import { TagsModule } from 'src/modules/tags';

import { ARTICLES_REPOSITORY } from './domain/repositories/articles.repository';

import { ArticleAccessServiceImpl } from './application/services/article-access.service';
import { ARTICLE_ACCESS_SRV } from './application/services/article-access.service.interface';
import { ArticlesServiceImpl } from './application/services/articles.service';
import { ARTICLES_SRV } from './application/services/articles.service.interface';
import { CheckArticleSlugAvailabilityUseCase } from './application/use-cases/check-article-slug-availability.use-case';
import { CreateArticleUseCase } from './application/use-cases/create-article.use-case';
import { GetManyArticlesUseCase } from './application/use-cases/get-many-articles.use-case';
import { GetMyArticleUseCase } from './application/use-cases/get-my-article.use-case';
import { GetMyManyArticlesUseCase } from './application/use-cases/get-my-many-articles.use-case';
import { GetOneArticleUseCase } from './application/use-cases/get-one-article.use-case';
import { PublishArticleUseCase } from './application/use-cases/publish-article.use-case';
import { UnpublishArticleUseCase } from './application/use-cases/unpublish-article.use-case';
import { UpdateArticleUseCase } from './application/use-cases/update-article.use-case';

import { PrismaArticlesRepository } from './infrastructure/repositories/articles.repository';

import { ArticlesController } from './presentation/articles.controller';
import { CMSArticlesController } from './presentation/cms-articles.controller';
import { MyArticlesController } from './presentation/my-articles.controller';

@Module({
  controllers: [ArticlesController, MyArticlesController, CMSArticlesController],
  exports: [ARTICLES_REPOSITORY],
  imports: [PrismaModule, CasbinModule, TagsModule],
  providers: [
    { provide: ARTICLES_REPOSITORY, useClass: PrismaArticlesRepository },
    { provide: ARTICLE_ACCESS_SRV, useClass: ArticleAccessServiceImpl },
    { provide: ARTICLES_SRV, useClass: ArticlesServiceImpl },
    CreateArticleUseCase,
    UpdateArticleUseCase,
    CheckArticleSlugAvailabilityUseCase,
    GetOneArticleUseCase,
    GetManyArticlesUseCase,
    GetMyArticleUseCase,
    GetMyManyArticlesUseCase,
    PublishArticleUseCase,
    UnpublishArticleUseCase,
  ],
})
export class ArticlesModule {}
