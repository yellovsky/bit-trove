// global modules
import clsx from 'clsx';
import type { FC } from 'react';

// local modules
import {
  blogPostListCard as blogPostListCardCn,
  date as dateCn,
  pending as pendingCn,
  text as textCn,
  title as titleCn,
} from './blog-post-timeline-block.module.scss';

export const BlogPostTimelineBlockPending: FC = () => (
  <div className={clsx(blogPostListCardCn, pendingCn)} role="status">
    <h5 className={clsx(titleCn, pendingCn)} />
    <div className={clsx(dateCn, pendingCn)} />
    <div className={clsx(textCn, pendingCn)} />
    <div className={clsx(textCn, pendingCn)} />
  </div>
);
