import { keepPreviousData } from '@tanstack/query-core';
import { ArrowRightIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortShard } from '@repo/api-models';
import { Button } from '@repo/ui/components/Button';
import { Link } from '@repo/ui/components/Link';

import { SectionHeader } from '@shared/ui/SectionHeader';

import { ShardGridCard, ShardGridCardPending } from '@features/shards';

import { type ShortShardsGetVariables, useInfiniteShortShardsQuery } from '@entities/shards';

/* -------------------------------------------------------------------------------------------------
 * ShardsSectionEmpty
 * -----------------------------------------------------------------------------------------------*/
const SHARDS_SECTION_EMPTY_NAME = 'ShardsSectionEmpty';

const ShardsSectionEmpty: FC = () => {
  const { t: shardsT } = useTranslation('shards');

  return <div className="py-8 text-center text-muted-foreground">{shardsT('No shards found')}</div>;
};

ShardsSectionEmpty.displayName = SHARDS_SECTION_EMPTY_NAME;

/* -------------------------------------------------------------------------------------------------
 * ShardsSectionError
 * -----------------------------------------------------------------------------------------------*/
const SHARDS_SECTION_ERROR_NAME = 'ShardsSectionError';

const ShardsSectionError: FC<{ error: unknown }> = ({ error }) => {
  const { t: shardsT } = useTranslation('shards');

  return (
    <div className="py-8 text-center text-destructive">
      {typeof error === 'string' ? error : shardsT('Failed to load shards')}
    </div>
  );
};

ShardsSectionError.displayName = SHARDS_SECTION_ERROR_NAME;

/* -------------------------------------------------------------------------------------------------
 * ShardsSectionPending
 * -----------------------------------------------------------------------------------------------*/
const SHARDS_SECTION_PENDING_NAME = 'ShardsSectionPending';

const ShardsSectionPending: FC = () => (
  <div className="grid @2xl:grid-cols-2 grid-cols-1 gap-4">
    <ShardGridCardPending />
    <ShardGridCardPending />
    <ShardGridCardPending />
    <ShardGridCardPending />
  </div>
);

ShardsSectionPending.displayName = SHARDS_SECTION_PENDING_NAME;

/* -------------------------------------------------------------------------------------------------
 * ShardsSectionContent
 * -----------------------------------------------------------------------------------------------*/
const SHARDS_SECTION_CONTENT_NAME = 'ShardsSectionContent';

interface ShardsSectionContentProps {
  shards?: ShortShard[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
}

const ShardsSectionContent: FC<ShardsSectionContentProps> = ({ shards, isPending, isError, error }) => {
  if (isError) return <ShardsSectionError error={error} />;
  if (isPending) return <ShardsSectionPending />;
  if (!shards || shards.length === 0) return <ShardsSectionEmpty />;

  return (
    <div className="grid @2xl:grid-cols-2 grid-cols-1 gap-4">
      {shards.slice(0, 4).map((shard) => (
        <ShardGridCard key={shard.id} shard={shard} />
      ))}
    </div>
  );
};

ShardsSectionContent.displayName = SHARDS_SECTION_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * ShardsSectionView
 * -----------------------------------------------------------------------------------------------*/
const SHARDS_SECTION_VIEW_NAME = 'ShardsSectionView';

interface ShardsSectionViewProps {
  shards?: ShortShard[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
}

const ShardsSectionView: FC<ShardsSectionViewProps> = (props) => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="recent-shards-heading" className="@container">
      <SectionHeader
        action={
          <Button asChild variant="ghost">
            <Link to="/shards">
              {t('See all')}
              <ArrowRightIcon />
            </Link>
          </Button>
        }
        className="mb-4"
        title={t('menu_items.shards.title')}
        titleId="recent-shards-heading"
      />
      <ShardsSectionContent {...props} />
    </section>
  );
};

ShardsSectionView.displayName = SHARDS_SECTION_VIEW_NAME;

/* -------------------------------------------------------------------------------------------------
 * ShardsSection
 * -----------------------------------------------------------------------------------------------*/
const SHARDS_SECTION_NAME = 'ShardsSection';

const useShardsSectionData = (variables: ShortShardsGetVariables) => {
  const query = useInfiniteShortShardsQuery(variables, { placeholderData: keepPreviousData });
  const shards = query.data?.pages.at(0)?.data.items;

  return {
    error: query.error,
    isError: query.isError,
    isPending: query.isPending,
    shards,
  };
};

interface ShardsSectionProps {
  variables: ShortShardsGetVariables;
}

const ShardsSection: FC<ShardsSectionProps> = ({ variables }) => {
  const { shards, isPending, isError, error } = useShardsSectionData(variables);

  return <ShardsSectionView error={error} isError={isError} isPending={isPending} shards={shards} />;
};

ShardsSection.displayName = SHARDS_SECTION_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ShardsSection, ShardsSectionView };
export type { ShardsSectionProps, ShardsSectionViewProps };
