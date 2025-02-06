// global modules
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// local modules
import { ScreenLayout } from '../screen-layout';

export const ForbiddenScreen: FC = () => {
  const { t } = useTranslation();

  return (
    <ScreenLayout
      code="403"
      message={t('PAGE_FORBIDDEN_MESSAGE')}
      title={t('PAGE_FORBIDDEN_TITLE')}
    />
  );
};
