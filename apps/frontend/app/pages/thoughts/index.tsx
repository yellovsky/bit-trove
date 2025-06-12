import { Timeline, Title } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ThoughtTimelineItem, ThoughtTimelineItemPending } from '@features/thoughts';

import { useInfiniteThoughtsQuery } from '@entities/thoughts';

export default function ThoughtsRoute() {
  const { i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const thoughtsQuery = useInfiniteThoughtsQuery({
    locale: i18n.language,
    sort: '-createdAt',
  });

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0,
  });

  useEffect(() => {
    if (entry?.isIntersecting && !thoughtsQuery.isFetchingNextPage && thoughtsQuery.hasNextPage)
      thoughtsQuery.fetchNextPage();
  }, [entry?.isIntersecting, thoughtsQuery.hasNextPage, thoughtsQuery.isFetchingNextPage, thoughtsQuery.fetchNextPage]);

  return (
    <div>
      <Title mb="lg" order={1}>
        Thoughts
      </Title>

      <Timeline bulletSize={32} lineWidth={2}>
        {thoughtsQuery.data?.pages.map((page) =>
          page.data.items.map((thought) => <ThoughtTimelineItem key={thought.id} thought={thought} />)
        )}

        {thoughtsQuery.isFetching && (
          <>
            <ThoughtTimelineItemPending />
            <ThoughtTimelineItemPending />
          </>
        )}
      </Timeline>

      <div ref={ref} />
    </div>
  );
}
