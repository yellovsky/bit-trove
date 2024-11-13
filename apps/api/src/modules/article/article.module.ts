// global modules
import { Module } from '@nestjs/common';

// common modules
import { PrismaModule } from 'src/modules/prisma';

// local modules
import { ArticleAccessControlServiceClass } from './article.access-control';
import { ArticlePublishingServiceClass } from './article.publishing';
import { ArticleSerializerServiceClass } from './article.serializer';

import {
  ARTICLE_ACCESS_CONTROL_SRV,
  ARTICLE_PUBLISHING_SRV,
  ARTICLE_SERIALIZER_SRV,
} from './article.constants';

const publishingRef = {
  provide: ARTICLE_PUBLISHING_SRV,
  useClass: ArticlePublishingServiceClass,
};

const accessControlRef = {
  provide: ARTICLE_ACCESS_CONTROL_SRV,
  useClass: ArticleAccessControlServiceClass,
};

const serializerRef = {
  provide: ARTICLE_SERIALIZER_SRV,
  useClass: ArticleSerializerServiceClass,
};

@Module({
  exports: [accessControlRef, publishingRef, serializerRef],
  imports: [PrismaModule],
  providers: [accessControlRef, publishingRef, serializerRef],
})
export class ArticleModule {}
