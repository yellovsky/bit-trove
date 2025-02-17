// global modules
import { ApiProperty } from '@nestjs/swagger';
import type { FailedResponse, ResponseError } from '@repo/api-models';

const ERROR_NAME = [
  'bad_request',
  'forbidden',
  'internal_server_error',
  'not_found',
  'unauthorized',
] as const;

export class InvalidParamEntity {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  reason: string;

  constructor(data: InvalidParamEntity) {
    this.name = data.name;
    this.reason = data.reason;
  }
}

export class ResponseErrorEntity implements ResponseError {
  @ApiProperty({ enum: ERROR_NAME })
  error_name: ResponseError['error_name'];

  @ApiProperty({ type: [InvalidParamEntity] })
  invalid_params?: ResponseError['invalid_params'];

  @ApiProperty({ type: String })
  message?: string | undefined;

  @ApiProperty({ type: Number })
  status_code: number;

  constructor(data: ResponseErrorEntity) {
    this.error_name = data.error_name;
    this.invalid_params = data.invalid_params;
    this.message = data.message;
    this.status_code = data.status_code;
  }
}

export class FailedResponseMeta {
  @ApiProperty({ type: Number })
  status: number;

  constructor(data: FailedResponseMeta) {
    this.status = data.status;
  }
}

export class FailedResponseEntity implements FailedResponse {
  @ApiProperty({ type: FailedResponseMeta })
  meta: FailedResponseMeta;

  @ApiProperty({ type: ResponseErrorEntity })
  error: ResponseErrorEntity;

  constructor(data: FailedResponseEntity) {
    this.meta = data.meta;
    this.error = data.error;
  }
}
