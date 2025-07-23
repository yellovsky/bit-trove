import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/Form';
import { TextInput } from '@repo/ui/components/TextInput';

import type { ControlProps } from '../types';
import { createTitleValidator } from '../utils/validation';

export const TitleController: FC<ControlProps> = ({ control }) => {
  const { t } = useTranslation();
  const { t: tCmsArticles } = useTranslation('cms_articles');

  return (
    <FormField
      control={control}
      name="title"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tCmsArticles('upsert_article_form.title_control.label')}</FormLabel>
          <FormControl>
            <TextInput
              aria-label={tCmsArticles('upsert_article_form.title_control.aria_label')}
              disabled={formState.isSubmitting}
              placeholder={tCmsArticles('upsert_article_form.title_control.placeholder')}
              {...field}
            />
          </FormControl>
          <FormDescription>{tCmsArticles('upsert_article_form.title_control.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      rules={{ validate: createTitleValidator(t) }}
    />
  );
};
