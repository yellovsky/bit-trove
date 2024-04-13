// global modules
import cn from 'classnames';
import type { MayHaveColorSchema } from '@bit-trove/ui/color-schema';
import { createElement, type FC, type HTMLAttributes } from 'react';
import { withSpacing } from '@bit-trove/ui/with-spacing';

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

interface HeadingProps extends MayHaveColorSchema, HTMLAttributes<HTMLHeadingElement> {
  size: HeadingSize;
  as: HeadingAs;
}

export const Heading = withSpacing(({ as, size, className, ...rest }: HeadingProps) =>
  createElement(as, {
    ...rest,
    className: cn(className, headingCn, headingSizeCnLookup[size]),
  })
);
