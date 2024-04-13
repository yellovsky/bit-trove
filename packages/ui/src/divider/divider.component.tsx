// global modules
import cn from 'classnames';
import { applySpacing, type SpacingProps } from '@bit-trove/ui/apply-spacing';
import type { FC, HTMLAttributes } from 'react';

// local modules
import { divider as dividerCn } from './divider.module.scss';

interface DividerProps extends HTMLAttributes<HTMLHRElement>, SpacingProps {}

export const Divider: FC<DividerProps> = (props) => {
  const { className, ...rest } = applySpacing(props);
  return <hr {...rest} className={cn(className, dividerCn)} />;
};
