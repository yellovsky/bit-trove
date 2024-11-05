// global modules
import clsx from 'clsx';
import { forwardRef } from 'react';

// common modules
import { Button, type ButtonProps } from '~/components/button';

// local modules
import { button as buttonCn } from './icon-button.module.scss';

export interface IconButtonProps extends Omit<ButtonProps, 'paddingReset'> {}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, size = 'sm', ...rest }, ref) => (
    <Button paddingReset className={clsx(buttonCn, className)} ref={ref} size={size} {...rest}>
      {children}
    </Button>
  ),
);
