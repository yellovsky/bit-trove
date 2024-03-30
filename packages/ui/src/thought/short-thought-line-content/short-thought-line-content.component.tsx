// global modules
import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

// local modules
import {
  top as topCn,
  line as lineCn,
  bottom as bottomCn,
  linedHolder as linedHolderCn,
} from './short-thought-line-content.module.scss';

interface ShortThoughtLineContentProps extends PropsWithChildren {
  position: 'top' | 'bottom';
}

export const ShortThoughtLineContent: FC<ShortThoughtLineContentProps> = (props) => (
  <div
    className={cn(
      linedHolderCn,
      props.position === 'top' && topCn,
      props.position === 'bottom' && bottomCn
    )}
  >
    <div className={lineCn} />
    <div>{props.children}</div>
  </div>
);
