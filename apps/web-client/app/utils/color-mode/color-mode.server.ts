// global modules
import { createCookieSessionStorage } from '@remix-run/node';

// local modules
import { type ColorMode, isColorMode } from './color-mode.provider';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const colorModeStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    name: 'color_mode',
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
    secure: true,
  },
});

export const getColorModeSession = async (request: Request) => {
  const session = await colorModeStorage.getSession(request.headers.get('Cookie'));

  return {
    commit: () => colorModeStorage.commitSession(session),
    getColorMode: () => {
      const themeValue = session.get('color_mode');
      return isColorMode(themeValue) ? themeValue : null;
    },
    setColorMode: (theme: ColorMode) => session.set('color_mode', theme),
  };
};
