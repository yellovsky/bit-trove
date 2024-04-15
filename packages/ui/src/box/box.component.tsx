// global modules
import { applySpacing, type SpacingProps } from '@repo/ui/apply-spacing';
import { createElement, type FC, type HTMLAttributes } from 'react';

interface BoxProps extends HTMLAttributes<HTMLDivElement>, SpacingProps {
  as?: 'section';
}

const applyCn = applySpacing<BoxProps>;
export const Box: FC<BoxProps> = (props) => {
  const { as = 'div', ...rest } = applyCn(props);
  return createElement(as, rest);
};
