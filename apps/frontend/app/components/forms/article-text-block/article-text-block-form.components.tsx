// global modules
import * as zod from 'zod';
import type { ArticleTextBlock } from '@repo/api-models';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { type FC, useCallback, useState } from 'react';

// common modules
import { Button } from '~/components/button';
import { ReactFormTextareaControl } from '~/components/form-controls/react-form-textarea-control';
import { ReactFormTextControl } from '~/components/form-controls/react-form-text-control';
import { useReactForm } from '~/utils/react-form';

// local modules
import { types as typesCn } from './article-text-block-form.module.scss';

export const articleTextBlockSchema: zod.ZodType<ArticleTextBlock> = zod.object({
  subtitle: zod.string().nullable(),
  title: zod.string().nullable(),
  type: zod.literal('text'),

  content: zod.object({
    text: zod.string().min(1),
    type: zod.union([zod.literal('md'), zod.literal('html')]),
  }),
});

export const DEFAULT_TEXT_BLOCK: ArticleTextBlock = {
  content: { text: '', type: 'md' },
  subtitle: null,
  title: null,
  type: 'text',
} as const;

interface ArticleTextBlockFormProps {
  defaultValues: ArticleTextBlock;
  onSubmit(block: ArticleTextBlock): void;
}

export const ArticleTextBlockForm: FC<ArticleTextBlockFormProps> = props => {
  const [type, updateType] = useState<'md' | 'html'>('md');
  const selectHTML = useCallback(() => updateType('html'), []);
  const selectMD = useCallback(() => updateType('md'), []);

  const { t: cmsT } = useTranslation('cms');
  const [handleSubmit, { control }] = useReactForm<ArticleTextBlock>(
    articleTextBlockSchema,
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

        <div className={typesCn}>
          <Button fullwidth onClick={selectMD} variant={type === 'md' ? 'filled' : 'soft'}>
            {cmsT('Markdown *.md')}
          </Button>
          <Button fullwidth onClick={selectHTML} variant={type === 'html' ? 'filled' : 'soft'}>
            {cmsT('Markdown *.html')}
          </Button>
        </div>

        {type === 'md' ? (
          <Controller
            control={control}
            key="md"
            name="content.text"
            render={fieldsState => (
              <ReactFormTextareaControl
                {...fieldsState}
                required
                inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
                label={cmsT('Markdown *.md')}
              />
            )}
          />
        ) : (
          <Controller
            control={control}
            key="html"
            name="content.text"
            render={fieldsState => (
              <ReactFormTextareaControl
                {...fieldsState}
                required
                inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
                label={cmsT('Markdown *.html')}
              />
            )}
          />
        )}

        <Button fullwidth type="submit" variant="filled">
          {cmsT('Save')}
        </Button>
      </form>
    </div>
  );
};
