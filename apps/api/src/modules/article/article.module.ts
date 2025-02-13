// global modules
import { Module } from '@nestjs/common';

// common modules
import { PrismaModule } from 'src/modules/prisma';

// local modules
import { ArticleAccessControlService } from './services/article-access-control.service';
import { ArticlePublishingService } from './services/article-publishing.service';

@Module({
  exports: [ArticleAccessControlService, ArticlePublishingService],
  imports: [PrismaModule],
  providers: [ArticleAccessControlService, ArticlePublishingService],
})
export class ArticleModule {}
