// global modules
import clsx from 'clsx';
import {
  type ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

// local modules
import * as styles from './button.module.scss';

export const BUTTON_VARIANTS = ['filled', 'outline', 'standalone', 'text', 'soft'] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SIZES = ['lg', 'md', 'sm', 'xs'] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export const BUTTON_COLOR_SCHEMES = [
  'primary',
  'yellow',
  'gray',
  'red',
  'green',
  'orange',
] as const;
export type ButtonColorScheme = (typeof BUTTON_COLOR_SCHEMES)[number];

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size?: ButtonSize;
  paddingReset?: boolean;
  selected?: boolean;
  fullwidth?: boolean;
  rounded?: boolean;
  colorScheme?: ButtonColorScheme;
  isFocused?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, outerRef) => {
  const {
    variant,
    className,
    size = 'md',
    paddingReset,
    selected,
    fullwidth,
    colorScheme = 'primary',
    rounded,
    isFocused,
    ...rest
  } = props;

  const innerRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(outerRef, () => innerRef.current!, []);

  useEffect(() => {
    if (isFocused) innerRef.current?.focus();
  }, [isFocused]);

  return (
    <button
      aria-selected={selected}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        styles[colorScheme],
        paddingReset && styles.paddingReset,
        fullwidth && styles.fullwidth,
        rounded && styles.rounded,
        className,
      )}
      {...rest}
      ref={innerRef}
      type={rest.type || 'button'}
    />
  );
});
