// global modules
import clsx from 'clsx';
import type { FC, PropsWithChildren, ReactNode } from 'react';

// local modules
import {
  content as contentCn,
  contentRight as contentRightCn,
  extraColumn as extraColumnCn,
  holder as holderCn,
} from './two-columns-layout.module.scss';

interface TwoColumnsLayoutProps extends PropsWithChildren {
  extraCn?: string;
  contentCn?: string;
  className?: string;
  contentRight?: boolean;
  extraContent?: ReactNode;
}

export const TwoColumnsLayout: FC<TwoColumnsLayoutProps> = (props) => {
  const contentColumn = <div className={clsx(props.contentCn, contentCn)}>{props.children}</div>;
  const extraColumn = (
    <div className={clsx(extraColumnCn, props.extraCn)}>{props.extraContent}</div>
  );

  return (
    <div className={clsx(props.className, holderCn, props.contentRight && contentRightCn)}>
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
