// global modules
import clsx from 'clsx';
import { createElement, type FC, type HTMLAttributes } from 'react';

// local modules
import styles from './text.module.scss';

type TextSizeType = '6xl' | '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

const textSizeLookup: Record<TextSizeType, string> = {
  '2xl': styles.sizeTwoXl,
  '3xl': styles.sizeThreeXl,
  '4xl': styles.sizeFourXl,
  '5xl': styles.sizeFiveXl,
  '6xl': styles.sizeSixXl,
  lg: styles.sizeLg,
  md: styles.sizeMd,
  sm: styles.sizeSm,
  xl: styles.sizeXl,
  xs: styles.sizeXs,
};

type TextAs =
  | 'div'
  | 'span'
  | 'b'
  | 'i'
  | 'u'
  | 'abbr'
  | 'cite'
  | 'del'
  | 'em'
  | 'ins'
  | 'kbd'
  | 'mark'
  | 's'
  | 'samp'
  | 'sub'
  | 'sup';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextAs;
  fontSize?: TextSizeType;
}

export const Text: FC<TextProps> = ({ as = 'span', fontSize = 'md', ...rest }) =>
  createElement(as, {
    ...rest,
    className: clsx(
      rest.className,
      styles.text,
      as === 'sup' ? styles.asSup : as === 'sub' ? styles.asSub : textSizeLookup[fontSize]
    ),
  });

interface TextPendingProps extends HTMLAttributes<HTMLElement> {
  lines?: number;
}

export const TextPending: FC<TextPendingProps> = ({ lines, ...rest }) => null;

// !lines ? (
//   <span {...rest} className={cn(textCn, pendingCn)}>
//     &nbsp;
//   </span>
// ) : (
//   R.times(
//     (key) => (
//       <p {...rest} className={cn(textCn, pendingCn)} key={key}>
//         &nbsp;
//       </p>
//     ),
//     lines
//   )
// );
