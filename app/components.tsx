import Link from 'next/link';
import Image from 'next/image';
import { Parallax } from './motion';
import { shotStyle, type Shot } from './images';
import { contact, mailHref } from './contact';

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
        <Link className="cta-alt" href="/schedule-a-meeting">or book a Teams meeting <Arrow /></Link>
      </div>
    </section>
  );
}

const footerCols: [string, [string, string][]][] = [
  ['Explore', [['About GARWEVIA', '/about'], ['Products', '/products'], ['How it works', '/how-it-works'], ['Knitwear glossary', '/knitwear-glossary'], ['Contact', '/contact']]],
  ['Capabilities', [['Sourcing services', '/sourcing-services'], ['Product development', '/product-development'], ['Manufacturing network', '/manufacturing-network'], ['Quality assurance', '/quality-assurance'], ['Compliance & sustainability', '/compliance-sustainability']]],
  ['Start', [['Submit an RFQ', '/start-a-project'], ['Schedule a meeting', '/schedule-a-meeting']]],
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <p className="footer-statement">One sourcing partner.<br /><em>The right manufacturer for every product.</em></p>
      </div>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <address className="footer-contact">
            <a href={mailHref()}>{contact.email}</a>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <span>{contact.address.join(', ')}</span>
          </address>
          {contact.whatsapp && (
            <a className="footer-wa" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={20} /> Chat on WhatsApp</a>
          )}
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

const icons = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  phone: <path d="M6.6 3.5h3l1.5 4.2-2 1.3a11 11 0 0 0 5.9 5.9l1.3-2 4.2 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 14h3v3H8z" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  brief: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
};

export function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg className="icon icon-wa" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path fill="currentColor" d="M16.04 3C8.86 3 3.03 8.8 3.03 15.95c0 2.29.6 4.52 1.75 6.49L3 29l6.73-1.75a13.03 13.03 0 0 0 6.31 1.6h.01C23.2 28.85 29 23.05 29 15.9 29 12.45 27.65 9.2 25.2 6.77A12.92 12.92 0 0 0 16.04 3Zm0 23.67h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.23-4 1.04 1.07-3.88-.26-.4a10.7 10.7 0 0 1-1.65-5.75c0-5.95 4.85-10.78 10.8-10.78 2.88 0 5.59 1.12 7.62 3.15a10.68 10.68 0 0 1 3.16 7.62c0 5.94-4.85 10.77-10.8 10.77Zm5.92-8.07c-.32-.16-1.92-.94-2.22-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6-.96-.85-1.61-1.9-1.8-2.22-.19-.32-.02-.5.14-.65.14-.14.32-.38.49-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69s1.16 3.12 1.32 3.33c.16.21 2.28 3.47 5.52 4.87.77.33 1.37.53 1.84.68.77.24 1.48.21 2.03.13.62-.09 1.92-.78 2.19-1.54.27-.76.27-1.41.19-1.54-.08-.14-.3-.22-.62-.38Z" />
    </svg>
  );
}

/** Floating WhatsApp button — rendered only once the WhatsApp Business link is configured. */
export function WhatsAppFloat() {
  if (!contact.whatsapp) return null;
  return (
    <a className="wa-float" href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with GARWEVIA on WhatsApp">
      <WhatsAppIcon size={30} />
    </a>
  );
}

/**
 * Full-screen hero over a wall of photo columns drifting up and down (pure CSS animation).
 * `columns` lists the tiles per column; each column is rendered twice so the loop is seamless.
 */
export function PhotoWall({ columns, children, className = '' }: { columns: Shot[][]; children: React.ReactNode; className?: string }) {
  return (
    <section className={'wall-hero ' + className}>
      <div className="wall" aria-hidden="true">
        {columns.map((col, c) => (
          <div key={c} className="wall-col">
            <div className="wall-track">
              {[...col, ...col].map((s, n) => (
                <figure key={n} className="wall-tile">
                  <Image src={s.src} alt="" fill sizes="(max-width: 700px) 36vw, 22vw" priority={n < 2} style={shotStyle(s)} />
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="wall-shade" aria-hidden="true" />
      <div className="wall-copy wrap">{children}</div>
    </section>
  );
}

/** Structured data for search engines (schema.org JSON-LD). */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
