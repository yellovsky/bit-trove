// global modules
import type { FailedResponse } from '@repo/api-models';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type zod from 'zod';

import {
  type DefaultValues,
  type FieldValues,
  useForm,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';

// common modules
import { translateApiError } from '~/utils/translate/error';
import type { UseEffectMutation } from '~/api/query';

// local modules
import { getSchemaDefaultValue } from './react-form.defaults';
import { zodResolver } from './react-form.zod-resolver';

export const useReactForm = <TFieldValues extends FieldValues, TContext = unknown>(
  schema: zod.ZodType<TFieldValues>,
  onSubmit: (values: TFieldValues) => void | Promise<void>,
  options?: UseFormProps<TFieldValues, TContext>,
) => {
  const { t: zodT } = useTranslation('zod');
  const resolver = useMemo(() => zodResolver(zodT, schema), [zodT, schema]);

  const methods = useForm<TFieldValues>({
    mode: 'onTouched',
    ...options,
    defaultValues:
      options?.defaultValues || (getSchemaDefaultValue(schema) as DefaultValues<TFieldValues>),
    progressive: options?.progressive ?? false,
    resolver,
  });

  const handleSubmit = useMemo(
    () => methods.handleSubmit(onSubmit),
    [methods.handleSubmit, onSubmit],
  );

  return [handleSubmit, methods] as const;
};

interface UseReactFormWithMutationParams<
  TFieldValues extends FieldValues,
  TResponse,
  TContext = unknown,
> {
  schema: zod.ZodType<TFieldValues>;
  useMutation: ReturnType<UseEffectMutation<TResponse, TFieldValues>>;
  defaultValues: DefaultValues<TFieldValues>;

  onMutationError?: (
    methods: UseFormReturn<TFieldValues, unknown, undefined>,
    errResponse: FailedResponse,
    variables: TFieldValues,
  ) => void;

  onMutationMutate?: (
    methods: UseFormReturn<TFieldValues, unknown, undefined>,
    variables: TFieldValues,
  ) => void;

  onMutationSuccess?: (
    methods: UseFormReturn<TFieldValues, unknown, undefined>,
    response: TResponse,
    variables: TFieldValues,
  ) => void;

  reactFormOptions?: UseFormProps<TFieldValues, TContext>;
}

export const useReactFormWithMutation = <
  TFieldValues extends FieldValues,
  TResponse,
  TContext = unknown,
>(
  options: UseReactFormWithMutationParams<TFieldValues, TResponse, TContext>,
) => {
  const { t: zodT } = useTranslation('zod');
  const resolver = useMemo(() => zodResolver(zodT, options.schema), [zodT, options.schema]);

  const methods = useForm<TFieldValues>({
    mode: 'onTouched',
    ...options,
    defaultValues: options.reactFormOptions?.defaultValues || options.defaultValues,
    resolver,
  });

  const mutation = options.useMutation({
    onError: (errResponse, variables) => {
      if (!errResponse.error.invalid_params?.length) {
        methods.setError('root', { message: translateApiError(zodT, errResponse.error) });
      } else {
        errResponse.error.invalid_params.forEach(({ name, reason }) => {
          methods.setError(name as any, { message: zodT(reason as any) });
        });
      }

      options.onMutationError?.(methods, errResponse, variables);
    },
    onMutate: variables => {
      methods.clearErrors('root');
      options.onMutationMutate?.(methods, variables);
    },
    onSuccess: (response, variables) => {
      methods.reset(variables);
      options.onMutationSuccess?.(methods, response, variables);
    },
  });

  const onSubmit = useMemo(
    () => methods.handleSubmit(params => mutation.mutateAsync(params)),
    [methods.handleSubmit, mutation.mutateAsync],
  );

  return [onSubmit, methods] as const;
};
