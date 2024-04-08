// global modules
import 'server-only';
import cn from 'classnames';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { type FC, type PropsWithChildren, type ReactNode } from 'react';

// local modules
import { Aside } from '../aside';
import {
  columns as columnsCn,
  content as contentCn,
  extraColumn as extraColumnCn,
  pageContent as pageContentCn,
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
