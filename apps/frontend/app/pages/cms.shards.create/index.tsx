import { useTranslation } from 'react-i18next';

import { Heading } from '@repo/ui/components/Typography';

import { UpsertArticleForm, type UpsertArticleVariables } from '@features/articles';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';
import { getCreateShardLink } from '@features/shards';

import { useShardCreateMutation } from '@entities/shards';

export const handle = {
  i18n: ['cms', 'cms_articles', 'shards'],
};

export default function CMSShardsCreateRoute() {
  const { status, mutateAsync } = useShardCreateMutation();
  const { t } = useTranslation();
  const { t: tShards } = useTranslation('shards');

  const handleSubmit = async (data: UpsertArticleVariables) => {
    const shard = await mutateAsync(data);
    return shard.data;
  };

  const breadcrumbs = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: 'CMS', to: '/cms' },
    { label: t('menu_items.shards.title'), to: '/cms/shards' },
    { label: tShards('create_shard_page.title'), to: getCreateShardLink() },
  ].filter(Boolean) as AppBreadcrumb[];

  return (
    <div>
      <Breadcrumbs className="mb-4" items={breadcrumbs} />

      <Heading className="mb-4" order={2}>
        {tShards('create_shard_page.title')}
      </Heading>

      <UpsertArticleForm isLoading={status === 'pending'} mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
