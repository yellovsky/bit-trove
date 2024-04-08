// global modules
import * as R from 'ramda';
import cn from 'classnames';
import { createElement, type FC, type HTMLAttributes } from 'react';

// local modules
import { passive as passiveCn, pending as pendingCn, text as textCn } from './text.module.scss';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'span' | 'p';
  passive?: boolean;
}

export const Text: FC<TextProps> = ({ as, passive, ...rest }) =>
  createElement(as || 'span', {
    ...rest,
    className: cn(rest.className, textCn, passive && passiveCn),
  });

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
        <p {...rest} className={cn(textCn, pendingCn)} key={key}>
          &nbsp;
        </p>
      ),
      lines
    )
  );
