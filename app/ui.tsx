'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon, LinkedInIcon, Logo, WhatsAppIcon } from './components';
import { contact, mailHref } from './contact';

type Item = [label: string, href: string, sub?: string];
type Group = { label: string; items: Item[] };

const products: Group = { label: 'Products', items: [
  ['Knitwear', '/products', 'Tops, sweats, dresses, kidswear, activewear, underwear'],
  ['Knitted accessories', '/products#knitted-accessories', 'Beanies, scarves, socks, headbands and more'],
  ['Trims & packaging', '/products#accessories', 'Labels, closures, cords and packaging'],
] };
const capabilities: Group = { label: 'Capabilities', items: [
  ['Sourcing services', '/sourcing-services', 'Requirement review to shipment coordination'],
  ['Product development', '/product-development', 'Tech pack, samples, fabric parameters, fit'],
  ['Manufacturing network', '/manufacturing-network', 'Knit fabrics, yarns, dyeing, printing, sewing'],
  ['Quality assurance', '/quality-assurance', 'QC checkpoints, testing, AQL inspection'],
] };
const links: Item[] = [['Certifications', '/compliance-sustainability'], ['How it works', '/how-it-works'], ['About', '/about'], ['Contact', '/contact']];

function Chevron() {
  return <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);

  useEffect(() => { document.documentElement.classList.toggle('menu-open', open); }, [open]);
  const close = () => { setOpen(false); setDrop(null); };
  const current = (href: string) => (pathname === href.split('#')[0] ? 'page' : undefined);

  const dropdown = (g: Group) => {
    const isOpen = drop === g.label;
    const active = g.items.some(([, href]) => pathname === href.split('#')[0]);
    return (
      <div key={g.label} className={isOpen ? 'nav-drop is-open' : 'nav-drop'} onMouseEnter={() => setDrop(g.label)} onMouseLeave={() => setDrop(null)}
        onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDrop(null); }}>
        <button type="button" className={active ? 'nav-link is-current' : 'nav-link'} aria-expanded={isOpen} onClick={() => setDrop(isOpen ? null : g.label)}>
          {g.label} <Chevron />
        </button>
        <div className="nav-panel">
          {g.items.map(([label, href, sub]) => (
            <Link key={href} href={href} onClick={close} aria-current={current(href)}><b>{label}</b><small>{sub}</small></Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className={open ? 'site-header is-open' : 'site-header'}>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span className="topbar-place">Knitwear &amp; accessories sourcing · Tiruppur, India</span>
          <div className="topbar-links">
            <a href={mailHref()}><Icon name="mail" size={15} /> {contact.email}</a>
            <a href={contact.phoneHref}><Icon name="phone" size={15} /> {contact.phone}</a>
            {contact.linkedin
              ? <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon size={15} /></a>
              : <span className="is-pending" title="LinkedIn page coming soon" aria-label="LinkedIn page coming soon"><LinkedInIcon size={15} /></span>}
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon size={16} /></a>
          </div>
        </div>
      </div>
      <div className="wrap header-inner">
        <Logo />
        <nav className="nav" aria-label="Main navigation">
          {dropdown(products)}
          {dropdown(capabilities)}
          {links.map(([label, href]) => <Link key={href} className="nav-link" href={href} aria-current={current(href)}>{label}</Link>)}
        </nav>
        {pathname !== '/start-a-project' && <Link className="btn btn-primary header-cta" href="/start-a-project">Send your brief</Link>}
        <button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <span className="menu-lines"><i /><i /><i /></span>
        </button>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <div className="wrap">
          {[products, capabilities].map(g => (
            <div key={g.label} className="mm-group">
              <p>{g.label}</p>
              {g.items.map(([label, href]) => <Link key={href} href={href} onClick={close} aria-current={current(href)}>{label}</Link>)}
            </div>
          ))}
          <div className="mm-group">
            <p>Company</p>
            {links.map(([label, href]) => <Link key={href} href={href} onClick={close} aria-current={current(href)}>{label}</Link>)}
            <Link href="/knitwear-glossary" onClick={close}>Knitwear glossary</Link>
          </div>
          <Link className="btn btn-primary mm-cta" href="/start-a-project" onClick={close}>Send your brief</Link>
        </div>
      </div>
    </header>
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setVisible(!localStorage.getItem('garwevia-cookie')));
  }, []);
  if (!visible) return null;
  const choose = (value: string) => {
    localStorage.setItem('garwevia-cookie', value);
    setVisible(false);
  };
  return (
    <div className="cookie" role="region" aria-label="Cookie preferences">
      <p>We use essential cookies for site functionality. Optional analytics only run with your consent. <Link href="/cookie-policy">Policy</Link></p>
      <div>
        <button className="btn btn-ghost btn-sm" onClick={() => choose('essential')}>Essential only</button>
        <button className="btn btn-primary btn-sm" onClick={() => choose('all')}>Accept all</button>
      </div>
    </div>
  );
}
