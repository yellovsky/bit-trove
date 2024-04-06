// global modules
import 'server-only';
import cn from 'classnames';
import { Aside } from '../aside';
import { type FC, type PropsWithChildren, type ReactNode } from 'react';
import type { SupportedLocale } from '@bit-trove/localization/config';

// local modules
import {
  columns as columnsCn,
  content as contentCn,
  pageContent as pageContentCn,
  extraColumn as extraColumnCn,
} from './page-content.module.scss';

interface PageContentProps extends PropsWithChildren {
  header?: ReactNode;
  className?: string;
  locale: SupportedLocale;
}

export const PageContent: FC<PageContentProps> = ({ locale, className, header, children }) => (
  <>
    <div className={cn(className, pageContentCn)}>
      {header ? <div>{header}</div> : null}

      <div className={columnsCn}>
        <div className={contentCn}>{children}</div>
        <div className={extraColumnCn}>
          <Aside locale={locale} />
        </div>
      </div>
    </div>
  </>
);
