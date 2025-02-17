// global modules
import { Effect } from 'effect';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

// common modules
import type { DB } from 'src/db';

// local modules
import { BlogPostRepository } from '../repositories/blog-post.repository';
import type { FindManyBlogPostsDTO } from '../dto/find-many-blog-posts.dto';

import type {
  DBBlogPost,
  DBBlogPostShort,
} from '../repositories/blog-post.db-types';

@Injectable()
export class BlogPostService {
  constructor(
    @Inject()
    private readonly blogPostRepo: BlogPostRepository,
  ) {}

  getOne(db: DB | null, slugOrID: string): Effect.Effect<DBBlogPost, Error> {
    return Effect.gen(this, function* () {
      const founded = yield* this.blogPostRepo.findOne(db, slugOrID);
      return founded || (yield* Effect.fail(new NotFoundException()));
    });
  }

  getManyShort(
    db: DB | null,
    dto: FindManyBlogPostsDTO,
  ): Effect.Effect<DBBlogPostShort[], Error> {
    return this.blogPostRepo.findManyShort(db, dto);
  }

  getTotal(
    db: DB | null,
    dto: FindManyBlogPostsDTO,
  ): Effect.Effect<number, Error> {
    return this.blogPostRepo.findTotal(db, dto);
  }
}
