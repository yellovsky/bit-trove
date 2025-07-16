import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/Form';
import { type Option, TagsInput } from '@repo/ui/components/TagsInput';

import { useAllTagsQuery } from '@entities/tags';

import type { ControlProps } from '../types';

export const TagsController: FC<ControlProps> = ({ control }) => {
  const { t: tCmsArticles } = useTranslation('cms_articles');
  const allTagsQuery = useAllTagsQuery({});

  const defaultOptions: Option[] =
    allTagsQuery.data?.data?.map((tag) => ({
      label: tag.name,
      value: tag.name,
    })) ?? [];

  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{tCmsArticles('upsert_article_form.tags_control.label')}</FormLabel>
          <FormControl>
            <TagsInput
              onChange={(value) => field.onChange(value.map((v) => v.value))}
              options={defaultOptions}
              placeholder={tCmsArticles('upsert_article_form.tags_control.placeholder')}
              value={field.value.map((v) => ({ label: v, value: v }))}
            />
          </FormControl>
          <FormDescription>{tCmsArticles('upsert_article_form.tags_control.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
