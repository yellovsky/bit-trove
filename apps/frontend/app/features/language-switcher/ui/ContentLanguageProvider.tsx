import { createContext, type PropsWithChildren, useContext, useState } from 'react';

import type { ContentLanguage } from '../lib/content-language-cookie';

const contentLanguageContext = createContext<{
  languages: ContentLanguage[];
  setLanguages: (languages: ContentLanguage[]) => void;
}>({ languages: [], setLanguages: () => {} });

type ContentLanguageProviderProps = PropsWithChildren<{
  languages: ContentLanguage[];
}>;

export const ContentLanguageProvider = ({ children, languages }: ContentLanguageProviderProps) => {
  const [selectedLanguages, setSelectedLanguages] = useState(languages);

  return (
    <contentLanguageContext.Provider value={{ languages: selectedLanguages, setLanguages: setSelectedLanguages }}>
      {children}
    </contentLanguageContext.Provider>
  );
};

export const useContentLanguage = () => useContext(contentLanguageContext);
