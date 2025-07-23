import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { getPaletteClassName, type WithPalette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'TextArea';

const textAreaVariants = cva(
  'focus-visible-outline field-sizing-content inset-ring block min-h-20 w-full grow resize-none rounded-default px-2 py-3 text-sm placeholder:text-gray-a10',
  {
    defaultVariants: {
      variant: 'surface',
    },
    variants: {
      variant: {
        soft: 'bg-primary-a3 text-primary-a12 has-[input:disabled]:bg-gray-a3',
        surface:
          'inset-ring inset-ring-gray-a7 bg-gray-surface bg-clip-content text-gray-a12 has-[[aria-invalid=true]]:inset-ring-red-a7 has-[input:disabled]:inset-ring-gray-a6 has-[input:disabled]:bg-gray-a2',
      },
    },
  }
);

type TextAreaProps = ComponentProps<'textarea'> & VariantProps<typeof textAreaVariants> & WithPalette;

const TextArea: FC<TextAreaProps> = ({ className, variant, children, palette, ...rest }) => {
  return (
    <textarea
      className={cn(textAreaVariants({ className, variant }), palette && getPaletteClassName(palette))}
      {...rest}
    />
  );
};

TextArea.displayName = NAME;

/* -----------------------------------------------------------------------------------------------*/

export { TextArea };

export { textAreaVariants };
export type { TextAreaProps };
