import { Slot } from '@radix-ui/react-slot';
import { ChevronRightIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

import {
  CardAuthor,
  type CardAuthorProps,
  CardDate,
  type CardDateProps,
  CardDescription,
  type CardDescriptionProps,
  CardFooter,
  type CardFooterProps,
  CardHeaderBadge,
  type CardHeaderBadgeProps,
  CardIcon,
  type CardIconProps,
  CardMoreTags,
  type CardMoreTagsProps,
  CardTag,
  type CardTagProps,
  CardTagsList,
  type CardTagsListProps,
  CardTextWithIcon,
} from '@repo/ui/components/Card';
import { Progress } from '@repo/ui/components/Progress';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * ListCard
 * -----------------------------------------------------------------------------------------------*/
const LIST_CARD_NAME = 'ListCard';

type ListCardProps = ComponentProps<'div'> & { asChild?: boolean };

const ListCard: FC<ListCardProps> = ({ asChild, className, ...rest }) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      {...rest}
      className={cn(
        '@container group flex cursor-pointer items-center space-x-4 rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-primary-a11/50 hover:shadow-md',
        className
      )}
      data-slot="list-card"
    />
  );
};

ListCard.displayName = LIST_CARD_NAME;

/* -------------------------------------------------------------------------------------------------
 * ListCardHeader
 * -----------------------------------------------------------------------------------------------*/
const LIST_CARD_HEADER_NAME = 'ListCardHeader';

type ListCardHeaderProps = ComponentProps<'div'>;

const ListCardHeader: FC<ListCardHeaderProps> = ({ className, ...rest }) => (
  <div {...rest} className={cn('mb-1 flex items-center space-x-2', className)} data-slot="list-card-header" />
);

ListCardHeader.displayName = LIST_CARD_HEADER_NAME;

/* -------------------------------------------------------------------------------------------------
 * ListCardContent
 * -----------------------------------------------------------------------------------------------*/
const LIST_CARD_CONTENT_NAME = 'ListCardContent';

type ListCardContentProps = ComponentProps<'div'>;

const ListCardContent: FC<ListCardContentProps> = ({ className, ...rest }) => (
  <div {...rest} className={cn('min-w-0 flex-1', className)} data-slot="list-card-content" />
);

ListCardContent.displayName = LIST_CARD_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * ListCardTitle
 * -----------------------------------------------------------------------------------------------*/
const LIST_CARD_TITLE_NAME = 'ListCardTitle';

type ListCardTitleProps = ComponentProps<'h3'>;

const ListCardTitle: FC<ListCardTitleProps> = ({ className, ...rest }) => (
  <h3
    className={cn(
      'className="truncate font-medium text-foreground transition-colors group-hover:text-primary-a11 group-active:brightness-[0.92] group-active:saturate-[1.1]',
      className
    )}
    data-slot="list-card-title"
    {...rest}
  />
);

ListCardTitle.displayName = LIST_CARD_TITLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * ListCardAside
 * -----------------------------------------------------------------------------------------------*/
const LIST_CARD_ASIDE_NAME = 'ListCardAside';

type ListCardAsideProps = ComponentProps<'span'>;

const ListCardAside: FC<ListCardAsideProps> = ({ className, ...rest }) => (
  <span
    {...rest}
    className={cn('flex flex-shrink-0 items-center space-x-1', className)}
    data-slot="grid-card-series-total"
  />
);

ListCardAside.displayName = LIST_CARD_ASIDE_NAME;

/* -------------------------------------------------------------------------------------------------
 * ListCardSeriesDetail
 * -----------------------------------------------------------------------------------------------*/
const LIST_CARD_SERIES_DETAIL_NAME = 'ListCardSeriesDetail';

type ListCardSeriesDetailProps = ComponentProps<'div'> & {
  progressPercentage: number;
};

const ListCardSeriesDetail: FC<ListCardSeriesDetailProps> = ({ className, progressPercentage, ...rest }) => (
  <div className={cn('text-right', className)} {...rest} data-slot="list-card-series-detail">
    <div className="mb-2 font-medium text-foreground text-xs">{progressPercentage}%</div>
    <Progress value={progressPercentage} />
  </div>
);

ListCardSeriesDetail.displayName = LIST_CARD_SERIES_DETAIL_NAME;

/* -------------------------------------------------------------------------------------------------
 * ListCardFooter
 * -----------------------------------------------------------------------------------------------*/
const LIST_CARD_FOOTER_NAME = 'ListCardFooter';

type ListCardFooterProps = CardFooterProps;

const ListCardFooter: FC<ListCardFooterProps> = ({ className, ...rest }) => (
  <CardFooter {...rest} className={cn('justify-start', className)} data-slot="list-card-footer" />
);

ListCardFooter.displayName = LIST_CARD_FOOTER_NAME;

/* -------------------------------------------------------------------------------------------------
 * ListCardArrow
 * -----------------------------------------------------------------------------------------------*/
const LIST_CARD_ARROW_NAME = 'ListCardArrow';

type ListCardArrowProps = ComponentProps<typeof ChevronRightIcon>;

const ListCardArrow: FC<ListCardArrowProps> = ({ className, ...rest }) => (
  <ChevronRightIcon
    {...rest}
    className={cn('group-hover:text-primary-a11 group-active:brightness-[0.92] group-active:saturate-[1.1]', className)}
    data-slot="list-card-arrow"
  />
);

ListCardArrow.displayName = LIST_CARD_ARROW_NAME;

const Root = ListCard;

const CardHeader = ListCardHeader;
const CardContent = ListCardContent;
const CardTitle = ListCardTitle;
const CardSeriesDetail = ListCardSeriesDetail;
const CardAside = ListCardAside;
const CardArrow = ListCardArrow;

const ListCardHeaderBadge = CardHeaderBadge;
const ListCardDescription = CardDescription;
const ListCardAuthor = CardAuthor;
const ListCardDate = CardDate;
const ListCardTagsList = CardTagsList;
const ListCardTag = CardTag;
const ListCardMoreTags = CardMoreTags;
const ListCardTextWithIcon = CardTextWithIcon;
const ListCardIcon = CardIcon;

export {
  ListCard,
  ListCardHeader,
  ListCardIcon,
  ListCardContent,
  ListCardTitle,
  ListCardDescription,
  ListCardFooter,
  ListCardAuthor,
  ListCardDate,
  ListCardTagsList,
  ListCardTag,
  ListCardMoreTags,
  ListCardTextWithIcon,
  ListCardSeriesDetail,
  ListCardHeaderBadge,
  ListCardArrow,
  //
  Root,
  CardHeader,
  CardContent,
  CardAside,
  CardIcon,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAuthor,
  CardDate,
  CardHeaderBadge,
  CardTagsList,
  CardTag,
  CardMoreTags,
  CardTextWithIcon,
  CardSeriesDetail,
  CardArrow,
};

type ListCardDateProps = CardDateProps;
type ListCardAuthorProps = CardAuthorProps;
type ListCardTagsListProps = CardTagsListProps;
type ListCardTagProps = CardTagProps;
type ListCardMoreTagsProps = CardMoreTagsProps;
type ListCardHeaderBadgeProps = CardHeaderBadgeProps;
type ListCardDescriptionProps = CardDescriptionProps;
type ListCardIconProps = CardIconProps;

export type {
  ListCardAuthorProps,
  ListCardProps,
  ListCardHeaderProps,
  ListCardContentProps,
  ListCardTitleProps,
  ListCardIconProps,
  ListCardDescriptionProps,
  ListCardFooterProps,
  ListCardDateProps,
  ListCardTagsListProps,
  ListCardTagProps,
  ListCardMoreTagsProps,
  ListCardSeriesDetailProps,
  ListCardAsideProps,
  ListCardHeaderBadgeProps,
};
