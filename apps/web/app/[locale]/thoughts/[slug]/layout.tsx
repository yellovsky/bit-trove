// global modules
import 'server-only';
import type { FC } from 'react';

// local modules
import { pageHolder as pageHolderCn } from './thought.module.scss';
import type { RSCLayoutProps } from '~/src/rsc';

const ThoughtLayout: FC<RSCLayoutProps> = ({ children }: RSCLayoutProps) => (
  <div className={pageHolderCn}>
    <section>{children}</section>
    <div>you might like</div>
    <div>from same category</div>
    <div>editor picks</div>
    <div>comments</div>
  </div>
);

export default ThoughtLayout;
