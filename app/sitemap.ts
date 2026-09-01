import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = 'https://dccchidera-lgtm.github.io';

const routes = [
  '',
  '/work',
  '/work/decision-intelligence',
  '/work/customer-intelligence',
  '/work/process-redesign',
  '/work/predictive-analytics',
  '/research',
  '/profile',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date('2026-09-01'),
    changeFrequency: route === '' ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : route === '/work' ? 0.9 : 0.7,
  }));
}
