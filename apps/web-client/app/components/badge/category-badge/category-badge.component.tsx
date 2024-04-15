// global modules
import clsx from 'clsx';
import type { FC } from 'react';
import { Tag } from '@repo/ui/tag';
import { categoryLink, type CategorySegment } from '@bit-trove/api-models/category';

// local modules
import {
  categoryBadge as categoryBadgeCn,
  type1 as type1Cn,
  type2 as type2Cn,
  type3 as type3Cn,
  type4 as type4Cn,
} from './category-badge.module.scss';

interface CategoryBadgeProps {
  category: CategorySegment;
}

const hash = (str: string) => {
  let a = 1;
  let c = 0;
  let h;
  let o;

  if (str) {
    a = 0;

    for (h = str.length - 1; h >= 0; h--) {
      o = str.charCodeAt(h);
      a = ((a << 6) & 268435455) + o + (o << 14);
      c = a & 266338304;
      a = c !== 0 ? a ^ (c >> 21) : a;
    }
  }

  return String(a);
};

const getTypeCn = (category: CategorySegment): string => {
  const index = hash(category.name).charCodeAt(0) % 4;
  return [type1Cn, type2Cn, type3Cn, type4Cn][index];
};

export const CategoryBadge: FC<CategoryBadgeProps> = (props) => (
  <Tag
    className={clsx(categoryBadgeCn, getTypeCn(props.category))}
    size="md"
    to={categoryLink(props.category)}
    variant="plain"
  >
    {props.category.name}
  </Tag>
);
