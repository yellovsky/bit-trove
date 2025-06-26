import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { cn } from '@repo/ui/lib/utils';

export const codeVariants = cva('rounded-sm bg-gray-3 px-1.5 py-0.5 font-mono text-gray-11 text-sm');

export type CodeProps = ComponentProps<'code'> & VariantProps<typeof codeVariants>;

export const Code: FC<CodeProps> = ({ className, ...props }) => (
  <code {...props} className={cn(codeVariants(), className)} />
);
