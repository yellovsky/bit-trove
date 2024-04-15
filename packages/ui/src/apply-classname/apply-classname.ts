export type ApplyClassname<TExtraProps extends object> = <TProps extends TExtraProps>(
  props: TProps & { className?: string }
) => Omit<TProps, keyof TExtraProps> & { className?: string };
