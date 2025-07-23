import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

import { getPaletteClassName, type WithPalette } from '@repo/ui/lib/palette';
import { cn } from '@repo/ui/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * TextInput
 * -----------------------------------------------------------------------------------------------*/
const NAME = 'TextInput';

const textInputVariants = cva(
  'group flex h-8 items-stretch rounded-default p-px text-start text-sm has-[input:disabled]:cursor-not-allowed has-[[data-slot=text-input]:focus]:outline-2 has-[[data-slot=text-input]:focus]:outline-primary-8 has-[[data-slot=text-input]:focus]:outline-offset-2',
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

type TextInputProps = ComponentProps<'input'> & VariantProps<typeof textInputVariants> & WithPalette;

const TextInput: FC<TextInputProps> = ({ className, variant, children, palette, ...rest }) => {
  const resolvedPalette = rest['aria-invalid'] === 'true' || rest['aria-invalid'] === true ? 'red' : palette;

  return (
    <div
      className={cn(textInputVariants({ variant }), resolvedPalette && getPaletteClassName(resolvedPalette), className)}
      data-slot="text-input-root"
    >
      <input
        className="flex w-full items-center rounded-default indent-2 text-inherit placeholder:text-gray-10 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-a11"
        data-slot="text-input"
        {...rest}
      />
      {children}
    </div>
  );
};

TextInput.displayName = NAME;

/* -------------------------------------------------------------------------------------------------
 * TextInputSection
 * -----------------------------------------------------------------------------------------------*/
const TEXT_FIELD_SECTION_NAME = 'TextInputSection';

type TextInputSectionProps = ComponentProps<'div'>;

const TextInputSection: FC<TextInputSectionProps> = ({ className, ...rest }) => (
  <div
    className={cn(
      "flex shrink-0 cursor-text items-center gap-2 px-2 text-gray-a11 group-has-[input:disabled]:cursor-not-allowed group-has-[[aria-invalid=true]]:text-red-a11 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...rest}
  />
);

TextInputSection.displayName = TEXT_FIELD_SECTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * TextInputStartSection
 * -----------------------------------------------------------------------------------------------*/
const TEXT_INPUT_START_SECTION_NAME = 'TextInputStartSection';

const TextInputStartSection: FC<TextInputSectionProps> = ({ className, ...rest }) => {
  return <TextInputSection className="-order-1 -ml-px mr-0" {...rest} />;
};

TextInputStartSection.displayName = TEXT_INPUT_START_SECTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * TextInputStartSection
 * -----------------------------------------------------------------------------------------------*/
const TEXT_INPUT_END_SECTION_NAME = 'TextInputEndSection';

const TextInputEndSection: FC<TextInputSectionProps> = ({ className, ...rest }) => {
  return <TextInputSection className="-mr-px order-0 ml-0" {...rest} />;
};

TextInputEndSection.displayName = TEXT_INPUT_END_SECTION_NAME;

/* -----------------------------------------------------------------------------------------------*/

const Root = TextInput;
const StartSection = TextInputStartSection;
const EndSection = TextInputEndSection;

export {
  Root,
  StartSection,
  EndSection,
  //
  TextInput,
  TextInputStartSection,
  TextInputEndSection,
};

export type { TextInputProps, TextInputSectionProps };
