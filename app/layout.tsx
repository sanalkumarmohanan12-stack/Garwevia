import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif, IBM_Plex_Mono } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import { Header, CookieConsent } from './ui';
import { Footer } from './components';
import { MotionRoot } from './motion';

const sans = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-sans', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'GARWEVIA | Apparel Sourcing & Manufacturing in India', template: '%s | GARWEVIA' },
  description: 'GARWEVIA is a Tiruppur-based apparel sourcing partner connecting global brands with selected manufacturing capabilities in India.',
  openGraph: { title: 'GARWEVIA — Global Apparel Sourcing & Manufacturing', description: 'One sourcing partner. The right manufacturer for every product.', type: 'website' },
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
        <CookieConsent />
        <MotionRoot />
      </body>
    </html>
  );
}
