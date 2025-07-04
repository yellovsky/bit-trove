import type { FC } from 'react';

import { PoseDocument } from '@repo/ui/components/PoseDocument';
import { Heading } from '@repo/ui/components/Typography';

import { DateLabelIcon, ReadingTimeLabelIcon } from '@shared/ui/LabeledIcon';

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

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <Heading order={1}>{shard?.title}</Heading>

      <div className="mt-md flex items-center gap-4">
        {shard?.createdAt && <DateLabelIcon date={shard.createdAt} />}
        {shard?.readingTime && <ReadingTimeLabelIcon minutes={shard.readingTime} />}
      </div>

      {!shard?.tags.length ? null : (
        <div className="mt-4 flex gap-2">
          {shard?.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>
      )}

      {shard?.contentJSON ? <PoseDocument className="mt-6" doc={shard.contentJSON} /> : null}
    </>
  );
};
