import { Timeline, Title } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ShardTimelineItem, ShardTimelineItemPending } from '@features/shards';

import { useInfiniteShardsQuery } from '@entities/shards';

export default function ShardsRoute() {
  const { i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const shardsQuery = useInfiniteShardsQuery({
    locale: i18n.language,
    sort: '-createdAt',
  });

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0,
  });

  useEffect(() => {
    if (entry?.isIntersecting && !shardsQuery.isFetchingNextPage && shardsQuery.hasNextPage)
      shardsQuery.fetchNextPage();
  }, [entry?.isIntersecting, shardsQuery.hasNextPage, shardsQuery.isFetchingNextPage, shardsQuery.fetchNextPage]);

  return (
    <div>
      <Title mb="lg" order={1}>
        Shards
      </Title>

      <Timeline bulletSize={32} lineWidth={2}>
        {shardsQuery.data?.pages.map((page) =>
          page.data.items.map((shard) => <ShardTimelineItem key={shard.id} shard={shard} />)
        )}

        {shardsQuery.isFetching && (
          <>
            <ShardTimelineItemPending />
            <ShardTimelineItemPending />
          </>
        )}
      </Timeline>

      <div ref={ref} />
    </div>
  );
}
