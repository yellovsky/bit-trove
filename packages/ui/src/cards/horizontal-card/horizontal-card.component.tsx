'use client';

// global modules
import { apiHost } from '@bit-trove/utils/api-host';
import type { AuthorSegment } from '@bit-trove/api-models/author';
import clsx from 'clsx';
import Image from 'next/image';
import { Link } from '@bit-trove/localization/link';
// import { PublishDateBadge } from '@bit-trove/ui/small-publish-date-badge';
// import { SmallAuthorBadge } from '@bit-trove/ui/small-author-badge';
// import { SmallBadgesHolder } from '@bit-trove/ui/small-badges-holder';
// import { SmallTagBadge } from '@bit-trove/ui/small-tag-badge';
// import { Title } from '@bit-trove/ui/title';
import type { UrlObject } from 'url';
import { useRouter } from '@bit-trove/localization/navigation';
import { type FC, type MouseEventHandler, type ReactNode, useCallback } from 'react';
import { filterByTagLink, type TagSegment } from '@bit-trove/api-models/tag';
import { imgLoader, type UploadFile } from '@bit-trove/api-models/upload-file';

// local modules
import {
  content as contentCn,
  description as descriptionCn,
  horizontalCard as horizontalCardCn,
  img as imgCn,
  imgHolder as imgHolderCn,
  pending as pendingCn,
  title as titleCn,
  withoutImg as withoutImgCn,
} from './horizontal-card.module.scss';

interface HorizontalCardProps {
  img?: UploadFile;
  title: ReactNode;
  tags?: TagSegment[];
  description: ReactNode;
  author?: AuthorSegment;
  href: string | UrlObject;
  withoutImg?: boolean;
  publishedAt?: string | number | Date;
}

export const HorizontalCard: FC<HorizontalCardProps> = (props) => {
  const router = useRouter();

  const handleTagClick = useCallback(
    (tag: TagSegment): MouseEventHandler<HTMLButtonElement> =>
      (event) => {
        event.stopPropagation();
        event.preventDefault();
        router.push(filterByTagLink(tag));
      },
    []
  );
  return (
    <Link className={clsx(horizontalCardCn, props.withoutImg && withoutImgCn)} href={props.href}>
      {props.withoutImg ? null : (
        <div className={imgHolderCn}>
          {!props.img ? null : (
            <Image
              fill
              alt={props.img.alternativeText || 'card image'}
              className={imgCn}
              loader={imgLoader(props.img)}
              src={apiHost(props.img.url)}
            />
          )}
        </div>
      )}

      <div className={contentCn}>
        {/* <Title as="h4" className={titleCn}>
          {props.title}
        </Title> */}

        {/* <SmallBadgesHolder>
          {!props.publishedAt ? null : <PublishDateBadge date={props.publishedAt} />}
          {!props.author ? null : <SmallAuthorBadge author={props.author} />}
        </SmallBadgesHolder> */}

        <div className={descriptionCn}>{props.description}</div>

        {/* <SmallBadgesHolder>
          {props.tags?.map((tag, index) => (
            <SmallTagBadge key={index} onClick={handleTagClick(tag)}>
              {tag.name}
            </SmallTagBadge>
          ))}
        </SmallBadgesHolder> */}
      </div>
    </Link>
  );
};

export const HorizontalCardPending: FC = () => <div className={pendingCn} />;
