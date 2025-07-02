import { useAtom } from 'jotai';
import type { FC } from 'react';
import { type Control, type SubmitHandler, useForm, type Validate } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as zod from 'zod';

import { failedResponseSchema, type LoginWithEmailBody, type LoginWithEmailResponse } from '@repo/api-models';
import { Button } from '@repo/ui/components/Button';
import { Divider } from '@repo/ui/components/Divider';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form as UiForm } from '@repo/ui/components/Form';
import { Link } from '@repo/ui/components/Link';
import { TextInput } from '@repo/ui/components/TextInput';

import { signInMutationAtom } from '../model/sign-in-atom';
import { AuthForm } from './AuthForm';

interface SignInControlProps {
  control: Control<LoginWithEmailBody>;
}

const EmailController: FC<SignInControlProps> = ({ control }) => {
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const validateEmail: Validate<string, LoginWithEmailBody> = (value) => {
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
          <FormLabel required>{tAuth('sign_in_form.username_input.label')}</FormLabel>
          <FormControl>
            <TextInput
              aria-label={tAuth('sign_in_form.username_input.aria-label')}
              disabled={formState.isSubmitting}
              placeholder={tAuth('sign_in_form.username_input.placeholder')}
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

const PasswordController: FC<SignInControlProps> = ({ control }) => {
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const validatePassword: Validate<string, LoginWithEmailBody> = (value) => {
    if (!value) return t('error.field_is_required.text');
    return undefined;
  };

  return (
    <FormField
      control={control}
      name="password"
      render={({ field, formState }) => (
        <FormItem className="mt-4">
          <FormLabel required>{tAuth('sign_in_form.password_input.label')}</FormLabel>
          <FormControl>
            <TextInput
              aria-label={tAuth('sign_in_form.password_input.aria-label')}
              disabled={formState.isSubmitting}
              placeholder={tAuth('sign_in_form.password_input.placeholder')}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      rules={{ validate: validatePassword }}
    />
  );
};

interface SignInFormProps {
  onSuccess?: (response: LoginWithEmailResponse) => void;
  onForgotPassword?: () => void;
  onSignUpClick?: () => void;
}

export const SignInForm: FC<SignInFormProps> = ({ onSuccess, onForgotPassword, onSignUpClick }) => {
  const [{ mutateAsync }] = useAtom(signInMutationAtom);

  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const form = useForm<LoginWithEmailBody>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginWithEmailBody> = async (data) => {
    try {
      const response = await await mutateAsync(data);
      onSuccess?.(response);
    } catch (err) {
      const { data } = await failedResponseSchema.safeParseAsync(err);

      if (!data) return t('error.unknown_error.text');
      form.setError('root', { message: data.error.message });
    }
  };

  const footer = !onSignUpClick ? null : (
    <div className="mt-2 flex justify-center">
      <div className="text-sm">
        Don't have an account?{' '}
        <Link onClick={onSignUpClick} to="#">
          Create account
        </Link>
      </div>
    </div>
  );

  return (
    <AuthForm
      description={tAuth('sign_in_form.form_subtitle')}
      footer={footer}
      title={tAuth('sign_in_form.form_title')}
    >
      <UiForm {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <EmailController control={form.control} />
          <PasswordController control={form.control} />

          {form.formState.errors.root && (
            <div className="mt-2 text-destructive text-sm">{form.formState.errors.root.message}</div>
          )}

          <Divider className="mt-4" />

          <Button className="mt-4 w-full" type="submit">
            {tAuth('sign_in_form.submit_button.text')}
          </Button>

          {onForgotPassword && (
            <div className="text-end">
              <Link onClick={onForgotPassword} to="#">
                Forgot password?
              </Link>
            </div>
          )}
        </form>
      </UiForm>
    </AuthForm>
  );
};
