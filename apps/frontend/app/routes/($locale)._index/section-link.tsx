// global modules
import type { To } from 'history';
import type { FC, PropsWithChildren } from 'react';

// common modules
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';

interface SectionLinkProps extends PropsWithChildren {
  to: To;
}

export const SectionLink: FC<SectionLinkProps> = ({ to, children }) => (
  <Heading as="h2" className="mb-4" size="lg">
    <Link to={to} variant="standalone">
      {children}
    </Link>
  </Heading>
);
