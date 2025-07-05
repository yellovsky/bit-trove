import { ApiProperty } from '@nestjs/swagger';
import { Effect } from 'effect';

import type { GetOneBlogPostResponse } from '@repo/api-models';

import type { ExclusionReason } from 'src/shared/excluded';

import type { BlogPostModel } from '../../domain/models/blog-post.model';
import { BlogPostDto } from './blog-post.dto';

export class GetOneBlogPostResponseDto implements GetOneBlogPostResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: BlogPostDto;

  static fromModel(model: BlogPostModel): Effect.Effect<GetOneBlogPostResponseDto, ExclusionReason> {
    return BlogPostDto.fromModel(model).pipe(Effect.map((data) => new GetOneBlogPostResponseDto({ data })));
  }

  constructor(data: Omit<GetOneBlogPostResponse, 'status'>) {
    Object.assign(this, data);
  }
}
