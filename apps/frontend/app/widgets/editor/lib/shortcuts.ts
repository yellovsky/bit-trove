export interface ShortcutKey {
  symbol: string;
  readable: string;
}

export const getShortcutKey = (key: string): ShortcutKey => {
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  switch (key.toLowerCase()) {
    case 'mod':
      return {
        readable: isMac ? 'Cmd' : 'Ctrl',
        symbol: isMac ? '⌘' : 'Ctrl',
      };
    case 'shift':
      return {
        readable: 'Shift',
        symbol: '⇧',
      };
    case 'alt':
      return {
        readable: 'Alt',
        symbol: '⌥',
      };
    case 'ctrl':
      return {
        readable: 'Ctrl',
        symbol: 'Ctrl',
      };
    case 'cmd':
      return {
        readable: 'Cmd',
        symbol: '⌘',
      };
    default:
      return {
        readable: key.toUpperCase(),
        symbol: key.toUpperCase(),
      };
  }
};
