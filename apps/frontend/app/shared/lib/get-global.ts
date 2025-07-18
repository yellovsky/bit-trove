const getGlobalOrUndefined = (key: keyof (typeof window)['env']): string | undefined | null => {
  // biome-ignore lint/style/noProcessEnv: it's temporary, I hope
  if (typeof window === 'undefined') return process.env[key];

  // Check window.env first (for test environments)
  if (window.env?.[key]) return window.env[key];

  switch (key) {
    case 'APP_ENV':
      return document.documentElement.getAttribute('data-app-env');
    case 'REMIX_PUBLIC_API_HOST':
      return document.documentElement.getAttribute('data-public-api-host');
    case 'REMIX_PUBLIC_CLIENT_HOST':
      return document.documentElement.getAttribute('data-public-client-host');
    default:
      return undefined;
  }
};

export const getGlobal = (key: keyof (typeof window)['env']): string => {
  const val = getGlobalOrUndefined(key);
  if (!val) throw new Error(`Global env "${key}" must be provided`);
  return val;
};
