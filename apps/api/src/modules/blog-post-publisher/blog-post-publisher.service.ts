// global modules
import { Option } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBBlogPost } from 'src/db-models/blog-post';

import {
  ARTICLE_PUBLISHER_SRV,
  type ArticlePublisherService,
} from 'src/modules/article-publisher';

// local modules
import type { BlogPostPublisherService } from './blog-post-publisher.types';

@Injectable()
export class BlogPostPublisherServiceClass implements BlogPostPublisherService {
  constructor(
    @Inject(ARTICLE_PUBLISHER_SRV)
    private readonly articlePublisherSrv: ArticlePublisherService,
  ) {}

  checkBlogPost(
    published: boolean | 'published',
    dbBlogPost: DBBlogPost,
  ): Option.Option<DBBlogPost> {
    if (!published) return Option.some(dbBlogPost);
    if (!dbBlogPost.published_at) return Option.none();
    return this.articlePublisherSrv
      .checkArticle(published, dbBlogPost.article)
      .pipe(Option.map((article) => ({ ...dbBlogPost, article })));
  }
}
