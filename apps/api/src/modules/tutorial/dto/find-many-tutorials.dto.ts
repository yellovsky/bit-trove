// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { TutorialListFP } from '@repo/api-models';
import { Type } from 'class-transformer';

import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// common modules
import { PaginationParamsDTO } from 'src/common/dto/pagination-params.dto';

const FIND_MANY_TUTORIALS_SORT = [
  'name',
  '-name',
  'created_at',
  '-created_at',
  'updated_at',
  '-updated_at',
  'rating',
  '-rating',
] as const;

type TutorialListFilterFP = Exclude<TutorialListFP['filter'], undefined>;
export class TutorialListFilterDTO implements TutorialListFilterFP {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  author_id?: string;
}

export class FindManyTutorialsDTO implements TutorialListFP {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @IsEnum(FIND_MANY_TUTORIALS_SORT)
  @ApiProperty({ enum: FIND_MANY_TUTORIALS_SORT })
  sort!: TutorialListFP['sort'];

  @ValidateNested()
  @Type(() => PaginationParamsDTO)
  @ApiProperty({ type: PaginationParamsDTO })
  page!: PaginationParamsDTO;

  @IsString()
  @ApiProperty({ type: String })
  locale!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TutorialListFilterDTO)
  filter?: TutorialListFilterDTO;
}
