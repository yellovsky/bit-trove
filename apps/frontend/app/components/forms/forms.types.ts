export interface CommonFormProps<TValues> {
  disabled?: boolean;
  defaultValues: TValues;
  onSubmit(block: TValues): void;
}
