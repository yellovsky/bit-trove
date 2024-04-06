// global modules
import cn from 'classnames';
import type { FC } from 'react';

// local modules
import {
  tag as tagCn,
  icon as iconCn,
  clock as clockCn,
  chevronUp as chevronUpCn,
  chevronDown as chevronDownCn,
} from './icon.component.module.scss';

type IconType = 'chevron_up' | 'chevron_down' | 'tag' | 'clock';

const ICON_TYPE_HASH: Record<IconType, string> = {
  tag: tagCn,
  clock: clockCn,
  chevron_up: chevronUpCn,
  chevron_down: chevronDownCn,
} as const;

interface IconProps {
  type: IconType;
}

export const Icon: FC<IconProps> = ({ type }) => (
  <div aria-role="icon" className={cn(iconCn, ICON_TYPE_HASH[type])} />
);
