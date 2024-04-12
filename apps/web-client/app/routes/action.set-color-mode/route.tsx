// global modules
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

// local modules
import { getColorModeSession } from '~/utils/color-mode/color-mode.server';
import { isColorMode } from '~/utils/color-mode';

export const action: ActionFunction = async ({ request }) => {
  const colorModeSession = await getColorModeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const colorMode = form.get('colorMode');

  if (!isColorMode(colorMode)) {
    return json({
      message: `colorMode value of ${colorMode} is not a valid color mode`,
      success: false,
    });
  }

  colorModeSession.setColorMode(colorMode);

  return json({ success: true }, { headers: { 'Set-Cookie': await colorModeSession.commit() } });
};

export const loader: LoaderFunction = () => redirect('/', { status: 404 });
