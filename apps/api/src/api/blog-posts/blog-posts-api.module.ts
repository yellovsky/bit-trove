// global modules
import { Module } from '@nestjs/common';

// common modules
import { BlogPostAccessControlModule } from 'src/modules/blog-post-access-control';
import { BlogPostModule } from '../../modules/blog-post';
import { BlogPostPublisherModule } from 'src/modules/blog-post-publisher';
import { BlogPostSerializerModule } from '../../modules/blog-post-serializer';
import { RuntimeModule } from '../../modules/runtime';

// local modules
import { BlogPostsApiV1Controller } from './blog-posts-api.controller-v1';

@Module({
  controllers: [BlogPostsApiV1Controller],
  imports: [
    RuntimeModule,
    BlogPostModule,
    BlogPostSerializerModule,
    BlogPostAccessControlModule,
    BlogPostPublisherModule,
  ],
})
export class BlogPostsApiModule {}
