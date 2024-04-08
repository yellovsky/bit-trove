// global modules
import cn from 'classnames';
import type { FC } from 'react';

// local modules
import {
  chevronDown as chevronDownCn,
  chevronUp as chevronUpCn,
  clock as clockCn,
  icon as iconCn,
  tag as tagCn,
} from './icon.component.module.scss';

type IconType = 'chevron_up' | 'chevron_down' | 'tag' | 'clock';

const ICON_TYPE_HASH: Record<IconType, string> = {
  chevron_down: chevronDownCn,
  chevron_up: chevronUpCn,
  clock: clockCn,
  tag: tagCn,
} as const;

interface IconProps {
  type: IconType;
}

export const Icon: FC<IconProps> = ({ type }) => (
  <div className={cn(iconCn, ICON_TYPE_HASH[type])} />
);
