// global modules
import { Module } from '@nestjs/common';

// local modules
import { BlogPostsApiV1Controller } from './blog-posts-api.controller-v1';

@Module({
  controllers: [BlogPostsApiV1Controller],
})
export class BlogPostsApiModule {}
