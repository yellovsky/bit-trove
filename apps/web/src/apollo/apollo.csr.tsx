'use client';

// global modules
import { apiHost } from '@repo/utils/api-host';
import { ApolloLink, HttpLink } from '@apollo/client';

import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

// local modules
import { fragments } from './apollo.fragments';

function makeClient() {
  const httpLink = new HttpLink({ uri: apiHost('/graphql') });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({ fragments }),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
