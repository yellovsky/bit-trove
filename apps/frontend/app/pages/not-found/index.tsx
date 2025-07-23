import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { ErrorScreen } from '@shared/ui/ErrorScreen';

export default function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/${i18n.language}`);
  };

  return (
    <ErrorScreen
      buttonText={t('error_page.404.button_text')}
      code={404}
      onButtonClick={handleButtonClick}
      subtitle={t('error_page.404.subtitle')}
      title={t('error_page.404.title')}
    />
  );
}
