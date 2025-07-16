import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/Form';

import { Editor } from '@widgets/editor';

import type { ContentControllerProps } from '../types';

export const ContentController: FC<ContentControllerProps> = ({ control, editor }) => {
  const { t: tCmsArticles } = useTranslation('cms_articles');

  return (
    <FormField
      control={control}
      name="contentJSON"
      render={({ formState }) => (
        <FormItem>
          <FormLabel required>{tCmsArticles('upsert_article_form.content_control.label')}</FormLabel>
          <FormControl>
            {!editor ? null : <Editor aria-disabled={formState.isSubmitting} editor={editor} />}
          </FormControl>
          <FormDescription>{tCmsArticles('upsert_article_form.content_control.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
