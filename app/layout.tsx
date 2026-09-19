import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteEffects } from "@/components/site-effects";
import { publicPath } from "@/lib/paths";
import "./globals.css";
import "./visual-polish.css";
import "./layout-refinement.css";
import "./editorial-type.css";
import "./type-and-layout-fixes.css";

const grotesk = localFont({ src: [
  { path: "../public/fonts/space-grotesk-400.woff2", weight: "400", style: "normal" },
  { path: "../public/fonts/space-grotesk-700.woff2", weight: "700", style: "normal" },
], variable: "--font-grotesk", display: "swap" });
const newsreader = localFont({ src: "../public/fonts/newsreader-italic.woff2", weight: "400", style: "italic", variable: "--font-editorial", display: "swap", preload: false });

const siteUrl = "https://dccchidera-lgtm.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daniel Christopher | Digital Builds, Analytics & Marketing",
    template: "%s | Daniel Christopher",
  },
  description:
    "Independent digital builds, evidence-led analytics, customer research and digital marketing by Daniel Christopher.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: publicPath("/favicon.svg"),
  },
  openGraph: {
    title: "Daniel Christopher | Digital Builds, Analytics & Marketing",
    description:
      "Digital builds, analytics, customer research and marketing work by Daniel Christopher.",
    type: "website",
    url: siteUrl,
    siteName: "Daniel Christopher",
    locale: "en_GB",
    images: [
      {
        url: `${siteUrl}/og-daniel-christopher.png`,
        width: 1200,
        height: 630,
        alt: "A minimal evidence-to-decision diagram for Daniel Christopher’s analytics portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Christopher | Digital Builds, Analytics & Marketing",
    description:
      "Digital builds, analytics, customer research and marketing work by Daniel Christopher.",
    images: [`${siteUrl}/og-daniel-christopher.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>
        <SiteEffects />
        {children}
      </body>
    </html>
  );
}
