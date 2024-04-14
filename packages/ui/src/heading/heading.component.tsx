// global modules
import cn from 'classnames';
import { applySpacing, type SpacingProps } from '@bit-trove/ui/apply-spacing';
import { createElement, type FC, type HTMLAttributes } from 'react';

// local modules
import {
  fourXl as fourXlCn,
  heading as headingCn,
  lg as lgCn,
  md as mdCn,
  sm as smCn,
  threeXl as threeXlCn,
  twoXl as twoXlCn,
  xl as xlCn,
  xs as xsCn,
} from './heading.module.scss';

type HeadingSize = '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'div';

const headingSizeCnLookup: Record<HeadingSize, string> = {
  '2xl': twoXlCn,
  '3xl': threeXlCn,
  '4xl': fourXlCn,
  lg: lgCn,
  md: mdCn,
  sm: smCn,
  xl: xlCn,
  xs: xsCn,
};

interface HeadingProps
  extends SpacingProps,
    // MayHaveColorSchema,
    HTMLAttributes<HTMLHeadingElement> {
  size: HeadingSize;
  as: HeadingAs;
}

export const Heading: FC<HeadingProps> = (props) => {
  const { as, size, className, ...rest } = applySpacing<HeadingProps>()(props);

  return createElement(as, {
    ...rest,
    className: cn(className, headingCn, headingSizeCnLookup[size]),
  });
};
