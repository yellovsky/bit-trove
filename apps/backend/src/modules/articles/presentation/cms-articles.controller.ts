import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Effect } from 'effect';

import { ExclusionReason, UnknownReason } from 'src/shared/excluded';
import { ReqCtx, type RequestContext } from 'src/shared/utils/request-context';

import { CMSArticlesCheckSlugAvailabilityUseCase } from '../application/use-cases/cms-articles-check-slug-availability.use-case';
import {
  ArticleSlugAvailabilityDto,
  CheckArticleSlugAvailabilityResponseDto,
} from './dtos/article-slug-availability-response.dto';

@ApiTags('CMS Articles')
@Controller({ path: 'cms-articles', version: '1' })
export class CMSArticlesController {
  constructor(
    @Inject(CMSArticlesCheckSlugAvailabilityUseCase)
    private readonly checkArticleSlugAvailabilityUseCase: CMSArticlesCheckSlugAvailabilityUseCase
  ) {}

  @Get(':slug/check-slug-availability')
  @ApiOperation({
    description:
      'CMS utility endpoint to check if a given slug is available for use when creating or updating an article. Returns availability status and information about who currently owns the slug if it is taken.',
    summary: 'Check article slug availability (CMS)',
  })
  @ApiResponse({
    description: 'Slug availability check completed',
    status: 200,
    type: CheckArticleSlugAvailabilityResponseDto,
  })
  async checkSlugAvailability(
    @ReqCtx() reqCtx: RequestContext,
    @Param('slug') slug: string
  ): Promise<CheckArticleSlugAvailabilityResponseDto> {
    const pipeline: Effect.Effect<CheckArticleSlugAvailabilityResponseDto, ExclusionReason> =
      this.checkArticleSlugAvailabilityUseCase.execute(reqCtx, slug).pipe(
        Effect.map((takenBy) => {
          return new CheckArticleSlugAvailabilityResponseDto({
            data: new ArticleSlugAvailabilityDto(takenBy ? { available: false, takenBy } : { available: true }),
          });
        }),
        Effect.mapError((err) => (err instanceof ExclusionReason ? err : new UnknownReason()))
      );

    return Effect.runPromise(pipeline);
  }
}
