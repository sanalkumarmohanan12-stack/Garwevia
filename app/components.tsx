import Link from 'next/link';
import Image from 'next/image';
import { Parallax } from './motion';
import type { Shot } from './images';

export function Arrow() {
  return (
    <svg className="arrow" width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Renders `*text*` segments of a title as serif italic accents. */
export function Accent({ text }: { text: string }) {
  return <>{text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}</>;
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker" data-reveal>{children}</p>;
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="GARWEVIA home" className="logo">
      <Image
        src={light ? '/logos/garwevia-light-cropped.webp' : '/logos/garwevia-dark-cropped.webp'}
        alt="GARWEVIA — Global Apparel Sourcing & Manufacturing"
        width={light ? 1916 : 1908}
        height={light ? 427 : 422}
        sizes="280px"
        priority
      />
    </Link>
  );
}

/** Edge-to-edge scrolling band of oversized words. */
export function Marquee({ words, tone = 'dark' }: { words: string[]; tone?: 'dark' | 'sand' }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {words.map((w, i) => <li key={w} className={i % 2 ? 'outline' : ''}>{w}<span className="star" aria-hidden="true">✦</span></li>)}
    </ul>
  );
  return (
    <div className={'marquee marquee-' + tone} aria-label={words.join(', ')}>
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </div>
  );
}

export function PageHero({ kicker, title, intro, image, art, crumb }: { kicker: string; title: string; intro: string; image?: Shot; art?: React.ReactNode; crumb: string }) {
  const cls = art ? 'page-hero page-hero-art' : image ? 'page-hero' : 'page-hero page-hero-plain';
  return (
    <section className={cls}>
      {image && !art && <Parallax shot={image} priority speed={0.12} />}
      {art && <div className="page-hero-visual" aria-hidden="true">{art}</div>}
      <div className="page-hero-shade" aria-hidden="true" />
      <div className="page-hero-content wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">—</span><span aria-current="page">{crumb}</span>
        </nav>
        <p className="kicker">{kicker}</p>
        <h1 className="page-title"><Accent text={title} /></h1>
        <p className="page-intro">{intro}</p>
      </div>
      {(image || art) && (
        <span className="hero-meta-end page-cue" aria-hidden="true">
          {image && !art && <span className="illustrative">Illustrative imagery</span>}
          <span className="scroll-cue">Scroll <i /></span>
        </span>
      )}
    </section>
  );
}

export function Cta() {
  return (
    <section className="cta">
      <div className="cta-inner wrap">
        <Kicker>Let us build what is next</Kicker>
        <h2 className="cta-title" data-reveal>Got a tech pack?<br /><em>Let’s make it.</em></h2>
        <div className="cta-row" data-reveal>
          <p>Send us your tech pack, reference garment or product brief. We’ll evaluate the requirement and identify suitable options through our sourcing network.</p>
          <Link className="cta-orb" href="/start-a-project">
            <span>Start a<br />project</span>
            <Arrow />
          </Link>
        </div>
        <Link className="cta-alt" href="/contact">or schedule a discussion <Arrow /></Link>
      </div>
    </section>
  );
}

const footerCols: [string, [string, string][]][] = [
  ['Explore', [['About GARWEVIA', '/about'], ['Products', '/products'], ['How it works', '/how-it-works'], ['Contact', '/contact']]],
  ['Capabilities', [['Sourcing services', '/sourcing-services'], ['Product development', '/product-development'], ['Manufacturing network', '/manufacturing-network'], ['Quality assurance', '/quality-assurance'], ['Compliance & sustainability', '/compliance-sustainability']]],
  ['Start', [['Submit an RFQ', '/start-a-project'], ['Schedule a call', '/contact']]],
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <p className="footer-statement">One sourcing partner.<br /><em>The right manufacturer for every product.</em></p>
        <Link className="pill pill-sand" href="/start-a-project">Start a project <span className="pill-dot" /></Link>
      </div>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <span>Tiruppur, Tamil Nadu, India</span>
          <span>Business contact details to be confirmed.</span>
        </div>
        {footerCols.map(([heading, links]) => (
          <nav key={heading} className="footer-col" aria-label={heading}>
            <h4>{heading}</h4>
            {links.map(([label, href]) => <Link key={href + label} href={href}>{label}</Link>)}
          </nav>
        ))}
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} GARWEVIA. All rights reserved.</span>
        <div>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-of-use">Terms</Link>
          <Link href="/cookie-policy">Cookies</Link>
        </div>
        <span>Global apparel sourcing &amp; manufacturing</span>
      </div>
    </footer>
  );
}
