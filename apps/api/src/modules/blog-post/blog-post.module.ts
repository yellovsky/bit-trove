// global modules
import { Module } from '@nestjs/common';

// common modules
import { ArticleModule } from 'src/modules/article';
import { PrismaModule } from 'src/modules/prisma';

// local modules
import { BlogPostAccessControlServiceClass } from './blog-post.access-control';
import { BlogPostPublishingrServiceClass } from './blog-post.publishing';
import { BlogPostRepositoryServiceClass } from './blog-post.repository';
import { BlogPostSerializerServiceClass } from './blog-post.serializer';
import { BlogPostServiceClass } from './blog-post.service';

import {
  BLOG_POST_ACCESS_CONTROL_SRV,
  BLOG_POST_PUBLISHING_SRV,
  BLOG_POST_REPOSITORY_SRV,
  BLOG_POST_SERIALIZER_SRV,
  BLOG_POST_SRV,
} from './blog-post.constants';

const repositoryRef = {
  provide: BLOG_POST_REPOSITORY_SRV,
  useClass: BlogPostRepositoryServiceClass,
};

const accessControlRef = {
  provide: BLOG_POST_ACCESS_CONTROL_SRV,
  useClass: BlogPostAccessControlServiceClass,
};

const publishingRef = {
  provide: BLOG_POST_PUBLISHING_SRV,
  useClass: BlogPostPublishingrServiceClass,
};

const serializerRef = {
  provide: BLOG_POST_SERIALIZER_SRV,
  useClass: BlogPostSerializerServiceClass,
};

const serviceRef = {
  provide: BLOG_POST_SRV,
  useClass: BlogPostServiceClass,
};

@Module({
  exports: [serializerRef, serviceRef],
  imports: [PrismaModule, ArticleModule],
  providers: [
    repositoryRef,
    accessControlRef,
    publishingRef,
    serializerRef,
    serviceRef,
  ],
})
export class BlogPostModule {}
