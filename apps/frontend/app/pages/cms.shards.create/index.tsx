import { Breadcrumbs, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { Link } from '@shared/ui/link';

import { CreateShardForm } from '@features/shards';

import { useCreateShardMutation } from '@entities/shards';
import type { CreateShardVariables } from '@entities/shards/api/create-shard';

export default function CMSShardsCreateRoute() {
  const { status, mutateAsync } = useCreateShardMutation();
  const { t } = useTranslation();
  const { t: tShards } = useTranslation('shards');

  const handleSubmit = async (data: CreateShardVariables) => {
    const shard = await mutateAsync(data);
    return shard.data;
  };

  return (
    <div>
      <Breadcrumbs mb="xl">
        <Link size="sm" to="/">
          {t('menu_items.home.title')}
        </Link>
        <Link size="sm" to="/cms">
          CMS
        </Link>
        <Link size="sm" to="/cms/shards">
          {t('menu_items.shards.title')}
        </Link>
        <Text c="dimmed" size="sm">
          {tShards('create_shard_form.title')}
        </Text>
      </Breadcrumbs>

      <Title mb="lg">{tShards('create_shard_form.title')}</Title>

      <CreateShardForm isLoading={status === 'pending'} mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
