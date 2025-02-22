// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { BlogPostListFP } from '@repo/api-models';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

// common modules
import { PaginationParamsDTO } from 'src/common/dto/pagination-params.dto';

const FIND_MANY_BLOG_POSTS_SORT = [
  'name',
  '-name',
  'created_at',
  '-created_at',
  'updated_at',
  '-updated_at',
  'rating',
  '-rating',
] as const;

export class FindManyBlogPostsDTO implements BlogPostListFP {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @IsEnum(FIND_MANY_BLOG_POSTS_SORT)
  @ApiProperty({ enum: FIND_MANY_BLOG_POSTS_SORT })
  sort!: BlogPostListFP['sort'];

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PaginationParamsDTO)
  @ApiProperty({ type: PaginationParamsDTO })
  page!: PaginationParamsDTO;

  @IsString()
  @ApiProperty({ type: String })
  locale!: string;
}
