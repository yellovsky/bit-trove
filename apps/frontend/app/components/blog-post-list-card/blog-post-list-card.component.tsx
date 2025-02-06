// global modules
import type { BlogPostSegment } from '@repo/api-models';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// common modules
import { formatDate } from '~/utils/format-date';
import { getBlogpostRouteLink } from '~/utils/links';
import { Link } from '~/components/link';

// local modules
import {
  blogPostListCard as blogPostListCardCn,
  date as dateCn,
  text as textCn,
  title as titleCn,
} from './blog-post-list-card.module.scss';

interface BlogPostListCardProps {
  item: BlogPostSegment;
}

export const BlogPostListCard: FC<BlogPostListCardProps> = ({ item }) => {
  const { i18n } = useTranslation();

  const formattedDate = item.published_at
    ? formatDate(item.published_at, i18n.language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <Link className={blogPostListCardCn} to={getBlogpostRouteLink(item)} variant="standalone">
      <h5 className={titleCn}>{item.title}</h5>
      <div className={dateCn}>{formattedDate}</div>
      <div className={textCn}>{item.short_description}</div>
    </Link>
  );
};
