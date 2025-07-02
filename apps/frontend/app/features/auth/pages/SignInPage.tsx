import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { SignInForm } from '../ui/SignInForm';

export default function SignInPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleSuccess = () => {
    navigate(`/${i18n.language}`);
  };

  const handleForgotPassword = () => {
    navigate(`/${i18n.language}/auth/forgot-password`);
  };

  const handleSignUpClick = () => {
    navigate(`/${i18n.language}/auth/sign-up`);
  };

  return (
    <div className="max-w-96">
      <div className="py-4">
        <SignInForm
          onForgotPassword={handleForgotPassword}
          onSignUpClick={handleSignUpClick}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
