import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { BookOpenIcon, NewspaperIcon } from 'lucide-react';
import type { ComponentProps, FC, ReactNode } from 'react';

import {
  CardAuthor,
  type CardAuthorProps,
  CardDate,
  type CardDateProps,
  CardDescription,
  type CardDescriptionProps,
  CardFooter,
  CardFooterGroup,
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
 * GridCard
 * -----------------------------------------------------------------------------------------------*/
const GRID_CARD_NAME = 'GridCard';

type GridCardProps = ComponentProps<'div'> & { asChild?: boolean };

const GridCard: FC<GridCardProps> = ({ asChild, className, ...rest }) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      {...rest}
      className={cn(
        '@container group block cursor-pointer rounded-default border border-border bg-card transition-all duration-200 hover:border-primary-a11/50 hover:bg-accent/50 hover:shadow-md',
        className
      )}
      data-slot="grid-card"
    />
  );
};

GridCard.displayName = GRID_CARD_NAME;

/* -------------------------------------------------------------------------------------------------
 * GridCardHeader
 * -----------------------------------------------------------------------------------------------*/
const GRID_CARD_HEADER_NAME = 'GridCardHeader';

type GridCardHeaderProps = ComponentProps<'div'>;

const GridCardHeader: FC<GridCardHeaderProps> = ({ className, ...rest }) => (
  <div
    {...rest}
    className={cn('flex items-center border-border border-b bg-muted/30 px-4 py-2', className)}
    data-slot="grid-card-header"
  />
);

GridCardHeader.displayName = GRID_CARD_HEADER_NAME;

/* -------------------------------------------------------------------------------------------------
 * GridCardHeaderContent
 * -----------------------------------------------------------------------------------------------*/
const GRID_CARD_HEADER_CONTENT_NAME = 'GridCardHeaderContent';

type GridCardHeaderContentProps = ComponentProps<'div'>;

const GridCardHeaderContent: FC<GridCardHeaderContentProps> = ({ className, ...rest }) => (
  <div
    {...rest}
    className={cn('flex min-w-0 flex-1 items-center space-x-2', className)}
    data-slot="grid-card-header-content"
  />
);

GridCardHeaderContent.displayName = GRID_CARD_HEADER_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * GridCardHeaderText
 * -----------------------------------------------------------------------------------------------*/
const GRID_CARD_HEADER_TEXT_NAME = 'GridCardHeaderText';

type GridCardHeaderTextProps = ComponentProps<'div'>;

const GridCardHeaderText: FC<GridCardHeaderTextProps> = ({ className, ...rest }) => (
  <div
    {...rest}
    className={cn('truncate font-mono text-muted-foreground text-sm', className)}
    data-slot="grid-card-header-text"
  />
);

GridCardHeaderText.displayName = GRID_CARD_HEADER_TEXT_NAME;

/* -------------------------------------------------------------------------------------------------
 * GridCardHeaderBullet
 * -----------------------------------------------------------------------------------------------*/
const GRID_CARD_HEADER_BULLET_NAME = 'GridCardHeaderBullet';

const gridCardHeaderBulletVariants = cva('ms-1 h-3 w-3 rounded-full', {
  variants: {
    color: {
      blue: 'bg-blue-9',
      green: 'bg-green-9',
      yellow: 'bg-amber-9',
    },
  },
});

type GridCardHeaderBulletProps = ComponentProps<'span'> &
  VariantProps<typeof gridCardHeaderBulletVariants> & {
    generateOn?: string;
  };

const colors = ['blue', 'green', 'yellow'] as const;

const getRandomColor = (seed: string) => {
  const index = seed.length % colors.length;
  return colors[index];
};

const GridCardHeaderBullet: FC<GridCardHeaderBulletProps> = ({ className, generateOn, color, ...rest }) => {
  const computedColor = color || (generateOn ? getRandomColor(generateOn) : null);

  return !computedColor ? null : (
    <span
      {...rest}
      className={cn(gridCardHeaderBulletVariants({ color: computedColor }), className)}
      data-slot="grid-card-header-bullet"
    />
  );
};

GridCardHeaderBullet.displayName = GRID_CARD_HEADER_BULLET_NAME;

/* -------------------------------------------------------------------------------------------------
 * GridCardContent
 * -----------------------------------------------------------------------------------------------*/
const GRID_CARD_CONTENT_NAME = 'GridCardContent';

type GridCardContentProps = ComponentProps<'div'>;

const GridCardContent: FC<GridCardContentProps> = ({ className, ...rest }) => (
  <div {...rest} className={cn('p-4', className)} data-slot="grid-card-content" />
);

GridCardContent.displayName = GRID_CARD_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * GridCardHeaderSeriesInfo
 * -----------------------------------------------------------------------------------------------*/
const GRID_CARD_SERIES_INFO_NAME = 'GridCardSeriesInfo';

type GridCardSeriesInfoProps = ComponentProps<'div'> & {
  title: string;
  progress: number;
  total: number;
};

const GridCardSeriesInfo: FC<GridCardSeriesInfoProps> = ({ className, title, progress, total, ...rest }) => (
  <div {...rest} className="mb-3 flex items-center space-x-1.5 text-primary text-sm" data-slot="grid-card-series-info">
    <BookOpenIcon className="@sm:block hidden" size={16} strokeWidth={1.5} />
    <span className="font-medium">{title}</span>
    <span className="text-muted-foreground">
      ({progress}/{total})
    </span>
  </div>
);

GridCardSeriesInfo.displayName = GRID_CARD_SERIES_INFO_NAME;

/* -------------------------------------------------------------------------------------------------
 * GridCardTitle
 * -----------------------------------------------------------------------------------------------*/
const GRID_CARD_TITLE_NAME = 'GridCardTitle';

type GridCardTitleProps = ComponentProps<'h3'>;

const GridCardTitle: FC<GridCardTitleProps> = ({ className, ...rest }) => (
  <h3
    {...rest}
    className={cn(
      'mb-2 line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary-a11 group-active:brightness-[0.92] group-active:saturate-[1.1]',
      className
    )}
    data-slot="grid-card-title"
  />
);

GridCardTitle.displayName = GRID_CARD_TITLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * GridCardSeriesTotal
 * -----------------------------------------------------------------------------------------------*/
const GRID_CARD_SERIES_TOTAL_NAME = 'GridCardSeriesTotal';

type GridCardSeriesTotalProps = ComponentProps<'span'> & { total: number };

const GridCardSeriesTotal: FC<GridCardSeriesTotalProps> = ({ className, total, ...rest }) => (
  <span
    {...rest}
    className={cn('flex items-center space-x-1 text-muted-foreground text-xs', className)}
    data-slot="grid-card-series-total"
  >
    <span>{total}</span>
    <NewspaperIcon size={14} strokeWidth={1.5} />
  </span>
);

GridCardSeriesTotal.displayName = GRID_CARD_SERIES_TOTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * SeriesDetail
 * -----------------------------------------------------------------------------------------------*/
const GRID_CARD_SERIES_DETAIL_NAME = 'GridCardSeriesDetail';

type GridCardSeriesDetailProps = ComponentProps<'div'> & {
  progressText: ReactNode;
  totalText: ReactNode;
  progress: number;
  total: number;
  readTime: ReactNode;
  readTimeText: ReactNode;
};

const GridCardSeriesDetail: FC<GridCardSeriesDetailProps> = ({
  className,
  progressText,
  totalText,
  progress,
  total,
  readTime,
  readTimeText,
  ...rest
}) => (
  <>
    <div {...rest} className={cn('mb-4', className)}>
      <div className="mb-1 flex items-center justify-between text-muted-foreground text-xs">
        <span>{progressText}</span>
        <span>100%</span>
      </div>
      <Progress value={(progress * 100) / total} />
    </div>

    <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
      <div className="rounded bg-muted/50 p-2 text-center">
        <div className="font-semibold text-foreground">{total}</div>
        <div className="text-muted-foreground text-xs">{totalText}</div>
      </div>
      <div className="rounded bg-muted/50 p-2 text-center">
        <div className="font-semibold text-foreground">{readTime}</div>
        <div className="text-muted-foreground text-xs">{readTimeText}</div>
      </div>
    </div>
  </>
);

GridCardSeriesDetail.displayName = GRID_CARD_SERIES_DETAIL_NAME;

const Root = GridCard;

const CardHeader = GridCardHeader;
const CardHeaderContent = GridCardHeaderContent;
const CardHeaderText = GridCardHeaderText;
const CardHeaderBullet = GridCardHeaderBullet;
const CardSeriesInfo = GridCardSeriesInfo;
const CardContent = GridCardContent;
const CardTitle = GridCardTitle;
const CardSeriesTotal = GridCardSeriesTotal;
const CardSeriesDetail = GridCardSeriesDetail;

const GridCardDescription = CardDescription;
const GridCardHeaderBadge = CardHeaderBadge;
const GridCardHeaderIcon = CardIcon;
const GridCardFooter = CardFooter;
const GridCardAuthor = CardAuthor;
const GridCardDate = CardDate;
const GridCardFooterGroup = CardFooterGroup;
const GridCardTagsList = CardTagsList;
const GridCardTag = CardTag;
const GridCardMoreTags = CardMoreTags;
const GridCardTextWithIcon = CardTextWithIcon;

export {
  GridCard,
  GridCardHeader,
  GridCardHeaderContent,
  GridCardHeaderText,
  GridCardHeaderBadge,
  GridCardHeaderBullet,
  GridCardHeaderIcon,
  GridCardSeriesInfo,
  GridCardContent,
  GridCardTitle,
  GridCardDescription,
  GridCardFooter,
  GridCardAuthor,
  GridCardDate,
  GridCardFooterGroup,
  GridCardTagsList,
  GridCardTag,
  GridCardMoreTags,
  GridCardTextWithIcon,
  GridCardSeriesTotal,
  GridCardSeriesDetail,
  //
  Root,
  CardHeader,
  CardHeaderContent,
  CardHeaderText,
  CardHeaderBadge,
  CardHeaderBullet,
  CardIcon,
  CardSeriesInfo,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAuthor,
  CardDate,
  CardFooterGroup,
  CardTagsList,
  CardTag,
  CardMoreTags,
  CardTextWithIcon,
  CardSeriesTotal,
  CardSeriesDetail,
};

type GridCardHeaderBadgeProps = CardHeaderBadgeProps;
type GridCardHeaderIconProps = CardIconProps;
type GridCardDescriptionProps = CardDescriptionProps;
type GridCardFooterProps = CardFooterProps;
type GridCardAuthorProps = CardAuthorProps;
type GridCardDateProps = CardDateProps;
type GridCardTagsListProps = CardTagsListProps;
type GridCardTagProps = CardTagProps;
type GridCardMoreTagsProps = CardMoreTagsProps;

export type {
  GridCardProps,
  GridCardHeaderProps,
  GridCardHeaderContentProps,
  GridCardHeaderTextProps,
  GridCardHeaderBadgeProps,
  GridCardHeaderBulletProps,
  GridCardHeaderIconProps,
  GridCardSeriesInfoProps,
  GridCardContentProps,
  GridCardTitleProps,
  GridCardDescriptionProps,
  GridCardFooterProps,
  GridCardAuthorProps,
  GridCardDateProps,
  GridCardTagsListProps,
  GridCardTagProps,
  GridCardMoreTagsProps,
  GridCardSeriesTotalProps,
  GridCardSeriesDetailProps,
};
