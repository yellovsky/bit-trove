// global modules
import * as R from 'ramda';
import cn from 'classnames';
import { createElement, type FC, type HTMLAttributes } from 'react';

// local modules
import { text as textCn, pending as pendingCn } from './text.module.scss';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'span' | 'p';
}

export const Text: FC<TextProps> = ({ as, ...rest }) =>
  createElement(as || 'span', { ...rest, className: cn(rest.className, textCn) });

interface TextPendingProps extends HTMLAttributes<HTMLElement> {
  lines?: number;
}

export const TextPending: FC<TextPendingProps> = ({ lines, ...rest }) =>
  !lines ? (
    <span {...rest} className={cn(textCn, pendingCn)}>
      &nbsp;
    </span>
  ) : (
    R.times(
      (key) => (
        <p {...rest} key={key} className={cn(textCn, pendingCn)}>
          &nbsp;
        </p>
      ),
      lines
    )
  );
