// global modules
import { Effect } from 'effect';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Query,
} from '@nestjs/common';

// common modules
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import { defaultTranslationsStrategy } from 'src/utils/translation-strategy';
import { Public } from 'src/utils/access-control';
import { RuntimeService } from 'src/modules/runtime';

// local modules
import { BlogPostAccessService } from '../services/blog-post-access.service';
import { BlogPostListResponseEntity } from '../entities/blog-post-list-response.entity';
import { BlogPostObfuscationService } from '../services/blog-post-obfuscation.service';
import { BlogPostResponseEntity } from '../entities/blog-post-response.entity';
import { BlogPostSerializerService } from '../services/blog-post-serializer.service';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPostTranslationService } from '../services/blog-post-translation.service';
import { FindManyBlogPostsDTO } from '../dto/find-many-blog-posts.dto';
import { FindOneTutorialDTO } from '../dto/find-one-blog-ppost.dto';

@ApiTags('Blogpost')
@Controller({ path: 'blog-posts', version: '1' })
export class BlogPostsV1Controller {
  constructor(
    @Inject()
    private readonly runtimeSrv: RuntimeService,

    @Inject()
    private readonly blogPostSrv: BlogPostService,

    @Inject()
    private readonly blogPostAccessSrv: BlogPostAccessService,

    @Inject()
    private readonly blogPostObfuscationSrv: BlogPostObfuscationService,

    @Inject()
    private readonly blogPostTranslationSrv: BlogPostTranslationService,

    @Inject()
    private readonly blogPostSerializerSrv: BlogPostSerializerService,
  ) {}

  @Get()
  @Public()
  @ApiOperation({ description: 'Get blog posts list' })
  @ApiOkResponse({ type: BlogPostListResponseEntity })
  @ApiCommonErrorResponses('bad_request')
  async getBlogPostList(
    @Query() query: FindManyBlogPostsDTO,
  ): Promise<BlogPostListResponseEntity> {
    const program: Effect.Effect<BlogPostListResponseEntity, Error> =
      Effect.gen(this, function* () {
        yield* Effect.logDebug('query', query);

        const [founded, total] = yield* Effect.all([
          this.blogPostSrv.getManyShort(null, query),
          this.blogPostSrv.getTotal(null, query),
        ]);

        const accessChecked = yield* this.blogPostAccessSrv.canReadFilter(
          null,
          founded,
        );

        const obfuscated = yield* this.blogPostObfuscationSrv
          .obfuscateShortList(null, 'published', accessChecked)
          .pipe(Effect.flatMap(Effect.fromNullable));

        const translationStrategy = defaultTranslationsStrategy(query.locale);
        const translated = yield* this.blogPostTranslationSrv
          .translateShortList(translationStrategy, obfuscated)
          .pipe(Effect.flatMap(Effect.fromNullable));

        const serialized = yield* this.blogPostSerializerSrv
          .serializeShortList(translated)
          .pipe(Effect.flatMap(Effect.fromNullable));

        return new BlogPostListResponseEntity({
          data: serialized,
          meta: {
            pagination: {
              limit: query.page.limit,
              offset: query.page.offset,
              total,
            },
          },
        });
      });

    return this.runtimeSrv.runPromise(program);
  }

  @ApiOperation({ description: 'Get blog posts list' })
  @ApiOkResponse({ type: BlogPostResponseEntity })
  @ApiCommonErrorResponses('not_found')
  @Public()
  @Get(':slugOrID')
  async getBlogPost(
    @Param('slugOrID') slugOrID: string,
    @Query() query: FindOneTutorialDTO,
  ): Promise<BlogPostResponseEntity> {
    const program: Effect.Effect<BlogPostResponseEntity, Error> = Effect.gen(
      this,
      function* () {
        const founded = yield* this.blogPostSrv.getOne(null, slugOrID);

        if (!(yield* this.blogPostAccessSrv.canRead(null, founded))) {
          return yield* Effect.fail(new ForbiddenException());
        }

        const obfuscated = yield* this.blogPostObfuscationSrv.obfuscate(
          null,
          'published',
          founded,
        );

        const translated = yield* this.blogPostTranslationSrv.translate(
          defaultTranslationsStrategy(query.locale),
          obfuscated,
        );

        const serialized =
          yield* this.blogPostSerializerSrv.serialize(translated);

        return new BlogPostResponseEntity({ data: serialized });
      },
    );

    return this.runtimeSrv.runPromise(program);
  }
}
