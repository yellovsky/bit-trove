import { createContext, useContext } from 'react';

export const MainContentScrollContext = createContext<number>(0);
export const useMainContentScroll = () => useContext(MainContentScrollContext);
