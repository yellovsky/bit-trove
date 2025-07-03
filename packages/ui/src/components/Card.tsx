import { cva, type VariantProps } from 'class-variance-authority';
import { CalendarIcon, UserIcon } from 'lucide-react';
import type { ComponentProps, FC, ReactNode } from 'react';

import { cn } from '../lib/utils';
import { Badge } from './Badge';

const icons = ['📘', '📄', '🦀', '💡', '📝', '💭'] as const;

const getRandomIcon = (seed: string) => {
  const index = seed.length % icons.length;
  return icons[index];
};

/* -------------------------------------------------------------------------------------------------
 * CardIcon
 * -----------------------------------------------------------------------------------------------*/
const CARD_ICON_NAME = 'CardIcon';

type CardIconProps = ComponentProps<'div'> & { generateOn?: string };

const CardIcon: FC<CardIconProps> = ({ className, generateOn, children, ...rest }) => {
  const content = children || (generateOn ? getRandomIcon(generateOn) : null);

  return (
    <div {...rest} className={cn('text-sm', className)} data-slot="card-header-icon">
      {content}
    </div>
  );
};

CardIcon.displayName = CARD_ICON_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardHeaderBadge
 * -----------------------------------------------------------------------------------------------*/
const CARD_HEADER_BADGE_NAME = 'CardHeaderBadge';

const cardHeaderBadgeVariants = cva('ms-1 rounded px-1.5 py-0.5 text-xs uppercase', {
  variants: {
    color: {
      blue: 'bg-blue-4 text-blue-11',
      green: 'bg-green-4 text-green-11',
      yellow: 'bg-amber-4 text-amber-11',
    },
  },
});

type CardHeaderBadgeProps = ComponentProps<'span'> & VariantProps<typeof cardHeaderBadgeVariants>;

const CardHeaderBadge: FC<CardHeaderBadgeProps> = ({ className, color, ...rest }) =>
  !rest.children ? null : (
    <span {...rest} className={cn(cardHeaderBadgeVariants({ color }), className)} data-slot="card-header-badge" />
  );

CardHeaderBadge.displayName = CARD_HEADER_BADGE_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardDescription
 * -----------------------------------------------------------------------------------------------*/
const CARD_DESCRIPTION_NAME = 'CardDescription';

type CardDescriptionProps = ComponentProps<'p'>;

const CardDescription: FC<CardDescriptionProps> = ({ className, ...rest }) => (
  <p
    {...rest}
    className={cn('mb-2 line-clamp-3 text-muted-foreground text-sm', className)}
    data-slot="card-description"
  />
);

CardDescription.displayName = CARD_DESCRIPTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardFooter
 * -----------------------------------------------------------------------------------------------*/
const CARD_FOOTER_NAME = 'CardFooter';

type CardFooterProps = ComponentProps<'div'>;

const CardFooter: FC<CardFooterProps> = ({ className, ...rest }) => (
  <div
    {...rest}
    className={cn('flex flex-wrap items-center justify-between gap-2 text-muted-foreground text-xs', className)}
    data-slot="card-footer"
  />
);

CardFooter.displayName = CARD_FOOTER_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardFooterGroup
 * -----------------------------------------------------------------------------------------------*/
const CARD_FOOTER_GROUP_NAME = 'CardFooterGroup';

type CardFooterGroupProps = ComponentProps<'div'>;

const CardFooterGroup: FC<CardFooterGroupProps> = ({ className, ...rest }) => (
  <div {...rest} className={cn('flex flex-wrap items-center gap-2', className)} data-slot="card-footer-group" />
);

CardFooterGroup.displayName = CARD_FOOTER_GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardTextWithIcon
 * -----------------------------------------------------------------------------------------------*/
const CARD_TEXT_WITH_ICON_NAME = 'CardTextWithIcon';

type CardTextWithIconProps = ComponentProps<'div'> & { icon: ReactNode };

const CardTextWithIcon: FC<CardTextWithIconProps> = ({ icon, children, ...rest }) => (
  <div className="flex items-center space-x-1" data-slot="card-text-with-icon" {...rest}>
    {icon}
    <span className="truncate">{children}</span>
  </div>
);

CardTextWithIcon.displayName = CARD_TEXT_WITH_ICON_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardAuthor
 * -----------------------------------------------------------------------------------------------*/
const CARD_AUTHOR_NAME = 'CardAuthor';

type CardAuthorProps = ComponentProps<'div'>;

const CardAuthor: FC<CardAuthorProps> = (props) => (
  <CardTextWithIcon
    {...props}
    data-slot="card-author"
    icon={<UserIcon data-slot="card-author-icon" size={14} strokeWidth={1.5} />}
  />
);

CardAuthor.displayName = CARD_AUTHOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardDate
 * -----------------------------------------------------------------------------------------------*/
const CARD_DATE_NAME = 'CardDate';

type CardDateProps = ComponentProps<'div'>;

const CardDate: FC<CardDateProps> = (props) => (
  <CardTextWithIcon
    {...props}
    data-slot="card-date"
    icon={<CalendarIcon data-slot="card-date-icon" size={14} strokeWidth={1.5} />}
  />
);

CardDate.displayName = CARD_DATE_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardTagsList
 * -----------------------------------------------------------------------------------------------*/
const CARD_TAGS_LIST_NAME = 'CardTagsList';

type CardTagsListProps = ComponentProps<'div'>;

const CardTagsList: FC<CardTagsListProps> = ({ className, ...rest }) => (
  <div {...rest} className={cn('mb-4 flex flex-wrap items-center gap-1', className)} data-slot="card-tags-list" />
);

CardTagsList.displayName = CARD_TAGS_LIST_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardTag
 * -----------------------------------------------------------------------------------------------*/
const CARD_TAG_NAME = 'CardTag';

type CardTagProps = ComponentProps<typeof Badge>;

const CardTag: FC<CardTagProps> = (props) => <Badge {...props} data-slot="card-tag" />;

CardTag.displayName = CARD_TAG_NAME;

/* -------------------------------------------------------------------------------------------------
 * CardMoreTags
 * -----------------------------------------------------------------------------------------------*/
const CARD_MORE_TAGS_NAME = 'CardMoreTags';

type CardMoreTagsProps = ComponentProps<'span'>;

const CardMoreTags: FC<CardMoreTagsProps> = ({ className, ...rest }) => (
  <span {...rest} className={cn('text-muted-foreground text-xs', className)} data-slot="card-more-tags" />
);

CardMoreTags.displayName = CARD_MORE_TAGS_NAME;

const HeaderBadge = CardHeaderBadge;
const HeaderIcon = CardIcon;
const Description = CardDescription;
const Footer = CardFooter;
const Author = CardAuthor;
const FooterGroup = CardFooterGroup;
const TagsList = CardTagsList;
const Tag = CardTag;
const MoreTags = CardMoreTags;
const TextWithIcon = CardTextWithIcon;

export {
  CardHeaderBadge,
  CardIcon,
  CardDescription,
  CardFooter,
  CardAuthor,
  CardDate,
  CardFooterGroup,
  CardTagsList,
  CardTag,
  CardMoreTags,
  CardTextWithIcon,
  //
  HeaderBadge,
  HeaderIcon,
  Description,
  Footer,
  Author,
  FooterGroup,
  TagsList,
  Tag,
  MoreTags,
  TextWithIcon,
};

export type {
  CardHeaderBadgeProps,
  CardIconProps,
  CardDescriptionProps,
  CardFooterProps,
  CardAuthorProps,
  CardDateProps,
  CardTagsListProps,
  CardTagProps,
  CardMoreTagsProps,
};
