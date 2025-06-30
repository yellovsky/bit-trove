import { Breadcrumbs, LoadingOverlay, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Link } from '@shared/ui/link';

import { CreateShardForm, getCmsShardsLink } from '@features/shards';

import { useUpdateShardMutation } from '@entities/shards';
import type { CreateShardVariables } from '@entities/shards/api/create-shard';
import { useMyShardQuery } from '@entities/shards/api/get-my-one-shard';

import type { Route } from './+types';

export default function CMSShardsEditRoute(props: Route.ComponentProps) {
  const navigate = useNavigate();
  const myShardQuery = useMyShardQuery(props.params.id);

  const { status, mutateAsync } = useUpdateShardMutation();
  const { t, i18n } = useTranslation();
  const { t: tShards } = useTranslation('shards');

  const handleSubmit = async (data: CreateShardVariables) => {
    const shard = await mutateAsync({ ...data, id: props.params.id });
    return shard.data;
  };

  const myShard = myShardQuery.data?.data;
  const defaultValues: CreateShardVariables | undefined = !myShard
    ? undefined
    : {
        contentJSON: myShard.contentJSON,
        entryId: myShard.entryId,
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

  if (myShardQuery.isLoading) return <LoadingOverlay visible={true} />;

  return (
    <div>
      <Breadcrumbs mb="xl">
        <Link to="/">{t('menu_items.home.title')}</Link>
        <Link to="/cms">CMS</Link>
        <Link to="/cms/shards">{t('menu_items.shards.title')}</Link>
        <Text c="dimmed">{tShards('edit_shard_form.title')}</Text>
      </Breadcrumbs>

      <Title mb="lg">{tShards('edit_shard_form.title')}</Title>

      <CreateShardForm
        defaultValues={defaultValues}
        id={props.params.id}
        isLoading={status === 'pending'}
        mode="update"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
