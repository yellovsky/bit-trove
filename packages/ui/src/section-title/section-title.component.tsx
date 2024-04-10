// global modules
import cn from 'classnames';
import { Divider, Heading } from '@chakra-ui/react';
import type { ComponentProps, FC } from 'react';

// local modules
import { sectionTitle as sectionTitleCn } from './section-title..module.scss';

export const SectionTitle: FC<ComponentProps<typeof Heading>> = (props) => (
  <>
    <Heading {...props} as="h4" size="sm" />
    <Divider colorScheme="gray" mb="1.25rem" mt="0.5rem" />
  </>
);
