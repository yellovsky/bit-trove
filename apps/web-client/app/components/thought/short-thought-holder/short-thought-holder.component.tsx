// global modules
import { AccordionProvider, useAccordion, useAccordionProvider } from '@szhsin/react-accordion';
import type { FC, PropsWithChildren } from 'react';

interface ShortThoughtHolderUiProps extends PropsWithChildren {}

export const ShortThoughtHolder: FC<ShortThoughtHolderUiProps> = ({ children }) => {
  const { accordionProps } = useAccordion();
  const providerValue = useAccordionProvider({
    allowMultiple: true,
    transition: true,
    transitionTimeout: 250,
  });

  return (
    <AccordionProvider value={providerValue}>
      <div {...accordionProps}>{children}</div>
    </AccordionProvider>
  );
};
