export type ApplyClassname<TExtraProps extends object> = <TProps extends TExtraProps>(
  defaults?: TExtraProps
) => (
  props: TProps & { className?: string }
) => Omit<TProps, keyof TExtraProps> & { className?: string };
