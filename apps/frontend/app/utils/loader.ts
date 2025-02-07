// global modules
import { Effect } from 'effect';
import type { FailedResponse } from '@repo/api-models';
import type { LoaderFunctionArgs } from '@remix-run/node';
import type { Params } from '@remix-run/react';
import type { QueryClient } from '@tanstack/react-query';
import type { Namespace, TFunction } from 'i18next';

// common modules
import { getQueryClient } from '~/query-client';
import { i18nServer } from '~/modules/i18n';
import { runAsyncEffect } from '~/utils/effect';
import { type ApiClient, getApiClient } from '~/api/api-client';

export const getParamsParam = (name: string, params: Params): Effect.Effect<string, Response> =>
  Effect.gen(function* () {
    const val = params[name];
    if (!val) return yield* Effect.fail(new Response('Bad request', { status: 400 }));
    return val;
  });

export const getRequestLocale = (request: Request): Effect.Effect<string, Response> =>
  Effect.tryPromise(() => i18nServer.getLocale(request)).pipe(
    Effect.mapError(() => new Response('Bad request', { status: 400 })),
  );

export const getFixedT = <N extends Namespace>(
  locale: string,
  namespaces?: N,
): Effect.Effect<TFunction<N>, Response> =>
  Effect.tryPromise(() => i18nServer.getFixedT(locale, namespaces)).pipe(
    Effect.mapError(() => new Response('Bad request', { status: 400 })),
  );

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

export type GetLoaderData<TLoaderData> = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  loaderArgs: LoaderFunctionArgs,
) => Effect.Effect<TLoaderData, Response>;

export const makeLoader = <TLoaderData>(getLoaderData: GetLoaderData<TLoaderData>) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  return (loaderArgs: LoaderFunctionArgs): Promise<TLoaderData> =>
    runAsyncEffect(getLoaderData(apiClient, queryClient, loaderArgs));
};
