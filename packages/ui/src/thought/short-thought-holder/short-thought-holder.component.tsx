// global modules
import type { FC, PropsWithChildren } from 'react';
import { AccordionProvider, useAccordion, useAccordionProvider } from '@szhsin/react-accordion';

interface ShortThoughtHolderUiProps extends PropsWithChildren {}

export const ShortThoughtHolder: FC<ShortThoughtHolderUiProps> = ({ children }) => {
  const { accordionProps } = useAccordion();
  const providerValue = useAccordionProvider({
    transition: true,
    allowMultiple: true,
    transitionTimeout: 250,
  });

  return (
    <AccordionProvider value={providerValue}>
      <div {...accordionProps}>{children}</div>
    </AccordionProvider>
  );
};
