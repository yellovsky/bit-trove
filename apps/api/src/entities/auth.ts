// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { LoginResponse } from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/entities/entity';

export class LoginResponseEntity extends Entity implements LoginResponse {
  @ApiProperty({ type: String })
  meta: LoginResponse['meta'];

  constructor(response: WithoutEntityType<LoginResponseEntity>) {
    super();

    this.meta = response.meta;
  }
}
