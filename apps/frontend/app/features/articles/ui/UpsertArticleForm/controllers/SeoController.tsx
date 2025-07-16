import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Fieldset as UiFieldset } from '@repo/ui/components/Fieldset';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/Form';
import { TextInput as UiTextInput } from '@repo/ui/components/TextInput';

import type { ControlProps } from '../types';
import { nullableStringTransform } from '../utils/form-utils';

export const SeoController: FC<ControlProps> = ({ control }) => {
  const { t: tCmsArticles } = useTranslation('cms_articles');

  return (
    <UiFieldset legend={tCmsArticles('upsert_article_form.seo_fieldset_title')}>
      <FormField
        control={control}
        name="seoTitle"
        render={({ field, formState }) => (
          <FormItem className="mb-4">
            <FormLabel required>{tCmsArticles('upsert_article_form.seo_title_control.label')}</FormLabel>
            <FormControl>
              <UiTextInput
                {...field}
                aria-label={tCmsArticles('upsert_article_form.seo_title_control.aria_label')}
                disabled={formState.isSubmitting}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tCmsArticles('upsert_article_form.seo_title_control.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            </FormControl>
            <FormDescription>{tCmsArticles('upsert_article_form.seo_title_control.description')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="seoDescription"
        render={({ field, formState }) => (
          <FormItem className="mb-4">
            <FormLabel required>{tCmsArticles('upsert_article_form.seo_description_control.label')}</FormLabel>
            <FormControl>
              <UiTextInput
                {...field}
                aria-label={tCmsArticles('upsert_article_form.seo_description_control.aria_label')}
                disabled={formState.isSubmitting}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tCmsArticles('upsert_article_form.seo_description_control.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            </FormControl>
            <FormDescription>{tCmsArticles('upsert_article_form.seo_description_control.description')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="seoKeywords"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel required>{tCmsArticles('upsert_article_form.seo_keywords_control.label')}</FormLabel>
            <FormControl>
              <UiTextInput
                {...field}
                aria-label={tCmsArticles('upsert_article_form.seo_keywords_control.aria_label')}
                disabled={formState.isSubmitting}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tCmsArticles('upsert_article_form.seo_keywords_control.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            </FormControl>
            <FormDescription>{tCmsArticles('upsert_article_form.seo_keywords_control.description')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </UiFieldset>
  );
};
