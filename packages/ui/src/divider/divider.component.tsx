// global modules
import clsx from 'clsx';
import { applySpacing, type SpacingProps } from '@bit-trove/ui/apply-spacing';
import type { FC, HTMLAttributes } from 'react';

// local modules
import { divider as dividerCn } from './divider.module.scss';

interface DividerProps extends HTMLAttributes<HTMLHRElement>, SpacingProps {}

const applyCn = applySpacing<DividerProps>();
export const Divider: FC<DividerProps> = (props) => {
  const { className, ...rest } = applyCn(props);
  return <hr {...rest} className={clsx(className, dividerCn)} />;
};
