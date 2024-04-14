// global modules
import clsx from 'clsx';
import { applySpacing, type SpacingProps } from '@bit-trove/ui/apply-spacing';
import type { FC, HTMLAttributes } from 'react';

// local modules
import {
  gap05 as gap05Cn,
  gap1 as gap1Cn,
  gap2 as gap2Cn,
  horizontal as horizontalCn,
  stack as stackCn,
  vertical as verticalCn,
} from './stack.module.scss';

type StackGap = '0.5rem' | '1rem' | '2rem';

interface StackProps extends HTMLAttributes<HTMLDivElement>, SpacingProps {
  gap?: StackGap;
  orientation?: 'vertical' | 'horizontal';
}

export const Stack: FC<StackProps> = (props) => {
  const {
    gap = '1rem',
    className,
    orientation = 'horizontal',
    ...rest
  } = applySpacing<StackProps>()(props);

  return (
    <div
      {...rest}
      className={clsx(
        className,
        stackCn,
        orientation === 'horizontal' && horizontalCn,
        orientation === 'vertical' && verticalCn,
        gap === '0.5rem' && gap05Cn,
        gap === '1rem' && gap1Cn,
        gap === '2rem' && gap2Cn
      )}
    />
  );
};
