import { useTranslation } from 'react-i18next';

import { Heading } from '@repo/ui/components/Typography';

import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';
import { CreateShardForm, getCreateShardLink } from '@features/shards';

import { type ShardCreateVariables, useShardCreateMutation } from '@entities/shards';

export const handle = {
  i18n: ['cms', 'shards'],
};

export default function CMSShardsCreateRoute() {
  const { status, mutateAsync } = useShardCreateMutation();
  const { t } = useTranslation();
  const { t: tShards } = useTranslation('shards');

  const handleSubmit = async (data: ShardCreateVariables) => {
    const shard = await mutateAsync(data);
    return shard.data;
  };

  const breadcrumbs = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: 'CMS', to: '/cms' },
    { label: t('menu_items.shards.title'), to: '/cms/shards' },
    { label: tShards('edit_shard_form.title'), to: getCreateShardLink() },
  ].filter(Boolean) as AppBreadcrumb[];

  return (
    <div>
      <Breadcrumbs className="mb-4" items={breadcrumbs} />

      <Heading className="mb-4" order={2}>
        {tShards('create_shard_form.title')}
      </Heading>

      <CreateShardForm isLoading={status === 'pending'} mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
