// global modules
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import type { PaginationFP } from '@repo/api-models';
import { Transform } from 'class-transformer';

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
