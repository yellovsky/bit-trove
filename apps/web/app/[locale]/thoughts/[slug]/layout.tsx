// global modules
import 'server-only';
import type { FC } from 'react';

// local modules
import type { RSCLayoutProps } from '~/src/rsc';
import { pageHolder as pageHolderCn } from './layout.module.scss';

const ThoughtLayout: FC<RSCLayoutProps> = ({ children }: RSCLayoutProps) => (
  <div className={pageHolderCn}>
    <section>{children}</section>
    <div>you might like</div>
    <div>ad</div>
    <div>from same category</div>
    <div>editor picks</div>
    <div>ad</div>
    <div>comments</div>
  </div>
);

export default ThoughtLayout;
