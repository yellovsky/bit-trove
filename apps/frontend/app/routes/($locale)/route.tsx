// global modules
import type { FC } from 'react';
import { Outlet, useRouteError } from '@remix-run/react';

// common modules
import { ErrorScreen } from '~/components/screens/error';
import { ForbiddenScreen } from '~/components/screens/forbidden';
import { Header } from '~/components/header';
import { mergeMeta } from '~/utils/meta';
import { NotFoundScreen } from '~/components/screens/not-found';

// local modules
import {
  footer as footerCn,
  header as headerCn,
  layout as layoutCn,
  main as mainCn,
} from './layout.module.scss';

export const meta = mergeMeta(() => []);

const Footer: FC = () => (
  <footer className={footerCn}>© Copyright {new Date().getFullYear()}</footer>
);

export function ErrorBoundary() {
  const error = useRouteError();
  const status =
    error && typeof error === 'object' && 'status' in error && typeof error.status === 'number'
      ? error.status
      : 500;

  return (
    <div className={layoutCn}>
      <Header className={headerCn} />

      <main className={mainCn}>
        {status === 404 ? (
          <NotFoundScreen />
        ) : status === 403 ? (
          <ForbiddenScreen />
        ) : (
          <ErrorScreen />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function IndexLayout() {
  return (
    <>
      <div className={layoutCn}>
        <Header className={headerCn} />

        <main className={mainCn}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}
