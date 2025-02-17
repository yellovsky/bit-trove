// global modules
import type { CMSTutorial } from '@repo/api-models';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// common modules
import { Button } from '~/components/button';
import { ErrorDivider } from '~/components/controls/error-divider';
import { useReactForm } from '~/utils/react-form';

// local modules
import { UpsertTutorialFormTranslations } from './upsert-tutorial.translations';
import { upsertTutorialFPSchema } from './upsert-tutorial.schema';

export const UPSERT_TUTORIAL_DEFAULT_VALUES: CMSTutorial = {
  original_language_code: '',
  translations: [],
} as const;

interface UpsertTutorialFormProps {
  defaultValues?: CMSTutorial;
  onSubmit(cmsTutorial: CMSTutorial): void;
}

export const UpsertTutorialForm: FC<UpsertTutorialFormProps> = props => {
  const { t: cmsT } = useTranslation('cms');

  const defaultValues = props.defaultValues || UPSERT_TUTORIAL_DEFAULT_VALUES;
  const [handleSubmit, { control, formState }] = useReactForm(
    upsertTutorialFPSchema,
    props.onSubmit,
    { defaultValues },
  );

  return (
    <form noValidate onSubmit={handleSubmit}>
      <UpsertTutorialFormTranslations control={control} />

      <ErrorDivider bottom={formState.errors.root?.message} minLines={1} />

      <div className="flex justify-end">
        <Button
          className="min-w-40"
          disabled={formState.isSubmitting}
          type="submit"
          variant="filled"
        >
          {cmsT('Save')}
        </Button>
      </div>
    </form>
  );
};
