// global modules
import cn from 'classnames';
import { applySpacing, type SpacingProps } from '@bit-trove/ui/apply-spacing';
import type { FC, HTMLAttributes } from 'react';

// local modules
import {
  horizontal as horizontalCn,
  stack as stackCn,
  vertical as verticalCn,
} from './stack.module.scss';

interface StackProps extends HTMLAttributes<HTMLDivElement>, SpacingProps {
  orientation: 'vertical' | 'horizontal';
}

export const Stack: FC<StackProps> = (props) => {
  const { className, orientation, ...rest } = applySpacing<StackProps>()(props);

  return (
    <div
      {...rest}
      className={cn(
        className,
        stackCn,
        orientation === 'horizontal' && horizontalCn,
        orientation === 'vertical' && verticalCn
      )}
    />
  );
};
