import { ActionIcon, Loader, Menu } from '@mantine/core';
import { IconDots, IconEye, IconEyeX, IconPencil, IconTrash } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { ShortShard } from '@repo/api-models';
import { Link } from '@repo/ui/components/link';

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
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon variant="subtle">
          <IconDots stroke={1.5} style={{ height: '70%', width: '70%' }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component={Link} leftSection={<IconPencil size={14} />} to={getEditShardLink(shard)}>
          {tCms('edit_action')}
        </Menu.Item>

        <Menu.Item
          leftSection={
            pending ? <Loader size={14} /> : shard.publishedAt ? <IconEyeX size={14} /> : <IconEye size={14} />
          }
          onClick={() => {
            if (shard.publishedAt) unpublishShard(shard.id);
            else publishShard(shard.id);
          }}
        >
          {shard.publishedAt ? tCms('unpublish_action') : tCms('publish_action')}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
          {tCms('delete_action')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
