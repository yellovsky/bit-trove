'use client';

// global modules
import type { DocumentNode } from 'graphql';
import { useApolloClient } from '@apollo/client';
import { useRef, type FC, type PropsWithChildren } from 'react';

interface QueryUpdate {
  data: unknown;
  variables: object;
  query: DocumentNode;
}

interface HydrateQueryProps extends PropsWithChildren {
  updates: Record<string, QueryUpdate>;
}

export const HydrateQuery: FC<HydrateQueryProps> = ({ updates, children }) => {
  const hydrated = useRef(false);
  const client = useApolloClient();

  if (!hydrated.current) {
    hydrated.current = true;
    Object.values(updates).forEach(client.writeQuery.bind(client));
  }

  return children;
};
