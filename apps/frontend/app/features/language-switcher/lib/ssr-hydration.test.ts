import { createStore } from 'jotai';
import { beforeEach, describe, expect, it } from 'vitest';

import { contentLanguagesAtom, selectedContentLanguagesAtom } from '../model/content-language-atom';
import {
  ALL_CONTENT_LANGUAGES,
  type ContentLanguage,
  getCookieStringContentLanguages,
} from './content-language-cookie';

describe('SSR hydration for content languages', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  describe('server-side cookie parsing', () => {
    it('should parse content languages from cookie header', () => {
      const cookieHeader = 'prefers-content-languages=%5B%22en%22%2C%22ru%22%5D; other-cookie=value';
      const result = getCookieStringContentLanguages(cookieHeader);

      expect(result).toEqual(['en', 'ru']);
    });

    it('should return all languages when no cookie is present', () => {
      const cookieHeader = 'other-cookie=value';
      const result = getCookieStringContentLanguages(cookieHeader);

      expect(result).toEqual(ALL_CONTENT_LANGUAGES);
    });

    it('should return all languages when cookie is malformed', () => {
      const cookieHeader = 'prefers-content-languages=invalid-json';
      const result = getCookieStringContentLanguages(cookieHeader);

      expect(result).toEqual(ALL_CONTENT_LANGUAGES);
    });

    it('should handle empty cookie header', () => {
      const result = getCookieStringContentLanguages(null);

      expect(result).toEqual(ALL_CONTENT_LANGUAGES);
    });
  });

  describe('client-side hydration', () => {
    it('should hydrate atoms with server data', () => {
      const serverData: ContentLanguage[] = ['en'];

      // Simulate hydration
      store.set(selectedContentLanguagesAtom, serverData);

      // Verify atom state
      const selectedLanguages = store.get(selectedContentLanguagesAtom);
      expect(selectedLanguages).toEqual(['en']);

      // Verify derived atom
      const contentLanguages = store.get(contentLanguagesAtom);
      expect(contentLanguages).toEqual(['en']);
    });

    it('should hydrate with empty array and show all languages', () => {
      const serverData: ContentLanguage[] = [];

      // Simulate hydration
      store.set(selectedContentLanguagesAtom, serverData);

      // Verify atom state
      const selectedLanguages = store.get(selectedContentLanguagesAtom);
      expect(selectedLanguages).toEqual([]);

      // Verify derived atom shows all languages when empty
      const contentLanguages = store.get(contentLanguagesAtom);
      expect(contentLanguages).toEqual(ALL_CONTENT_LANGUAGES);
    });

    it('should hydrate with all languages', () => {
      const serverData: ContentLanguage[] = ['en', 'ru'];

      // Simulate hydration
      store.set(selectedContentLanguagesAtom, serverData);

      // Verify atom state
      const selectedLanguages = store.get(selectedContentLanguagesAtom);
      expect(selectedLanguages).toEqual(['en', 'ru']);

      // Verify derived atom
      const contentLanguages = store.get(contentLanguagesAtom);
      expect(contentLanguages).toEqual(['en', 'ru']);
    });
  });

  describe('hydration edge cases', () => {
    it('should handle invalid language codes gracefully', () => {
      const serverData: ContentLanguage[] = ['en', 'invalid' as ContentLanguage];

      // Simulate hydration
      store.set(selectedContentLanguagesAtom, serverData);

      // Verify atom state (should accept the data as-is)
      const selectedLanguages = store.get(selectedContentLanguagesAtom);
      expect(selectedLanguages).toEqual(['en', 'invalid']);
    });

    it('should handle null/undefined server data', () => {
      // Simulate hydration with null data
      store.set(selectedContentLanguagesAtom, null as any);

      // Verify atom state (should handle gracefully)
      const selectedLanguages = store.get(selectedContentLanguagesAtom);
      expect(selectedLanguages).toBeNull();
    });
  });

  describe('integration with root loader pattern', () => {
    it('should simulate root loader data flow', () => {
      // Simulate server-side cookie parsing (like in root loader)
      const cookieHeader = 'prefers-content-languages=%5B%22en%22%5D';
      const serverData = getCookieStringContentLanguages(cookieHeader);

      // Simulate client-side hydration (like in Layout component)
      store.set(selectedContentLanguagesAtom, serverData);

      // Verify the complete flow works
      const selectedLanguages = store.get(selectedContentLanguagesAtom);
      expect(selectedLanguages).toEqual(['en']);

      const contentLanguages = store.get(contentLanguagesAtom);
      expect(contentLanguages).toEqual(['en']);
    });

    it('should handle missing cookie in root loader pattern', () => {
      // Simulate server-side cookie parsing with no cookie
      const cookieHeader = 'other-cookie=value';
      const serverData = getCookieStringContentLanguages(cookieHeader);

      // Simulate client-side hydration
      store.set(selectedContentLanguagesAtom, serverData);

      // Verify default behavior
      const selectedLanguages = store.get(selectedContentLanguagesAtom);
      expect(selectedLanguages).toEqual(ALL_CONTENT_LANGUAGES);

      const contentLanguages = store.get(contentLanguagesAtom);
      expect(contentLanguages).toEqual(ALL_CONTENT_LANGUAGES);
    });
  });
});
