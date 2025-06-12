import { Button, Fieldset, InputDescription, InputLabel, Select, SimpleGrid, Switch, TextInput } from '@mantine/core';
import type { ChangeEvent } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { failedResponseSchema, type Thought } from '@repo/api-models';

import { getApiClient } from '@shared/lib/api-client';

import { Editor, useEditor } from '@widgets/editor';

import type { CreateThoughtVariables } from '@entities/thoughts/api/create-thought';

import { checkThoughtSlugAvailability } from '../api/check-thought-slug-availability';

const useValidateTitle = () => {
  const { t } = useTranslation();
  return async (title: string) => (!title ? t('error.field_is_required.text') : undefined);
};

const useValidateSlug = () => {
  const { t } = useTranslation();

  return async (slug: string) => {
    if (!slug) return t('error.field_is_required.text');

    try {
      const response = await checkThoughtSlugAvailability(getApiClient())(slug);
      return response.data.available ? undefined : 'Slug is already taken';
    } catch {
      return 'Can not check slug availability';
    }
  };
};

const getDefaultValues = (languageCode: string): CreateThoughtVariables => ({
  contentJSON: {},
  languageCode,
  published: false,
  seoDescription: '',
  seoKeywords: '',
  seoTitle: '',
  shortDescription: '',
  slug: '',
  thoughtId: '',
  title: '',
});

interface CreateThoughtFormProps {
  isLoading?: boolean;
  onSubmit: (data: CreateThoughtVariables) => Promise<Thought>;
  onSuccess?: (data: Thought) => void;
  defaultValues?: CreateThoughtVariables;
  mode: 'create' | 'update';
}

const nullableStringTransform = {
  input: (value: string | null) => value || '',
  output: (event: ChangeEvent<HTMLInputElement>): string | null => event.target.value.trim() || null,
};

export const CreateThoughtForm: React.FC<CreateThoughtFormProps> = (props) => {
  const { t, i18n } = useTranslation();
  const { t: tThoughts } = useTranslation('thoughts');
  const defaultValues = props.defaultValues ?? getDefaultValues(i18n.language);

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<CreateThoughtVariables>({ defaultValues, mode: 'onChange', reValidateMode: 'onChange' });

  const editor = useEditor({
    onUpdate: ({ editor }) => setValue('contentJSON', editor.getJSON()),
  });

  const submitHandler: SubmitHandler<CreateThoughtVariables> = async (data) => {
    try {
      const thought = await await props.onSubmit(data);
      props.onSuccess?.(thought);
    } catch (err) {
      const { data } = await failedResponseSchema.safeParseAsync(err);
      if (!data) return t('error.unknown_error.text');
      setError('root', { message: data.error.message });
    }
  };

  const validateTitle = useValidateTitle();
  const validateSlug = useValidateSlug();

  return (
    <>
      <form noValidate onSubmit={handleSubmit(submitHandler)}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextInput
              {...field}
              aria-label={tThoughts('upsert_thought_form.title.aria_label')}
              description={tThoughts('upsert_thought_form.title.description')}
              disabled={props.isLoading}
              error={errors.title?.message}
              label={tThoughts('upsert_thought_form.title.label')}
              placeholder={tThoughts('upsert_thought_form.title.placeholder')}
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
                aria-label={tThoughts('upsert_thought_form.slug.aria_label')}
                description={tThoughts('upsert_thought_form.slug.description')}
                disabled={props.isLoading}
                error={errors.slug?.message}
                label={tThoughts('upsert_thought_form.slug.label')}
                mt="md"
                placeholder="Thought slug"
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
                aria-label={tThoughts('upsert_thought_form.language_code.aria_label')}
                data={[
                  { label: 'English', value: 'en' },
                  { label: 'Русский', value: 'ru' },
                ]}
                description={tThoughts('upsert_thought_form.language_code.description')}
                disabled={props.isLoading}
                error={errors.languageCode?.message}
                label={tThoughts('upsert_thought_form.language_code.label')}
                mt="md"
                placeholder={tThoughts('upsert_thought_form.language_code.placeholder')}
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
              aria-label={tThoughts('upsert_thought_form.short_description.aria_label')}
              description={tThoughts('upsert_thought_form.short_description.description')}
              disabled={props.isLoading}
              error={errors.shortDescription?.message}
              label={tThoughts('upsert_thought_form.short_description.label')}
              mt="md"
              onBlur={(e) => {
                field.onChange(nullableStringTransform.output(e));
                return field.onBlur();
              }}
              placeholder={tThoughts('upsert_thought_form.short_description.placeholder')}
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
                aria-label={tThoughts('upsert_thought_form.seo_title.aria_label')}
                description={tThoughts('upsert_thought_form.seo_title.description')}
                disabled={props.isLoading}
                error={errors.seoTitle?.message}
                label={tThoughts('upsert_thought_form.seo_title.label')}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tThoughts('upsert_thought_form.seo_title.placeholder')}
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
                aria-label={tThoughts('upsert_thought_form.seo_description.aria_label')}
                description={tThoughts('upsert_thought_form.seo_description.description')}
                disabled={props.isLoading}
                error={errors.seoDescription?.message}
                label={tThoughts('upsert_thought_form.seo_description.label')}
                mt="md"
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tThoughts('upsert_thought_form.seo_description.placeholder')}
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
                aria-label={tThoughts('upsert_thought_form.seo_keywords.aria_label')}
                description={tThoughts('upsert_thought_form.seo_keywords.description')}
                disabled={props.isLoading}
                error={errors.seoKeywords?.message}
                label={tThoughts('upsert_thought_form.seo_keywords.label')}
                mt="md"
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tThoughts('upsert_thought_form.seo_keywords.placeholder')}
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
              aria-label={tThoughts('upsert_thought_form.published.aria_label')}
              checked={value}
              description={tThoughts('upsert_thought_form.published.description')}
              disabled={props.isLoading}
              label={tThoughts('upsert_thought_form.published.label')}
              mt="md"
            />
          )}
        />

        <InputLabel>{tThoughts('upsert_thought_form.content.label')}</InputLabel>
        <InputDescription mb="xs">{tThoughts('upsert_thought_form.content.description')}</InputDescription>
        {!editor ? null : <Editor editor={editor} mih={400} variant="subtle" />}

        <Button fullWidth mt="md" type="submit">
          {props.mode === 'create'
            ? tThoughts('create_thought_form.submit_button.text')
            : tThoughts('update_thought_form.submit_button.text')}
        </Button>
      </form>
    </>
  );
};
