// global modules
import { Effect, pipe } from 'effect';
import { apiHost } from '@repo/utils/api-host';
import { ensureApolloError } from '@repo/api-models/apollo';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  type ApolloError,
  type DocumentNode,
  type TypedDocumentNode,
  type ApolloQueryResult,
  type OperationVariables,
} from '@apollo/client';

// local modules
import { fragments } from './apollo.fragments';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({ fragments }),
    link: new HttpLink({
      uri: apiHost('/graphql'),
      fetchOptions: { cache: 'no-store' },
    }),
  });
});

export const getRSCClient = getClient;

export const makeRscQuery =
  <TResponse, TVariables extends OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TResponse, TVariables>
  ) =>
  (variables: TVariables): Effect.Effect<ApolloQueryResult<TResponse>, ApolloError> =>
    pipe(
      Effect.tryPromise(() => getRSCClient().query<TResponse, TVariables>({ query, variables })),
      Effect.mapError(ensureApolloError)
    );
