import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/Form';
import { TextInput as UiTextInput } from '@repo/ui/components/TextInput';

import type { ControlProps } from '../types';
import { createSlugValidator } from '../utils/validation';

interface SlugControllerProps extends ControlProps {
  id?: string;
}

export const SlugController: FC<SlugControllerProps> = ({ control, id }) => {
  const { t } = useTranslation();
  const { t: tCmsArticles } = useTranslation('cms_articles');

  return (
    <FormField
      control={control}
      name="slug"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tCmsArticles('upsert_article_form.slug_control.label')}</FormLabel>
          <FormControl>
            <UiTextInput
              aria-label={tCmsArticles('upsert_article_form.slug_control.aria_label')}
              disabled={formState.isSubmitting}
              placeholder={tCmsArticles('upsert_article_form.slug_control.placeholder')}
              {...field}
            />
          </FormControl>
          <FormDescription>{tCmsArticles('upsert_article_form.slug_control.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      rules={{ validate: createSlugValidator(t, id) }}
    />
  );
};
