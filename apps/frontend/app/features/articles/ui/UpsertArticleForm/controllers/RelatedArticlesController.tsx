import type { FC } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { ArticleRelationType } from '@repo/api-models';
import { FormField } from '@repo/ui/components/Form';

import { UpsertRelatedArticlesSection } from '../../UpsertRelatedArticlesSection';
import type { ControlProps } from '../types';

export const RelatedArticlesController: FC<ControlProps> = ({ control }) => {
  const { t: tCmsArticles } = useTranslation('cms_articles');
  const { fields, append, remove } = useFieldArray({ control, name: 'relatedArticles' });

  const handleAdd = (relation: ArticleRelationType, articleId: string) => {
    const existingIndex = fields.findIndex((field) => field.articleId === articleId);
    if (existingIndex >= 0) remove(existingIndex);
    append({ articleId, relationType: relation });
  };

  const handleDelete = (articleId: string) => {
    const existingIndex = fields.findIndex((field) => field.articleId === articleId);
    if (existingIndex >= 0) remove(existingIndex);
  };

  return (
    <FormField
      control={control}
      name="relatedArticles"
      render={({ field }) => (
        <UpsertRelatedArticlesSection
          articlesWithRelation={field.value}
          legend={tCmsArticles('upsert_article_form.related_articles_section.legend')}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      )}
    />
  );
};
