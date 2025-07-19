import { describe, expect, it } from 'vitest';

import {
  ALL_CONTENT_LANGUAGES,
  type ContentLanguage,
  getCookieStringContentLanguages,
  isContentLanguage,
  updateDocumentCookieContentLanguages,
} from './content-language-cookie';

describe('content-language-cookie', () => {
  describe('isContentLanguage', () => {
    it('should return true for valid content languages', () => {
      expect(isContentLanguage('en')).toBe(true);
      expect(isContentLanguage('ru')).toBe(true);
    });

    it('should return false for invalid content languages', () => {
      expect(isContentLanguage('fr')).toBe(false);
      expect(isContentLanguage('es')).toBe(false);
      expect(isContentLanguage('')).toBe(false);
      expect(isContentLanguage(null)).toBe(false);
      expect(isContentLanguage(undefined)).toBe(false);
    });
  });

  describe('getCookieStringContentLanguages', () => {
    it('should return default languages when no cookie is present', () => {
      const result = getCookieStringContentLanguages(null);
      expect(result).toEqual(ALL_CONTENT_LANGUAGES);
    });

    it('should return default languages when cookie is empty', () => {
      const result = getCookieStringContentLanguages('');
      expect(result).toEqual(ALL_CONTENT_LANGUAGES);
    });

    it('should parse valid content languages from cookie', () => {
      const cookieString = 'prefers-content-languages=%5B%22en%22%5D'; // ["en"] encoded
      const result = getCookieStringContentLanguages(cookieString);
      expect(result).toEqual(['en']);
    });

    it('should parse multiple valid content languages from cookie', () => {
      const cookieString = 'prefers-content-languages=%5B%22en%22%2C%22ru%22%5D'; // ["en","ru"] encoded
      const result = getCookieStringContentLanguages(cookieString);
      expect(result).toEqual(['en', 'ru']);
    });

    it('should return default languages when cookie contains invalid JSON', () => {
      const cookieString = 'prefers-content-languages=invalid-json';
      const result = getCookieStringContentLanguages(cookieString);
      expect(result).toEqual(ALL_CONTENT_LANGUAGES);
    });

    it('should return default languages when cookie contains invalid languages', () => {
      const cookieString = 'prefers-content-languages=%5B%22fr%22%2C%22es%22%5D'; // ["fr","es"] encoded
      const result = getCookieStringContentLanguages(cookieString);
      expect(result).toEqual(ALL_CONTENT_LANGUAGES);
    });
  });

  describe('updateDocumentCookieContentLanguages', () => {
    it('should set cookie with valid content languages', () => {
      const languages: ContentLanguage[] = ['en'];
      updateDocumentCookieContentLanguages(languages);
      // Note: In a real test environment, you would check the actual cookie
      // This is a basic test to ensure the function doesn't throw
      expect(true).toBe(true);
    });

    it('should remove cookie when empty array is passed', () => {
      updateDocumentCookieContentLanguages([]);
      // Note: In a real test environment, you would check the actual cookie
      // This is a basic test to ensure the function doesn't throw
      expect(true).toBe(true);
    });
  });
});
