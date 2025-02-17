// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { GetOneTutorialFP } from '@repo/api-models';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneTutorialDTO implements GetOneTutorialFP {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  locale!: string;
}
