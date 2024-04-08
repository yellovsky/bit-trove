// global modules
import cn from 'classnames';
import type { FC } from 'react';

// local modules
import {
  holder as holderCn,
  horizontal as horizontalCn,
  square as squareCn,
} from './ad.module.scss';

interface AdProps {
  layout: 'horizontal' | 'square';
}

export const Ad: FC<AdProps> = ({ layout }) => (
  <div
    className={cn(
      holderCn,
      layout === 'square' && squareCn,
      layout === 'horizontal' && horizontalCn
    )}
  />
);
