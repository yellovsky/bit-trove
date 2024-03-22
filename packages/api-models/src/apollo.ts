// global modules
import { ApolloError, isApolloError } from '@apollo/client';

export const UNKNOWN_APOLLO_ERROR = new ApolloError({
  networkError: {
    message: 'Unknown error',
    name: 'unknown_error',
    statusCode: 500,
  },
});

export const NOT_FOUND_APOLLO_ERROR = new ApolloError({
  networkError: {
    message: 'Not found',
    name: 'not_found',
    statusCode: 404,
  },
});

export const makeBadRequestApolloError = (message: string) =>
  new ApolloError({
    networkError: {
      message,
      name: 'bad_request',
      statusCode: 400,
    },
  });

export const ensureApolloError = (error: Error) =>
  isApolloError(error) ? error : UNKNOWN_APOLLO_ERROR;

export interface Fragment<TTypeName extends string, TAttributes extends {}> {
  id: string;
  attributes: {
    __typename: TTypeName;
  } & TAttributes;
}
