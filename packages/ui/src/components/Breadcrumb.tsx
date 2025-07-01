import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const Breadcrumb: FC<ComponentProps<'nav'>> = ({ ...props }) => (
  <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
);

export const BreadcrumbList: FC<ComponentProps<'ol'>> = ({ className, ...props }) => (
  <ol
    className={cn('flex flex-wrap items-center gap-1 break-words text-muted-foreground text-sm sm:gap-1.5', className)}
    data-slot="breadcrumb-list"
    {...props}
  />
);

export const BreadcrumbItem: FC<ComponentProps<'li'>> = ({ className, ...props }) => (
  <li className={cn('inline-flex items-center gap-1.5', className)} data-slot="breadcrumb-item" {...props} />
);

export const BreadcrumbLink: FC<ComponentProps<'a'> & { asChild?: boolean }> = ({ asChild, className, ...props }) => {
  const Comp = asChild ? Slot : 'a';

  return <Comp className={cn('transition-colors', className)} data-slot="breadcrumb-link" {...props} />;
};

export const BreadcrumbPage: FC<ComponentProps<'span'>> = ({ className, ...props }) => (
  <span
    aria-current="page"
    aria-disabled="true"
    className={cn('font-normal text-muted-foreground', className)}
    data-slot="breadcrumb-page"
    {...props}
  />
);

export const BreadcrumbSeparator: FC<ComponentProps<'li'>> = ({ children, className, ...props }) => (
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

export const BreadcrumbEllipsis: FC<ComponentProps<'span'>> = ({ className, ...props }) => (
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
