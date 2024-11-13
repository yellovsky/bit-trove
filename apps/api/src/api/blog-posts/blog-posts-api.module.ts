// global modules
import { Module } from '@nestjs/common';

// common modules
import { BlogPostModule } from 'src/modules/blog-post';
import { RuntimeModule } from 'src/modules/runtime';

// local modules
import { BlogPostsApiV1Controller } from './blog-posts-api.controller-v1';

@Module({
  controllers: [BlogPostsApiV1Controller],
  imports: [RuntimeModule, BlogPostModule],
})
export class BlogPostsApiModule {}
