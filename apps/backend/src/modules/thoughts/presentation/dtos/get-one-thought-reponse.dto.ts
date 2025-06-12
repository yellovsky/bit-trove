import { ApiProperty } from '@nestjs/swagger';

import type { GetOneThoughtResponse } from '@repo/api-models';

import type { LocalizedThoughtModel } from '../../domain/models/localized-thought.model';
import { ThoughtDto } from './thought.dto';

export class GetOneThoughtResponseDto implements GetOneThoughtResponse {
  @ApiProperty({
    description: 'The status of the response',
    type: String,
  })
  readonly status: 'success' = 'success' as const;

  @ApiProperty({
    description: 'The data of the response',
  })
  readonly data!: ThoughtDto;

  static fromModel(model: LocalizedThoughtModel): GetOneThoughtResponseDto {
    return new GetOneThoughtResponseDto({ data: ThoughtDto.fromModel(model) });
  }

  constructor(data: Omit<GetOneThoughtResponse, 'status'>) {
    Object.assign(this, data);
  }
}
