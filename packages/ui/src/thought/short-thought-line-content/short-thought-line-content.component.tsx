// global modules
import clsx from 'clsx';
import type { FC, PropsWithChildren } from 'react';

// local modules
import {
  bottom as bottomCn,
  line as lineCn,
  linedHolder as linedHolderCn,
  top as topCn,
} from './short-thought-line-content.module.scss';

interface ShortThoughtLineContentProps extends PropsWithChildren {
  position: 'top' | 'bottom';
}

export const ShortThoughtLineContent: FC<ShortThoughtLineContentProps> = (props) => (
  <div
    className={clsx(
      linedHolderCn,
      props.position === 'top' && topCn,
      props.position === 'bottom' && bottomCn
    )}
  >
    <div className={lineCn} />
    <div>{props.children}</div>
  </div>
);
