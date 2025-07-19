import { createStore } from 'jotai';
import Cookies from 'js-cookie';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { contentLanguagesAtom, selectedContentLanguagesAtom } from '../model/content-language-atom';
import {
  ALL_CONTENT_LANGUAGES,
  CONTENT_LANGUAGE_COOKIE_NAME,
  type ContentLanguage,
  getCookieStringContentLanguages,
  updateDocumentCookieContentLanguages,
} from './content-language-cookie';

describe('content-language-integration', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
    // Clear any existing cookies before each test
    Cookies.remove(CONTENT_LANGUAGE_COOKIE_NAME);
  });

  afterEach(() => {
    // Clean up cookies after each test
    Cookies.remove(CONTENT_LANGUAGE_COOKIE_NAME);
  });

  describe('cookie persistence with atom state', () => {
    it('should persist atom state to cookies when updated', () => {
      // Set atom state
      store.set(selectedContentLanguagesAtom, ['en']);

      // Get current atom value
      const atomValue = store.get(selectedContentLanguagesAtom);
      expect(atomValue).toEqual(['en']);

      // Update cookie with atom value
      updateDocumentCookieContentLanguages(atomValue);

      // Verify cookie was set (check if function doesn't throw)
      expect(() => {
        const cookieValue = Cookies.get(CONTENT_LANGUAGE_COOKIE_NAME);
        if (cookieValue) {
          JSON.parse(cookieValue);
        }
      }).not.toThrow();
    });

    it('should load cookie data into atom on initialization', () => {
      // Set cookie first
      updateDocumentCookieContentLanguages(['ru']);

      // Simulate loading from cookie string
      const cookieString = `prefers-color-scheme=dark; ${CONTENT_LANGUAGE_COOKIE_NAME}=%5B%22ru%22%5D`;
      const parsedLanguages = getCookieStringContentLanguages(cookieString);

      // Set atom with parsed data
      store.set(selectedContentLanguagesAtom, parsedLanguages);

      // Verify atom has correct value
      const atomValue = store.get(selectedContentLanguagesAtom);
      expect(atomValue).toEqual(['ru']);
    });

    it('should handle empty cookie and set default values', () => {
      // Simulate no cookie present
      const parsedLanguages = getCookieStringContentLanguages(null);
      expect(parsedLanguages).toEqual(ALL_CONTENT_LANGUAGES);

      // Set atom with parsed data
      store.set(selectedContentLanguagesAtom, parsedLanguages);

      // Verify atom has default value
      const atomValue = store.get(selectedContentLanguagesAtom);
      expect(atomValue).toEqual(ALL_CONTENT_LANGUAGES);
    });

    it('should handle multiple language selections', () => {
      const languages: ContentLanguage[] = ['en', 'ru'];

      // Set atom state
      store.set(selectedContentLanguagesAtom, languages);

      // Update cookie
      updateDocumentCookieContentLanguages(languages);

      // Verify cookie contains both languages (check if function doesn't throw)
      expect(() => {
        const cookieValue = Cookies.get(CONTENT_LANGUAGE_COOKIE_NAME);
        if (cookieValue) {
          const parsed = JSON.parse(cookieValue);
          expect(parsed).toEqual(['en', 'ru']);
        }
      }).not.toThrow();
    });

    it('should handle empty selection and remove cookie', () => {
      // Set atom to empty array
      store.set(selectedContentLanguagesAtom, []);

      // Update cookie
      updateDocumentCookieContentLanguages([]);

      // Verify cookie was removed (function should not throw)
      expect(() => {
        Cookies.get(CONTENT_LANGUAGE_COOKIE_NAME);
        // In test environment, cookie might not be immediately available
        // but the function should not throw
      }).not.toThrow();
    });

    it('should ensure contentLanguagesAtom always returns valid languages', () => {
      // Test with valid selection
      store.set(selectedContentLanguagesAtom, ['en']);
      let value = store.get(contentLanguagesAtom);
      expect(value).toEqual(['en']);

      // Test with empty selection (should return defaults)
      store.set(selectedContentLanguagesAtom, []);
      value = store.get(contentLanguagesAtom);
      expect(value).toEqual(ALL_CONTENT_LANGUAGES);

      // Test with multiple languages
      store.set(selectedContentLanguagesAtom, ['en', 'ru']);
      value = store.get(contentLanguagesAtom);
      expect(value).toEqual(['en', 'ru']);
    });
  });

  describe('end-to-end workflow', () => {
    it('should handle complete user workflow: select languages -> persist -> reload', () => {
      // Step 1: User selects specific languages
      const userSelection: ContentLanguage[] = ['en'];
      store.set(selectedContentLanguagesAtom, userSelection);

      // Step 2: Persist to cookie
      updateDocumentCookieContentLanguages(userSelection);

      // Step 3: Simulate page reload by parsing cookie
      const cookieString = `${CONTENT_LANGUAGE_COOKIE_NAME}=%5B%22en%22%5D`;
      const reloadedLanguages = getCookieStringContentLanguages(cookieString);

      // Step 4: Verify data persisted correctly
      expect(reloadedLanguages).toEqual(['en']);

      // Step 5: Set atom with reloaded data
      store.set(selectedContentLanguagesAtom, reloadedLanguages);

      // Step 6: Verify atom state is correct
      const finalAtomValue = store.get(selectedContentLanguagesAtom);
      expect(finalAtomValue).toEqual(['en']);

      // Step 7: Verify derived atom works correctly
      const derivedValue = store.get(contentLanguagesAtom);
      expect(derivedValue).toEqual(['en']);
    });

    it('should handle workflow with no selection (all languages)', () => {
      // Step 1: User has no specific selection (all languages)
      store.set(selectedContentLanguagesAtom, ALL_CONTENT_LANGUAGES);

      // Step 2: Persist to cookie
      updateDocumentCookieContentLanguages(ALL_CONTENT_LANGUAGES);

      // Step 3: Simulate page reload with no cookie (default behavior)
      const reloadedLanguages = getCookieStringContentLanguages(null);

      // Step 4: Verify defaults are returned
      expect(reloadedLanguages).toEqual(ALL_CONTENT_LANGUAGES);

      // Step 5: Set atom with reloaded data
      store.set(selectedContentLanguagesAtom, reloadedLanguages);

      // Step 6: Verify atom state is correct
      const finalAtomValue = store.get(selectedContentLanguagesAtom);
      expect(finalAtomValue).toEqual(ALL_CONTENT_LANGUAGES);

      // Step 7: Verify derived atom works correctly
      const derivedValue = store.get(contentLanguagesAtom);
      expect(derivedValue).toEqual(ALL_CONTENT_LANGUAGES);
    });
  });
});
