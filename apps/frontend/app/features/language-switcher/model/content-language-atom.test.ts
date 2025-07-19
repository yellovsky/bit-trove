import { createStore } from 'jotai';
import { describe, expect, it } from 'vitest';

import { ALL_CONTENT_LANGUAGES } from '../lib/content-language-cookie';
import { contentLanguagesAtom, selectedContentLanguagesAtom } from './content-language-atom';

describe('content-language-atom', () => {
  describe('selectedContentLanguagesAtom', () => {
    it('should have default value of all languages', () => {
      const store = createStore();
      const value = store.get(selectedContentLanguagesAtom);
      expect(value).toEqual(ALL_CONTENT_LANGUAGES);
    });

    it('should allow setting specific languages', () => {
      const store = createStore();
      store.set(selectedContentLanguagesAtom, ['en']);
      const value = store.get(selectedContentLanguagesAtom);
      expect(value).toEqual(['en']);
    });

    it('should allow setting empty array', () => {
      const store = createStore();
      store.set(selectedContentLanguagesAtom, []);
      const value = store.get(selectedContentLanguagesAtom);
      expect(value).toEqual([]);
    });
  });

  describe('contentLanguagesAtom', () => {
    it('should return selected languages when not empty', () => {
      const store = createStore();
      store.set(selectedContentLanguagesAtom, ['en']);
      const value = store.get(contentLanguagesAtom);
      expect(value).toEqual(['en']);
    });

    it('should return default languages when selected is empty', () => {
      const store = createStore();
      store.set(selectedContentLanguagesAtom, []);
      const value = store.get(contentLanguagesAtom);
      expect(value).toEqual(ALL_CONTENT_LANGUAGES);
    });

    it('should return default languages when selected is null', () => {
      const store = createStore();
      store.set(selectedContentLanguagesAtom, []);
      const value = store.get(contentLanguagesAtom);
      expect(value).toEqual(ALL_CONTENT_LANGUAGES);
    });
  });
});
