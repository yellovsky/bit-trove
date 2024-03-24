// global modules
import cn from 'classnames';
import type { UrlObject } from 'url';
import { SmallTagBadge } from '@repo/ui/small-tag-badge';
import { SmallViewsBadge } from '@repo/ui/small-views-badge';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { SmallAuthorBadge } from '@repo/ui/small-author-badge';
import { SmallBadgesHolder } from '@repo/ui/small-badges-holder';
import { PublishDateBadge } from '@repo/ui/small-publish-date-badge';
import { SmallCommentsCountBadge } from '@repo/ui/small-comments-count-badge';

// local modules
import {
  topBadges as topBadgesCn,
  cover as coverCn,
  title as titleCn,
  holder as holderCn,
} from './content-page-header.module.scss';

interface ContentPageHeaderProps extends PropsWithChildren {
  publishedBy?: null;
  viewsCount?: ReactNode;
  publishDate?: ReactNode;
  commentsCount?: number;
  tags?: Array<{ href: string | UrlObject; name: string }>;
  className?: string;
  cover?: string;
  author?: {
    avatar?: string;
    name: string;
    href: string | UrlObject;
  };
}

export const ContentPageHeader: FC<ContentPageHeaderProps> = (props) => {
  const topBadges =
    !props.tags?.length && !props.viewsCount ? null : (
      <SmallBadgesHolder className={topBadgesCn}>
        {props.tags?.map((tag, index) => (
          <SmallTagBadge key={index} href={tag.href}>
            {tag.name}
          </SmallTagBadge>
        ))}
        {props.viewsCount ? <SmallViewsBadge>{props.viewsCount}</SmallViewsBadge> : null}
      </SmallBadgesHolder>
    );

  const bottomBadges =
    !props.publishDate && !props.author ? null : (
      <SmallBadgesHolder>
        {props.publishDate ? <PublishDateBadge>{props.publishDate}</PublishDateBadge> : null}
        {props.author ? <SmallAuthorBadge {...props.author} /> : null}
        {props.commentsCount ? (
          <SmallCommentsCountBadge>{props.commentsCount}</SmallCommentsCountBadge>
        ) : null}
      </SmallBadgesHolder>
    );

  return (
    <>
      <div className={cn(props.className, holderCn)}>
        {topBadges}
        <h1 className={titleCn}>{props.children}</h1>
        {bottomBadges}
      </div>
      {props.cover ? <img className={coverCn} src={props.cover} /> : null}
    </>
  );
};
