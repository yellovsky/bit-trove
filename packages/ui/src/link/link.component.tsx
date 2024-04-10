// global modules
import { Link as RemixLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Link as ChakraLink, type ThemingProps } from '@chakra-ui/react';
import { type ComponentProps, type FC, useMemo } from 'react';

interface LinkProps extends ComponentProps<typeof RemixLink>, ThemingProps<'Link'> {
  plain?: boolean;
}

export const Link: FC<LinkProps> = ({ to, plain, ...rest }) => {
  const { i18n } = useTranslation();

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

  return plain ? (
    <RemixLink {...rest} to={localizedTo} />
  ) : (
    <ChakraLink {...rest} as={RemixLink} to={localizedTo} />
  );
};
