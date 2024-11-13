// global modules
import { applyDecorators } from '@nestjs/common';
import type { FailedResponse } from '@repo/api-models';

import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// common modules
import { FailedResponseEntity } from 'src/entities/error';

export const ApiCommonErrorResponses = (
  ...types: Array<'forbidden' | 'unauthorized' | 'bad_request' | 'not_found'>
) => {
  return applyDecorators(
    ...[
      types.includes('bad_request')
        ? ApiBadRequestResponse({
            description: 'Not found',
            example: {
              errors: [{ error_name: 'not_found', status_code: 404 }],
              meta: { status: 404 },
            } satisfies FailedResponse,
            type: FailedResponseEntity,
          })
        : null,
      types.includes('bad_request')
        ? ApiBadRequestResponse({
            description: 'Bad request',
            example: {
              errors: [{ error_name: 'bad_request', status_code: 400 }],
              meta: { status: 400 },
            } satisfies FailedResponse,
            type: FailedResponseEntity,
          })
        : null,
      types.includes('forbidden')
        ? ApiForbiddenResponse({
            description: 'Forbidden',
            example: {
              errors: [{ error_name: 'forbidden', status_code: 403 }],
              meta: { status: 403 },
            } satisfies FailedResponse,
            type: FailedResponseEntity,
          })
        : null,
      types.includes('unauthorized')
        ? ApiUnauthorizedResponse({
            description: 'Unauthorized',
            example: {
              errors: [{ error_name: 'unauthorized', status_code: 401 }],
              meta: { status: 401 },
            } satisfies FailedResponse,
            type: FailedResponseEntity,
          })
        : null,
      ApiInternalServerErrorResponse({
        description: 'Internal server error',
        example: {
          errors: [{ error_name: 'internal_server_error', status_code: 500 }],
          meta: { status: 500 },
        } satisfies FailedResponse,
        type: FailedResponseEntity,
      }),
    ].filter((r) => r !== null),
  );
};
