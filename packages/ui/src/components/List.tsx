import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const listVariants = cva('mx-0 mt-4 mb-4 list-inside p-0 [&_p]:m-0', {
  variants: {
    type: {
      ordered: 'list-decimal',
      unordered: 'list-disc',
    },
  },
});
export const listItemVariants = cva('text-nowrap');

type OrderedListProps = ComponentProps<'ol'> &
  Omit<VariantProps<typeof listVariants>, 'type'> & { children: React.ReactNode };

export const OrderedList: FC<OrderedListProps> = ({ className, ...props }) => (
  <ol {...props} className={cn(listVariants({ type: 'ordered' }), className)} />
);

type UnorderedListProps = ComponentProps<'ul'> &
  Omit<VariantProps<typeof listVariants>, 'type'> & { children: React.ReactNode };

export const UnorderedList: FC<UnorderedListProps> = ({ className, ...props }) => (
  <ul {...props} className={cn(listVariants({ type: 'unordered' }), className)} />
);

export const ListItem: FC<ComponentProps<'li'>> = ({ children, className, ...props }) => (
  <li {...props} className={cn(listItemVariants({}), className)}>
    <div className="inline-flex">{children}</div>
  </li>
);
