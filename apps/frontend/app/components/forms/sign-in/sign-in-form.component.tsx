// global modules
import * as zod from 'zod';
import { Controller } from 'react-hook-form';
import type { FC } from 'react';
import type { LoginWithEmailFP } from '@repo/api-models';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

// common modules
import { Button } from '~/components/button';
import { ErrorDivider } from '~/components/controls/error-divider';
import { ReactFormPasswordControl } from '~/components/form-controls/react-form-password-control';
import { ReactFormTextControl } from '~/components/form-controls/react-form-text-control';
import { useLoginWithEmailMutation } from '~/api/auth';
import { useReactFormWithMutation } from '~/utils/react-form';

const loginWithEmailFPSchema: zod.ZodType<LoginWithEmailFP> = zod.object({
  email: zod.string().email().min(1),
  password: zod.string().min(1),
});

const defaultValues: LoginWithEmailFP = { email: '', password: '' };

interface SignInFormProps {
  onSuccess?(): void;
}

export const SignInForm: FC<SignInFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();

  const [handleSubmit, { control, formState }] = useReactFormWithMutation({
    defaultValues,
    schema: loginWithEmailFPSchema,
    useMutation: useLoginWithEmailMutation,

    onMutationError: (methods, { error }) => {
      if (error.status_code === 401) {
        methods.setError('root', { message: t('incorrect email or password') });
      }
    },
    onMutationMutate: methods => methods.clearErrors('root'),
    onMutationSuccess: () => {
      toast.success(t('login success'));
      onSuccess?.();
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Controller
        control={control}
        name="email"
        render={fieldsState => (
          <ReactFormTextControl
            {...fieldsState}
            required
            inputProps={{
              autoComplete: 'username',
              placeholder: t('email placeholder'),
            }}
            label={t('email label')}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={fieldsState => (
          <ReactFormPasswordControl
            {...fieldsState}
            required
            inputProps={{
              autoComplete: 'password',
              placeholder: t('password placeholder'),
            }}
            label={t('password label')}
          />
        )}
      />

      <ErrorDivider bottom={formState.errors.root?.message} minLines={1} />

      <Button
        className={'w-full mt-3'}
        disabled={formState.isSubmitting}
        type="submit"
        variant="filled"
      >
        {t('login')}
      </Button>
    </form>
  );
};
