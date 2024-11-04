// global modules
import clsx from 'clsx';
import type { To } from 'history';
import { useLocale } from '@repo/remix-i18n';
import { type ComponentProps, type FC, type HTMLAttributes, useCallback, useMemo } from 'react';
import { Link as RemixLink, NavLink as RemixNavLink } from '@remix-run/react';

// local modules
import * as styles from './link.module.scss';

export const LINK_VARIANTS = ['text', 'standalone', 'plain'] as const;
export type LinkVariant = (typeof LINK_VARIANTS)[number];

export const LINK_COLOR_SCHEMES = ['primary', 'yellow', 'gray', 'red', 'green', 'orange'] as const;
export type LinkColorScheme = (typeof LINK_COLOR_SCHEMES)[number];

const getLinkCn = (
  className: string | undefined,
  variant: LinkVariant,
  colorScheme: LinkColorScheme = 'primary',
): string =>
  clsx(
    className,
    variant !== 'plain' && styles.link,
    variant === 'standalone' && styles.standalone,
    variant === 'text' && styles.text,
    styles[colorScheme],
  );

const useLocalizedTo = (to: To, lang: string | undefined) => {
  const locale = useLocale();
  const langToSet = lang || locale;

  return useMemo((): ComponentProps<typeof Link>['to'] => {
    const addLocaleToPathname = (pathname: string): string =>
      pathname.startsWith('http')
        ? pathname.replace('https:/', langToSet).replace('http:/', langToSet)
        : pathname === '/'
          ? `/${langToSet}`
          : `/${langToSet}${pathname}`;

    return typeof to === 'string'
      ? addLocaleToPathname(to)
      : to.pathname
        ? { ...to, pathname: addLocaleToPathname(to.pathname) }
        : to;
  }, [to, langToSet]);
};

export interface LinkProps extends ComponentProps<typeof RemixLink> {
  variant: LinkVariant;
  colorScheme?: LinkColorScheme;
}

export const Link: FC<LinkProps> = props => {
  const { colorScheme, to, variant, lang, ...rest } = props;

  const localizedTo = useLocalizedTo(to, lang);
  const cName = getLinkCn(rest.className, variant, colorScheme);

  return <RemixLink {...rest} className={cName} to={localizedTo} />;
};

export interface LinkButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: LinkVariant;
  colorScheme?: LinkColorScheme;
}

export const LinkButton: FC<LinkButtonProps> = props => {
  const { colorScheme, variant, lang: _lang, ...rest } = props;

  const cName = getLinkCn(rest.className, variant, colorScheme);

  return <button {...rest} className={cName} />;
};

export interface NavLinkProps extends ComponentProps<typeof RemixNavLink> {
  variant: LinkVariant;
  colorScheme?: LinkColorScheme;
}

export type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

export const NavLink: FC<NavLinkProps> = props => {
  const { className, colorScheme, to, variant, lang, ...rest } = props;

  const localizedTo = useLocalizedTo(to, lang);
  const cName = getLinkCn(undefined, variant, colorScheme);

  const classNameFn = useCallback(
    (renderProps: NavLinkRenderProps) =>
      clsx(
        cName,
        renderProps.isActive && styles.navLinkActive,
        typeof className === 'function' ? className(renderProps) : className,
      ),
    [cName, className],
  );

  return <RemixNavLink {...rest} className={classNameFn} to={localizedTo} />;
};
