import { Timeline } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { type FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Heading } from '@repo/ui/components/Typography';

import { PageLayout } from '@widgets/main-layout';

import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';
import { ShardTimelineItem, ShardTimelineItemPending } from '@features/shards';

import { type GetManyShardsVariables, useInfiniteShardsQuery } from '@entities/shards';

interface ShardsPageProps {
  breadcrumbs: AppBreadcrumb[];
  shardsVariables: GetManyShardsVariables;
}

export const ShardsPage: FC<ShardsPageProps> = ({ shardsVariables, breadcrumbs }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shardsQuery = useInfiniteShardsQuery(shardsVariables);
  const { t } = useTranslation();
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0,
  });

  useEffect(() => {
    if (entry?.isIntersecting && !shardsQuery.isFetchingNextPage && shardsQuery.hasNextPage)
      shardsQuery.fetchNextPage();
  }, [entry?.isIntersecting, shardsQuery.hasNextPage, shardsQuery.isFetchingNextPage, shardsQuery.fetchNextPage]);

  return (
    <PageLayout>
      <Breadcrumbs items={breadcrumbs} />

      <Heading order={1}>{t('menu_items.shards.title')}</Heading>

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
    </PageLayout>
  );
};
