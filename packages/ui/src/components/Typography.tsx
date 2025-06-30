import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps, FC } from 'react';
import { Link as RouterLink } from 'react-router';

import { useEnhanceTo } from '../hooks/enhance-to';
import { cn } from '../lib/utils';

export const Blockquote: FC<ComponentProps<'blockquote'>> = ({ className, ...props }) => (
  <blockquote {...props} className={cn('typography-blockquote', className)} />
);
Blockquote.displayName = 'Blockquote';

export const Code: FC<ComponentProps<'code'>> = ({ className, ...props }) => (
  <code {...props} className={cn('typography-code', className)} />
);
Code.displayName = 'Code';

export const Kbd: FC<ComponentProps<'kbd'>> = ({ className, ...props }) => (
  <kbd {...props} className={cn('typography-kbd', className)} />
);
Kbd.displayName = 'Kbd';

export const Paragraph: FC<ComponentProps<'p'>> = ({ className, ...rest }) => (
  <p {...rest} className={cn('typography-paragraph', className)} />
);
Paragraph.displayName = 'Paragraph';

export const headingVariants = cva('typography-heading', {
  variants: {
    size: {
      h1: 'typography-heading-h1',
      h2: 'typography-heading-h2',
      h3: 'typography-heading-h3',
    },
  },
});

type HeadingProps = ComponentProps<'h1'> &
  VariantProps<typeof headingVariants> & { asChild?: boolean; order: 1 | 2 | 3 };

export const Heading: FC<HeadingProps> = ({ order, size, asChild = false, ...props }) => {
  const Comp = asChild ? Slot.Root : `h${order}`;
  const derivedSize: Exclude<VariantProps<typeof headingVariants>['size'], undefined> = size || `h${order}`;

  return <Comp {...props} className={cn(headingVariants({ size: derivedSize }), props.className)} />;
};
Heading.displayName = 'Heading';

export const OrderedList: FC<ComponentProps<'ol'>> = ({ className, ...props }) => (
  <ol {...props} className={cn('typography-list', className)} />
);
OrderedList.displayName = 'OrderedList';

export const UnorderedList: FC<ComponentProps<'ul'>> = ({ className, ...props }) => (
  <ul {...props} className={cn('typography-list', className)} />
);
UnorderedList.displayName = 'UnorderedList';

export const ListItem: FC<ComponentProps<'li'>> = ({ children, className, ...props }) => (
  <li {...props} className={cn('typography-list-item', className)}>
    <div className="inline-flex">{children}</div>
  </li>
);
ListItem.displayName = 'ListItem';

export const HorizontalRule: FC<ComponentProps<'hr'>> = ({ className, ...props }) => (
  <hr {...props} className={cn('typography-horizontal-rule', className)} />
);
HorizontalRule.displayName = 'HorizontalRule';

type TextLinkProps = ComponentProps<typeof RouterLink>;
export const TextLink: FC<TextLinkProps> = ({ className, ...props }) => {
  const enhanceTo = useEnhanceTo();
  const echancedLink = enhanceTo ? enhanceTo(props.to) : props.to;
  return <RouterLink {...props} className={cn('typography-link', className)} to={echancedLink} />;
};
TextLink.displayName = 'TextLink';
