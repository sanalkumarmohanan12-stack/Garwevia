import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header, CookieConsent } from './ui';
import { Footer, JsonLd, WhatsAppFloat } from './components';
import { SITE, organizationLd, seo } from './seo';

// Self-hosted variable fonts (SIL OFL): Plus Jakarta Sans for headings, Inter for text.
const sans = localFont({ src: './fonts/inter.woff2', variable: '--font-sans', weight: '100 900', display: 'swap' });
const display = localFont({ src: './fonts/jakarta.woff2', variable: '--font-display', weight: '200 800', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: seo.home.title, template: '%s | GARWEVIA' },
  description: seo.home.description,
  keywords: seo.home.keywords,
  applicationName: 'GARWEVIA',
  category: 'Apparel manufacturing',
  alternates: { canonical: '/' },
  openGraph: { siteName: 'GARWEVIA', type: 'website', locale: 'en_US', url: '/', title: seo.home.title, description: seo.home.description },
  twitter: { card: 'summary_large_image', title: seo.home.title, description: seo.home.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  formatDetection: { telephone: false },
  // Paste the codes from Google Search Console / Bing Webmaster Tools into these environment variables.
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION, other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : undefined },
};

export const viewport: Viewport = { themeColor: '#FFFFFF' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationLd} />
        <WhatsAppFloat />
        <CookieConsent />
      </body>
    </html>
  );
}
