import { createContext, useContext } from 'react';
import type { To } from 'react-router';

export type EnhanceTo = (to: To, locale?: string) => To;
export const EnhanceToProvider = createContext<EnhanceTo | null>(null);
export const useEnhanceTo = () => useContext(EnhanceToProvider);
