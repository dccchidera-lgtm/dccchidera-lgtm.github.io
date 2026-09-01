const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';
const normalizedBasePath = configuredBasePath.replace(/^\/+|\/+$/g, '');

export const basePath = normalizedBasePath ? `/${normalizedBasePath}` : '';

export function publicPath(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return href;

  const match = href.match(/^([^?#]*)(.*)$/);
  if (!match) return href;

  const [, rawPathname, suffix] = match;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(rawPathname);
  const pathname =
    rawPathname === '/' || rawPathname.endsWith('/') || hasFileExtension
      ? rawPathname
      : `${rawPathname}/`;

  return `${basePath}${pathname}${suffix}`;
}
