import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { RelatedArticleResponse } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';

import type { ArticleWithRelationModel } from '../../domain/models/article-with-relation.model';
import { ArticleWithRelationDto } from './article-with-relation.dto';

export class GetRelatedArticlesResponseDto implements RelatedArticleResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ArticleWithRelationDto[];

  static fromModel(models: ArticleWithRelationModel[]): Effect.Effect<GetRelatedArticlesResponseDto, ExclusionReason> {
    return Effect.allSuccesses(models.map((model) => ArticleWithRelationDto.fromModel(model).pipe())).pipe(
      Effect.map((items) => new GetRelatedArticlesResponseDto({ data: items }))
    );
  }

  constructor(data: Omit<GetRelatedArticlesResponseDto, 'status'>) {
    Object.assign(this, data);
  }
}
