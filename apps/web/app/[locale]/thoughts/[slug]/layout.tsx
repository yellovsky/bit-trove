// local modules
import type { RSCLayoutProps } from '~/src/rsc';
import { pageHolder as pageHolderCn } from './layout.module.scss';

export default function ThoughtLayout({ children }: RSCLayoutProps): JSX.Element {
  return (
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
}
