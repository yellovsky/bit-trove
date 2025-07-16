import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { failedResponseSchema } from '@repo/api-models';
import { Button } from '@repo/ui/components/Button';
import { Form as UiForm } from '@repo/ui/components/Form';

import { useEditor } from '@widgets/editor';

import {
  ContentController,
  LanguageCodeController,
  PublishController,
  RelatedArticlesController,
  SeoController,
  ShortDescriptionController,
  SlugController,
  TagsController,
  TitleController,
} from './controllers';
import type { CreateArticleFormProps, UpsertArticleVariables } from './types';
import { getDefaultValues } from './utils/form-utils';

const UPSERT_ARTICLE_FORM_NAME = 'UpsertArticleForm';

const UpsertArticleForm: React.FC<CreateArticleFormProps> = (props) => {
  const { t, i18n } = useTranslation();
  const { t: tCmsArticles } = useTranslation('cms_articles');

  const defaultValues = props.defaultValues ?? getDefaultValues(i18n.language);
  const form = useForm<UpsertArticleVariables>({ defaultValues, mode: 'onChange', reValidateMode: 'onChange' });

  const editor = useEditor({
    content: defaultValues.contentJSON,
    onUpdate: ({ editor }) => form.setValue('contentJSON', editor.getJSON()),
  });

  const submitHandler = async (data: UpsertArticleVariables) => {
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
        <RelatedArticlesController control={form.control} />

        <ContentController control={form.control} editor={editor} />

        <Button className="block w-full" type="submit">
          {props.mode === 'create'
            ? tCmsArticles('upsert_article_form.submit_button.create')
            : tCmsArticles('upsert_article_form.submit_button.update')}
        </Button>
      </form>
    </UiForm>
  );
};

UpsertArticleForm.displayName = UPSERT_ARTICLE_FORM_NAME;

export { UpsertArticleForm };
export type { CreateArticleFormProps };
