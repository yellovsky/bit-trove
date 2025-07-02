import { type FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from 'usehooks-ts';

import { Heading } from '@repo/ui/components/Typography';

import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';
import { ShardHorizontalCard, ShardHorizontalCardPending } from '@features/shards';

import { type GetManyShardsVariables, useInfiniteShardsQuery } from '@entities/shards';

interface ShardsPageProps {
  breadcrumbs: AppBreadcrumb[];
  shardsVariables: GetManyShardsVariables;
}

export const ShardsPage: FC<ShardsPageProps> = ({ shardsVariables, breadcrumbs }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shardsQuery = useInfiniteShardsQuery(shardsVariables);
  const { t } = useTranslation();
  const { ref, entry } = useIntersectionObserver({ root: containerRef.current, threshold: 0 });

  useEffect(() => {
    if (entry?.isIntersecting && !shardsQuery.isFetchingNextPage && shardsQuery.hasNextPage)
      shardsQuery.fetchNextPage();
  }, [entry?.isIntersecting, shardsQuery.hasNextPage, shardsQuery.isFetchingNextPage, shardsQuery.fetchNextPage]);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <Heading order={1}>{t('menu_items.shards.title')}</Heading>

      {shardsQuery.data?.pages.map((page) =>
        page.data.items.map((shard) => <ShardHorizontalCard key={shard.id} shard={shard} />)
      )}

      {shardsQuery.isFetching && (
        <>
          <ShardHorizontalCardPending />
          <ShardHorizontalCardPending />
        </>
      )}

      <div ref={ref} />
    </>
  );
};
