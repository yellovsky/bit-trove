// global modules
import type { FC } from 'react';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { fetchThoughtSegmentCollection } from '@repo/api-models/thought';
import { initialPageParam, type QueryKeyOf } from '@repo/api-models/common';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

// local modules
import { ThoughtsTimelineClient } from './thoughts-timeline.client-component';

interface ThoughtsTimelineProps {
  locale: SupportedLocale;
}

export const ThoughtsTimeline: FC<ThoughtsTimelineProps> = async ({ locale }) => {
  const queryClient = new QueryClient();

  const queryKey: QueryKeyOf<typeof fetchThoughtSegmentCollection> = [
    'thought_segment_collection',
    { locale },
  ];

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: fetchThoughtSegmentCollection,
    initialPageParam,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ThoughtsTimelineClient queryKey={queryKey} />
    </HydrationBoundary>
  );
};
