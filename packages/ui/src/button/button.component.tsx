// global modules
import cn from 'classnames';
import { colorSchemaCn, type ColorSchemaType } from '@bit-trove/ui/color-schema';
import type { FC, HTMLAttributes } from 'react';

// local modules
import * as styles from './button.module.scss';
import { withBorderRadius } from '../with-border-radius';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: 'filled' | 'outline';
  colorSchema: ColorSchemaType;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Button = withBorderRadius(
  ({ variant, colorSchema, className, size = 'md', ...rest }: ButtonProps) => (
    <button
      className={cn(
        className,
        styles.button,
        styles[variant],
        styles[size],
        colorSchemaCn(colorSchema)
      )}
      {...rest}
    />
  )
);
