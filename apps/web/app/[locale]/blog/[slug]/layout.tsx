// global modules
import type { PropsWithChildren } from 'react';

// local modules
import { pageHolder as pageHolderCn } from './layout.module.scss';

export default function Layout({ children }: PropsWithChildren): JSX.Element {
  return <div className={pageHolderCn}>{children}</div>;
}
