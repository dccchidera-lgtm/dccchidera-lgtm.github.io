import type { Metadata } from 'next';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Daniel Christopher`,
      description,
      url: path,
      type: 'website',
      siteName: 'Daniel Christopher',
      locale: 'en_GB',
      images: [{
        url: '/og-daniel-christopher.png',
        width: 1200,
        height: 630,
        alt: 'Daniel Christopher’s analytics portfolio',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Daniel Christopher`,
      description,
      images: ['/og-daniel-christopher.png'],
    },
  };
}
