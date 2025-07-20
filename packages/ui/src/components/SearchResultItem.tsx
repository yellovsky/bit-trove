import { Slot } from '@radix-ui/react-slot';
import { ArrowRightIcon, CalendarIcon, ClockIcon, FolderIcon, UserIcon } from 'lucide-react';
import type { ComponentProps, FC, ReactNode } from 'react';

import { Badge } from '@repo/ui/components/Badge';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  slug: string;
  filename?: string;
  type?: string;
  category?: string;
  author?: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
  matchType?: string;
}

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export interface SearchSuggestion {
  query: string;
  type: 'history' | 'suggestion';
  relevance: number;
}

export interface SearchError {
  message: string;
  type: 'network' | 'validation' | 'server' | 'unknown';
  retryable: boolean;
  originalError?: Error;
}

/* -------------------------------------------------------------------------------------------------
 * SearchResultItem
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_NAME = 'SearchResultItem';

type SearchResultItemProps = ComponentProps<'div'> & { asChild?: boolean };

const SearchResultItem: FC<SearchResultItemProps> = ({ asChild, className, ...rest }) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      {...rest}
      className={cn(
        '@container group flex cursor-pointer items-start space-x-3 rounded-lg bg-accent p-3 transition-colors hover:bg-accent/80',
        className
      )}
      data-slot="search-result-item"
    />
  );
};

SearchResultItem.displayName = SEARCH_RESULT_ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemIcon
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_ICON_NAME = 'SearchResultItemIcon';

type SearchResultItemIconProps = ComponentProps<'div'>;

const SearchResultItemIcon: FC<SearchResultItemIconProps> = ({ className, ...rest }) => (
  <div
    {...rest}
    className={cn('mt-1 @sm:block hidden flex-shrink-0 [&>svg]:size-4', className)}
    data-slot="search-result-item-icon"
  />
);

SearchResultItemIcon.displayName = SEARCH_RESULT_ITEM_ICON_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemContent
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_CONTENT_NAME = 'SearchResultItemContent';

type SearchResultItemContentProps = ComponentProps<'div'>;

const SearchResultItemContent: FC<SearchResultItemContentProps> = ({ className, ...rest }) => (
  <div {...rest} className={cn('min-w-0 flex-1', className)} data-slot="search-result-item-content" />
);

SearchResultItemContent.displayName = SEARCH_RESULT_ITEM_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemHeader
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_HEADER_NAME = 'SearchResultItemHeader';

type SearchResultItemHeaderProps = ComponentProps<'div'>;

const SearchResultItemHeader: FC<SearchResultItemHeaderProps> = ({ className, ...rest }) => (
  <div
    {...rest}
    className={cn('mb-1 flex items-center space-x-2 truncate', className)}
    data-slot="search-result-item-header"
  />
);

SearchResultItemHeader.displayName = SEARCH_RESULT_ITEM_HEADER_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemTitle
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_TITLE_NAME = 'SearchResultItemTitle';

type SearchResultItemTitleProps = ComponentProps<'h3'>;

const SearchResultItemTitle: FC<SearchResultItemTitleProps> = ({ className, ...rest }) => (
  <h3
    {...rest}
    className={cn('mb-1 font-medium text-foreground transition-colors group-hover:text-primary', className)}
    data-slot="search-result-item-title"
  />
);

SearchResultItemTitle.displayName = SEARCH_RESULT_ITEM_TITLE_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemDescription
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_DESCRIPTION_NAME = 'SearchResultItemDescription';

type SearchResultItemDescriptionProps = ComponentProps<'p'>;

const SearchResultItemDescription: FC<SearchResultItemDescriptionProps> = ({ className, ...rest }) => (
  <p
    {...rest}
    className={cn('mb-2 line-clamp-2 text-muted-foreground text-sm', className)}
    data-slot="search-result-item-description"
  />
);

SearchResultItemDescription.displayName = SEARCH_RESULT_ITEM_DESCRIPTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemCategory
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_CATEGORY_NAME = 'SearchResultItemCategory';

type SearchResultItemCategoryProps = ComponentProps<'div'>;

const SearchResultItemCategory: FC<SearchResultItemCategoryProps> = ({ className, ...rest }) => (
  <div
    {...rest}
    className={cn('mb-2 flex items-center space-x-1 text-primary text-xs', className)}
    data-slot="search-result-item-category"
  />
);

SearchResultItemCategory.displayName = SEARCH_RESULT_ITEM_CATEGORY_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemFooter
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_FOOTER_NAME = 'SearchResultItemFooter';

type SearchResultItemFooterProps = ComponentProps<'div'>;

const SearchResultItemFooter: FC<SearchResultItemFooterProps> = ({ className, ...rest }) => (
  <div
    {...rest}
    className={cn('flex items-center justify-between text-muted-foreground text-xs', className)}
    data-slot="search-result-item-footer"
  />
);

SearchResultItemFooter.displayName = SEARCH_RESULT_ITEM_FOOTER_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemMeta
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_META_NAME = 'SearchResultItemMeta';

type SearchResultItemMetaProps = ComponentProps<'div'>;

const SearchResultItemMeta: FC<SearchResultItemMetaProps> = ({ className, ...rest }) => (
  <div {...rest} className={cn('flex flex-wrap items-center gap-2', className)} data-slot="search-result-item-meta" />
);

SearchResultItemMeta.displayName = SEARCH_RESULT_ITEM_META_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemTags
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_TAGS_NAME = 'SearchResultItemTags';

type SearchResultItemTagsProps = ComponentProps<'div'>;

const SearchResultItemTags: FC<SearchResultItemTagsProps> = ({ className, ...rest }) => (
  <div {...rest} className={cn('mt-2 flex flex-wrap gap-1', className)} data-slot="search-result-item-tags" />
);

SearchResultItemTags.displayName = SEARCH_RESULT_ITEM_TAGS_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemArrow
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_ARROW_NAME = 'SearchResultItemArrow';

type SearchResultItemArrowProps = ComponentProps<typeof ArrowRightIcon>;

const SearchResultItemArrow: FC<SearchResultItemArrowProps> = ({ className, ...rest }) => (
  <ArrowRightIcon
    {...rest}
    className={cn('mt-1 h-4 w-4 flex-shrink-0 opacity-100 transition-opacity group-hover:text-primary', className)}
    data-slot="search-result-item-arrow"
  />
);

SearchResultItemArrow.displayName = SEARCH_RESULT_ITEM_ARROW_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemTextWithIcon
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_TEXT_WITH_ICON_NAME = 'SearchResultItemTextWithIcon';

type SearchResultItemTextWithIconProps = ComponentProps<'div'> & { icon: ReactNode };

const SearchResultItemTextWithIcon: FC<SearchResultItemTextWithIconProps> = ({
  icon,
  children,
  className,
  ...rest
}) => (
  <div {...rest} className={cn('flex items-center space-x-1', className)} data-slot="search-result-item-text-with-icon">
    {icon}
    <span className="truncate">{children}</span>
  </div>
);

SearchResultItemTextWithIcon.displayName = SEARCH_RESULT_ITEM_TEXT_WITH_ICON_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemAuthor
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_AUTHOR_NAME = 'SearchResultItemAuthor';

type SearchResultItemAuthorProps = ComponentProps<'div'>;

const SearchResultItemAuthor: FC<SearchResultItemAuthorProps> = (props) => (
  <SearchResultItemTextWithIcon
    {...props}
    data-slot="search-result-item-author"
    icon={<UserIcon data-slot="search-result-item-author-icon" size={12} strokeWidth={1.5} />}
  />
);

SearchResultItemAuthor.displayName = SEARCH_RESULT_ITEM_AUTHOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemDate
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_DATE_NAME = 'SearchResultItemDate';

type SearchResultItemDateProps = ComponentProps<'div'>;

const SearchResultItemDate: FC<SearchResultItemDateProps> = (props) => (
  <SearchResultItemTextWithIcon
    {...props}
    data-slot="search-result-item-date"
    icon={<CalendarIcon data-slot="search-result-item-date-icon" size={12} strokeWidth={1.5} />}
  />
);

SearchResultItemDate.displayName = SEARCH_RESULT_ITEM_DATE_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemReadingTime
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_READING_TIME_NAME = 'SearchResultItemReadingTime';

type SearchResultItemReadingTimeProps = ComponentProps<'div'>;

const SearchResultItemReadingTime: FC<SearchResultItemReadingTimeProps> = (props) => (
  <SearchResultItemTextWithIcon
    {...props}
    data-slot="search-result-item-reading-time"
    icon={<ClockIcon data-slot="search-result-item-reading-time-icon" size={12} strokeWidth={1.5} />}
  />
);

SearchResultItemReadingTime.displayName = SEARCH_RESULT_ITEM_READING_TIME_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemCategoryIcon
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_CATEGORY_ICON_NAME = 'SearchResultItemCategoryIcon';

type SearchResultItemCategoryIconProps = ComponentProps<'div'>;

const SearchResultItemCategoryIcon: FC<SearchResultItemCategoryIconProps> = (props) => (
  <SearchResultItemTextWithIcon
    {...props}
    data-slot="search-result-item-category-icon"
    icon={<FolderIcon data-slot="search-result-item-category-icon-svg" size={12} strokeWidth={1.5} />}
  />
);

SearchResultItemCategoryIcon.displayName = SEARCH_RESULT_ITEM_CATEGORY_ICON_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemTag
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_TAG_NAME = 'SearchResultItemTag';

type SearchResultItemTagProps = ComponentProps<typeof Badge>;

const SearchResultItemTag: FC<SearchResultItemTagProps> = (props) => (
  <Badge {...props} className="font-mono text-xs" data-slot="search-result-item-tag" variant="secondary" />
);

SearchResultItemTag.displayName = SEARCH_RESULT_ITEM_TAG_NAME;

/* -------------------------------------------------------------------------------------------------
 * SearchResultItemMoreTags
 * -----------------------------------------------------------------------------------------------*/
const SEARCH_RESULT_ITEM_MORE_TAGS_NAME = 'SearchResultItemMoreTags';

type SearchResultItemMoreTagsProps = ComponentProps<'span'>;

const SearchResultItemMoreTags: FC<SearchResultItemMoreTagsProps> = ({ className, ...rest }) => (
  <span {...rest} className={cn('text-muted-foreground text-xs', className)} data-slot="search-result-item-more-tags" />
);

SearchResultItemMoreTags.displayName = SEARCH_RESULT_ITEM_MORE_TAGS_NAME;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const Root = SearchResultItem;
const Icon = SearchResultItemIcon;
const Content = SearchResultItemContent;
const Header = SearchResultItemHeader;
const Title = SearchResultItemTitle;
const Description = SearchResultItemDescription;
const Category = SearchResultItemCategory;
const Footer = SearchResultItemFooter;
const Meta = SearchResultItemMeta;
const Tags = SearchResultItemTags;
const Arrow = SearchResultItemArrow;
const TextWithIcon = SearchResultItemTextWithIcon;
const Author = SearchResultItemAuthor;
const DateComponent = SearchResultItemDate;
const ReadingTime = SearchResultItemReadingTime;
const CategoryIcon = SearchResultItemCategoryIcon;
const Tag = SearchResultItemTag;
const MoreTags = SearchResultItemMoreTags;

export {
  SearchResultItem,
  SearchResultItemIcon,
  SearchResultItemContent,
  SearchResultItemHeader,
  SearchResultItemTitle,
  SearchResultItemDescription,
  SearchResultItemCategory,
  SearchResultItemFooter,
  SearchResultItemMeta,
  SearchResultItemTags,
  SearchResultItemArrow,
  SearchResultItemTextWithIcon,
  SearchResultItemAuthor,
  SearchResultItemDate,
  SearchResultItemReadingTime,
  SearchResultItemCategoryIcon,
  SearchResultItemTag,
  SearchResultItemMoreTags,
  //
  Root,
  Icon,
  Content,
  Header,
  Title,
  Description,
  Category,
  Footer,
  Meta,
  Tags,
  Arrow,
  TextWithIcon,
  Author,
  DateComponent,
  ReadingTime,
  CategoryIcon,
  Tag,
  MoreTags,
};

export type {
  SearchResultItemProps,
  SearchResultItemIconProps,
  SearchResultItemContentProps,
  SearchResultItemHeaderProps,
  SearchResultItemTitleProps,
  SearchResultItemDescriptionProps,
  SearchResultItemCategoryProps,
  SearchResultItemFooterProps,
  SearchResultItemMetaProps,
  SearchResultItemTagsProps,
  SearchResultItemArrowProps,
  SearchResultItemTextWithIconProps,
  SearchResultItemAuthorProps,
  SearchResultItemDateProps,
  SearchResultItemReadingTimeProps,
  SearchResultItemCategoryIconProps,
  SearchResultItemTagProps,
  SearchResultItemMoreTagsProps,
};
