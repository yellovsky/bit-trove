import { describe, expect, it, vi } from 'vitest';

import { getGlobal } from './get-global';
import { addClientHost, addLocaleToPathname, removeLocaleFromPathname, setPathnameLocale, toToHref } from './link';

// Mock getGlobal
vi.mock('./get-global', () => ({
  getGlobal: vi.fn(),
}));

describe('toToHref', () => {
  it('converts string To to href', () => {
    expect(toToHref('/about')).toBe('/about');
    expect(toToHref('/')).toBe('/');
  });

  it('converts object To to href', () => {
    expect(toToHref({ pathname: '/about' })).toBe('/about');
    expect(toToHref({ pathname: '/about', search: '?q=test' })).toBe('/about?q=test');
    expect(toToHref({ search: '?q=test' })).toBe('?q=test');
  });

  it('handles empty pathname', () => {
    expect(toToHref({ pathname: '', search: '?q=test' })).toBe('?q=test');
  });
});

describe('addClientHost', () => {
  beforeEach(() => {
    vi.mocked(getGlobal).mockReturnValue('https://example.com');
  });

  it('adds client host to string To', () => {
    expect(addClientHost('/about')).toBe('https://example.com/about');
  });

  it('adds client host to object To', () => {
    expect(addClientHost({ pathname: '/about', search: '?q=test' })).toBe('https://example.com/about?q=test');
  });
});

describe('removeLocaleFromPathname', () => {
  it('removes supported locales from pathname', () => {
    expect(removeLocaleFromPathname('/en/about')).toBe('/about');
    expect(removeLocaleFromPathname('/ru/contact')).toBe('/contact');
    expect(removeLocaleFromPathname('/en/')).toBe('/');
  });

  it('keeps pathname unchanged for unsupported locales', () => {
    expect(removeLocaleFromPathname('/fr/about')).toBe('/fr/about');
    expect(removeLocaleFromPathname('/de/contact')).toBe('/de/contact');
  });

  it('keeps pathname unchanged when no locale prefix', () => {
    expect(removeLocaleFromPathname('/about')).toBe('/about');
    expect(removeLocaleFromPathname('/')).toBe('/');
  });

  it('handles empty pathname', () => {
    expect(removeLocaleFromPathname('')).toBe('');
  });
});

describe('addLocaleToPathname', () => {
  it('adds locale to pathname without existing locale', () => {
    expect(addLocaleToPathname('/about', 'en')).toBe('/en/about');
    expect(addLocaleToPathname('/contact', 'ru')).toBe('/ru/contact');
    expect(addLocaleToPathname('/', 'en')).toBe('/en/');
  });

  it('replaces existing locale with new locale', () => {
    expect(addLocaleToPathname('/ru/about', 'en')).toBe('/en/about');
    expect(addLocaleToPathname('/en/contact', 'ru')).toBe('/ru/contact');
  });

  it('keeps external URLs unchanged', () => {
    expect(addLocaleToPathname('https://example.com', 'en')).toBe('https://example.com');
    expect(addLocaleToPathname('http://localhost:3000', 'ru')).toBe('http://localhost:3000');
  });

  it('handles empty pathname', () => {
    expect(addLocaleToPathname('', 'en')).toBe('/en');
  });
});

describe('setPathnameLocale', () => {
  it('sets locale and removes trailing slash', () => {
    expect(setPathnameLocale('/about', 'en')).toBe('/en/about');
    expect(setPathnameLocale('/about/', 'en')).toBe('/en/about');
    expect(setPathnameLocale('/', 'en')).toBe('/en');
  });

  it('replaces existing locale', () => {
    expect(setPathnameLocale('/ru/about/', 'en')).toBe('/en/about');
    expect(setPathnameLocale('/en/contact', 'ru')).toBe('/ru/contact');
  });

  it('handles external URLs', () => {
    expect(setPathnameLocale('https://example.com', 'en')).toBe('https://example.com');
  });
});
