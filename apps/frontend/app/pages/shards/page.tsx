import { Timeline, Title } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { type FC, useEffect, useRef } from 'react';

import { ShardTimelineItem, ShardTimelineItemPending } from '@features/shards';

import { type GetManyShardsVariables, useInfiniteShardsQuery } from '@entities/shards';

interface ShardsPageProps {
  shardsVariables: GetManyShardsVariables;
}

export const ShardsPage: FC<ShardsPageProps> = ({ shardsVariables }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shardsQuery = useInfiniteShardsQuery(shardsVariables);

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
};
