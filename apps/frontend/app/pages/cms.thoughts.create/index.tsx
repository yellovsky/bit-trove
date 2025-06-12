import { Breadcrumbs, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { Link } from '@shared/ui/link';

import { CreateThoughtForm } from '@features/thoughts';

import { useCreateThoughtMutation } from '@entities/thoughts';
import type { CreateThoughtVariables } from '@entities/thoughts/api/create-thought';

export default function CMSThoughtsCreateRoute() {
  const { status, mutateAsync } = useCreateThoughtMutation();
  const { t } = useTranslation();
  const { t: tThoughts } = useTranslation('thoughts');

  const handleSubmit = async (data: CreateThoughtVariables) => {
    const thought = await mutateAsync(data);
    return thought.data;
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
        <Link size="sm" to="/cms/thoughts">
          {t('menu_items.thoughts.title')}
        </Link>
        <Text c="dimmed" size="sm">
          {tThoughts('create_thought_form.title')}
        </Text>
      </Breadcrumbs>

      <Title mb="lg">{tThoughts('create_thought_form.title')}</Title>

      <CreateThoughtForm isLoading={status === 'pending'} mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
