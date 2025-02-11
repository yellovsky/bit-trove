// global modules
import type { ArticleCodeBlock } from '@repo/api-models';
import { Controller } from 'react-hook-form';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// common modules
import { Button } from '~/components/button';
import { ReactFormTextControl } from '~/components/form-controls/react-form-text-control';
import { useReactForm } from '~/utils/react-form';

// local modules
import { ArticleCodeBlockFormVariants } from './article-code-block-form.variant';
import { articleCodeBlockSchema } from './article-code-block-form.schema';

interface ArticleCodeBlockFormProps {
  defaultValues: ArticleCodeBlock;
  onSubmit(block: ArticleCodeBlock): void;
}

export const ArticleCodeBlockForm: FC<ArticleCodeBlockFormProps> = props => {
  const { t: cmsT } = useTranslation('cms');

  const [handleSubmit, { control }] = useReactForm<ArticleCodeBlock>(
    articleCodeBlockSchema,
    props.onSubmit,
    { defaultValues: props.defaultValues },
  );

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <Controller
          control={control}
          name="title"
          render={fieldsState => (
            <ReactFormTextControl
              {...fieldsState}
              required
              inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
              label={cmsT('TITLE_LABEL')}
            />
          )}
        />

        <Controller
          control={control}
          name="subtitle"
          render={fieldsState => (
            <ReactFormTextControl
              {...fieldsState}
              required
              inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
              label={cmsT('Subtitle')}
            />
          )}
        />

        <ArticleCodeBlockFormVariants control={control} />

        <Button fullwidth type="submit" variant="filled">
          {cmsT('Save')}
        </Button>
      </form>
    </div>
  );
};
