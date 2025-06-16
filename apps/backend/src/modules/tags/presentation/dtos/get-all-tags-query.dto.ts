import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import type { GetAllTagsQuery } from '@repo/api-models';

type GetAllTagsQueryFilter = Exclude<GetAllTagsQuery['filter'], undefined>;
class GetAllTagsQueryFilterDto implements GetAllTagsQueryFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  like?: string;
}

export class GetAllTagsQueryDto implements GetAllTagsQuery {
  @ApiProperty({
    description: 'The filter of the query',
    type: GetAllTagsQueryFilterDto,
  })
  @ValidateNested()
  filter?: GetAllTagsQueryFilterDto;
}
