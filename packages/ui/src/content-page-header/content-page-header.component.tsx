// global modules
import cn from 'classnames';
import type { UrlObject } from 'url';
import { SmallTagBadge } from '@repo/ui/small-tag-badge';
import { SmallViewsBadge } from '@repo/ui/small-views-badge';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { SmallAuthorBadge } from '@repo/ui/small-author-badge';
import { PublishDateBadge } from '@repo/ui/small-publish-date-badge';

// local modules
import {
  top as topCn,
  cover as coverCn,
  title as titleCn,
  holder as holderCn,
  badgesHolder as badgesHolderCn,
} from './content-page-header.module.scss';
import { SmallCommentsCountBadge } from '../small-badges/comments-count-badge';

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
      <div className={cn(badgesHolderCn, topCn)}>
        {props.tags?.map((tag, index) => (
          <SmallTagBadge key={index} href={tag.href}>
            {tag.name}
          </SmallTagBadge>
        ))}
        {props.viewsCount ? <SmallViewsBadge>{props.viewsCount}</SmallViewsBadge> : null}
      </div>
    );

  const bottomBadges =
    !props.publishDate && !props.author ? null : (
      <div className={badgesHolderCn}>
        {props.publishDate ? <PublishDateBadge>{props.publishDate}</PublishDateBadge> : null}
        {props.author ? <SmallAuthorBadge {...props.author} /> : null}
        {props.commentsCount ? (
          <SmallCommentsCountBadge>{props.commentsCount}</SmallCommentsCountBadge>
        ) : null}
      </div>
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
