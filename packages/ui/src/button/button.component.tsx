// global modules
import * as R from 'ramda';
import clsx from 'clsx';
import { applyBorderRadius, BorderRadiusProps } from '@repo/ui/apply-border-radius';
import { applyColorScheme, type ColorSchemeProps } from '@repo/ui/apply-color-scheme';
import type { FC, HTMLAttributes } from 'react';

// local modules
import * as styles from './button.module.scss';

export type ButtonVariant = 'filled' | 'outline';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    BorderRadiusProps,
    ColorSchemeProps {
  variant: ButtonVariant;
  size?: ButtonSize;
}

const applyButtonCn = R.compose(applyBorderRadius<ButtonProps>(), applyColorScheme<ButtonProps>());

export const Button: FC<ButtonProps> = (props) => {
  const { variant, colorScheme, className, size = 'md', ...rest } = applyButtonCn(props);

  return (
    <button className={clsx(className, styles.button, styles[variant], styles[size])} {...rest} />
  );
};
