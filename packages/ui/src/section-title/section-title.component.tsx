// global modules
import { Divider } from '@bit-trove/ui/divider';
import { Heading } from '@bit-trove/ui/heading';
import type { ComponentProps, FC } from 'react';

export const SectionTitle: FC<ComponentProps<typeof Heading>> = (props) => (
  <>
    <Heading {...props} as="h4" size="sm" />
    <Divider mb="1.25rem" mt="0.5rem" />
  </>
);
