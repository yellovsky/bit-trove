// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { GetOneBlogPostFP } from '@repo/api-models';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneTutorialDTO implements GetOneBlogPostFP {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  locale!: string;
}
