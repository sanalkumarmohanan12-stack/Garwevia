'use client';
import Lenis from 'lenis';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { shotStyle, type Shot } from './images';
import { StageArt, type SceneName } from './art/Stages';

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

const stageIcons: Record<string, React.ReactNode> = {
  pack: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h4" /></>,
  sample: <><path d="M8 4 4 7l2 4 2-1v10h8V10l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4Z" /></>,
  fabric: <><path d="M4 7c2.5-2 5.5-2 8 0s5.5 2 8 0M4 12c2.5-2 5.5-2 8 0s5.5 2 8 0M4 17c2.5-2 5.5-2 8 0s5.5 2 8 0" /></>,
  cut: <><circle cx="6" cy="7" r="2.5" /><circle cx="6" cy="17" r="2.5" /><path d="M8.2 8.3 20 16M8.2 15.7 20 8" /></>,
  stitch: <><path d="M3 18h18" /><path d="M5 14h2M10 14h2M15 14h2" /><path d="M13 3v8M11 11h4" /><path d="M8 3h10v4H8z" /></>,
  print: <><path d="M12 3l2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8z" /></>,
  check: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  ship: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
};

export type Stage = { icon: SceneName & keyof typeof stageIcons; title: string; body: string };

const STAGE_MS = 3400;
const Icon = ({ name, size = 22 }: { name: keyof typeof stageIcons; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{stageIcons[name]}</svg>
);

/**
 * Garment workflow from tech pack to dispatch, as an expanding photo strip:
 * the active stage opens wide with its photo and description; hover or click holds a stage.
 */
export function Workflow({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (held || reduced()) return;
    const t = setTimeout(() => setActive(n => (n + 1) % stages.length), STAGE_MS);
    return () => clearTimeout(t);
  }, [held, active, stages.length]);
  const pick = (n: number) => { setHeld(true); setActive(n); };
  return (
    <div className="flow" onMouseLeave={() => setHeld(false)}>
      <div className="flow-head">
        <span>From tech pack to dispatch</span>
        <span className="flow-count">{String(active + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}</span>
      </div>
      <ol className="flow-strip">
        {stages.map((s, n) => (
          <li key={s.title} className={n === active ? 'flow-card is-active' : n < active ? 'flow-card is-done' : 'flow-card'}>
            <button type="button" onClick={() => pick(n)} onMouseEnter={() => pick(n)} onFocus={() => pick(n)} aria-current={n === active ? 'step' : undefined}>
              <StageArt name={s.icon} active={n === active} />
              <span className="flow-shade" aria-hidden="true" />
              <span className="flow-top"><span className="flow-num">{String(n + 1).padStart(2, '0')}</span><Icon name={s.icon} /></span>
              <span className="flow-cap"><span className="flow-title">{s.title}</span><span className="flow-body">{s.body}</span></span>
              {n === active && !held && <i className="flow-bar" key={active} style={{ animationDuration: STAGE_MS + 'ms' }} />}
            </button>
          </li>
        ))}
      </ol>
      <div className="flow-dots" aria-hidden="true">
        {stages.map((s, n) => (
          <button key={s.title} type="button" tabIndex={-1} className={n === active ? 'is-active' : n < active ? 'is-done' : ''} onClick={() => pick(n)}><Icon name={s.icon} size={16} /></button>
        ))}
      </div>
    </div>
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

/**
 * Native horizontal carousel: trackpad swipe, click-and-drag, arrow buttons and touch.
 * Vertical scrolling passes straight through, so the page never pauses on this section.
 */
export function Carousel({ head, children, label }: { head: React.ReactNode; children: React.ReactNode; label: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const r = rail.current;
    if (!r) return;
    const update = () => {
      const max = r.scrollWidth - r.clientWidth;
      const p = max > 0 ? r.scrollLeft / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0.06, p)})`;
      setEdge(e => {
        const next = { start: r.scrollLeft < 8, end: r.scrollLeft > max - 8 };
        return e.start === next.start && e.end === next.end ? e : next;
      });
    };

    // Click-and-drag for mouse users (touch and trackpads already scroll natively).
    let down = false, moved = false, startX = 0, startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = r.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; r.classList.add('is-dragging'); r.setPointerCapture(e.pointerId); }
      if (moved) r.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      r.classList.remove('is-dragging');
    };
    // Swallow the click that ends a drag so cards are not opened by accident.
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };

    update();
    r.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    r.addEventListener('pointerdown', onDown);
    r.addEventListener('pointermove', onMove);
    r.addEventListener('pointerup', onUp);
    r.addEventListener('pointercancel', onUp);
    r.addEventListener('click', onClick, true);
    return () => {
      r.removeEventListener('scroll', update); window.removeEventListener('resize', update);
      r.removeEventListener('pointerdown', onDown); r.removeEventListener('pointermove', onMove);
      r.removeEventListener('pointerup', onUp); r.removeEventListener('pointercancel', onUp);
      r.removeEventListener('click', onClick, true);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const r = rail.current;
    if (!r) return;
    const card = r.firstElementChild as HTMLElement | null;
    const amount = card ? card.getBoundingClientRect().width + 16 : r.clientWidth * 0.8;
    r.scrollBy({ left: dir * amount, behavior: reduced() ? 'auto' : 'smooth' });
  };

  return (
    <section className="showcase" aria-label={label}>
      <div className="wrap showcase-head">
        <div>{head}</div>
        <div className="showcase-nav">
          <button type="button" aria-label="Previous" onClick={() => step(-1)} disabled={edge.start}><Chevron dir="left" /></button>
          <button type="button" aria-label="Next" onClick={() => step(1)} disabled={edge.end}><Chevron dir="right" /></button>
        </div>
      </div>
      <div ref={rail} className="showcase-rail" data-lenis-prevent-horizontal tabIndex={0}>
        {children}
      </div>
      <div className="wrap showcase-foot" aria-hidden="true">
        <div className="showcase-bar"><span ref={bar} /></div>
        <span className="showcase-hint">Swipe, drag or use the arrows</span>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={dir === 'left' ? 'M12 4 6 10l6 6' : 'M8 4l6 6-6 6'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
