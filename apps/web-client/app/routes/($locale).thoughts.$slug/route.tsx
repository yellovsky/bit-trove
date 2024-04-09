// global modules
import type { FC } from 'react';
import { QueryKeyOf } from '@bit-trove/api-models/common';
import { dehydrate, DehydratedState, hydrate } from '@tanstack/query-core';
import { getThoughtMetadata, thoughtQueryFn } from '@bit-trove/api-models/thought';
import { HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { type Params, useLoaderData, useParams } from '@remix-run/react';

type ThoughtPageParams = 'locale' | 'slug';

interface LoaderData {
  dehydratedState: DehydratedState;
}

const getThoughtQueryKey = (
  params: Params<ThoughtPageParams>
): QueryKeyOf<typeof thoughtQueryFn> => ['thought', { locale: params.locale!, slug: params.slug! }];

export const loader: LoaderFunction = async (args): Promise<LoaderData> => {
  const params = args.params as Params<ThoughtPageParams>;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: thoughtQueryFn,
    queryKey: getThoughtQueryKey(params),
  });

  return { dehydratedState: dehydrate(queryClient) };
};

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  const queryClient = new QueryClient();
  hydrate(queryClient, data.dehydratedState);

  const thoughtResponse = queryClient.getQueryData<Awaited<ReturnType<typeof thoughtQueryFn>>>(
    getThoughtQueryKey(params)
  );

  return !thoughtResponse?.data ? [] : getThoughtMetadata(thoughtResponse.data.attributes);
};

const Temporary: FC = () => {
  const params = useParams<ThoughtPageParams>();

  const { data, status, error } = useQuery({
    queryFn: thoughtQueryFn,
    queryKey: getThoughtQueryKey(params),
  });

  return (
    <div>
      status: ${status}
      <br />
      data: {JSON.stringify(data)}
      <br />
      error: {JSON.stringify(error)}
    </div>
  );
};

export default function UserDetails() {
  const { dehydratedState } = useLoaderData() as LoaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <Temporary />
    </HydrationBoundary>
  );
}
