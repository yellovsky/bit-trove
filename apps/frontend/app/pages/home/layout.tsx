import { useTranslation } from 'react-i18next';
import { Outlet, useRouteError } from 'react-router';

import { filterParentMeta } from '@shared/lib/meta';
import { ErrorScreen } from '@shared/ui/ErrorScreen';

import { MainLayout } from '@widgets/main-layout';

import type { Route } from './+types';

export function meta(params: Route.MetaArgs) {
  const parentMeta = filterParentMeta(params.matches.flatMap((m) => m?.meta ?? []));
  return [...parentMeta, { content: params.params.locale, httpEquiv: 'content-language' }];
}

export default function HomeLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export const ErrorBoundary = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  const notFound = error && typeof error === 'object' && 'status' in error && error.status === 404;

  return (
    <MainLayout>
      {notFound ? (
        <ErrorScreen code={404} subtitle={t('error_page.404.subtitle')} title={t('error_page.404.title')} />
      ) : (
        <ErrorScreen code={500} subtitle={t('error_page.500.subtitle')} title={t('error_page.500.title')} />
      )}
    </MainLayout>
  );
};
