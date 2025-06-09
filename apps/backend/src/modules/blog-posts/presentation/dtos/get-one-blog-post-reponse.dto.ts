import { ApiProperty } from '@nestjs/swagger';

import type { GetOneBlogPostResponse } from '@repo/api-models';

import type { LocalizedBlogPostModel } from '../../domain/models/localized-blog-post.model';
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

  static fromModel(model: LocalizedBlogPostModel): GetOneBlogPostResponseDto {
    return new GetOneBlogPostResponseDto({ data: BlogPostDto.fromModel(model) });
  }

  constructor(data: Omit<GetOneBlogPostResponse, 'status'>) {
    Object.assign(this, data);
  }
}
