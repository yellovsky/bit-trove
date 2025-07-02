import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PoseDocument } from '@repo/ui/components/PoseDocument';
import { Heading } from '@repo/ui/components/Typography';

import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';

import { type GetOneShardVariables, useShardQuery } from '@entities/shards';
import { TagBadge } from '@entities/tags';

interface ShardPageProps {
  shardVariables: GetOneShardVariables;
  breadcrumbs: AppBreadcrumb[];
}

export const ShardPage: FC<ShardPageProps> = ({ shardVariables, breadcrumbs }) => {
  const shardResponse = useShardQuery(shardVariables);
  const shard = shardResponse.data?.data;
  const { i18n } = useTranslation();

  const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' });

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <Heading order={1}>{shard?.title}</Heading>

      <div className="mt-sm text-muted-foreground text-sm">
        {dateFormatter.format(new Date(shard?.createdAt ?? ''))}
      </div>

      {!shard?.tags.length ? null : (
        <div className="mt-lg flex gap-2">
          {shard?.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>
      )}

      {shard?.contentJSON ? <PoseDocument doc={shard.contentJSON} /> : null}
    </>
  );
};
