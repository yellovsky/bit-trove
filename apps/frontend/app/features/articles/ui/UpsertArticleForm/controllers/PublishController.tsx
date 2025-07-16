import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Fieldset as UiFieldset } from '@repo/ui/components/Fieldset';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@repo/ui/components/Form';
import { Switch as UISwitch } from '@repo/ui/components/Switch';

import type { ControlProps } from '../types';

export const PublishController: FC<ControlProps> = ({ control }) => {
  const { t: tCmsArticles } = useTranslation('cms_articles');

  return (
    <FormField
      control={control}
      name="published"
      render={({ field, formState }) => (
        <FormItem>
          <UiFieldset
            className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
            variant="filled"
          >
            <div className="space-y-0.5">
              <FormLabel>{tCmsArticles('upsert_article_form.published_control.label')}</FormLabel>
              <FormDescription>{tCmsArticles('upsert_article_form.published_control.description')}</FormDescription>
            </div>
            <FormControl>
              <UISwitch checked={field.value} disabled={formState.isSubmitting} onCheckedChange={field.onChange} />
            </FormControl>
          </UiFieldset>
        </FormItem>
      )}
    />
  );
};
