import type { Metadata } from 'next';
import { SiteEffects } from '@/components/site-effects';
import { publicPath } from '@/lib/paths';
import './globals.css';

const siteUrl = 'https://dccchidera-lgtm.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Daniel Christopher | Analytics & Digital Marketing',
    template: '%s | Daniel Christopher',
  },
  description:
    'Evidence-led portfolio by Daniel Christopher, combining business analytics, digital marketing, customer research and digital transformation.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: publicPath('/favicon.svg'),
  },
  openGraph: {
    title: 'Daniel Christopher | Analytics & Digital Marketing',
    description:
      'Evidence-led work across analytics, customer research, digital marketing and transformation.',
    type: 'website',
    url: siteUrl,
    siteName: 'Daniel Christopher',
    locale: 'en_GB',
    images: [
      {
        url: `${siteUrl}/og-daniel-christopher.png`,
        width: 1200,
        height: 630,
        alt: 'A minimal evidence-to-decision diagram for Daniel Christopher’s analytics portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Christopher | Analytics & Digital Marketing',
    description:
      'Evidence-led work across analytics, customer research, digital marketing and transformation.',
    images: [`${siteUrl}/og-daniel-christopher.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteEffects />
        {children}
      </body>
    </html>
  );
}
