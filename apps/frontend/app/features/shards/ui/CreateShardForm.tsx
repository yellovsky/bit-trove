import { Button, Fieldset, InputDescription, InputLabel, Select, SimpleGrid, Switch, TextInput } from '@mantine/core';
import type { ChangeEvent } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { failedResponseSchema, type Shard } from '@repo/api-models';

import { getApiClient } from '@shared/lib/api-client';

import { Editor, useEditor } from '@widgets/editor';

import type { CreateShardVariables } from '@entities/shards/api/create-shard';

import { checkShardSlugAvailability } from '../api/check-shard-slug-availability';

const useValidateTitle = () => {
  const { t } = useTranslation();
  return async (title: string) => (!title ? t('error.field_is_required.text') : undefined);
};

const useValidateSlug = (id: string | undefined) => {
  const { t } = useTranslation();

  return async (slug: string) => {
    if (!slug) return t('error.field_is_required.text');

    try {
      const response = await checkShardSlugAvailability(getApiClient())(slug);
      return response.data.available || response.data.takenBy === id ? undefined : 'Slug is already taken';
    } catch {
      return 'Can not check slug availability';
    }
  };
};

const getDefaultValues = (languageCode: string): CreateShardVariables => ({
  contentJSON: {},
  entryId: '',
  languageCode,
  published: false,
  seoDescription: '',
  seoKeywords: '',
  seoTitle: '',
  shortDescription: '',
  slug: '',
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

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<CreateShardVariables>({ defaultValues, mode: 'onChange', reValidateMode: 'onChange' });

  const editor = useEditor({
    content: defaultValues.contentJSON,
    onUpdate: ({ editor }) => setValue('contentJSON', editor.getJSON()),
  });

  const submitHandler: SubmitHandler<CreateShardVariables> = async (data) => {
    try {
      const shard = await await props.onSubmit(data);
      props.onSuccess?.(shard);
    } catch (err) {
      const { data } = await failedResponseSchema.safeParseAsync(err);
      if (!data) return t('error.unknown_error.text');
      setError('root', { message: data.error.message });
    }
  };

  const validateTitle = useValidateTitle();
  const validateSlug = useValidateSlug(props.id);

  return (
    <>
      <form noValidate onSubmit={handleSubmit(submitHandler)}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextInput
              {...field}
              aria-label={tShards('upsert_shard_form.title.aria_label')}
              description={tShards('upsert_shard_form.title.description')}
              disabled={props.isLoading}
              error={errors.title?.message}
              label={tShards('upsert_shard_form.title.label')}
              placeholder={tShards('upsert_shard_form.title.placeholder')}
              required
            />
          )}
          rules={{ validate: validateTitle }}
        />

        <SimpleGrid cols={2}>
          <Controller
            control={control}
            name="slug"
            render={({ field }) => (
              <TextInput
                {...field}
                aria-label={tShards('upsert_shard_form.slug.aria_label')}
                description={tShards('upsert_shard_form.slug.description')}
                disabled={props.isLoading}
                error={errors.slug?.message}
                label={tShards('upsert_shard_form.slug.label')}
                mt="md"
                placeholder="Shard slug"
                required
              />
            )}
            rules={{ validate: validateSlug }}
          />

          <Controller
            control={control}
            name="languageCode"
            render={({ field }) => (
              <Select
                aria-label={tShards('upsert_shard_form.language_code.aria_label')}
                data={[
                  { label: 'English', value: 'en' },
                  { label: 'Русский', value: 'ru' },
                ]}
                description={tShards('upsert_shard_form.language_code.description')}
                disabled={props.isLoading}
                error={errors.languageCode?.message}
                label={tShards('upsert_shard_form.language_code.label')}
                mt="md"
                placeholder={tShards('upsert_shard_form.language_code.placeholder')}
                required
                {...field}
              />
            )}
          />
        </SimpleGrid>

        <Controller
          control={control}
          name="shortDescription"
          render={({ field }) => (
            <TextInput
              {...field}
              aria-label={tShards('upsert_shard_form.short_description.aria_label')}
              description={tShards('upsert_shard_form.short_description.description')}
              disabled={props.isLoading}
              error={errors.shortDescription?.message}
              label={tShards('upsert_shard_form.short_description.label')}
              mt="md"
              onBlur={(e) => {
                field.onChange(nullableStringTransform.output(e));
                return field.onBlur();
              }}
              placeholder={tShards('upsert_shard_form.short_description.placeholder')}
              required
              value={nullableStringTransform.input(field.value)}
            />
          )}
        />

        <Fieldset legend="SEO" mt="lg" radius="md" variant="filled">
          <Controller
            control={control}
            name="seoTitle"
            render={({ field }) => (
              <TextInput
                {...field}
                aria-label={tShards('upsert_shard_form.seo_title.aria_label')}
                description={tShards('upsert_shard_form.seo_title.description')}
                disabled={props.isLoading}
                error={errors.seoTitle?.message}
                label={tShards('upsert_shard_form.seo_title.label')}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tShards('upsert_shard_form.seo_title.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            )}
          />

          <Controller
            control={control}
            name="seoDescription"
            render={({ field }) => (
              <TextInput
                {...field}
                aria-label={tShards('upsert_shard_form.seo_description.aria_label')}
                description={tShards('upsert_shard_form.seo_description.description')}
                disabled={props.isLoading}
                error={errors.seoDescription?.message}
                label={tShards('upsert_shard_form.seo_description.label')}
                mt="md"
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tShards('upsert_shard_form.seo_description.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            )}
          />

          <Controller
            control={control}
            name="seoKeywords"
            render={({ field }) => (
              <TextInput
                {...field}
                aria-label={tShards('upsert_shard_form.seo_keywords.aria_label')}
                description={tShards('upsert_shard_form.seo_keywords.description')}
                disabled={props.isLoading}
                error={errors.seoKeywords?.message}
                label={tShards('upsert_shard_form.seo_keywords.label')}
                mt="md"
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tShards('upsert_shard_form.seo_keywords.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            )}
          />
        </Fieldset>

        <Controller
          control={control}
          name="published"
          render={({ field: { value, ...rest } }) => (
            <Switch
              {...rest}
              aria-label={tShards('upsert_shard_form.published.aria_label')}
              checked={value}
              description={tShards('upsert_shard_form.published.description')}
              disabled={props.isLoading}
              label={tShards('upsert_shard_form.published.label')}
              mt="md"
            />
          )}
        />

        <InputLabel>{tShards('upsert_shard_form.content.label')}</InputLabel>
        <InputDescription mb="xs">{tShards('upsert_shard_form.content.description')}</InputDescription>
        {!editor ? null : <Editor editor={editor} mih={400} variant="subtle" />}

        <Button fullWidth mt="md" type="submit">
          {props.mode === 'create'
            ? tShards('create_shard_form.submit_button.text')
            : tShards('edit_shard_form.submit_button.text')}
        </Button>
      </form>
    </>
  );
};
