// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { BlogPostSegment } from '@repo/api-models';

export class BlogPostShortEntity implements BlogPostSegment {
  @ApiProperty({ type: String })
  created_at: string;

  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  original_language_code: string;

  @ApiProperty({ nullable: true, type: String })
  published_at: string | null;

  @ApiProperty({ type: String })
  short_description: string;

  @ApiProperty({ type: String })
  slug: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  language_code: string;

  @ApiProperty({ type: [String] })
  language_codes: string[];

  constructor(data: BlogPostShortEntity) {
    this.created_at = data.created_at;
    this.id = data.id;
    this.original_language_code = data.original_language_code;
    this.published_at = data.published_at;
    this.short_description = data.short_description;
    this.slug = data.slug;
    this.title = data.title;
    this.language_code = data.language_code;
    this.language_codes = data.language_codes;
  }
}
