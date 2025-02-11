// global modules
import clsx from 'clsx';
import { type ChangeEventHandler, type ComponentProps, type ReactNode, useCallback } from 'react';

import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormStateReturn,
} from 'react-hook-form';

// common modules
import { FootnoteDivider } from '~/components/controls/footnote-divider';
import { FormControl } from '~/components/controls/control';
import { FormLabel } from '~/components/controls/form-label';
import { Textarea } from '~/components/controls/textarea';

type DataType = string | number | null;

export interface ReactFormTextareaControlProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> extends ComponentProps<typeof FormControl> {
  field: FieldPathValue<TFieldValues, TName> extends DataType
    ? ControllerRenderProps<TFieldValues, TName>
    : never;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;

  label?: ReactNode;
  required?: boolean;
  footnote?: ReactNode;

  inputProps?: ComponentProps<typeof Textarea>;
}

export function ReactFormTextareaControl<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>(props: ReactFormTextareaControlProps<TFieldValues, TName>) {
  const {
    field,
    fieldState,
    formState,
    label,
    footnote,
    required,
    defaultValue,
    inputProps,
    ...rest
  } = props;

  const { isSubmitting } = formState;

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event =>
      field.onChange(
        inputProps?.type === 'number'
          ? Number.isNaN(event.target.valueAsNumber)
            ? null
            : event.target.valueAsNumber
          : event.target.value,
      ),
    [defaultValue],
  );

  return (
    <FormControl {...rest}>
      {!label ? null : (
        <FormLabel className="mb-2" required={required}>
          {label}
        </FormLabel>
      )}

      <Textarea
        {...field}
        {...inputProps}
        className={clsx(inputProps?.className, 'mb-1.5')}
        disabled={props.inputProps?.disabled || field.disabled || isSubmitting}
        invalid={fieldState.invalid}
        onChange={handleChange}
        value={field.value ?? ''}
      />

      <FootnoteDivider
        className="mb-2"
        minLines={0}
        topError={fieldState.error?.message}
        topFootnote={footnote}
      />
    </FormControl>
  );
}
