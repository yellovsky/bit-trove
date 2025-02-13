// global modules
import { ApiProperty } from '@nestjs/swagger';

import type {
  ApiErrorName,
  FailedResponse,
  ResponseError,
} from '@repo/api-models';

// common modules
import { Entity, type WithoutEntityType } from 'src/common/entities/entity';

const ERROR_NAME = [
  'bad_request',
  'forbidden',
  'internal_server_error',
  'not_found',
  'unauthorized',
] as const;

export class InvalidParamEntity extends Entity {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  reason: string;

  constructor(data: WithoutEntityType<InvalidParamEntity>) {
    super();

    this.name = data.name;
    this.reason = data.reason;
  }
}

export class ResponseErrorEntity extends Entity implements ResponseError {
  @ApiProperty({ enum: ERROR_NAME })
  error_name: ApiErrorName;

  @ApiProperty({ type: [InvalidParamEntity] })
  invalid_params?: InvalidParamEntity[];

  @ApiProperty({ type: String })
  message?: string | undefined;

  @ApiProperty({ type: Number })
  status_code: number;

  constructor(data: WithoutEntityType<ResponseErrorEntity>) {
    super();

    this.error_name = data.error_name;
    this.invalid_params = data.invalid_params;
    this.message = data.message;
    this.status_code = data.status_code;
  }
}

export class FailedResponseMeta extends Entity {
  @ApiProperty({ type: Number })
  status: number;

  constructor(data: WithoutEntityType<FailedResponseMeta>) {
    super();

    this.status = data.status;
  }
}

export class FailedResponseEntity extends Entity implements FailedResponse {
  @ApiProperty({ type: FailedResponseMeta })
  meta: FailedResponseMeta;

  @ApiProperty({ type: ResponseErrorEntity })
  error: ResponseErrorEntity;

  constructor(data: WithoutEntityType<FailedResponseEntity>) {
    super();

    this.meta = data.meta;
    this.error = data.error;
  }
}
