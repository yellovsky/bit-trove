import { IconEye, IconEyeX, IconPencil, IconTrash } from '@tabler/icons-react';
import { EllipsisIcon, LoaderIcon } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortShard } from '@repo/api-models';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/DropdownMenu';
import { Link } from '@repo/ui/components/link';
import { Toggle } from '@repo/ui/components/Toggle';

import { getEditShardLink } from '@features/shards';

import { usePublishShardMutation, useUnpublishShardMutation } from '@entities/shards';

interface ShardTableMenuProps {
  shard: ShortShard;
}

export const ShardTableMenu: FC<ShardTableMenuProps> = ({ shard }) => {
  const { t: tCms } = useTranslation('cms');
  const { mutate: publishShard, isPending: isPublishPending } = usePublishShardMutation();
  const { mutate: unpublishShard, isPending: isUnpublishPending } = useUnpublishShardMutation();

  const pending = isPublishPending || isUnpublishPending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toggle variant="dimmed">
          <EllipsisIcon />
        </Toggle>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link to={getEditShardLink(shard)} variant="unstyled">
            <IconPencil size={14} />
            {tCms('edit_action')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            if (shard.publishedAt) unpublishShard(shard.id);
            else publishShard(shard.id);
          }}
        >
          {/* TODO make spinner */}
          {pending ? <LoaderIcon size={14} /> : shard.publishedAt ? <IconEyeX size={14} /> : <IconEye size={14} />}
          {shard.publishedAt ? tCms('unpublish_action') : tCms('publish_action')}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <IconTrash size={14} />
          {tCms('delete_action')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
