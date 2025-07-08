import type { ComponentProps, FC } from 'react';
import { Link as RouterLink } from 'react-router';

import { useEnhanceTo } from '@repo/ui/hooks/enhance-to';
import type { Palette } from '@repo/ui/lib/palette';

type LinkProps = ComponentProps<typeof RouterLink> & { language?: string; palette?: Palette };

export const Link: FC<LinkProps> = ({ palette, language, children, ...props }) => {
  const enhanceTo = useEnhanceTo();
  const echancedLink = enhanceTo ? enhanceTo(props.to, language) : props.to;

  return (
    <RouterLink {...props} to={echancedLink}>
      {children}
    </RouterLink>
  );
};
