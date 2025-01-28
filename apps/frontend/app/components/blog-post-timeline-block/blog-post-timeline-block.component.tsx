// global modules
import type { BlogPostSegment } from '@repo/api-models';
import clsx from 'clsx';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// common modules
import { formatDate } from '~/utils/format-date';
import { Link } from '~/components/link';

// local modules
import { BlogPostTimelineBlockPending } from './blog-post-timeline-block.pending';

import {
  blogPostListCard as blogPostListCardCn,
  date as dateCn,
  text as textCn,
  title as titleCn,
} from './blog-post-timeline-block.module.scss';

export interface BlogPostTimelineBlockProps {
  pending?: boolean;
  className?: string;
  item: BlogPostSegment;
}

export const BlogPostTimelineBlock: FC<BlogPostTimelineBlockProps> = props => {
  const { i18n } = useTranslation();

  const formattedDate = props.item.published_at
    ? formatDate(props.item.published_at, i18n.language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return props.pending ? (
    <BlogPostTimelineBlockPending />
  ) : (
    <Link
      className={clsx(props.className, blogPostListCardCn)}
      to={`/blog/${props.item.slug}`}
      variant="standalone"
    >
      <h5 className={titleCn}>{props.item.title}</h5>
      <div className={dateCn}>{formattedDate}</div>
      <div className={textCn}>{props.item.short_description}</div>
    </Link>
  );
};
