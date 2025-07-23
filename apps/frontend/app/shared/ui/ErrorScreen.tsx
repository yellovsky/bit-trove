import type { ComponentProps, FC, ReactNode } from 'react';

import { Button } from '@repo/ui/components/Button';
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
  buttonText: ReactNode;
  onButtonClick?: () => void;
};

const ErrorScreen: FC<ErrorScreenProps> = ({
  className,
  code,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  ...rest
}) => (
  <div className={cn('py-20', className)} {...rest}>
    <div className="relative">
      <div className="absolute inset-0 text-center font-bold text-[15rem] text-gray-a11 opacity-25">{code}</div>
      <div className="relative z-10 pt-52 md:pt-44">
        <Heading className="text-center font-medium text-2xl text-shadow-md md:text-4xl" order={1}>
          {title}
        </Heading>
        <div className="mx-auto mt-6 mb-9 max-w-xl text-center text-gray-a11 text-lg text-shadow-sm">{subtitle}</div>
        <div className="flex justify-center">
          <Button className="min-w-48" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  </div>
);

ErrorScreen.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { ErrorScreen };
export type { ErrorScreenProps };
