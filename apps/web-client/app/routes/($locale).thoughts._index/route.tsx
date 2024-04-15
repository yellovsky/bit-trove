// global modules
import { fetchThoughtSegmentCollection } from '@bit-trove/api-models/thought';
import type { LoaderFunction } from '@remix-run/node';
import { PageContent } from '~/components/page-content';
import type { QueryKeyOf } from '@bit-trove/api-models/common';
import { ThoughtsTimeline } from '~/components/thoughts-timeline';
import { type Params, useLoaderData } from '@remix-run/react';

import {
  dehydrate,
  type DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

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
  const params = args.params as Params<ThoughtsPageParams>;

  const queryClient = new QueryClient();

  const thoughtsQueryKey = getThoughtsQueryKey(params);
  await queryClient.prefetchQuery({
    queryFn: fetchThoughtSegmentCollection,
    queryKey: thoughtsQueryKey,
  });

  return { dehydratedState: dehydrate(queryClient), thoughtsQueryKey };
};

export default function ThoughtsRoute() {
  const { dehydratedState, thoughtsQueryKey } = useLoaderData() as LoaderData;

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
