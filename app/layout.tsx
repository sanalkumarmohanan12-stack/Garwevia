import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif, IBM_Plex_Mono } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import { Header, CookieConsent } from './ui';
import { Footer, JsonLd, WhatsAppFloat } from './components';
import { SITE, organizationLd, seo } from './seo';
import { MotionRoot } from './motion';

const sans = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-sans', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

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
};

export const viewport: Viewport = { themeColor: '#060D18' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* Enables reveal-on-scroll styles only when JavaScript runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationLd} />
        <WhatsAppFloat />
        <CookieConsent />
        <MotionRoot />
      </body>
    </html>
  );
}
