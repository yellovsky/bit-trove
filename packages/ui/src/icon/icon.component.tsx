// global modules
import clsx from 'clsx';
import type { FC } from 'react';

// local modules
import {
  chevronDown as chevronDownCn,
  chevronUp as chevronUpCn,
  clock as clockCn,
  eye as eyeCn,
  icon as iconCn,
  tag as tagCn,
} from './icon.component.module.scss';

type IconType = 'chevron_up' | 'chevron_down' | 'tag' | 'clock' | 'eye';

const ICON_TYPE_HASH: Record<IconType, string> = {
  chevron_down: chevronDownCn,
  chevron_up: chevronUpCn,
  clock: clockCn,
  eye: eyeCn,
  tag: tagCn,
} as const;

interface IconProps {
  type: IconType;
}

export const Icon: FC<IconProps> = ({ type }) => (
  <div className={clsx(iconCn, ICON_TYPE_HASH[type])} />
);
