// global modules
import cn from 'classnames';
import type { FC, PropsWithChildren, ReactNode } from 'react';

// local modules
import {
  holder as holderCn,
  content as contentCn,
  extraColumn as extraColumnCn,
  contentRight as contentRightCn,
} from './two-columns-layout.module.scss';

interface TwoColumnsLayoutProps extends PropsWithChildren {
  extraCn?: string;
  contentCn?: string;
  className?: string;
  contentRight?: boolean;
  extraContent?: ReactNode;
}

export const TwoColumnsLayout: FC<TwoColumnsLayoutProps> = (props) => {
  const contentColumn = <div className={cn(props.contentCn, contentCn)}>{props.children}</div>;
  const extraColumn = <div className={cn(extraColumnCn, props.extraCn)}>{props.extraContent}</div>;

  return (
    <div className={cn(props.className, holderCn, props.contentRight && contentRightCn)}>
      {props.contentRight ? (
        <>
          {extraColumn}
          {contentColumn}
        </>
      ) : (
        <>
          {contentColumn}
          {extraColumn}
        </>
      )}
    </div>
  );
};