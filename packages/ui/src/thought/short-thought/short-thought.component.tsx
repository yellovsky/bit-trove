// global modules
import { Title } from '@bit-trove/ui/title';
import { useFormatter } from 'next-intl';
import type { FC, ReactNode } from 'react';

import {
  useAccordionItem,
  useHeightTransition,
  useAccordionItemEffect,
} from '@szhsin/react-accordion';

// local modules
import { LinedSection } from '../lined-section';

import {
  panel as panelCn,
  title as titleCn,
  titleCell as titleCellCn,
  publishDate as publishDateCn,
} from './short-thought.module.scss';

interface ShortThoughtUIProps {
  header: ReactNode;
  children: ReactNode;
  initialEntered?: boolean;
  itemKey?: string | number;
  publishDate: string | number | Date;
}

export const ShortThought: FC<ShortThoughtUIProps> = (props) => {
  const { header, children, itemKey, initialEntered, publishDate } = props;

  const format = useFormatter();
  const formattedDate = format.dateTime(new Date(publishDate), {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const accordeonEffectParams = { itemKey, initialEntered };
  const { itemRef, state, toggle } = useAccordionItemEffect<HTMLDivElement>(accordeonEffectParams);

  const { buttonProps, panelProps } = useAccordionItem({ state, toggle });
  const [transitionStyle, panelRef] = useHeightTransition<HTMLDivElement>(state);

  const { status, isMounted } = state;

  return (
    <LinedSection marker ref={itemRef}>
      <button {...buttonProps} aria-label="toggle trhought" className={titleCellCn}>
        <Title as="h5" className={titleCn}>
          {header}
        </Title>
        <time className={publishDateCn} dateTime={new Date(publishDate).toUTCString()}>
          {formattedDate}
        </time>
      </button>

      {isMounted && (
        <div
          style={{
            display: status === 'exited' ? 'none' : undefined,
            ...transitionStyle,
          }}
        >
          <div className={panelCn} ref={panelRef} {...panelProps}>
            {status !== 'exited'
              ? (() => {
                  console.log('#render status', status);
                  return children;
                })()
              : null}
          </div>
        </div>
      )}
    </LinedSection>
  );
};
