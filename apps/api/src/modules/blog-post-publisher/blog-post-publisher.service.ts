// global modules
import { Option } from 'effect';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import type { DBBlogPostPublishing } from 'src/db-models/blog-post';

import {
  ARTICLE_PUBLISHER_SRV,
  type ArticlePublisherService,
} from 'src/modules/article-publisher';

// local modules
import type { BlogPostPublisherService } from './blog-post-publisher.types';
import type { ItemsWithTotal } from '../../types/items-with-total';

@Injectable()
export class BlogPostPublisherServiceClass implements BlogPostPublisherService {
  constructor(
    @Inject(ARTICLE_PUBLISHER_SRV)
    private readonly articlePublisherSrv: ArticlePublisherService,
  ) {}

  checkBlogPost<TBlogPost extends DBBlogPostPublishing>(
    published: boolean | 'published',
    dbBlogPost: TBlogPost,
  ): Option.Option<TBlogPost> {
    if (!published) return Option.some(dbBlogPost);
    if (!dbBlogPost.published_at) return Option.none();
    return this.articlePublisherSrv
      .checkArticle(published, dbBlogPost.article)
      .pipe(Option.map((article) => ({ ...dbBlogPost, article })));
  }

  checkReadBlogPostItems<TBlogPost extends DBBlogPostPublishing>(
    published: boolean | 'published',
    dbBlogPostList: Array<TBlogPost | null>,
  ): Option.Option<Array<TBlogPost | null>> {
    return Option.all(
      dbBlogPostList.map((dbBlogPost) =>
        dbBlogPost
          ? this.checkBlogPost(published, dbBlogPost).pipe(
              Option.orElseSome(() => null),
            )
          : Option.some(null),
      ),
    ).pipe(
      Option.flatMap((arr) =>
        arr.every((item) => item === null) ? Option.none() : Option.some(arr),
      ),
    );
  }

  checkReadBlogPostItemsWithTotal<TBlogPost extends DBBlogPostPublishing>(
    published: boolean | 'published',
    dbBlogPostList: ItemsWithTotal<TBlogPost | null>,
  ): Option.Option<ItemsWithTotal<TBlogPost | null>> {
    return this.checkReadBlogPostItems(published, dbBlogPostList.items).pipe(
      Option.map((items) => ({ items, total: dbBlogPostList.total })),
    );
  }
}
