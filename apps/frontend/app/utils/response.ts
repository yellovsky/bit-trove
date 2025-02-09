// global modules
import type { FailedResponse } from '@repo/api-models';

export const failedResponseToResponse = (failedResponse: FailedResponse): Response => {
  if (failedResponse.meta.status === 404) {
    return new Response('Not found', { status: 404 });
  } else if (failedResponse.meta.status === 403) {
    return new Response('Forbidden', { status: 403 });
  } else if (failedResponse.meta.status === 400)
    return new Response('Bad request', { status: 400 });
  else {
    return new Response('Internal server error', { status: 500 });
  }
};
