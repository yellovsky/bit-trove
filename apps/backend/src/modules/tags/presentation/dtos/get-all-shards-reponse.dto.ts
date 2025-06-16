import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { GetAllTagsResponse } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';

import type { TagModel } from '../../domain/models/tag.model';
import { TagDto } from './tag.dto';

export class GetAllTagsResponseDto implements GetAllTagsResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'Tags',
  })
  readonly data!: TagDto[];

  static fromModel(models: TagModel[]): Effect.Effect<GetAllTagsResponseDto, ExclusionReason> {
    return Effect.allSuccesses(models.map((model) => TagDto.fromModel(model))).pipe(
      Effect.map((tags) => new GetAllTagsResponseDto({ data: tags }))
    );
  }

  constructor(data: Omit<GetAllTagsResponseDto, 'status'>) {
    this.data = data.data;
  }
}
