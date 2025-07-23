import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/Form';
import { TextInput } from '@repo/ui/components/TextInput';

import type { ControlProps } from '../types';
import { nullableStringTransform } from '../utils/form-utils';

export const ShortDescriptionController: FC<ControlProps> = ({ control }) => {
  const { t: tCmsArticles } = useTranslation('cms_articles');

  return (
    <FormField
      control={control}
      name="shortDescription"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tCmsArticles('upsert_article_form.short_description_control.label')}</FormLabel>
          <FormControl>
            <TextInput
              {...field}
              aria-label={tCmsArticles('upsert_article_form.short_description_control.aria_label')}
              disabled={formState.isSubmitting}
              onBlur={(e) => {
                field.onChange(nullableStringTransform.output(e));
                return field.onBlur();
              }}
              placeholder={tCmsArticles('upsert_article_form.short_description_control.placeholder')}
              value={nullableStringTransform.input(field.value)}
            />
          </FormControl>
          <FormDescription>{tCmsArticles('upsert_article_form.short_description_control.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
