import type { FC } from 'react';
import { type Control, type SubmitHandler, useForm, type Validate } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as zod from 'zod';

import { Button } from '@repo/ui/components/Button';
import { Divider } from '@repo/ui/components/Divider';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form as UiForm } from '@repo/ui/components/Form';
import { Link } from '@repo/ui/components/Link';
import { TextInput } from '@repo/ui/components/TextInput';

import type { ResetPasswordFormData } from '../types';
import { AuthForm } from './AuthForm';

interface ForgotPasswordControlProps {
  control: Control<ResetPasswordFormData>;
}

const EmailController: FC<ForgotPasswordControlProps> = ({ control }) => {
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const validateEmail: Validate<string, ResetPasswordFormData> = (value) => {
    if (!value) return t('error.field_is_required.text');
    if (!zod.string().email().safeParse(value).success) return t('error.invalid_email.text');
    return undefined;
  };

  return (
    <FormField
      control={control}
      name="email"
      render={({ field, formState }) => (
        <FormItem>
          <FormLabel required>{tAuth('forgot_password_form.email_input.label')}</FormLabel>
          <FormControl>
            <TextInput
              aria-label={tAuth('forgot_password_form.email_input.aria-label')}
              disabled={formState.isSubmitting}
              placeholder={tAuth('forgot_password_form.email_input.placeholder')}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      rules={{ validate: validateEmail }}
    />
  );
};

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBackToSignIn?: () => void;
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ onSuccess, onBackToSignIn }) => {
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const form = useForm<ResetPasswordFormData>({
    defaultValues: { email: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async () => {
    try {
      // TODO: Implement forgot password
      onSuccess?.();
    } catch {
      form.setError('root', { message: t('error.unknown_error.text') });
    }
  };

  const footer = !onBackToSignIn ? null : (
    <div className="mt-2 flex justify-center">
      <div className="text-sm">
        Remember your password?{' '}
        <Link onClick={onBackToSignIn} to="#">
          Back to sign in
        </Link>
      </div>
    </div>
  );

  return (
    <AuthForm
      description={tAuth('forgot_password_form.form_subtitle')}
      footer={footer}
      title={tAuth('forgot_password_form.form_title')}
    >
      <UiForm {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <EmailController control={form.control} />

          {form.formState.errors.root && (
            <div className="mt-2 text-destructive text-sm">{form.formState.errors.root.message}</div>
          )}

          <Divider className="mt-4" />

          <Button className="mt-4 w-full" type="submit">
            {tAuth('forgot_password_form.submit_button.text')}
          </Button>
        </form>
      </UiForm>
    </AuthForm>
  );
};
