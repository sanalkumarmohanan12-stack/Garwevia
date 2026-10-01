'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './components';
import { lenisRef } from './motion';

// Every important page is reachable from the header: main links, plus a Capabilities dropdown.
const capabilities: [string, string, string][] = [
  ['Sourcing services', '/sourcing-services', 'Requirement review to shipment coordination'],
  ['Product development', '/product-development', 'Tech pack, samples, fabric parameters, fit'],
  ['Manufacturing network', '/manufacturing-network', 'Knit fabrics, yarns, dyeing, printing, sewing'],
  ['Quality assurance', '/quality-assurance', 'QC checkpoints, testing, AQL inspection'],
  ['Compliance & sustainability', '/compliance-sustainability', 'GOTS, GRS, OEKO-TEX, WRAP, SMETA, BSCI, ISO'],
];
const before: [string, string][] = [['About', '/about'], ['Products', '/products']];
const after: [string, string][] = [['How It Works', '/how-it-works'], ['Glossary', '/knitwear-glossary'], ['Contact', '/contact']];
const explore: [string, string][] = [...before, ...after, ['Schedule a meeting', '/schedule-a-meeting']];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drop, setDrop] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 320 && y > last.current + 2);
      if (y < last.current - 2 || y < 320) setHidden(false);
      last.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (open) lenisRef.current?.stop(); else lenisRef.current?.start();
  }, [open]);

  // The header CTA is the one "Start a project" on every page, except the RFQ page itself.
  const ctaOff = pathname === '/start-a-project';
  const close = () => { setOpen(false); setDrop(false); };
  const inCaps = capabilities.some(([, href]) => href === pathname);
  const navLink = ([label, href]: [string, string]) => (
    <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>
  );
  const solid = scrolled || pathname === '/start-a-project';
  const cls = ['site-header', solid && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-open'].filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <div className="wrap header-inner">
        <Logo />
        <nav className="nav" aria-label="Main navigation">
          {before.map(navLink)}
          <div className={drop ? 'nav-drop is-open' : 'nav-drop'} onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}
            onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDrop(false); }}>
            <button type="button" className={inCaps ? 'nav-drop-btn is-current' : 'nav-drop-btn'} aria-expanded={drop} aria-controls="nav-caps" onClick={() => setDrop(d => !d)}>
              Capabilities
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div id="nav-caps" className="nav-panel">
              {capabilities.map(([label, href, sub]) => (
                <Link key={href} href={href} onClick={close} aria-current={pathname === href ? 'page' : undefined}>
                  <b>{label}</b><small>{sub}</small>
                </Link>
              ))}
              <Link className="nav-panel-cta" href="/schedule-a-meeting" onClick={close}>
                <b>Talk to our team</b><small>Book a Teams meeting</small>
              </Link>
            </div>
          </div>
          {after.map(navLink)}
        </nav>
        <Link className={ctaOff ? 'pill pill-sand header-cta is-off' : 'pill pill-sand header-cta'} href="/start-a-project" tabIndex={ctaOff ? -1 : undefined} aria-hidden={ctaOff || undefined}>Start a project <span className="pill-dot" /></Link>
        <button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="menu-overlay" onClick={() => setOpen(!open)}>
          <span className="menu-label">{open ? 'Close' : 'Menu'}</span>
          <span className="menu-lines"><i /><i /></span>
        </button>
      </div>
      <div id="menu-overlay" className="menu-overlay" data-lenis-prevent aria-hidden={!open} inert={!open}>
        <div className="wrap menu-grid">
          <nav className="menu-links" aria-label="Menu">
            <p className="menu-group">Explore</p>
            {explore.map(([label, href], i) => (
              <Link key={href} href={href} onClick={close} style={{ '--i': i } as React.CSSProperties} aria-current={pathname === href ? 'page' : undefined}>
                <small>{String(i + 1).padStart(2, '0')}</small>{label}
              </Link>
            ))}
          </nav>
          <nav className="menu-links menu-caps" aria-label="Capabilities">
            <p className="menu-group">Capabilities</p>
            {capabilities.map(([label, href, sub], i) => (
              <Link key={href} href={href} onClick={close} style={{ '--i': i + 3 } as React.CSSProperties} aria-current={pathname === href ? 'page' : undefined}>
                <span>{label}<em>{sub}</em></span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="wrap menu-foot">
          <span>Tiruppur · Tamil Nadu · India</span>
          <Link className="pill pill-sand" href="/start-a-project" onClick={close}>Start a project <span className="pill-dot" /></Link>
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
        <button className="pill pill-ghost pill-sm" onClick={() => choose('essential')}>Essential</button>
        <button className="pill pill-sand pill-sm" onClick={() => choose('all')}>Accept all</button>
      </div>
    </div>
  );
}
