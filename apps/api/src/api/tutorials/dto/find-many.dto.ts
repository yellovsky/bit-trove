// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { PaginationFP, TutorialListFP } from '@repo/api-models';
import { Transform, Type } from 'class-transformer';

import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PaginationParamsDTO implements PaginationFP {
  @IsNumber()
  @ApiProperty({ type: Number })
  @Transform(({ value }) => parseInt(value))
  limit!: number;

  @IsNumber()
  @ApiProperty({ type: Number })
  @Transform(({ value }) => parseInt(value))
  offset!: number;
}

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
}
