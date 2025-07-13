import { Controller, Inject, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';

import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';

import { PublishArticleUseCase } from '../application/use-cases/publish-article.use-case';
import { UnpublishArticleUseCase } from '../application/use-cases/unpublish-article.use-case';
import { GetOneArticleResponseDto } from './dtos/get-one-article-reponse.dto';

@ApiTags('CMS Articles')
@Controller({ path: 'cms-articles', version: '1' })
export class CMSArticlesController {
  constructor(
    @Inject(PublishArticleUseCase)
    private readonly publishArticleUseCase: PublishArticleUseCase,

    @Inject(UnpublishArticleUseCase)
    private readonly unpublishArticleUseCase: UnpublishArticleUseCase
  ) {}

  @Patch('publish/:id')
  @ApiOperation({ summary: 'Publish an article' })
  @ApiResponse({ description: 'Returns the published article', status: 200 })
  async publish(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.publishArticleUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((article) => GetOneArticleResponseDto.fromModel(article)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }

  @Patch('unpublish/:id')
  @ApiOperation({ summary: 'Unpublish an article' })
  @ApiResponse({ description: 'Returns the unpublished article', status: 200 })
  async unpublish(@ReqCtx() reqCtx: RequestContext, @Param('id') id: string): Promise<GetOneArticleResponseDto> {
    const pipeline: Effect.Effect<GetOneArticleResponseDto, ExclusionReason> = this.unpublishArticleUseCase
      .execute(reqCtx, id)
      .pipe(
        Effect.flatMap((article) => GetOneArticleResponseDto.fromModel(article)),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
