import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from 'usehooks-ts';

import { Button } from '@repo/ui/components/Button';
import { Link } from '@repo/ui/components/Link';

import { SectionHeader } from '@shared/ui/SectionHeader';

import { ShardGridCard, ShardGridCardPending } from '@features/shards';

import { type ShortShardsGetVariables, useInfiniteShortShardsQuery } from '@entities/shards';

interface ShardsSectionProps {
  variables: ShortShardsGetVariables;
}

export const ShardsSection: FC<ShardsSectionProps> = ({ variables }) => {
  const { t } = useTranslation();
  const query = useInfiniteShortShardsQuery(variables);
  const shards = query.data?.pages.at(0)?.data.items;
  const { ref, entry } = useIntersectionObserver({ threshold: 0 });

  useEffect(() => {
    if (entry?.isIntersecting && !query.isFetchingNextPage && query.hasNextPage) {
      query.fetchNextPage();
    }
  }, [entry?.isIntersecting, query.isFetchingNextPage, query.hasNextPage, query.fetchNextPage]);

  return (
    <section aria-labelledby="recent-shards-heading" className="@container">
      <SectionHeader
        action={
          <Button asChild variant="ghost">
            <Link to="/shards">{t('See all')}</Link>
          </Button>
        }
        className="mb-4"
        title={t('menu_items.shards.title')}
        titleId="recent-shards-heading"
      />

      <div className="grid @2xl:grid-cols-2 grid-cols-1 gap-4">
        {shards?.slice(0, 4).map((shard) => (
          <ShardGridCard key={shard.id} shard={shard} />
        ))}
        {query.isPending && (
          <>
            <ShardGridCardPending />
            <ShardGridCardPending />
            <ShardGridCardPending />
            <ShardGridCardPending />
          </>
        )}
      </div>

      <div ref={ref} />
    </section>
  );
};
