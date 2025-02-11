// global modules
import { useCallback, useState } from 'react';

export const useModalState = (initialState?: boolean) => {
  const [modalOpened, updateModalOpened] = useState(!!initialState);
  const openModal = useCallback(() => updateModalOpened(true), []);
  const closeModal = useCallback(() => updateModalOpened(false), []);
  return { closeModal, modalOpened, openModal, updateModalOpened };
};
