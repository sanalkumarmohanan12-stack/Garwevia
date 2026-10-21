import Link from 'next/link';
import Image from 'next/image';
import { shotStyle, type Shot } from './images';
import { contact, mailHref } from './contact';
import { accessories, certDisclaimer, certifications, type TrimIcon } from './range';

export function Arrow() {
  return (
    <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Renders `*text*` segments of a title as accent-coloured words. */
export function Accent({ text }: { text: string }) {
  return <>{text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}</>;
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker">{children}</p>;
}

/** `tone="dark"` = navy wordmark for light backgrounds (default); `"light"` = white wordmark for the footer. */
export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark';
  return (
    <Link href="/" aria-label="GARWEVIA home" className="logo">
      <Image
        src={dark ? '/logos/garwevia-dark-cropped.webp' : '/logos/garwevia-light-cropped.webp'}
        alt="GARWEVIA — Global Apparel Sourcing & Manufacturing"
        width={dark ? 1908 : 1916}
        height={dark ? 422 : 427}
        sizes="300px"
        priority={dark}
      />
    </Link>
  );
}

/** Section heading block: kicker, title and optional intro, with an optional link on the right. */
export function SectionHead({ kicker, title, intro, link }: { kicker: string; title: string; intro?: string; link?: [string, string] }) {
  return (
    <div className="sec-head">
      <div>
        <Kicker>{kicker}</Kicker>
        <h2><Accent text={title} /></h2>
        {intro && <p>{intro}</p>}
      </div>
      {link && <Link className="text-link" href={link[1]}>{link[0]} <Arrow /></Link>}
    </div>
  );
}

/** Inner-page header: breadcrumb and title on the left, a photo or illustration on the right. */
export function PageHero({ kicker, title, intro, image, art, crumb }: { kicker: string; title: string; intro: string; image?: Shot; art?: React.ReactNode; crumb: string }) {
  const visual = image || art;
  return (
    <section className={visual ? 'page-hero has-visual' : 'page-hero'}>
      <div className="wrap page-hero-grid">
        <div className="page-hero-copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{crumb}</span>
          </nav>
          <Kicker>{kicker}</Kicker>
          <h1 className="page-title"><Accent text={title} /></h1>
          <p className="page-intro">{intro}</p>
        </div>
        {visual && (
          <div className={image && !art ? 'page-hero-visual is-photo' : 'page-hero-visual'} aria-hidden="true">
            {art ?? (image && <><Image src={image.src} alt="" fill priority sizes="(max-width: 900px) 100vw, 45vw" style={shotStyle(image)} /><span className="illustrative">Illustrative imagery</span></>)}
          </div>
        )}
      </div>
    </section>
  );
}

export function Cta({ title = 'Have a tech pack or trim card?', text = 'Send us your tech pack, reference garment or accessory requirement. We review it and come back with a manufacturing route and costing through our network.' }: { title?: string; text?: string }) {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <div>
          <Kicker>Start a project</Kicker>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Link className="btn btn-primary" href="/start-a-project">Send your brief <Arrow /></Link>
          <Link className="btn btn-ghost" href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  );
}

const footerCols: [string, [string, string][]][] = [
  ['Company', [['About GARWEVIA', '/about'], ['How it works', '/how-it-works'], ['Contact', '/contact'], ['Knitwear glossary', '/knitwear-glossary']]],
  ['Products', [['Knitwear', '/products'], ['Accessories & trims', '/products#accessories'], ['Certifications', '/compliance-sustainability']]],
  ['Capabilities', [['Sourcing services', '/sourcing-services'], ['Product development', '/product-development'], ['Manufacturing network', '/manufacturing-network'], ['Quality assurance', '/quality-assurance'], ['Compliance & sustainability', '/compliance-sustainability']]],
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo tone="light" />
          <p>End-to-end knitwear sourcing and manufacturing from Tiruppur, India — one accountable partner from yarn to shipment.</p>
          <address className="footer-contact">
            <a href={mailHref()}><Icon name="mail" /> {contact.email}</a>
            <a href={contact.phoneHref}><Icon name="phone" /> {contact.phone}</a>
            <span><Icon name="pin" /> {contact.address.join(', ')}</span>
          </address>
          <Social />
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
      </div>
    </footer>
  );
}

/** LinkedIn and WhatsApp buttons. LinkedIn shows a "coming soon" state until its link is set in contact.ts. */
export function Social() {
  return (
    <div className="social">
      {contact.linkedin
        ? <a className="social-btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="GARWEVIA on LinkedIn"><LinkedInIcon /></a>
        : <span className="social-btn is-pending" title="LinkedIn page coming soon" aria-label="LinkedIn page coming soon"><LinkedInIcon /></span>}
      {contact.whatsapp && <a className="social-btn" href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WhatsAppIcon size={20} /></a>}
    </div>
  );
}

const icons = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  phone: <path d="M6.6 3.5h3l1.5 4.2-2 1.3a11 11 0 0 0 5.9 5.9l1.3-2 4.2 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  brief: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  check: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  sample: <path d="M8 4 4 7l2 4 2-1v10h8V10l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4Z" />,
  fabric: <path d="M4 7c2.5-2 5.5-2 8 0s5.5 2 8 0M4 12c2.5-2 5.5-2 8 0s5.5 2 8 0M4 17c2.5-2 5.5-2 8 0s5.5 2 8 0" />,
  cut: <><circle cx="6" cy="7" r="2.5" /><circle cx="6" cy="17" r="2.5" /><path d="M8.2 8.3 20 16M8.2 15.7 20 8" /></>,
  stitch: <><path d="M3 18h18" /><path d="M5 14h2M10 14h2M15 14h2" /><path d="M13 3v8M11 11h4" /><path d="M8 3h10v4H8z" /></>,
  print: <path d="M12 3l2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8z" />,
  ship: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
  // accessories
  label: <><rect x="3" y="7" width="18" height="10" rx="1.5" /><path d="M7 10.5h10M7 13.5h6" /></>,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="8.5" r="1.5" /></>,
  button: <><circle cx="12" cy="12" r="8" /><circle cx="10" cy="10" r="1" /><circle cx="14" cy="10" r="1" /><circle cx="10" cy="14" r="1" /><circle cx="14" cy="14" r="1" /></>,
  zip: <><path d="M12 3v18" /><path d="M9 5h3M12 7h3M9 9h3M12 11h3M9 13h3" /><rect x="9" y="15" width="6" height="6" rx="1.5" /></>,
  cord: <><path d="M6 3c0 6 12 6 12 12v3" /><rect x="16.5" y="18" width="3" height="3.5" rx=".8" /><circle cx="6" cy="3.5" r="1" /></>,
  patch: <><path d="M12 3l2.6 2.2 3.4-.4.4 3.4L21 12l-2.6 2.8-.4 3.4-3.4-.4L12 21l-2.6-2.2-3.4.4-.4-3.4L3 12l2.6-2.8.4-3.4 3.4.4Z" /><circle cx="12" cy="12" r="3" /></>,
  box: <><path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z" /><path d="m3 7 9 4 9-4M12 11v10" /></>,
  tape: <><circle cx="9" cy="12" r="6" /><circle cx="9" cy="12" r="2" /><path d="M15 12h6" /></>,
};
export type IconName = keyof typeof icons;

export function Icon({ name, size = 22 }: { name: IconName | TrimIcon; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

export function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
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
      <WhatsAppIcon size={28} />
    </a>
  );
}

/** Accessories & trims: one card per trim family. `limit` shows the first n items per card. */
export function AccessoryGrid({ limit }: { limit?: number }) {
  return (
    <div className="trim-grid">
      {accessories.map(g => (
        <article key={g.name} className="trim-card">
          <span className="trim-icon"><Icon name={g.icon} size={26} /></span>
          <h3>{g.name}</h3>
          <p>{g.intro}</p>
          <ul>{(limit ? g.items.slice(0, limit) : g.items).map(i => <li key={i}>{i}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}

/** Certification frameworks grouped by purpose, with the partner-level disclaimer. */
export function CertGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'certs is-compact' : 'certs'}>
      {certifications.map(g => (
        <div key={g.name} className="cert-group">
          <div className="cert-group-head">
            <h3>{g.name}</h3>
            {!compact && <p>{g.intro}</p>}
          </div>
          <ul className="cert-list">
            {g.certs.map(c => (
              <li key={c.name} className="cert">
                <strong>{c.name}</strong>
                <span>{c.full}</span>
                {!compact && <small>{c.scope}</small>}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="cert-note"><Icon name="check" size={18} /> {certDisclaimer}</p>
    </div>
  );
}

/** Static numbered process strip. */
export function Steps({ steps }: { steps: { title: string; body?: string; icon?: IconName }[] }) {
  return (
    <ol className="steps" style={{ ['--cols' as string]: steps.length <= 5 ? steps.length : steps.length % 4 === 0 ? 4 : steps.length % 3 === 0 ? 3 : 4 }}>
      {steps.map((s, i) => (
        <li key={s.title}>
          <div className="step-top">
            <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
            {s.icon && <Icon name={s.icon} />}
          </div>
          <h3>{s.title}</h3>
          {s.body && <p>{s.body}</p>}
        </li>
      ))}
    </ol>
  );
}

/** Structured data for search engines (schema.org JSON-LD). */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

/** Slow scrolling band of product names (static when the visitor prefers reduced motion). */
export function Marquee({ words }: { words: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>{words.map(w => <li key={w}>{w}<span aria-hidden="true">✦</span></li>)}</ul>
  );
  return <div className="b-marquee" aria-label={words.join(', ')}><div className="b-marquee-track">{row(false)}{row(true)}</div></div>;
}
