import type { ComponentProps, FC } from 'react';

import logoUrl from './images/logo.svg?url';
import logoShortUrl from './images/logo-short.svg?url';

/* -------------------------------------------------------------------------------------------------
 * Logo
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Logo';

type LogoProps = Omit<ComponentProps<'img'>, 'src'> & { short?: boolean };

const Logo: FC<LogoProps> = ({ short, alt, ...rest }) => (
  <img alt={alt} src={short ? logoShortUrl : logoUrl} {...rest} />
);

Logo.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { Logo };
export type { LogoProps };
