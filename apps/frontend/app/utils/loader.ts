// global modules
import { Effect } from 'effect';
import type { FailedResponse } from '@repo/api-models';
import type { Params } from '@remix-run/react';

export const getParamsParam = (name: string, params: Params): Effect.Effect<string, Response> =>
  Effect.gen(function* () {
    const val = params[name];
    if (!val) return yield* Effect.fail(new Response('Bad request', { status: 400 }));
    return val;
  });

export const failedResponseToResponse = (failedResponse: FailedResponse): Response => {
  if (failedResponse.meta.status === 404) {
    return new Response('Not found', { status: 404 });
  } else if (failedResponse.meta.status === 400)
    return new Response('Bad request', { status: 400 });
  else {
    return new Response('Internal server error', { status: 500 });
  }
};
