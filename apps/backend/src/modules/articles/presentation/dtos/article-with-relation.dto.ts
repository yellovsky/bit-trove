import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { ArticleRelationDirection, ArticleRelationType, ArticleWithRelation } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';

import type { ArticleWithRelationModel } from '../../domain/models/article-with-relation.model';
import { ShortArticleDto } from './short-article.dto';

export class ArticleWithRelationDto implements ArticleWithRelation {
  @ApiProperty({
    description: 'The ID of the article with relation',
    type: String,
  })
  readonly id!: string;

  @ApiProperty({
    description: 'The language code of the article with relation',
    type: String,
  })
  readonly article!: ShortArticleDto;

  @ApiProperty({
    description: 'The slug of the article with relation',
    type: String,
  })
  readonly direction!: ArticleRelationDirection;

  @ApiProperty({
    description: 'The order of the article with relation',
    type: Number,
  })
  readonly order!: number;

  @ApiProperty({
    description: 'The relation type of the article with relation',
    type: String,
  })
  readonly relationType!: ArticleRelationType;

  static fromModel(model: ArticleWithRelationModel): Effect.Effect<ArticleWithRelationDto, ExclusionReason> {
    return ShortArticleDto.fromModel(model.article).pipe(
      Effect.map(
        (article) =>
          new ArticleWithRelationDto({
            article,
            direction: model.direction,
            id: model.id,
            order: model.order,
            relationType: model.relationType,
          })
      )
    );
  }

  constructor(data: ArticleWithRelation) {
    Object.assign(this, data);
  }
}
