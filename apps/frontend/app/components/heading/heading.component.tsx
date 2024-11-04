// global modules
import clsx from 'clsx';
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

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  size: HeadingSize;
  as: HeadingAs;
  center?: boolean;
}

export const Heading: FC<HeadingProps> = props => {
  const { as, size, className, center, ...rest } = props;

  return createElement(as, {
    ...rest,
    className: clsx(headingCn, className, headingSizeCnLookup[size], center && 'text-center'),
  });
};
