export function apiHost(pathname: string): string;
export function apiHost(pathname: undefined): undefined;
export function apiHost(pathname: string | undefined): string | undefined;
export function apiHost(pathname: string | undefined): string | undefined {
  if (!pathname) return undefined;
  if (pathname.startsWith('http')) return pathname;
  return `${process.env.NEXT_PUBLIC_API_HOST}${pathname}`;
}
