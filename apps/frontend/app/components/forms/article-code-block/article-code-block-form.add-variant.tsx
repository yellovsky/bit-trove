// global modules
import type { CodeBlockVariant } from '@repo/api-models';
import { Controller } from 'react-hook-form';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// common modules
import { Button } from '~/components/button';
import { ReactFormTextareaControl } from '~/components/form-controls/react-form-textarea-control';
import { ReactFormTextControl } from '~/components/form-controls/react-form-text-control';
import { useReactForm } from '~/utils/react-form';

// local modules
import { codeBlockVariantSchema } from './article-code-block-form.schema';
import { DEFAULT_CODE_BLOCK_VARIANT } from './article-code-block-form.constants';
import { twoCols as twoColsCn } from './article-code-block-form.module.scss';

interface AddArticleCodeBlockFormVariantFormProps {
  onSubmit(variant: CodeBlockVariant): void;
}

export const AddArticleCodeBlockFormVariantForm: FC<
  AddArticleCodeBlockFormVariantFormProps
> = props => {
  const { t: cmsT } = useTranslation('cms');

  const [handleSubmit, { control }] = useReactForm<CodeBlockVariant>(
    codeBlockVariantSchema,
    props.onSubmit,
    { defaultValues: DEFAULT_CODE_BLOCK_VARIANT },
  );

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <div className={twoColsCn}>
          <Controller
            control={control}
            name="language"
            render={fieldsState => (
              <ReactFormTextControl
                {...fieldsState}
                required
                inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
                label={cmsT('Programming language')}
              />
            )}
          />
          <Controller
            control={control}
            name="label"
            render={fieldsState => (
              <ReactFormTextControl
                {...fieldsState}
                inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
                label={cmsT('Code label')}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="filename"
          render={fieldsState => (
            <ReactFormTextControl
              {...fieldsState}
              inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
              label={cmsT('Code filename')}
            />
          )}
        />

        <Controller
          control={control}
          name="text"
          render={fieldsState => (
            <ReactFormTextareaControl
              {...fieldsState}
              required
              inputProps={{ placeholder: cmsT('ENTER_TEXT_PLACEHOLDER') }}
              label={cmsT('Code text')}
            />
          )}
        />

        <Button fullwidth type="submit" variant="filled">
          {cmsT('Add')}
        </Button>
      </form>
    </>
  );
};
