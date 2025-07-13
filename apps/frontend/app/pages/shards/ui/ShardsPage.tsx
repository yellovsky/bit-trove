import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from 'usehooks-ts';

import { SectionHeader } from '@shared/ui/SectionHeader';

import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';
import { ShardHorizontalCard, ShardHorizontalCardPending, ShardsSortingDropdown } from '@features/shards';

import { type ShortShardsGetVariables, useInfiniteShortShardsQuery } from '@entities/shards';

interface ShardsPageProps {
  breadcrumbs: AppBreadcrumb[];
  shardsVariables: ShortShardsGetVariables;
}

export const ShardsPage: FC<ShardsPageProps> = ({ shardsVariables, breadcrumbs }) => {
  const shardsQuery = useInfiniteShortShardsQuery(shardsVariables);
  const { t } = useTranslation();
  const { ref, entry } = useIntersectionObserver({ threshold: 0 });

  useEffect(() => {
    if (entry?.isIntersecting && !shardsQuery.isFetchingNextPage && shardsQuery.hasNextPage)
      shardsQuery.fetchNextPage();
  }, [entry?.isIntersecting, shardsQuery.hasNextPage, shardsQuery.isFetchingNextPage, shardsQuery.fetchNextPage]);

  return (
    <>
      <Breadcrumbs className="mb-6" items={breadcrumbs} />

      <SectionHeader
        action={<ShardsSortingDropdown shardsVariables={shardsVariables} />}
        className="mb-4"
        title={t('menu_items.shards.title')}
      />

      <div className="flex flex-col gap-2">
        {shardsQuery.data?.pages.map((page) =>
          page.data.items.map((shard) => <ShardHorizontalCard key={shard.id} shard={shard} />)
        )}

        {shardsQuery.isPending && (
          <>
            <ShardHorizontalCardPending />
            <ShardHorizontalCardPending />
          </>
        )}
      </div>
      <div ref={ref} />
    </>
  );
};
