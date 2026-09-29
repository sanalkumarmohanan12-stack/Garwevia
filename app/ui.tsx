'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './components';
import { lenisRef } from './motion';

const nav = [['About', '/about'], ['Products', '/products'], ['Services', '/sourcing-services'], ['Our Network', '/manufacturing-network'], ['Quality', '/quality-assurance'], ['How It Works', '/how-it-works']];
const menu = [...nav, ['Contact', '/contact']];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
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

  const close = () => setOpen(false);
  const solid = scrolled || pathname === '/start-a-project';
  const cls = ['site-header', solid && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-open'].filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <div className="wrap header-inner">
        <Logo />
        <nav className="nav" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>
          ))}
        </nav>
        <Link className="pill pill-sand header-cta" href="/start-a-project">Start a project <span className="pill-dot" /></Link>
        <button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="menu-overlay" onClick={() => setOpen(!open)}>
          <span className="menu-label">{open ? 'Close' : 'Menu'}</span>
          <span className="menu-lines"><i /><i /></span>
        </button>
      </div>
      <div id="menu-overlay" className="menu-overlay" data-lenis-prevent aria-hidden={!open} inert={!open}>
        <nav className="wrap menu-links" aria-label="Menu">
          {menu.map(([label, href], i) => (
            <Link key={href} href={href} onClick={close} style={{ '--i': i } as React.CSSProperties} aria-current={pathname === href ? 'page' : undefined}>
              <small>{String(i + 1).padStart(2, '0')}</small>{label}
            </Link>
          ))}
        </nav>
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
