import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps, FC } from 'react';
import { Link as RouterLink } from 'react-router';

import { useEnhanceTo } from '@repo/ui/hooks/enhance-to';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Blockquote
 * -----------------------------------------------------------------------------------------------*/
const NAME_BLOCKQUOTE = 'Blockquote';

type BlockquoteProps = ComponentProps<'blockquote'>;

const Blockquote: FC<BlockquoteProps> = ({ className, ...props }) => (
  <blockquote {...props} className={cn('typography-blockquote', className)} />
);

Blockquote.displayName = NAME_BLOCKQUOTE;

/* -------------------------------------------------------------------------------------------------
 * Code
 * -----------------------------------------------------------------------------------------------*/
const NAME_CODE = 'Code';

type CodeProps = ComponentProps<'code'>;

const Code: FC<CodeProps> = ({ className, ...props }) => (
  <code {...props} className={cn('typography-code', className)} />
);

Code.displayName = NAME_CODE;

/* -------------------------------------------------------------------------------------------------
 * Kbd
 * -----------------------------------------------------------------------------------------------*/
const NAME_KBD = 'Kbd';

type KbdProps = ComponentProps<'kbd'>;

const Kbd: FC<KbdProps> = ({ className, ...props }) => <kbd {...props} className={cn('typography-kbd', className)} />;

Kbd.displayName = NAME_KBD;

/* -------------------------------------------------------------------------------------------------
 * Paragraph
 * -----------------------------------------------------------------------------------------------*/
const NAME_PARAGRAPH = 'Paragraph';

type ParagraphProps = ComponentProps<'p'>;

const Paragraph: FC<ParagraphProps> = ({ className, ...rest }) => (
  <p {...rest} className={cn('typography-paragraph', className)} />
);

Paragraph.displayName = NAME_PARAGRAPH;

/* -------------------------------------------------------------------------------------------------
 * Heading
 * -----------------------------------------------------------------------------------------------*/
const NAME_HEADING = 'Heading';

const headingVariants = cva('typography-heading', {
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

const Heading: FC<HeadingProps> = ({ order, size, asChild = false, ...props }) => {
  const Comp = asChild ? Slot.Root : `h${order}`;
  const derivedSize: Exclude<VariantProps<typeof headingVariants>['size'], undefined> = size || `h${order}`;

  return <Comp {...props} className={cn(headingVariants({ size: derivedSize }), props.className)} />;
};
Heading.displayName = NAME_HEADING;

/* -------------------------------------------------------------------------------------------------
 * OrderedList
 * -----------------------------------------------------------------------------------------------*/
const NAME_ORDERED_LIST = 'OrderedList';

type OrderedListProps = ComponentProps<'ol'>;

const OrderedList: FC<OrderedListProps> = ({ className, ...props }) => (
  <ol {...props} className={cn('typography-list', className)} />
);

OrderedList.displayName = NAME_ORDERED_LIST;

/* -------------------------------------------------------------------------------------------------
 * UnorderedList
 * -----------------------------------------------------------------------------------------------*/
const NAME_UNORDERED_LIST = 'UnorderedList';

type UnorderedListProps = ComponentProps<'ul'>;

const UnorderedList: FC<UnorderedListProps> = ({ className, ...props }) => (
  <ul {...props} className={cn('typography-list', className)} />
);

UnorderedList.displayName = NAME_UNORDERED_LIST;

/* -------------------------------------------------------------------------------------------------
 * ListItem
 * -----------------------------------------------------------------------------------------------*/
const NAME_LIST_ITEM = 'ListItem';

type ListItemProps = ComponentProps<'li'>;

const ListItem: FC<ListItemProps> = ({ children, ...props }) => (
  <li {...props}>
    <div className="inline-flex">{children}</div>
  </li>
);

ListItem.displayName = NAME_LIST_ITEM;

/* -------------------------------------------------------------------------------------------------
 * HorizontalRule
 * -----------------------------------------------------------------------------------------------*/
const NAME_HORIZONTAL_RULE = 'HorizontalRule';

type HorizontalRuleProps = ComponentProps<'hr'>;

const HorizontalRule: FC<HorizontalRuleProps> = ({ className, ...props }) => (
  <hr {...props} className={cn('typography-horizontal-rule', className)} />
);

HorizontalRule.displayName = NAME_HORIZONTAL_RULE;

/* -------------------------------------------------------------------------------------------------
 * TextLink
 * -----------------------------------------------------------------------------------------------*/
const TEXT_LINK_NAME = 'TextLink';

const textLinkVariants = cva('focus-visible-outline focus-visible:rounded-default', {
  compoundVariants: [
    {
      active: true,
      className: 'font-medium text-primary-a11',
      variant: 'dimmed',
    },
  ],
  defaultVariants: {
    variant: 'primary',
  },
  variants: {
    active: {
      true: '',
    },
    variant: {
      dimmed:
        'text-muted-foreground transition-colors hover:text-primary-a11 active:brightness-[0.92] active:saturate-[1.1]',
      primary: 'typography-link',
    },
  },
});

type TextLinkProps = ComponentProps<typeof RouterLink> & VariantProps<typeof textLinkVariants>;

const TextLink: FC<TextLinkProps> = ({ className, variant, active, ...props }) => {
  const enhanceTo = useEnhanceTo();
  const echancedLink = enhanceTo ? enhanceTo(props.to) : props.to;
  return <RouterLink {...props} className={cn(textLinkVariants({ active, variant }), className)} to={echancedLink} />;
};

TextLink.displayName = TEXT_LINK_NAME;

/* -----------------------------------------------------------------------------------------------*/

export { TextLink, Blockquote, Code, Kbd, Paragraph, Heading, OrderedList, UnorderedList, ListItem, HorizontalRule };

export type {
  TextLinkProps,
  BlockquoteProps,
  CodeProps,
  KbdProps,
  ParagraphProps,
  HeadingProps,
  OrderedListProps,
  UnorderedListProps,
  ListItemProps,
  HorizontalRuleProps,
};
