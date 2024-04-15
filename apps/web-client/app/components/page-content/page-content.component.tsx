// global modules
import clsx from 'clsx';
import type { FC, PropsWithChildren, ReactNode } from 'react';

// local modules
import { Aside } from './aside';
import {
  columns as columnsCn,
  content as contentCn,
  extraColumn as extraColumnCn,
  pageContent as pageContentCn,
} from './page-content.module.scss';

interface PageContentProps extends PropsWithChildren {
  header?: ReactNode;
  className?: string;
}

export const PageContent: FC<PageContentProps> = ({ className, header, children }) => (
  <div className={clsx(className, pageContentCn)}>
    {header ? <div>{header}</div> : null}

    <div className={columnsCn}>
      <div className={contentCn}>{children}</div>
      <div className={extraColumnCn}>
        <Aside />
      </div>
    </div>
  </div>
);
