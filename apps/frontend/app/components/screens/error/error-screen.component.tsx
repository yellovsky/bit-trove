// global modules
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// local modules
import { ScreenLayout } from '../screen-layout';

export const ErrorScreen: FC = () => {
  const { t } = useTranslation();

  return (
    <ScreenLayout
      code="404"
      message={t('PAGE_UNKNOWN_ERROR_MESSAGE')}
      title={t('PAGE_UNKNOWN_ERROR_TITLE')}
    />
  );
};
