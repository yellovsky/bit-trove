// global modules
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { pipe, Effect, flow, Either } from 'effect';
import { isSupportedLocale } from '@bit-trove/localization/config';
import { notFound, type ReadonlyURLSearchParams } from 'next/navigation';
import { ApolloError, type DocumentNode, type OperationVariables } from '@apollo/client';

import {
  NOT_FOUND_APOLLO_ERROR,
  ensureApolloError,
  makeBadRequestApolloError,
} from '@repo/api-models/apollo';

// local modules
import { getRSCClient } from '../apollo/apollo.rsc';

export interface RSCPageProps<TParams extends string> extends PropsWithChildren {
  params: Record<TParams, string | string[] | undefined>;
  searchParams: ReadonlyURLSearchParams;
}

export const getStringUrlParam = <TParams extends string>(param: TParams) =>
  flow(
    (props: RSCPageProps<TParams>) => props.params[param],
    (value): Effect.Effect<string, ApolloError> =>
      typeof value === 'string' ? Effect.succeed(value) : Effect.fail(NOT_FOUND_APOLLO_ERROR)
  );

export const getLocaleUrlParam = flow(
  getStringUrlParam('locale'),
  Effect.flatMap((maybeLocale) =>
    isSupportedLocale(maybeLocale)
      ? Effect.succeed(maybeLocale)
      : Effect.fail(makeBadRequestApolloError('Provided locale param is not locale'))
  )
);

const acyncRsc =
  <TURlParams extends string, TProps>(
    fetchParams: (props: RSCPageProps<TURlParams>) => Effect.Effect<TProps, ApolloError>
  ) =>
  (props: RSCPageProps<TURlParams>) =>
    pipe(
      fetchParams(props),
      Effect.either,
      Effect.map(
        Either.mapLeft((apolloError) => {
          console.error(apolloError);
          return apolloError.networkError && 'statusCode' in apolloError.networkError
            ? apolloError.networkError.statusCode
            : 500;
        })
      )
    );

export const rscQuery =
  <T, TVariables extends OperationVariables>(query: DocumentNode) =>
  (variables: TVariables) =>
    pipe(
      Effect.tryPromise(() => getRSCClient().query<T, TVariables>({ query, variables })),
      Effect.mapError(ensureApolloError),
      Effect.map(({ data }) => ({ query, variables, data }))
    );

export const rscPage =
  <TURlParams extends string, TProps>(
    fetchParams: (props: RSCPageProps<TURlParams>) => Effect.Effect<TProps, ApolloError>,
    render: (p: TProps & PropsWithChildren) => JSX.Element | Promise<JSX.Element>
  ) =>
  (props: RSCPageProps<TURlParams>) =>
    Effect.runPromise(acyncRsc(fetchParams)(props)).then(
      Either.match({
        onLeft: (statusCode) => {
          if (statusCode === 404) notFound();
          throw new Error();
        },
        onRight: (right) => render({ ...right, children: props.children }),
      })
    );

export const rscMetadata =
  <TURlParams extends string, TProps>(
    fetchParams: (props: RSCPageProps<TURlParams>) => Effect.Effect<TProps, ApolloError>,
    handler: (p: TProps) => Metadata | undefined
  ) =>
  (props: RSCPageProps<TURlParams>) =>
    Effect.runPromise(acyncRsc(fetchParams)(props)).then(
      Either.match({
        onLeft: () => undefined,
        onRight: handler,
      })
    );
