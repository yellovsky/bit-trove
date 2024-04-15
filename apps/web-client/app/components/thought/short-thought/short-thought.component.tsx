// global modules
import { Icon } from '@repo/ui/icon';
// import { Title } from '@repo/ui/title';
import type { FC, ReactNode } from 'react';

import {
  useAccordionItem,
  useAccordionItemEffect,
  useHeightTransition,
} from '@szhsin/react-accordion';

// local modules
import { LinedSection } from '../lined-section';

import {
  arrow as arrowCn,
  panel as panelCn,
  publishDate as publishDateCn,
  titleCell as titleCellCn,
  title as titleCn,
} from './short-thought.module.scss';
import { useTranslation } from 'react-i18next';

interface ShortThoughtUIProps {
  header: ReactNode;
  children: ReactNode;
  initialEntered?: boolean;
  itemKey?: string | number;
  publishDate: string | number | Date;
}

export const ShortThought: FC<ShortThoughtUIProps> = (props) => {
  const { header, children, itemKey, initialEntered, publishDate } = props;
  const { i18n } = useTranslation();

  const formattedDate = i18n.t('{{val, datetime}}', {
    formatParams: {
      val: { day: 'numeric', hour: 'numeric', minute: 'numeric', month: 'short' },
    },
    val: new Date(publishDate),
  });

  const accordeonEffectParams = { initialEntered, itemKey };
  const { itemRef, state, toggle } = useAccordionItemEffect<HTMLDivElement>(accordeonEffectParams);

  const { buttonProps, panelProps } = useAccordionItem({ state, toggle });
  const [transitionStyle, panelRef] = useHeightTransition<HTMLDivElement>(state);

  const { status, isMounted } = state;

  return (
    <LinedSection marker ref={itemRef}>
      <button {...buttonProps} aria-label="toggle trhought" className={titleCellCn}>
        <div>
          {/* <Title as="h5" className={titleCn}>
            {header}
          </Title> */}
          <time className={publishDateCn} dateTime={new Date(publishDate).toUTCString()}>
            {formattedDate}
          </time>
        </div>

        <div className={arrowCn}>
          <Icon type={status === 'exited' || status == 'exiting' ? 'chevron_down' : 'chevron_up'} />
        </div>
      </button>

      {isMounted && (
        <div
          style={{
            display: status === 'exited' ? 'none' : undefined,
            ...transitionStyle,
          }}
        >
          <div className={panelCn} ref={panelRef} {...panelProps}>
            {status !== 'exited' ? children : null}
          </div>
        </div>
      )}
    </LinedSection>
  );
};
