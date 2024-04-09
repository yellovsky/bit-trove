// global modules
import type { FC } from 'react';
import { QueryKeyOf } from '@bit-trove/api-models/common';
import { dehydrate, DehydratedState, hydrate } from '@tanstack/query-core';
import { getThoughtMetadata, thoughtQueryFn } from '@bit-trove/api-models/thought';
import { HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { type Params, useLoaderData, useParams, Outlet } from '@remix-run/react';

export default function UserDetails() {
  return <div>main content</div>;
}
