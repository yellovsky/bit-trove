import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { ArticleGetResponse } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';

import type { ArticleModel } from '../../domain/models/article.model';
import { ArticleDto } from './article.dto';

export class GetOneArticleResponseDto implements ArticleGetResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ArticleDto;

  static fromModel(model: ArticleModel): Effect.Effect<GetOneArticleResponseDto, ExclusionReason> {
    return ArticleDto.fromModel(model).pipe(Effect.map((data) => new GetOneArticleResponseDto({ data })));
  }

  constructor(data: Omit<ArticleGetResponse, 'status'>) {
    Object.assign(this, data);
  }
}
