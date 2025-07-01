import { Breadcrumbs, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { Link } from '@repo/ui/components/link';

import { CreateShardForm } from '@features/shards';

import { useCreateShardMutation } from '@entities/shards';
import type { CreateShardVariables } from '@entities/shards/api/create-shard';

export const handle = {
  i18n: ['cms', 'shards'],
};

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
        <Link to="/">{t('menu_items.home.title')}</Link>
        <Link to="/cms">CMS</Link>
        <Link to="/cms/shards">{t('menu_items.shards.title')}</Link>
        <Text c="dimmed">{tShards('create_shard_form.title')}</Text>
      </Breadcrumbs>

      <Title mb="lg">{tShards('create_shard_form.title')}</Title>

      <CreateShardForm isLoading={status === 'pending'} mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
