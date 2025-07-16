import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/Form';
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as UiSelect } from '@repo/ui/components/Select';

import type { ControlProps } from '../types';

export const LanguageCodeController: FC<ControlProps> = ({ control }) => {
  const { t: tCmsArticles } = useTranslation('cms_articles');

  return (
    <FormField
      control={control}
      name="languageCode"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tCmsArticles('upsert_article_form.language_code_control.label')}</FormLabel>
          <FormControl>
            <UiSelect
              aria-label={tCmsArticles('upsert_article_form.language_code_control.aria_label')}
              disabled={formState.isSubmitting}
              onOpenChange={(open) => {
                if (!open) field.onBlur();
              }}
              onValueChange={field.onChange}
              {...field}
            >
              <SelectTrigger aria-invalid={!!formState.errors.languageCode} className="w-full">
                <SelectValue placeholder={tCmsArticles('upsert_article_form.language_code_control.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
              </SelectContent>
            </UiSelect>
          </FormControl>
          <FormDescription>{tCmsArticles('upsert_article_form.language_code_control.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
