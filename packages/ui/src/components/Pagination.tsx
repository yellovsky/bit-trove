import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

import { buttonVariants } from '@repo/ui/components/Button';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * TooltipProvider
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Pagination';

type PaginationProps = ComponentProps<'nav'>;

const Pagination: FC<PaginationProps> = ({ className, ...props }) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    data-slot="pagination"
    {...props}
  />
);

Pagination.displayName = NAME;

/* -------------------------------------------------------------------------------------------------
 * PaginationContent
 * -----------------------------------------------------------------------------------------------*/
const PAGINATION_CONTENT_NAME = 'PaginationContent';

type PaginationContentProps = ComponentProps<'ul'>;

const PaginationContent: FC<PaginationContentProps> = ({ className, ...props }) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} data-slot="pagination-content" {...props} />
);

PaginationContent.displayName = PAGINATION_CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * PaginationItem
 * -----------------------------------------------------------------------------------------------*/
const PAGINATION_ITEM_NAME = 'PaginationItem';

type PaginationItemProps = ComponentProps<'li'>;

const PaginationItem: FC<PaginationItemProps> = ({ ...props }) => <li data-slot="pagination-item" {...props} />;

PaginationItem.displayName = PAGINATION_ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * PaginationLink
 * -----------------------------------------------------------------------------------------------*/
const PAGINATION_LINK_NAME = 'PaginationLink';

interface PaginationLinkProps extends ComponentProps<'a'> {
  isActive?: boolean;
}

const PaginationLink: FC<PaginationLinkProps> = ({ className, isActive, ...props }) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'solid' : 'ghost',
      }),
      className
    )}
    data-active={isActive}
    data-slot="pagination-link"
    {...props}
  />
);

PaginationLink.displayName = PAGINATION_LINK_NAME;

/* -------------------------------------------------------------------------------------------------
 * PaginationPrevious
 * -----------------------------------------------------------------------------------------------*/
const PAGINATION_PREVIOUS_NAME = 'PaginationPrevious';

type PaginationPreviousProps = ComponentProps<typeof PaginationLink>;

const PaginationPrevious: FC<PaginationPreviousProps> = ({ className, ...props }) => (
  <PaginationLink aria-label="Go to previous page" className={cn('gap-1 px-2.5 sm:pl-2.5', className)} {...props}>
    <ChevronLeftIcon />
  </PaginationLink>
);

PaginationPrevious.displayName = PAGINATION_PREVIOUS_NAME;

/* -------------------------------------------------------------------------------------------------
 * PaginationNext
 * -----------------------------------------------------------------------------------------------*/
const PAGINATION_NEXT_NAME = 'PaginationNext';

type PaginationNextProps = ComponentProps<typeof PaginationLink>;

const PaginationNext: FC<PaginationNextProps> = ({ className, ...props }) => (
  <PaginationLink aria-label="Go to next page" className={cn('gap-1 px-2.5 sm:pr-2.5', className)} {...props}>
    <ChevronRightIcon />
  </PaginationLink>
);

PaginationNext.displayName = PAGINATION_NEXT_NAME;

/* -------------------------------------------------------------------------------------------------
 * PaginationEllipsis
 * -----------------------------------------------------------------------------------------------*/
const PAGINATION_ELLIPSIS_NAME = 'PaginationEllipsis';

type PaginationEllipsisProps = ComponentProps<'span'>;

const PaginationEllipsis: FC<PaginationEllipsisProps> = ({ className, ...props }) => (
  <span
    aria-hidden
    className={cn('flex size-9 items-center justify-center', className)}
    data-slot="pagination-ellipsis"
    {...props}
  >
    <MoreHorizontalIcon className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);

PaginationEllipsis.displayName = PAGINATION_ELLIPSIS_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Pagination;
const Content = PaginationContent;
const Item = PaginationItem;
const Link = PaginationLink;
const Previous = PaginationPrevious;
const Next = PaginationNext;
const Ellipsis = PaginationEllipsis;

export {
  Root,
  Content,
  Item,
  Link,
  Previous,
  Next,
  Ellipsis,
  //
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

export type {
  PaginationContentProps,
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationNextProps,
  PaginationPreviousProps,
  PaginationProps,
};
