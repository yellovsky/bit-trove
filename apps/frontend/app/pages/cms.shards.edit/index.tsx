import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { isShard } from '@repo/api-models';
import { Heading } from '@repo/ui/components/Typography';

import { UpsertArticleForm, type UpsertArticleVariables } from '@features/articles';
import { type AppBreadcrumb, Breadcrumbs } from '@features/breadcrumbs';
import { getCmsShardsLink, getEditShardLink } from '@features/shards';

import { useRelatedArticlesQuery } from '@entities/articles';
import { useMyShardQuery, useShardUpdateMutation } from '@entities/shards';

import type { Route } from './+types';

export const handle = {
  i18n: ['cms', 'cms_articles', 'shards'],
};

export default function CMSShardsEditRoute(props: Route.ComponentProps) {
  const { t, i18n } = useTranslation();
  const { t: tShards } = useTranslation('shards');
  const navigate = useNavigate();

  const myShardQuery = useMyShardQuery({ id: props.params.id, locale: i18n.language });
  const relatedArticlesQuery = useRelatedArticlesQuery({ id: props.params.id, locale: i18n.language });

  const { status, mutateAsync } = useShardUpdateMutation();

  const handleSubmit = async (data: Omit<UpsertArticleVariables, 'id'>) => {
    const shard = await mutateAsync({ ...data, id: props.params.id, type: 'shard' });
    if (!isShard(shard.data)) throw new Error('Invalid response');
    return shard.data;
  };

  const defaultValues: UpsertArticleVariables | undefined =
    !myShardQuery.data || !relatedArticlesQuery.data
      ? undefined
      : {
          contentJSON: myShardQuery.data.data.contentJSON ?? { content: [], type: 'doc' },
          entryId: myShardQuery.data.data.entryId,
          languageCode: myShardQuery.data.data.languageCode,
          published: myShardQuery.data.data.publishedAt !== null,
          relatedArticles: relatedArticlesQuery.data.data.map((article) => ({
            articleId: article.id,
            relationType: article.relationType,
          })),
          seoDescription: myShardQuery.data.data.seo.description,
          seoKeywords: myShardQuery.data.data.seo.keywords,
          seoTitle: myShardQuery.data.data.seo.title,
          shortDescription: myShardQuery.data.data.shortDescription,
          slug: myShardQuery.data.data.slug,
          tags: myShardQuery.data.data.tags.map((tag) => tag.name),
          title: myShardQuery.data.data.title,
        };

  const handleSuccess = () => navigate(`/${i18n.language}${getCmsShardsLink()}`);
  const breadcrumbs = [
    { label: t('menu_items.home.title'), to: '/' },
    { label: 'CMS', to: '/cms' },
    { label: t('menu_items.shards.title'), to: '/cms/shards' },
    myShardQuery.data?.data
      ? { label: tShards('edit_shard_page.title'), to: getEditShardLink(myShardQuery.data?.data) }
      : null,
  ].filter(Boolean) as AppBreadcrumb[];

  return (
    <div>
      <Breadcrumbs className="mb-4" items={breadcrumbs} />

      <Heading className="mb-4" order={2}>
        {tShards('edit_shard_page.title')}
      </Heading>

      {myShardQuery.isLoading ? null : (
        <UpsertArticleForm
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
