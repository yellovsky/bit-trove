// global modules
import { Controller } from 'react-hook-form';
import type { FC } from 'react';
import type { UpsertPermissionPolicyFP } from '@repo/api-models';
import { useTranslation } from 'react-i18next';

// common modules
import { Button } from '~/components/button';
import { ReactFormTextareaControl } from '~/components/form-controls/react-form-textarea-control';
import { ReactFormTextControl } from '~/components/form-controls/react-form-text-control';
import { useReactForm } from '~/utils/react-form';

// local modules
import type { CommonFormProps } from '../forms.types';
import { upsertPermissionPolicyFPSchema } from './permission-policy-form.schema';

interface PermissionPolicyFormProps extends CommonFormProps<UpsertPermissionPolicyFP> {}

export const PermissionPolicyForm: FC<PermissionPolicyFormProps> = props => {
  const { t: cmsT } = useTranslation('cms');

  const [handleSubmit, { control, formState }] = useReactForm<UpsertPermissionPolicyFP>(
    upsertPermissionPolicyFPSchema,
    props.onSubmit,
    { defaultValues: props.defaultValues },
  );

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Controller
        control={control}
        name="sub"
        render={fieldsState => (
          <ReactFormTextControl
            {...fieldsState}
            required
            inputProps={{
              disabled: props.disabled || formState.isSubmitting,
              placeholder: cmsT('ENTER_TEXT_PLACEHOLDER'),
            }}
            label={cmsT('Subject')}
          />
        )}
      />

      <Controller
        control={control}
        name="act"
        render={fieldsState => (
          <ReactFormTextControl
            {...fieldsState}
            required
            inputProps={{
              disabled: props.disabled || formState.isSubmitting,
              placeholder: cmsT('ENTER_TEXT_PLACEHOLDER'),
            }}
            label={cmsT('Action')}
          />
        )}
      />

      <Controller
        control={control}
        name="obj_type"
        render={fieldsState => (
          <ReactFormTextControl
            {...fieldsState}
            required
            inputProps={{
              disabled: props.disabled || formState.isSubmitting,
              placeholder: cmsT('ENTER_TEXT_PLACEHOLDER'),
            }}
            label={cmsT('Obj. Type')}
          />
        )}
      />

      <Controller
        control={control}
        name="cond"
        render={fieldsState => (
          <ReactFormTextControl
            {...fieldsState}
            required
            inputProps={{
              disabled: props.disabled || formState.isSubmitting,
              placeholder: cmsT('ENTER_TEXT_PLACEHOLDER'),
            }}
            label={cmsT('Condition')}
          />
        )}
      />

      <Controller
        control={control}
        name="note"
        render={fieldsState => (
          <ReactFormTextareaControl
            {...fieldsState}
            inputProps={{
              disabled: props.disabled || formState.isSubmitting,
              placeholder: cmsT('ENTER_TEXT_PLACEHOLDER'),
            }}
            label={cmsT('Note')}
          />
        )}
      />

      <Button
        fullwidth
        disabled={props.disabled || formState.isSubmitting}
        type="submit"
        variant="filled"
      >
        {cmsT('Save')}
      </Button>
    </form>
  );
};
