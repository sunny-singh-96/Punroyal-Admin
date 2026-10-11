import { baseURL } from '@/constants/endpoint';

/** Resolve API-hosted static assets (e.g. /influencer-payments/...) to a full URL. */
export function resolveApiAssetUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const apiOrigin = baseURL.replace(/\/v1\/?$/, '');
  return `${apiOrigin}${path.startsWith('/') ? path : `/${path}`}`;
}
