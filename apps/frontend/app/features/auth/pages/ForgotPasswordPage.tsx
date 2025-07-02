import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { ForgotPasswordForm } from '../ui/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleSuccess = () => {
    navigate(`/${i18n.language}/auth/sign-in`);
  };

  const handleBackToSignIn = () => {
    navigate(`/${i18n.language}/auth/sign-in`);
  };

  return (
    <div className="max-w-96">
      <div className="py-4">
        <ForgotPasswordForm onBackToSignIn={handleBackToSignIn} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
