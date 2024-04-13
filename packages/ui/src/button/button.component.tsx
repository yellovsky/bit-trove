// global modules
import cn from 'classnames';
import { applyBorderRadius, BorderRadiusProps } from '@bit-trove/ui/apply-border-radius';
import { colorSchemaCn, type ColorSchemaType } from '@bit-trove/ui/color-schema';
import type { FC, HTMLAttributes } from 'react';

// local modules
import * as styles from './button.module.scss';

export type ButtonVariant = 'filled' | 'outline';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, BorderRadiusProps {
  variant: ButtonVariant;
  colorSchema: ColorSchemaType;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = (props) => {
  const { variant, colorSchema, className, size = 'md', ...rest } = applyBorderRadius(props);

  return (
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
  );
};
