import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Heading } from '@repo/ui/components/Typography';

import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';
import { CreateShardForm, getCmsShardsLink, getEditShardLink } from '@features/shards';
import type { UpsertShardVariables } from '@features/shards/ui/CreateShardForm';

import { type ShardUpdateVariables, useMyShardQuery, useShardUpdateMutation } from '@entities/shards';

import type { Route } from './+types';

export const handle = {
  i18n: ['shards', 'cms'],
};

export default function CMSShardsEditRoute(props: Route.ComponentProps) {
  const { t, i18n } = useTranslation();
  const { t: tShards } = useTranslation('shards');
  const navigate = useNavigate();

  const myShardQuery = useMyShardQuery({
    id: props.params.id,
    locale: i18n.language,
  });

  const { status, mutateAsync } = useShardUpdateMutation();

  const handleSubmit = async (data: Omit<UpsertShardVariables, 'id'>) => {
    const shard = await mutateAsync({ ...data, id: props.params.id, type: 'shard' });
    return shard.data;
  };

  const myShard = myShardQuery.data?.data;
  const defaultValues: ShardUpdateVariables | undefined = !myShard
    ? undefined
    : {
        contentJSON: myShard.contentJSON ?? { content: [], type: 'doc' },
        entryId: myShard.entryId,
        id: myShard.id,
        languageCode: myShard.languageCode,
        published: myShard.publishedAt !== null,
        seoDescription: myShard.seo.description,
        seoKeywords: myShard.seo.keywords,
        seoTitle: myShard.seo.title,
        shortDescription: myShard.shortDescription,
        slug: myShard.slug,
        tags: myShard.tags.map((tag) => tag.name),
        title: myShard.title,
      };

  const handleSuccess = () => navigate(`/${i18n.language}${getCmsShardsLink()}`);
  const breadcrumbs = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: 'CMS', to: '/cms' },
    { label: t('menu_items.shards.title'), to: '/cms/shards' },
    myShardQuery.data?.data
      ? { label: tShards('edit_shard_form.title'), to: getEditShardLink(myShardQuery.data?.data) }
      : null,
  ].filter(Boolean) as AppBreadcrumb[];

  return (
    <div>
      <Breadcrumbs className="mb-4" items={breadcrumbs} />

      <Heading className="mb-4" order={2}>
        {tShards('edit_shard_form.title')}
      </Heading>

      {myShardQuery.isLoading ? null : (
        <CreateShardForm
          defaultValues={defaultValues}
          id={props.params.id}
          isLoading={status === 'pending' || myShardQuery.isLoading}
          mode="update"
          onSubmit={handleSubmit}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
