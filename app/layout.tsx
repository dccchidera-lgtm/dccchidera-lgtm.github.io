import type { Metadata } from 'next';
import { SiteEffects } from '@/components/site-effects';
import { publicPath } from '@/lib/paths';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Daniel Christopher | Analytics & Digital Marketing',
    template: '%s | Daniel Christopher',
  },
  description:
    'Evidence-led portfolio by Daniel Christopher, combining business analytics, digital marketing, customer research and digital transformation.',
  icons: {
    icon: publicPath('/favicon.svg'),
  },
  openGraph: {
    title: 'Daniel Christopher | Analytics & Digital Marketing',
    description:
      'Evidence-led work across analytics, customer research, digital marketing and transformation.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Daniel Christopher | Analytics & Digital Marketing',
    description:
      'Evidence-led work across analytics, customer research, digital marketing and transformation.',
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
