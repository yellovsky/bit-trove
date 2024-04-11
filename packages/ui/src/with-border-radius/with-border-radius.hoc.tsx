// global modules
import cn from 'classnames';
import type { FC } from 'react';

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
} from './with-border-radius.module.scss';

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

export const withBorderRadius =
  <TProps extends { className?: string }>(Component: FC<TProps>): FC<TProps & BorderRadiusProps> =>
  ({ borderRadius, br, ...rest }: TProps & BorderRadiusProps) => {
    const radius = br || borderRadius;

    return radius === undefined ? (
      <Component {...(rest as TProps)} />
    ) : (
      <Component
        {...(rest as TProps)}
        className={cn(rest.className, borderRadiusCn, borderRadiusLookup[radius])}
      />
    );
  };
