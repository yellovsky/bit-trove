// global modules
import { Effect, pipe } from 'effect';
import { apiHost } from '@repo/utils/api-host';
import { ensureApolloError } from '@repo/api-models/apollo';
import { createFragmentRegistry } from '@apollo/client/cache';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

import { IMAGE_ENTITY_FRAGMENT } from '@repo/api-models/image';
import { SEO_FRAGMENT } from '@repo/api-models/seo';
import { TAG_ENTITY_FRAGMENT } from '@repo/api-models/tag';
import { RICH_TEXT_BLOCK_FRAGMENT } from '@repo/api-models/block';
import { FULL_CATEGORY_FRAGMENT, PARTIAL_CATEGORY_FRAGMENT } from '@repo/api-models/category';
import { FULL_BLOG_POST_FRAGMENT, PARTIAL_BLOG_POST_FRAGMENT } from '@repo/api-models/blog-post';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  type ApolloError,
  type ApolloQueryResult,
  type OperationVariables,
  type DocumentNode,
  type TypedDocumentNode,
  gql,
} from '@apollo/client';

const fragments = createFragmentRegistry(gql`
  ${IMAGE_ENTITY_FRAGMENT}
  ${SEO_FRAGMENT}
  ${TAG_ENTITY_FRAGMENT}
  ${FULL_BLOG_POST_FRAGMENT}
  ${PARTIAL_BLOG_POST_FRAGMENT}
  ${RICH_TEXT_BLOCK_FRAGMENT}
  ${FULL_CATEGORY_FRAGMENT}
  ${PARTIAL_CATEGORY_FRAGMENT}
`);

console.log("apiHost('/graphql')", apiHost('/graphql'));
export const getRSCClient = registerApolloClient(() => {
  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache({ fragments }),
    link: new HttpLink({
      uri: apiHost('/graphql'),
      fetchOptions: { cache: 'no-store' },
    }),
  });
}).getClient;

export const makeRscQuery =
  <TResponse, TVariables extends OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TResponse, TVariables>
  ) =>
  (variables: TVariables): Effect.Effect<ApolloQueryResult<TResponse>, ApolloError> =>
    pipe(
      Effect.tryPromise(() => getRSCClient().query<TResponse, TVariables>({ query, variables })),
      Effect.mapError(ensureApolloError)
    );
