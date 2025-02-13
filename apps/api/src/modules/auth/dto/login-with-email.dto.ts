// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { LoginWithEmailFP } from '@repo/api-models';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginWithEmailDTO implements LoginWithEmailFP {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email!: LoginWithEmailFP['email'];

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password!: LoginWithEmailFP['password'];
}
