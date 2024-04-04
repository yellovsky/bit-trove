// global modules
import cn from 'classnames';
import { createElement, type FC, type HTMLAttributes } from 'react';

// local modules
import {
  title as titleCn,
  asH1 as asH1Cn,
  asH2 as asH2Cn,
  asH3 as asH3Cn,
  asH4 as asH4Cn,
  asH5 as asH5Cn,
} from './title.module.scss';

export type TitleStyledAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface StyledAsDiv {
  as: 'div';
  styledAs: TitleStyledAs;
}

interface OptionalStyledAs {
  as: TitleStyledAs;
  styledAs?: TitleStyledAs;
}

type TitleProps =
  | (HTMLAttributes<HTMLHeadingElement> & StyledAsDiv)
  | (HTMLAttributes<HTMLHeadingElement> & OptionalStyledAs);

export const classNamesLookup: Record<TitleStyledAs, string> = {
  h1: asH1Cn,
  h2: asH2Cn,
  h3: asH3Cn,
  h4: asH4Cn,
  h5: asH5Cn,
};

export const Title: FC<TitleProps> = ({ as, styledAs, className, ...rest }) =>
  createElement(as, {
    ...rest,
    className: cn(titleCn, className, classNamesLookup[styledAs || as]),
  });
