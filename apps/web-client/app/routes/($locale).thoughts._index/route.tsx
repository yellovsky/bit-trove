// global modules
import type { FC } from 'react';
import { Link } from '@repo/ui/link';
import type { LoaderFunction } from '@remix-run/node';
import type { QueryKeyOf } from '@bit-trove/api-models/common';
import { fetchThoughtSegmentCollection, thoughtLink } from '@bit-trove/api-models/thought';
import { type Params, useLoaderData } from '@remix-run/react';

import {
  dehydrate,
  type DehydratedState,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query';
import { PageContent } from '../../components/page-content';
import { ThoughtsTimeline } from '../../components/thoughts-timeline';

type ThoughtsPageParams = 'locale';

interface LoaderData {
  dehydratedState: DehydratedState;
  thoughtsQueryKey: QueryKeyOf<typeof fetchThoughtSegmentCollection>;
}

const getThoughtsQueryKey = (
  params: Params<ThoughtsPageParams>
): QueryKeyOf<typeof fetchThoughtSegmentCollection> => [
  'thought_segment_collection',
  { locale: params.locale! },
];

export const loader: LoaderFunction = async (args): Promise<LoaderData> => {
  console.log('in loader');
  const params = args.params as Params<ThoughtsPageParams>;

  const queryClient = new QueryClient();

  const thoughtsQueryKey = getThoughtsQueryKey(params);
  await queryClient.prefetchQuery({
    queryFn: fetchThoughtSegmentCollection,
    queryKey: thoughtsQueryKey,
  });

  console.log('af');
  return { dehydratedState: dehydrate(queryClient), thoughtsQueryKey };
};

export default function ThoughtsRoute() {
  const { dehydratedState, thoughtsQueryKey } = useLoaderData() as LoaderData;
  console.log('dehydratedState', dehydratedState);
  return (
    <HydrationBoundary state={dehydratedState}>
      <PageContent>
        {/* <PageContent className={thoughtsPageCn}> */}
        <ThoughtsTimeline queryKey={thoughtsQueryKey} />
      </PageContent>

      {/* <Page thoughtsQueryKey={thoughtsQueryKey} /> */}
    </HydrationBoundary>
  );
}
