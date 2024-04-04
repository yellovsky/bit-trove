// global modules
import 'server-only';
import type { FC } from 'react';

// local modules
import type { RSCLayoutProps } from '~/src/rsc';

const ThoughtsLayout: FC<RSCLayoutProps> = (props) => {
  return props.children;
};

export default ThoughtsLayout;
