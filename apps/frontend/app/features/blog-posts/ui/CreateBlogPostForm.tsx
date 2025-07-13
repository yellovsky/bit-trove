import type { Editor as TiptapEditor } from '@tiptap/react';
import type { ChangeEvent, FC } from 'react';
import { type Control, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type ArticleUpsertBody, type BlogPost, failedResponseSchema } from '@repo/api-models';
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

import { checkBlogPostSlugAvailability } from '@entities/blog-posts';

export type UpsertBlogPostVariables = Omit<ArticleUpsertBody, 'type'>;

interface ControlProps {
  control: Control<UpsertBlogPostVariables>;
}

const PublishController: FC<ControlProps> = ({ control }) => {
  const { t: tBlogPosts } = useTranslation('blog_posts');

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
              <FormLabel>{tBlogPosts('upsert_blog_post_form.published.label')}</FormLabel>
              <FormDescription>{tBlogPosts('upsert_blog_post_form.published.description')}</FormDescription>
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
  const { t: tBlogPosts } = useTranslation('blog_posts');

  const validateTitle = async (title: string) => (!title ? t('error.field_is_required.text') : undefined);

  return (
    <FormField
      control={control}
      name="title"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tBlogPosts('upsert_blog_post_form.title.label')}</FormLabel>
          <FormControl>
            <UiTextInput
              aria-label={tBlogPosts('upsert_blog_post_form.title.aria_label')}
              disabled={formState.isSubmitting}
              placeholder={tBlogPosts('upsert_blog_post_form.title.placeholder')}
              {...field}
            />
          </FormControl>
          <FormDescription>{tBlogPosts('upsert_blog_post_form.title.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      rules={{ validate: validateTitle }}
    />
  );
};

const SlugController: FC<ControlProps & { id?: string }> = ({ control, id }) => {
  const { t } = useTranslation();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  const validateSlug = async (slug: string) => {
    if (!slug) return t('error.field_is_required.text');

    try {
      const response = await checkBlogPostSlugAvailability(getApiClient())(slug);
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
          <FormLabel required>{tBlogPosts('upsert_blog_post_form.slug.label')}</FormLabel>
          <FormControl>
            <UiTextInput
              aria-label={tBlogPosts('upsert_blog_post_form.slug.aria_label')}
              disabled={formState.isSubmitting}
              placeholder={tBlogPosts('upsert_blog_post_form.slug.placeholder')}
              {...field}
            />
          </FormControl>
          <FormDescription>{tBlogPosts('upsert_blog_post_form.slug.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      rules={{ validate: validateSlug }}
    />
  );
};

const LanguageCodeController: FC<ControlProps> = ({ control }) => {
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return (
    <FormField
      control={control}
      name="languageCode"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tBlogPosts('upsert_blog_post_form.language_code.label')}</FormLabel>
          <FormControl>
            <UiSelect
              aria-label={tBlogPosts('upsert_blog_post_form.language_code.aria_label')}
              disabled={formState.isSubmitting}
              onOpenChange={(open) => {
                if (!open) field.onBlur();
              }}
              onValueChange={field.onChange}
              {...field}
            >
              <SelectTrigger aria-invalid={!!formState.errors.languageCode} className="w-full">
                <SelectValue placeholder={tBlogPosts('upsert_blog_post_form.language_code.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
              </SelectContent>
            </UiSelect>
          </FormControl>
          <FormDescription>{tBlogPosts('upsert_blog_post_form.language_code.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ShortDescriptionController: FC<ControlProps> = ({ control }) => {
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return (
    <FormField
      control={control}
      name="shortDescription"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tBlogPosts('upsert_blog_post_form.short_description.label')}</FormLabel>
          <FormControl>
            <UiTextInput
              {...field}
              aria-label={tBlogPosts('upsert_blog_post_form.short_description.aria_label')}
              disabled={formState.isSubmitting}
              onBlur={(e) => {
                field.onChange(nullableStringTransform.output(e));
                return field.onBlur();
              }}
              placeholder={tBlogPosts('upsert_blog_post_form.short_description.placeholder')}
              value={nullableStringTransform.input(field.value)}
            />
          </FormControl>
          <FormDescription>{tBlogPosts('upsert_blog_post_form.short_description.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SeoController: FC<ControlProps> = ({ control }) => {
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return (
    <UiFieldset legend="SEO" variant="filled">
      <FormField
        control={control}
        name="seoTitle"
        render={({ field, formState }) => (
          <FormItem className="mb-4">
            <FormLabel required>{tBlogPosts('upsert_blog_post_form.seo_title.label')}</FormLabel>
            <FormControl>
              <UiTextInput
                {...field}
                aria-label={tBlogPosts('upsert_blog_post_form.seo_title.aria_label')}
                disabled={formState.isSubmitting}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tBlogPosts('upsert_blog_post_form.seo_title.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            </FormControl>
            <FormDescription>{tBlogPosts('upsert_blog_post_form.seo_title.description')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="seoDescription"
        render={({ field, formState }) => (
          <FormItem className="mb-4">
            <FormLabel required>{tBlogPosts('upsert_blog_post_form.seo_description.label')}</FormLabel>
            <FormControl>
              <UiTextInput
                {...field}
                aria-label={tBlogPosts('upsert_blog_post_form.seo_description.aria_label')}
                disabled={formState.isSubmitting}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tBlogPosts('upsert_blog_post_form.seo_description.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            </FormControl>
            <FormDescription>{tBlogPosts('upsert_blog_post_form.seo_description.description')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="seoKeywords"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel required>{tBlogPosts('upsert_blog_post_form.seo_keywords.label')}</FormLabel>
            <FormControl>
              <UiTextInput
                {...field}
                aria-label={tBlogPosts('upsert_blog_post_form.seo_keywords.aria_label')}
                disabled={formState.isSubmitting}
                onBlur={(e) => {
                  field.onChange(nullableStringTransform.output(e));
                  return field.onBlur();
                }}
                placeholder={tBlogPosts('upsert_blog_post_form.seo_keywords.placeholder')}
                value={nullableStringTransform.input(field.value)}
              />
            </FormControl>
            <FormDescription>{tBlogPosts('upsert_blog_post_form.seo_keywords.description')}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </UiFieldset>
  );
};

const ContentController: FC<ControlProps & { editor: TiptapEditor | null }> = ({ control, editor }) => {
  const { t: tBlogPosts } = useTranslation('blog_posts');

  return (
    <FormField
      control={control}
      name="contentJSON"
      render={({ formState }) => (
        <FormItem>
          <FormLabel required>{tBlogPosts('upsert_blog_post_form.content.label')}</FormLabel>
          <FormControl>
            {!editor ? null : <Editor aria-disabled={formState.isSubmitting} editor={editor} />}
          </FormControl>
          <FormDescription>{tBlogPosts('upsert_blog_post_form.content.description')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const getDefaultValues = (languageCode: string): UpsertBlogPostVariables => ({
  contentJSON: [],
  entryId: null,
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

interface CreateBlogPostFormProps {
  isLoading?: boolean;
  onSubmit: (data: UpsertBlogPostVariables) => Promise<BlogPost>;
  onSuccess?: (data: BlogPost) => void;
  defaultValues?: UpsertBlogPostVariables;
  mode: 'create' | 'update';
  id?: string;
}

const nullableStringTransform = {
  input: (value: string | null) => value || '',
  output: (event: ChangeEvent<HTMLInputElement>): string | null => event.target.value.trim() || null,
};

export const CreateBlogPostForm: React.FC<CreateBlogPostFormProps> = (props) => {
  const { t, i18n } = useTranslation();
  const { t: tBlogPosts } = useTranslation('blog_posts');

  const defaultValues = props.defaultValues ?? getDefaultValues(i18n.language);
  const form = useForm<UpsertBlogPostVariables>({ defaultValues, mode: 'onChange', reValidateMode: 'onChange' });

  const editor = useEditor({
    content: defaultValues.contentJSON,
    onUpdate: ({ editor }) => form.setValue('contentJSON', editor.getJSON()),
  });

  const submitHandler: SubmitHandler<UpsertBlogPostVariables> = async (data) => {
    try {
      const blogPost = await props.onSubmit(data);
      props.onSuccess?.(blogPost);
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
            ? tBlogPosts('create_blog_post_form.submit_button.text')
            : tBlogPosts('edit_blog_post_form.submit_button.text')}
        </Button>
      </form>
    </UiForm>
  );
};
