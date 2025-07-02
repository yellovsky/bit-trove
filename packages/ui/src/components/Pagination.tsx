import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

import { buttonVariants } from '@repo/ui/components/Button';
import { cn } from '@repo/ui/lib/utils';

export const Pagination: FC<ComponentProps<'nav'>> = ({ className, ...props }) => {
  return (
    <nav
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      data-slot="pagination"
      {...props}
    />
  );
};

export const PaginationContent: FC<ComponentProps<'ul'>> = ({ className, ...props }) => {
  return <ul className={cn('flex flex-row items-center gap-1', className)} data-slot="pagination-content" {...props} />;
};

export const PaginationItem: FC<ComponentProps<'li'>> = ({ ...props }) => {
  return <li data-slot="pagination-item" {...props} />;
};

interface PaginationLinkProps extends ComponentProps<'a'> {
  isActive?: boolean;
}

export const PaginationLink: FC<PaginationLinkProps> = ({ className, isActive, ...props }) => {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'dimmed',
        }),
        className
      )}
      data-active={isActive}
      data-slot="pagination-link"
      {...props}
    />
  );
};

export const PaginationPrevious: FC<ComponentProps<typeof PaginationLink>> = ({ className, ...props }) => {
  return (
    <PaginationLink aria-label="Go to previous page" className={cn('gap-1 px-2.5 sm:pl-2.5', className)} {...props}>
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
};

export const PaginationNext: FC<ComponentProps<typeof PaginationLink>> = ({ className, ...props }) => {
  return (
    <PaginationLink aria-label="Go to next page" className={cn('gap-1 px-2.5 sm:pr-2.5', className)} {...props}>
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
};

export const PaginationEllipsis: FC<ComponentProps<'span'>> = ({ className, ...props }) => {
  return (
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
};
