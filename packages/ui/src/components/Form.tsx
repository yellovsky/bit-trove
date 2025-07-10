import { Slot } from '@radix-ui/react-slot';
import { type ComponentProps, type FC, useId } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues, FormProvider } from 'react-hook-form';

import * as Label from '@repo/ui/components/Label';
import { FormFieldProvider, useFormField } from '@repo/ui/hooks/form-field-context';
import { FormItemProvider } from '@repo/ui/hooks/form-item-context';
import { cn } from '@repo/ui/lib/utils';

export const Form = FormProvider;

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldProvider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldProvider>
);

export const FormItem: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const id = useId();

  return (
    <FormItemProvider id={id}>
      <div className={cn('grid gap-1', className)} data-slot="form-item" {...props} />
    </FormItemProvider>
  );
};

interface FormLabelProps extends ComponentProps<typeof Label.Root> {
  required?: boolean;
}

export const FormLabel: FC<FormLabelProps> = ({ className, required, ...props }) => {
  const { error, formItemId } = useFormField();
  return <Label.Root data-error={!!error} data-slot="form-label" htmlFor={formItemId} {...props} />;
};

export const FormControl: FC<ComponentProps<typeof Slot>> = ({ ...props }) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      data-slot="form-control"
      id={formItemId}
      {...props}
    />
  );
};

export const FormDescription: FC<ComponentProps<'p'>> = ({ className, ...props }) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className={cn('text-muted-foreground text-xs', className)}
      data-slot="form-description"
      id={formDescriptionId}
      {...props}
    />
  );
};

export const FormMessage: FC<ComponentProps<'p'>> = ({ className, ...props }) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  return !body ? null : (
    <p className={cn('text-destructive text-sm', className)} data-slot="form-message" id={formMessageId} {...props}>
      {body}
    </p>
  );
};
