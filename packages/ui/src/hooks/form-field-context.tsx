import { createContext, useContext } from 'react';
import { type FieldPath, type FieldValues, useFormContext, useFormState } from 'react-hook-form';

import { useFormItemContext } from '@repo/ui/hooks/form-item-context';

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const formFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

export const FormFieldProvider = formFieldContext.Provider;

export const useFormField = () => {
  const fieldContext = useContext(formFieldContext);
  const { getFieldState } = useFormContext();
  const itemContext = useFormItemContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  return {
    formDescriptionId: itemContext?.formDescriptionId,
    formItemId: itemContext?.formItemId,
    formMessageId: itemContext?.formMessageId,
    id: itemContext?.id,
    name: fieldContext.name,
    ...fieldState,
  };
};
