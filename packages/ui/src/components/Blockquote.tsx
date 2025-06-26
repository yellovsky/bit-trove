import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { getPaletteClassName, type Palette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

export const blockquoteVariants = cva('border-l-4 border-l-primary-a6 pl-3');

type BlockquoteProps = ComponentProps<'blockquote'> & VariantProps<typeof blockquoteVariants> & { palette?: Palette };

export const Blockquote: FC<BlockquoteProps> = ({ palette, className, ...props }) => (
  <blockquote {...props} className={cn(blockquoteVariants({}), palette && getPaletteClassName(palette), className)} />
);
