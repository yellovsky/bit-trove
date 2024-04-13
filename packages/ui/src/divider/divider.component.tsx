// global modules
import cn from 'classnames';
import type { HTMLAttributes } from 'react';
import { withSpacing } from '@bit-trove/ui/with-spacing';

// local modules
import { divider as dividerCn } from './divider.module.scss';

export const Divider = withSpacing(({ className, ...rest }: HTMLAttributes<HTMLHRElement>) => (
  <hr {...rest} className={cn(className, dividerCn)} />
));
