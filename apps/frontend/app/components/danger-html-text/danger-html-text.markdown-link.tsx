// global modules
import { useLocation, useNavigation } from '@remix-run/react';
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

type MarkdownLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const MarkdownLink = ({ href, ...rest }: MarkdownLinkProps) => {
  const location = useLocation();
  const n = useNavigation();
  // console.log('process.env', process.env);
  // console.log('n', n);
  // console.log('location', location);
  const rel = undefined;
  // typeof window === undefined || href?.startsWith(window.location.origin)
  //   ? undefined
  //   : 'nofollow noopener';

  const target = undefined;
  // typeof window === undefined || href?.startsWith(window.location.origin) ? undefined : '_blank';
  return <a {...rest} href={href} rel={rest.rel || rel} target={rest.target || target} />;
};
