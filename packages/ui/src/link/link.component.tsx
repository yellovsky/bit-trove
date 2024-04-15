// global modules
import clsx from 'clsx';
import { Link as RemixLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { applyColorScheme, type ColorSchemeProps } from '@repo/ui/apply-color-scheme';
import { type ComponentProps, type FC, useMemo } from 'react';

// local modules
import { link as linkCn, standalone as standaloneCn, text as textCn } from './link.module.scss';

export type LinkVariant = 'text' | 'standalone' | 'plain';

export interface LinkProps extends ComponentProps<typeof RemixLink>, ColorSchemeProps {
  variant: LinkVariant;
}

const applyLinkCn = applyColorScheme<LinkProps>;

export const Link: FC<LinkProps> = (props) => {
  const { i18n } = useTranslation();
  const { to, variant, ...rest } = applyLinkCn({ colorScheme: 'primary' as const, ...props });

  const localizedTo = useMemo((): ComponentProps<typeof Link>['to'] => {
    const addLocaleToPathname = (pathname: string): string =>
      pathname.startsWith('http')
        ? pathname.replace('https:/', i18n.language).replace('http:/', i18n.language)
        : pathname === '/'
          ? `/${i18n.language}`
          : `/${i18n.language}${pathname}`;

    return typeof to === 'string'
      ? addLocaleToPathname(to)
      : to.pathname
        ? { ...to, pathname: addLocaleToPathname(to.pathname) }
        : to;
  }, [to, i18n.language]);

  const cName = clsx(
    rest.className,
    variant !== 'plain' && linkCn,
    variant === 'standalone' && standaloneCn,
    variant === 'text' && textCn
  );

  return <RemixLink {...rest} className={cName} to={localizedTo} />;
};
