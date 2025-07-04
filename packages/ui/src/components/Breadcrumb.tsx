import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Breadcrumb
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'Breadcrumb';

type BreadcrumbProps = ComponentProps<'nav'>;

const Breadcrumb: FC<BreadcrumbProps> = ({ className, ...props }) => (
  <nav aria-label="breadcrumb" className={cn(className)} data-slot="breadcrumb" {...props} />
);

Breadcrumb.displayName = NAME;

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbList
 * -----------------------------------------------------------------------------------------------*/
const LIST_NAME = 'BreadcrumbList';

type BreadcrumbListProps = ComponentProps<'ol'>;

const BreadcrumbList: FC<BreadcrumbListProps> = ({ className, ...props }) => (
  <ol
    className={cn('flex flex-wrap items-center gap-1 break-words text-muted-foreground text-sm sm:gap-1.5', className)}
    data-slot="breadcrumb-list"
    {...props}
  />
);

BreadcrumbList.displayName = LIST_NAME;

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbItem
 * -----------------------------------------------------------------------------------------------*/
const ITEM_NAME = 'BreadcrumbItem';

type BreadcrumbItemProps = ComponentProps<'li'>;

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ className, ...props }) => (
  <li className={cn('inline-flex items-center gap-1.5', className)} data-slot="breadcrumb-item" {...props} />
);

BreadcrumbItem.displayName = ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbLink
 * -----------------------------------------------------------------------------------------------*/
const LINK_NAME = 'BreadcrumbLink';

type BreadcrumbLinkProps = ComponentProps<'a'> & { asChild?: boolean };

const BreadcrumbLink: FC<BreadcrumbLinkProps> = ({ asChild, className, ...props }) => {
  const Comp = asChild ? Slot : 'a';

  return <Comp className={cn('transition-colors', className)} data-slot="breadcrumb-link" {...props} />;
};

BreadcrumbLink.displayName = LINK_NAME;

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbPage
 * -----------------------------------------------------------------------------------------------*/
const PAGE_NAME = 'BreadcrumbPage';

type BreadcrumbPageProps = ComponentProps<'span'>;

const BreadcrumbPage: FC<BreadcrumbPageProps> = ({ className, ...props }) => (
  <span
    aria-current="page"
    aria-disabled="true"
    className={cn('font-normal text-muted-foreground', className)}
    data-slot="breadcrumb-page"
    {...props}
  />
);

BreadcrumbPage.displayName = PAGE_NAME;

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbSeparator
 * -----------------------------------------------------------------------------------------------*/
const SEPARATOR_NAME = 'BreadcrumbSeparator';

type BreadcrumbSeparatorProps = ComponentProps<'li'>;

const BreadcrumbSeparator: FC<BreadcrumbSeparatorProps> = ({ children, className, ...props }) => (
  <li
    aria-hidden="true"
    className={cn('[&>svg]:size-3', className)}
    data-slot="breadcrumb-separator"
    role="presentation"
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);

BreadcrumbSeparator.displayName = SEPARATOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbEllipsis
 * -----------------------------------------------------------------------------------------------*/
const ELLIPSIS_NAME = 'BreadcrumbEllipsis';

type BreadcrumbEllipsisProps = ComponentProps<'span'>;

const BreadcrumbEllipsis: FC<BreadcrumbEllipsisProps> = ({ className, ...props }) => (
  <span
    aria-hidden="true"
    className={cn('flex size-9 items-center justify-center', className)}
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);

BreadcrumbEllipsis.displayName = ELLIPSIS_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = Breadcrumb;
const List = BreadcrumbList;
const Item = BreadcrumbItem;
const Link = BreadcrumbLink;
const Page = BreadcrumbPage;
const Separator = BreadcrumbSeparator;
const Ellipsis = BreadcrumbEllipsis;

export {
  Root,
  List,
  Item,
  Link,
  Page,
  Separator,
  Ellipsis,
  //
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

export type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
};
