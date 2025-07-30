import type { ComponentProps, FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@repo/ui/components/Button';
import { Link } from '@repo/ui/components/Link';
import { Heading } from '@repo/ui/components/Typography';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * ErrorScreen
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'ErrorScreen';

type ErrorScreenProps = ComponentProps<'div'> & {
  code: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  button?: ReactNode;
};

const ErrorScreen: FC<ErrorScreenProps> = ({ className, code, title, subtitle, button, ...rest }) => {
  const { t } = useTranslation();
  const buttonToRender = button ?? <Link to="/">{t('Go back to the homepage')}</Link>;

  return (
    <div className={cn('py-20', className)} {...rest}>
      <div className="relative">
        <div className="absolute inset-0 text-center font-bold text-[15rem] text-gray-a11 opacity-25">{code}</div>
        <div className="relative z-10 pt-52 md:pt-44">
          <Heading className="text-center font-medium text-2xl text-shadow-md md:text-4xl" order={1}>
            {title}
          </Heading>
          <div className="mx-auto mt-6 mb-9 max-w-xl text-center text-gray-a11 text-lg text-shadow-sm">{subtitle}</div>
          <div className="flex justify-center">
            <Button asChild className="min-w-48">
              {buttonToRender}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ErrorScreen.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ErrorScreen };
export type { ErrorScreenProps };
