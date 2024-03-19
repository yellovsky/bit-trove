// global modules
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
} from '@apollo/client'
import { createFragmentRegistry } from '@apollo/client/cache'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { ensureApolloError } from '@repo/api-models/apollo'
import { BLOG_POST_ENTITY_FRAGMENT } from '@repo/api-models/blog-post'
import { IMAGE_ENTITY_FRAGMENT } from '@repo/api-models/image'
import { SEO_FRAGMENT } from '@repo/api-models/seo'
import { TAG_ENTITY_FRAGMENT } from '@repo/api-models/tag'
import { Effect, pipe } from 'effect'

const fragments = createFragmentRegistry(gql`
  ${IMAGE_ENTITY_FRAGMENT}
  ${SEO_FRAGMENT}
  ${TAG_ENTITY_FRAGMENT}
  ${BLOG_POST_ENTITY_FRAGMENT}
`)

export const getRSCClient = registerApolloClient(() => {
  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache({ fragments }),
    link: new HttpLink({
      headers: {
        Authorization:
          'Bearer d49b5a8d9814d023566c2bfd361f04d6307e4819d9fd654a2b60f44dedf6f9555fce86dee177eeab16f4916b943ce9aed6e8f4ba03ad62b9c457dcc8933ef18de19acc7861c3d04dae3fe89a0043e56fb6eab9d63217a7d68ae2d7d44155ab68f48b1bc48c856e9b59e710442f42a73cc0c2e1cdc3673081076b42c55a145c56',
      },
      uri: 'http://127.0.0.1:1337/graphql',
      fetchOptions: { cache: 'no-store' },
    }),
  })
}).getClient

export const makeRscQuery =
  <TResponse, TVariables extends OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TResponse, TVariables>
  ) =>
  (variables: TVariables): Effect.Effect<ApolloQueryResult<TResponse>, ApolloError> =>
    pipe(
      Effect.tryPromise(() => getRSCClient().query<TResponse, TVariables>({ query, variables })),
      Effect.mapError(ensureApolloError)
    )
