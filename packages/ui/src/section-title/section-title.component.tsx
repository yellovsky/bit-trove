// global modules
import { Divider } from '@bit-trove/ui/divider';
import { Heading } from '@bit-trove/ui/heading';
import type { ComponentProps, FC } from 'react';

type SectionTitleProps = Omit<ComponentProps<typeof Heading>, 'as' | 'size'>;

export const SectionTitle: FC<SectionTitleProps> = (props) => (
  <>
    <Heading {...props} as="h4" size="sm" />
    <Divider mb="1.25rem" mt="0.5rem" />
  </>
);
