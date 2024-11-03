import type { BlogPostResponse } from '@repo/api-models';
import { Controller, Get, Injectable } from '@nestjs/common';

@Controller({ path: 'blog-posts', version: '1' })
export class BlogPostsApiV1Controller {
  @Get(':slugOrId')
  async getBlogPost(): Promise<BlogPostResponse> {
    return {
      data: {
        id: 'id',
        slug: 'slug',
        title: 'title - from api',
      },
    };
  }
}
