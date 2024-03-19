import { ApolloError, isApolloError } from '@apollo/client'
import { NOT_FOUND_APOLLO_ERROR } from '@repo/api-models/apollo'
import { pipe, Effect, flow, Either } from 'effect'
import type { Metadata } from 'next'
import { notFound, type ReadonlyURLSearchParams } from 'next/navigation'

export interface RSCPageProps<TParams extends string> {
  params: Record<TParams, string | string[] | undefined>
  searchParams: ReadonlyURLSearchParams
}

export const getStringUrlParam = <TParams extends string>(param: TParams) =>
  flow(
    (props: RSCPageProps<TParams>) => props.params[param],
    (value): Effect.Effect<string, ApolloError> =>
      typeof value === 'string' ? Effect.succeed(value) : Effect.fail(NOT_FOUND_APOLLO_ERROR)
  )

const acyncRsc =
  <TURlParams extends string, TProps>(
    fetchParams: (props: RSCPageProps<TURlParams>) => Effect.Effect<TProps, ApolloError>
  ) =>
  (props: RSCPageProps<TURlParams>) =>
    pipe(
      fetchParams(props),
      Effect.either,
      Effect.map(
        Either.mapLeft((apolloError) =>
          apolloError.networkError && 'statusCode' in apolloError.networkError
            ? apolloError.networkError.statusCode
            : 500
        )
      )
    )

export const rscPage =
  <TURlParams extends string, TProps>(
    fetchParams: (props: RSCPageProps<TURlParams>) => Effect.Effect<TProps, ApolloError>,
    render: (p: TProps) => JSX.Element
  ) =>
  (props: RSCPageProps<TURlParams>) =>
    Effect.runPromise(acyncRsc(fetchParams)(props)).then(
      Either.match({
        onLeft: (statusCode) => {
          if (statusCode === 404) notFound()
          throw new Error()
        },
        onRight: render,
      })
    )

export const rscMetadata =
  <TURlParams extends string, TProps>(
    fetchParams: (props: RSCPageProps<TURlParams>) => Effect.Effect<TProps, ApolloError>,
    handler: (p: TProps) => Metadata
  ) =>
  (props: RSCPageProps<TURlParams>) =>
    Effect.runPromise(acyncRsc(fetchParams)(props)).then(
      Either.match({
        onLeft: () => undefined,
        onRight: handler,
      })
    )
