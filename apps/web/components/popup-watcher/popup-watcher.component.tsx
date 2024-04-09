'use client';
import type { SupportedLocale } from '@bit-trove/localization/config';
import { FeedbackForm } from '@bit-trove/ui/feedback-form';
import { Modal } from '@bit-trove/ui/modal';
import { useSearchParams } from 'next/navigation';
import type { ComponentType, FC } from 'react';

type PopupType = 'feedback';

const popupComponents: Record<PopupType, ComponentType> = {
  feedback: FeedbackForm,
};

const isPopupType = (type: unknown): type is PopupType =>
  typeof type === 'string' && type in popupComponents;

interface PopupWatcherProps {
  locale: SupportedLocale;
}

export const PopupWatcher: FC<PopupWatcherProps> = (props) => {
  const searchParams = useSearchParams();
  const popup = searchParams.get('popup');

  const Component = isPopupType(popup) ? popupComponents[popup] : undefined;
  return !Component ? null : (
    <Modal>
      <Component />
    </Modal>
  );
};
