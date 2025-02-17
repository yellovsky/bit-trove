// global modules
import type { DB } from 'src/db';
import { Effect } from 'effect';
import { validate as validateUUID } from 'uuid';
import { count, eq } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';

// common modules
import { blogPosts } from 'src/db/schema';
import { DRIZZLE_SRV } from 'src/modules/drizzle';

// local modules
import type { FindManyBlogPostsDTO } from '../dto/find-many-blog-posts.dto';
import type { DBBlogPost, DBBlogPostShort } from './blog-post.db-types';

@Injectable()
export class BlogPostRepository {
  constructor(
    @Inject(DRIZZLE_SRV)
    private readonly db: DB,
  ) {}

  findOne(
    db: DB | null,
    slugOrID: string,
  ): Effect.Effect<DBBlogPost | undefined, Error> {
    return Effect.tryPromise(() =>
      (db || this.db).query.blogPosts.findFirst({
        where: this.#getFindOneWhere(slugOrID),
        with: {
          article: { with: { translations: { with: { blocks: true } } } },
        },
      }),
    );
  }

  findOneShort(
    db: DB | null,
    slugOrID: string,
  ): Effect.Effect<DBBlogPostShort | undefined, Error> {
    return Effect.tryPromise(() =>
      (db || this.db).query.blogPosts.findFirst({
        where: this.#getFindOneWhere(slugOrID),

        with: {
          article: { with: { translations: true } },
        },
      }),
    );
  }

  findManyShort(
    db: DB | null,
    dto: FindManyBlogPostsDTO,
  ): Effect.Effect<DBBlogPostShort[], Error> {
    return Effect.tryPromise(() =>
      (db || this.db).query.blogPosts.findMany({
        limit: dto.page.limit,
        offset: dto.page.offset,
        orderBy: (blogPosts, { desc }) => [desc(blogPosts.created_at)],
        with: {
          article: { with: { translations: true } },
        },
      }),
    );
  }

  findTotal(
    db: DB | null,
    dto: FindManyBlogPostsDTO,
  ): Effect.Effect<number, Error> {
    return Effect.tryPromise(() =>
      (db || this.db)
        .select({ count: count() })
        .from(blogPosts)
        .limit(dto.page.limit)
        .offset(dto.page.offset),
    ).pipe(Effect.map(() => 100));
  }

  #getFindOneWhere(slugOrID: string) {
    return validateUUID(slugOrID)
      ? eq(blogPosts.id, slugOrID)
      : eq(blogPosts.slug, slugOrID);
  }
}
