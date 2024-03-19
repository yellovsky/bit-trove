// global modules
import cn from 'classnames';
import type { FC, PropsWithChildren, ReactNode } from 'react';

// local modules
import {
  holder as holderCn,
  extraColumn as extraColumnCn,
  contentRight as contentRightCn,
} from './two-columns-layout.module.scss';

interface TwoColumnsLayoutProps extends PropsWithChildren {
  className?: string;
  contentRight?: boolean;
  extraContent?: ReactNode;
}

export const TwoColumnsLayout: FC<TwoColumnsLayoutProps> = (props) => (
  <div className={cn(props.className, holderCn, props.contentRight && contentRightCn)}>
    <div className={cn(props.contentRight && extraColumnCn)}>
      {props.contentRight ? props.extraContent : props.children}
    </div>
    <div className={cn(!props.contentRight && extraColumnCn)}>
      {props.contentRight ? props.children : props.extraContent}
    </div>
  </div>
);
