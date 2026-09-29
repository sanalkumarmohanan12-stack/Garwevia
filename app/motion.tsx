'use client';
import Lenis from 'lenis';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { shotStyle, type Shot } from './images';

export const lenisRef: { current: Lenis | null } = { current: null };
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Calls `fn` on every animation frame while the page scrolls (and once on mount/resize). */
function useScrollFrame(fn: () => void) {
  const ref = useRef(fn);
  useEffect(() => { ref.current = fn; });
  useEffect(() => {
    let raf = 0;
    const tick = () => { raf = 0; ref.current(); };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
}

/** Smooth scrolling + scroll-reveal for any element with [data-reveal]. Mounted once in the layout. */
export function MotionRoot() {
  const pathname = usePathname();
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -130 }, lerp: 0.11 });
    lenisRef.current = lenis;
    return () => { lenis.destroy(); lenisRef.current = null; };
  }, []);
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

/** Home hero: route map backdrop and a technical flat that redraws with each rotating product word. */
export function HomeHero({ items, backdrop }: { items: { word: string; name: string; drawing: React.ReactNode }[]; backdrop: React.ReactNode }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const t = setInterval(() => setI(n => n + 1), 3800);
    return () => clearInterval(t);
  }, []);
  const active = i % items.length;
  const words = items.map(it => it.word);
  return (
    <section className="hero">
      <div className="hero-map" aria-hidden="true">{backdrop}</div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-flats" aria-hidden="true">
        {items.map((it, n) => <div key={it.word} className={n === active ? 'hero-flat art is-active' : 'hero-flat art'}>{it.drawing}</div>)}
      </div>
      <div className="hero-content wrap">
        <p className="kicker hero-kicker">Tiruppur, India · Apparel sourcing &amp; manufacturing</p>
        <h1 className="hero-title">
          <span className="line"><span>Your</span></span>{' '}
          <span className="line rotator" aria-live="polite">
            {words.map((w, n) => <em key={w} className={n === active ? 'is-active' : n === (active + words.length - 1) % words.length ? 'is-leaving' : ''}>{w}</em>)}
            <em className="rotator-sizer" aria-hidden="true">{words.reduce((a, b) => (b.length > a.length ? b : a))}</em>
          </span>
          <br />
          <span className="line"><span>made right in India.</span></span>
        </h1>
        <div className="hero-foot">
          <p>GARWEVIA matches your product to the right manufacturer and manages every step, from sampling and production to quality control and shipment.</p>
          <div className="hero-ctas">
            <Link className="pill pill-sand" href="/start-a-project">Start a project <span className="pill-dot" /></Link>
            <Link className="pill pill-glass" href="/how-it-works">How it works</Link>
          </div>
        </div>
      </div>
      <div className="hero-meta wrap" aria-hidden="true">
        <div className="hero-progress">
          {items.map((it, n) => (
            <span key={it.word} className={n === active ? 'is-active' : ''}><i /><b>{String(n + 1).padStart(2, '0')}</b> {it.name}</span>
          ))}
        </div>
        <span className="scroll-cue">Scroll <i /></span>
      </div>
    </section>
  );
}

/** Paragraph whose words light up as it scrolls through the viewport. */
export function ScrollHighlight({ text, className = '' }: { text: string; className?: string }) {
  const el = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');
  useScrollFrame(() => {
    const node = el.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    node.style.setProperty('--p', reduced() ? '1' : p.toFixed(3));
  });
  return (
    <p ref={el} className={'highlight ' + className} style={{ '--n': words.length } as React.CSSProperties}>
      {words.map((w, i) => <span key={i} style={{ '--i': i } as React.CSSProperties}>{w} </span>)}
    </p>
  );
}

/** Number that counts up when it enters the viewport. */
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (reduced()) { setN(to); return; }
      const start = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - start) / 1400);
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(node);
    return () => io.disconnect();
  }, [to]);
  return <span ref={el}>{n}{suffix}</span>;
}

/** Pins the section and converts vertical scroll into horizontal travel of its track. */
export function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  useScrollFrame(() => {
    const s = section.current, t = track.current;
    if (!s || !t) return;
    const pinned = window.matchMedia('(min-width: 900px)').matches && !reduced();
    const distance = Math.max(0, t.scrollWidth - window.innerWidth);
    s.style.height = pinned ? `${distance + window.innerHeight}px` : '';
    if (!pinned) { t.style.transform = ''; return; }
    const p = Math.min(1, Math.max(0, -s.getBoundingClientRect().top / Math.max(1, distance)));
    t.style.transform = `translate3d(${-p * distance}px,0,0)`;
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
  });
  return (
    <section ref={section} className="hscroll">
      <div className="hscroll-sticky">
        <div ref={track} className="hscroll-track">{children}</div>
        <div className="hscroll-bar" aria-hidden="true"><span ref={bar} /></div>
      </div>
    </section>
  );
}

/** Tall scrolling list of steps with a pinned, live-updating step counter. */
export function Journey({ steps, title, visuals }: { steps: { title: string; body?: string }[]; title: React.ReactNode; visuals?: React.ReactNode[] }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  useScrollFrame(() => {
    const mid = window.innerHeight * 0.55;
    let current = 0;
    items.current.forEach((li, i) => { if (li && li.getBoundingClientRect().top < mid) current = i; });
    setActive(a => (a === current ? a : current));
  });
  const total = steps.length;
  return (
    <div className={visuals ? 'journey journey-has-visuals' : 'journey'}>
      <div className="journey-pin">
        <div className="journey-pin-inner">
          <h2>{title}</h2>
          <div className="journey-count" aria-hidden="true">
            <span className="journey-num" key={active}>{String(active + 1).padStart(2, '0')}</span>
            <span className="journey-total">/ {String(total).padStart(2, '0')}</span>
          </div>
          <div className="journey-rail" aria-hidden="true"><span style={{ transform: `scaleX(${(active + 1) / total})` }} /></div>
          <p className="journey-current" aria-hidden="true">{steps[active].title}</p>
          {visuals && (
            <div className="journey-visuals" aria-hidden="true">
              {visuals.map((v, n) => <div key={n} className={n === active ? 'journey-visual art is-active' : 'journey-visual art'}>{v}</div>)}
            </div>
          )}
        </div>
      </div>
      <ol className="journey-steps">
        {steps.map((s, i) => (
          <li key={s.title} ref={el => { items.current[i] = el; }} className={i === active ? 'is-active' : i < active ? 'is-done' : ''}>
            <small>Step {String(i + 1).padStart(2, '0')}</small>
            <h3>{s.title}</h3>
            {s.body && <p>{s.body}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Big list rows; on pointer devices a photo follows the cursor while hovering a row. */
export function HoverList({ items }: { items: { title: string; body: string; visual: React.ReactNode }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const float = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const f = float.current;
    if (f) f.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  };
  return (
    <div className="hover-list" onPointerMove={move} onPointerLeave={() => setActive(null)}>
      {items.map((it, i) => (
        <div key={it.title} className={active === i ? 'hover-row is-active' : 'hover-row'} onPointerEnter={() => setActive(i)} data-reveal>
          <span className="hover-num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{it.title}</h3>
          <p>{it.body}</p>
        </div>
      ))}
      <div ref={float} className={active === null ? 'hover-float' : 'hover-float is-visible'} aria-hidden="true">
        {items.map((it, i) => (
          <div key={it.title} className={active === i ? 'is-active' : ''}>
            {it.visual}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Moves its image slower than the page for a depth effect. */
export function Parallax({ shot, speed = 0.18, priority = false }: { shot: Shot; speed?: number; priority?: boolean }) {
  const el = useRef<HTMLDivElement>(null);
  useScrollFrame(() => {
    const node = el.current;
    if (!node || reduced()) return;
    const r = node.parentElement!.getBoundingClientRect();
    const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
    node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.18)`;
  });
  return (
    <div ref={el} className="parallax-img">
      <Image src={shot.src} alt={shot.alt} fill sizes="100vw" priority={priority} style={shotStyle(shot)} />
    </div>
  );
}

/** Full-bleed panels that expand on hover / focus (desktop) and stack on mobile. */
export function ExpandPanels({ items }: { items: { title: string; body: string; shot?: Shot; visual?: React.ReactNode }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="panels">
      {items.map((it, i) => (
        <button
          type="button"
          key={it.title}
          className={open === i ? 'panel is-open' : 'panel'}
          onMouseEnter={() => setOpen(i)}
          onFocus={() => setOpen(i)}
          onClick={() => setOpen(i)}
          aria-expanded={open === i}
        >
          {it.visual ? <span className="panel-art">{it.visual}</span> : it.shot && <Image src={it.shot.src} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" style={shotStyle(it.shot)} />}
          <span className="panel-shade" />
          <span className="panel-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="panel-body">
            <span className="panel-title">{it.title}</span>
            <span className="panel-text">{it.body}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

/** Numbered full-width accordion. */
export function Accordion({ items }: { items: { title: string; body: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title} className={isOpen ? 'acc-item is-open' : 'acc-item'} data-reveal>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={'acc-' + i} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="acc-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="acc-title">{it.title}</span>
                <span className="acc-icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={'acc-' + i} className="acc-panel" role="region">
              <div><p>{it.body}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
