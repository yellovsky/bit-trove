// global modules
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

// common modules
import { getClientHost } from '~/utils/env';

type MarkdownLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const MarkdownLink = ({ href, ...rest }: MarkdownLinkProps) => {
  const clientHost = getClientHost();

  const rel = !clientHost || href?.startsWith(clientHost) ? undefined : 'nofollow noopener';
  const target = !clientHost || href?.startsWith(clientHost) ? undefined : '_blank';

  return <a {...rest} href={href} rel={rest.rel || rel} target={rest.target || target} />;
};
