// global modules
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// local modules
import { ScreenLayout } from '../screen-layout';

export const NotFoundScreen: FC = () => {
  const { t } = useTranslation();

  return (
    <ScreenLayout
      code="404"
      message={t('PAGE_NOT_FOUND_MESSAGE')}
      title={t('PAGE_NOT_FOUND_TITLE')}
    />
  );
};
