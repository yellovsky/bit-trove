import { useTranslation } from 'react-i18next';
import { Outlet, useRouteError } from 'react-router';

import { ErrorScreen } from '@shared/ui/error-route';

import { MainLayout } from '@widgets/main-layout';

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
        <ErrorScreen
          buttonText={t('error_page.404.button_text')}
          code={404}
          onButtonClick={() => window.location.reload()}
          subtitle={t('error_page.404.subtitle')}
          title={t('error_page.404.title')}
        />
      ) : (
        <ErrorScreen
          buttonText={t('error_page.500.button_text')}
          code={500}
          onButtonClick={() => window.location.reload()}
          subtitle={t('error_page.500.subtitle')}
          title={t('error_page.500.title')}
        />
      )}
    </MainLayout>
  );
};
