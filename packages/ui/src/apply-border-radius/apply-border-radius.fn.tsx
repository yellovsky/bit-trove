// global modules
import type { ApplyClassname } from '@repo/ui/apply-classname';
import clsx from 'clsx';

// local modules
import {
  base as baseCn,
  borderRadius as borderRadiusCn,
  full as fullCn,
  lg as lgCn,
  md as mdCn,
  none as noneCn,
  sm as smCn,
  threexl as threexlCn,
  twoxl as twoxlCn,
  xl as xlCn,
} from './apply-border-radius.module.scss';

type BorderRadiusType = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

const borderRadiusLookup: Record<BorderRadiusType, string> = {
  '2xl': twoxlCn,
  '3xl': threexlCn,
  base: baseCn,
  full: fullCn,
  lg: lgCn,
  md: mdCn,
  none: noneCn,
  sm: smCn,
  xl: xlCn,
};

export interface BorderRadiusProps {
  borderRadius?: BorderRadiusType;
  br?: BorderRadiusType;
}

export const applyBorderRadius: ApplyClassname<BorderRadiusProps> = (props) => {
  const { borderRadius, br, ...rest } = props;
  const radius = br || borderRadius;

  return {
    ...rest,
    className: clsx(
      rest.className,
      radius !== undefined && borderRadiusCn,
      radius !== undefined && borderRadiusLookup[radius]
    ),
  };
};
