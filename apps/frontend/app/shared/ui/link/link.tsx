import type { LinkProps as ReactRouterLinkProps } from 'react-router';

import { Link as UiLink } from '@repo/ui/components/link';

import type { Locale } from '@shared/config';

interface LinkProps extends ReactRouterLinkProps {
  language?: Locale;
}

export const Link = ({ prefetch = 'intent', viewTransition = false, to, language, ...props }: LinkProps) => {
  return <UiLink to={to} {...props} />;
};
