type ShortcutKeyResult = {
  symbol: string;
  readable: string;
};

export const isClient = (): boolean => typeof window !== 'undefined';
export const isServer = (): boolean => !isClient();
export const isMacOS = (): boolean => isClient() && window.navigator.platform === 'MacIntel';

const shortcutKeyMap: Record<string, ShortcutKeyResult> = {
  alt: isMacOS() ? { readable: 'Option', symbol: '⌥' } : { readable: 'Alt', symbol: 'Alt' },
  mod: isMacOS() ? { readable: 'Command', symbol: '⌘' } : { readable: 'Control', symbol: 'Ctrl' },
  shift: { readable: 'Shift', symbol: '⇧' },
};

export const getShortcutKey = (key: string): ShortcutKeyResult =>
  shortcutKeyMap[key.toLowerCase()] || { readable: key, symbol: key };

export const getShortcutKeys = (keys: string[]): ShortcutKeyResult[] => keys.map(getShortcutKey);
