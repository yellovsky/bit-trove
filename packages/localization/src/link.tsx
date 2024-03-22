// global modules
import NextLink from 'next/link';
import type { UrlObject } from 'url';
import { useLocale } from 'next-intl';
import type { ComponentProps, FC } from 'react';

// local modules
import type { locales } from './config';

export interface LinkProps extends ComponentProps<typeof NextLink> {
  locale?: (typeof locales)[number];
}

export const Link: FC<LinkProps> = ({ locale, href, ...rest }) => {
  const contextLocale = useLocale();
  const localeToUse = locale || contextLocale;

  const localizedHref =
    typeof href === 'string'
      ? `/${localeToUse}${href}`
      : ({ ...href, pathname: `/${localeToUse}${href.pathname}` } as UrlObject);

  return <NextLink {...rest} href={localizedHref} />;
};
