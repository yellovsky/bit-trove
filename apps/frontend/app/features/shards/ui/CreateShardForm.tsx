import type { Editor as TiptapEditor } from '@tiptap/react';
import type { ChangeEvent, FC } from 'react';
import { type Control, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { failedResponseSchema, type Shard } from '@repo/api-models';
import { Button } from '@repo/ui/components/Button';
import { Fieldset as UiFieldset } from '@repo/ui/components/Fieldset';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as UiForm,
} from '@repo/ui/components/Form';
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as UiSelect } from '@repo/ui/components/Select';
import { Switch as UISwitch } from '@repo/ui/components/Switch';
import { TextInput as UiTextInput } from '@repo/ui/components/TextInput';

import { getApiClient } from '@shared/lib/api-client';

import { Editor, useEditor } from '@widgets/editor';

import type { CreateShardVariables } from '@entities/shards/api/create-shard';

import { checkShardSlugAvailability } from '../api/check-shard-slug-availability';

interface ControlProps {
  control: Control<CreateShardVariables>;
}

const PublishController: FC<ControlProps> = ({ control }) => {
  const { t: tShards } = useTranslation('shards');

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
              <FormLabel>{tShards('upsert_shard_form.published.label')}</FormLabel>
              <FormDescription>{tShards('upsert_shard_form.published.description')}</FormDescription>
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

const TitleController: FC<ControlProps> = ({ control }) => {
  const { t } = useTranslation();
  const { t: tShards } = useTranslation('shards');

  const validateTitle = async (title: string) => (!title ? t('error.field_is_required.text') : undefined);

  return (
    <FormField
      control={control}
      name="title"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tShards('upsert_shard_form.title.label')}</FormLabel>
          <FormControl>
            <UiTextInput
              aria-label={tShards('upsert_shard_form.title.aria_label')}
              disabled={formState.isSubmitting}
              placeholder={tShards('upsert_shard_form.title.placeholder')}
              {...field}
            />
          </FormControl>
          <FormDescription>{tShards('upsert_shard_form.title.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      rules={{ validate: validateTitle }}
    />
  );
};

const SlugController: FC<ControlProps & { id: string | undefined }> = ({ control, id }) => {
  const { t } = useTranslation();
  const { t: tShards } = useTranslation('shards');

  const validateSlug = async (slug: string) => {
    if (!slug) return t('error.field_is_required.text');

    try {
      const response = await checkShardSlugAvailability(getApiClient())(slug);
      return response.data.available || response.data.takenBy === id ? undefined : 'Slug is already taken';
    } catch {
      return 'Can not check slug availability';
    }
  };

  return (
    <FormField
      control={control}
      name="slug"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tShards('upsert_shard_form.slug.label')}</FormLabel>
          <FormControl>
            <UiTextInput
              aria-label={tShards('upsert_shard_form.slug.aria_label')}
              disabled={formState.isSubmitting}
              placeholder={tShards('upsert_shard_form.slug.placeholder')}
              {...field}
            />
          </FormControl>
          <FormDescription>{tShards('upsert_shard_form.slug.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      rules={{ validate: validateSlug }}
    />
  );
};

const LanguageCodeController: FC<ControlProps> = ({ control }) => {
  const { t: tShards } = useTranslation('shards');

  return (
    <FormField
      control={control}
      name="languageCode"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tShards('upsert_shard_form.language_code.label')}</FormLabel>
          <FormControl>
            <UiSelect
              aria-label={tShards('upsert_shard_form.language_code.aria_label')}
              disabled={formState.isSubmitting}
              onOpenChange={(open) => {
                if (!open) field.onBlur();
              }}
              onValueChange={field.onChange}
              {...field}
            >
              <SelectTrigger aria-invalid={!!formState.errors.languageCode} className="w-full">
                <SelectValue placeholder={tShards('upsert_shard_form.language_code.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
              </SelectContent>
            </UiSelect>
          </FormControl>
          <FormDescription>{tShards('upsert_shard_form.language_code.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ShortDescriptionController: FC<ControlProps> = ({ control }) => {
  const { t: tShards } = useTranslation('shards');

  return (
    <FormField
      control={control}
      name="shortDescription"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tShards('upsert_shard_form.short_description.label')}</FormLabel>
          <FormControl>
            <UiTextInput
              {...field}
              aria-label={tShards('upsert_shard_form.short_description.aria_label')}
              disabled={formState.isSubmitting}
              onBlur={(e) => {
                field.onChange(nullableStringTransform.output(e));
                return field.onBlur();
              }}
              placeholder={tShards('upsert_shard_form.short_description.placeholder')}
              value={nullableStringTransform.input(field.value)}
            />
          </FormControl>
          <FormDescription>{tShards('upsert_shard_form.short_description.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const TagsController: FC<ControlProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <UiTextInput {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SeoController: FC<ControlProps> = ({ control }) => {
  const { t: tShards } = useTranslation('shards');

  return (
    <UiFieldset legend="SEO" variant="filled">
      <FormField
        control={control}
        name="seoTitle"
        render={({ field, formState }) => (
          <FormItem className="mb-4">
            <FormLabel required>{tShards('upsert_shard_form.seo_title.label')}</FormLabel>
            <FormControl>
              <UiTextInput
                {...field}
                aria-label={tShards('upsert_shard_form.seo_title.aria_label')}
                disabled={formState.isSubmitting}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tShards('upsert_shard_form.seo_title.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            </FormControl>
            <FormDescription>{tShards('upsert_shard_form.seo_title.description')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="seoDescription"
        render={({ field, formState }) => (
          <FormItem className="mb-4">
            <FormLabel required>{tShards('upsert_shard_form.seo_description.label')}</FormLabel>
            <FormControl>
              <UiTextInput
                {...field}
                aria-label={tShards('upsert_shard_form.seo_description.aria_label')}
                disabled={formState.isSubmitting}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tShards('upsert_shard_form.seo_description.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            </FormControl>
            <FormDescription>{tShards('upsert_shard_form.seo_description.description')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="seoKeywords"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel required>{tShards('upsert_shard_form.seo_keywords.label')}</FormLabel>
            <FormControl>
              <UiTextInput
                {...field}
                aria-label={tShards('upsert_shard_form.seo_keywords.aria_label')}
                disabled={formState.isSubmitting}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tShards('upsert_shard_form.seo_keywords.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            </FormControl>
            <FormDescription>{tShards('upsert_shard_form.seo_keywords.description')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </UiFieldset>
  );
};

const ContentController: FC<ControlProps & { editor: TiptapEditor | null }> = ({ control, editor }) => {
  const { t: tShards } = useTranslation('shards');

  return (
    <FormField
      control={control}
      name="seoKeywords"
      render={({ formState }) => (
        <FormItem>
          <FormLabel required>{tShards('upsert_shard_form.content.label')}</FormLabel>
          <FormControl>
            {!editor ? null : <Editor aria-disabled={formState.isSubmitting} editor={editor} />}
          </FormControl>
          <FormDescription>{tShards('upsert_shard_form.content.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const getDefaultValues = (languageCode: string): CreateShardVariables => ({
  contentJSON: { content: [], type: 'doc' },
  entryId: '',
  languageCode,
  published: false,
  seoDescription: '',
  seoKeywords: '',
  seoTitle: '',
  shortDescription: '',
  slug: '',
  tags: [],
  title: '',
});

interface CreateShardFormProps {
  isLoading?: boolean;
  onSubmit: (data: CreateShardVariables) => Promise<Shard>;
  onSuccess?: (data: Shard) => void;
  defaultValues?: CreateShardVariables;
  mode: 'create' | 'update';
  id?: string;
}

const nullableStringTransform = {
  input: (value: string | null) => value || '',
  output: (event: ChangeEvent<HTMLInputElement>): string | null => event.target.value.trim() || null,
};

export const CreateShardForm: React.FC<CreateShardFormProps> = (props) => {
  const { t, i18n } = useTranslation();
  const { t: tShards } = useTranslation('shards');

  const defaultValues = props.defaultValues ?? getDefaultValues(i18n.language);
  const form = useForm<CreateShardVariables>({ defaultValues, mode: 'onChange', reValidateMode: 'onChange' });

  const editor = useEditor({
    content: defaultValues.contentJSON,
    onUpdate: ({ editor }) => form.setValue('contentJSON', editor.getJSON()),
  });

  const submitHandler: SubmitHandler<CreateShardVariables> = async (data) => {
    try {
      const shard = await await props.onSubmit(data);
      props.onSuccess?.(shard);
    } catch (err) {
      const { data } = await failedResponseSchema.safeParseAsync(err);
      if (!data) return t('error.unknown_error.text');
      form.setError('root', { message: data.error.message });
    }
  };

  return (
    <UiForm {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(submitHandler)}>
        <TitleController control={form.control} />
        <TagsController control={form.control} />
        <PublishController control={form.control} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <SlugController control={form.control} id={props.id} />
          </div>
          <div>
            <LanguageCodeController control={form.control} />
          </div>
        </div>

        <ShortDescriptionController control={form.control} />
        <SeoController control={form.control} />
        <ContentController control={form.control} editor={editor} />

        <Button className="block w-full" type="submit">
          {props.mode === 'create'
            ? tShards('create_shard_form.submit_button.text')
            : tShards('edit_shard_form.submit_button.text')}
        </Button>
      </form>
    </UiForm>
  );
};
