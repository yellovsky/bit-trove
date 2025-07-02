import type { FC } from 'react';
import { type Control, type SubmitHandler, useForm, type Validate } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as zod from 'zod';

import { Button } from '@repo/ui/components/Button';
import { Checkbox } from '@repo/ui/components/Checkbox';
import { Divider } from '@repo/ui/components/Divider';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form as UiForm } from '@repo/ui/components/Form';
import { Link } from '@repo/ui/components/Link';
import { PasswordInput } from '@repo/ui/components/PasswordInput';
import { TextInput } from '@repo/ui/components/TextInput';

import type { SignUpFormData } from '../types';
import { AuthForm } from './AuthForm';

interface SignUpControlProps {
  control: Control<SignUpFormData>;
}

const EmailController: FC<SignUpControlProps> = ({ control }) => {
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const validateEmail: Validate<string, SignUpFormData> = (value) => {
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
          <FormLabel required>{tAuth('sign_up_form.email_input.label')}</FormLabel>
          <FormControl>
            <TextInput
              aria-label={tAuth('sign_up_form.email_input.aria-label')}
              disabled={formState.isSubmitting}
              placeholder={tAuth('sign_up_form.email_input.placeholder')}
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

const PasswordController: FC<SignUpControlProps> = ({ control }) => {
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const validatePassword: Validate<string, SignUpFormData> = (value) => {
    if (!value) return t('error.field_is_required.text');
    if (value.length < 6) return 'Password should be at least 6 characters';
    return undefined;
  };

  return (
    <FormField
      control={control}
      name="password"
      render={({ field, formState }) => (
        <FormItem className="mt-4">
          <FormLabel required>{tAuth('sign_up_form.password_input.label')}</FormLabel>
          <FormControl>
            <PasswordInput
              aria-label={tAuth('sign_up_form.password_input.aria-label')}
              disabled={formState.isSubmitting}
              placeholder={tAuth('sign_up_form.password_input.placeholder')}
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

const ConfirmPasswordController: FC<SignUpControlProps> = ({ control }) => {
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const validateConfirmPassword: Validate<string, SignUpFormData> = (value, formValues) => {
    if (!value) return t('error.field_is_required.text');
    if (value !== formValues.password) return 'Passwords do not match';
    return undefined;
  };

  return (
    <FormField
      control={control}
      name="confirmPassword"
      render={({ field, formState }) => (
        <FormItem className="mt-4">
          <FormLabel required>{tAuth('sign_up_form.confirm_password_input.label')}</FormLabel>
          <FormControl>
            <PasswordInput
              aria-label={tAuth('sign_up_form.confirm_password_input.aria-label')}
              disabled={formState.isSubmitting}
              placeholder={tAuth('sign_up_form.confirm_password_input.placeholder')}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      rules={{ validate: validateConfirmPassword }}
    />
  );
};

const AcceptTermsController: FC<SignUpControlProps> = ({ control }) => {
  const { t: tAuth } = useTranslation('auth');

  const validateAcceptTerms: Validate<boolean, SignUpFormData> = (value) => {
    if (!value) return tAuth('sign_up_form.accept_terms.error');
    return undefined;
  };

  return (
    <FormField
      control={control}
      name="acceptTerms"
      render={({ field, formState }) => (
        <FormItem className="mt-6">
          <FormControl>
            <Checkbox
              checked={field.value}
              disabled={formState.isSubmitting}
              label={
                <span className="text-sm">
                  {tAuth('sign_up_form.accept_terms.label')}{' '}
                  <Link target="_blank" to="#">
                    terms and conditions
                  </Link>
                </span>
              }
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      rules={{ validate: validateAcceptTerms }}
    />
  );
};

interface SignUpFormProps {
  onSuccess?: () => void;
  onSignInClick?: () => void;
}

export const SignUpForm: FC<SignUpFormProps> = ({ onSuccess, onSignInClick }) => {
  const { t } = useTranslation();
  const { t: tAuth } = useTranslation('auth');

  const form = useForm<SignUpFormData>({
    defaultValues: {
      acceptTerms: false,
      confirmPassword: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async () => {
    try {
      // TODO: Implement sign up
      onSuccess?.();
    } catch {
      form.setError('root', { message: t('error.unknown_error.text') });
    }
  };

  const footer = !onSignInClick ? null : (
    <div className="mt-2 flex justify-center">
      <div className="text-sm">
        Already have an account?{' '}
        <Link onClick={onSignInClick} to="#">
          Sign in
        </Link>
      </div>
    </div>
  );

  return (
    <AuthForm
      description={tAuth('sign_up_form.form_subtitle')}
      footer={footer}
      title={tAuth('sign_up_form.form_title')}
    >
      <UiForm {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <EmailController control={form.control} />
          <PasswordController control={form.control} />
          <ConfirmPasswordController control={form.control} />
          <AcceptTermsController control={form.control} />

          {form.formState.errors.root && (
            <div className="mt-2 text-destructive text-sm">{form.formState.errors.root.message}</div>
          )}

          <Divider className="mt-4" />

          <Button className="mt-4 w-full" type="submit">
            {tAuth('sign_up_form.submit_button.text')}
          </Button>
        </form>
      </UiForm>
    </AuthForm>
  );
};
