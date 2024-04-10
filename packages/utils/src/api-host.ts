// local modules
export const getApiHost = (): string | undefined => {
  try {
    return process.env.NEXT_PUBLIC_API_HOST;
  } catch {
    return (window as any).ENV.NEXT_PUBLIC_API_HOST;
  }
};

export function apiHost(pathname: string): string;
export function apiHost(pathname: undefined): undefined;
export function apiHost(pathname: string | undefined): string | undefined;
export function apiHost(pathname: string | undefined): string | undefined {
  if (!pathname) return undefined;
  if (pathname.startsWith('http')) return pathname;
  return `${getApiHost()}${pathname}`;
}
