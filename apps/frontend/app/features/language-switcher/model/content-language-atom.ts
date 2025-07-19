import { atom } from 'jotai';

import { ALL_CONTENT_LANGUAGES, type ContentLanguage } from '../lib/content-language-cookie';

export const selectedContentLanguagesAtom = atom<ContentLanguage[]>(ALL_CONTENT_LANGUAGES);

export const contentLanguagesAtom = atom<ContentLanguage[]>((get) => {
  const selected = get(selectedContentLanguagesAtom);
  return selected.length > 0 ? selected : ALL_CONTENT_LANGUAGES;
});
