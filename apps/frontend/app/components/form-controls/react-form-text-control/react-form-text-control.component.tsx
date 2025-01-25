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
import { Input, InputControl } from '~/components/controls/input';

type DataType = string | number | null;

export interface ReactFormTextControlProps<
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

  inputProps?: ComponentProps<typeof Input>;
  inputPrefix?: ReactNode;
  inputSuffix?: ReactNode;
}

export function ReactFormTextControl<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>(props: ReactFormTextControlProps<TFieldValues, TName>) {
  const {
    field,
    fieldState,
    formState,
    label,
    footnote,
    required,
    defaultValue,
    inputProps,
    inputPrefix,
    inputSuffix,
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

  const inputElement = (
    <Input
      {...field}
      {...inputProps}
      className={clsx(inputProps?.className, inputPrefix || inputSuffix ? undefined : 'mb-1.5')}
      disabled={props.inputProps?.disabled || field.disabled || isSubmitting}
      invalid={fieldState.invalid}
      onChange={handleChange}
      value={field.value ?? ''}
    />
  );

  return (
    <FormControl {...rest}>
      {!label ? null : (
        <FormLabel className="mb-2" required={required}>
          {label}
        </FormLabel>
      )}

      {inputPrefix || inputSuffix ? (
        <InputControl className="mb-2">
          {inputPrefix}
          {inputElement}
          {inputSuffix}
        </InputControl>
      ) : (
        inputElement
      )}

      <FootnoteDivider
        className="mb-2"
        minLines={0}
        topError={fieldState.error?.message}
        topFootnote={footnote}
      />
    </FormControl>
  );
}
