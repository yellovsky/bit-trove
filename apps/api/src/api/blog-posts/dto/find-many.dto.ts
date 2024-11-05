// global modules
import type { BlogPostListFP, PaginationFP } from '@repo/api-models';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationParamsDTO implements PaginationFP {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit!: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  offset!: number;
}

export class FindManyBlogPostsDTO implements BlogPostListFP {
  @IsEnum([
    'name',
    '-name',
    'created_at',
    '-created_at',
    'updated_at',
    '-updated_at',
    'rating',
    '-rating',
  ])
  @IsNotEmpty()
  sort!: BlogPostListFP['sort'];

  @Type(() => PaginationParamsDTO)
  @ValidateNested()
  page!: PaginationParamsDTO;

  @IsString()
  locale!: string;
}
