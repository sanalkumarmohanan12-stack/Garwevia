/** Line icons for knit-made accessories and quality-standard groups (48×48, stroke = currentColor). */
import type { KnitIconName } from '../catalog';
import type { StandardGroup } from '../quality';

const knit: Record<KnitIconName, React.ReactNode> = {
  beanie: <><path d="M10 31c0-10 6-18 14-18s14 8 14 18" /><rect x="8" y="31" width="32" height="8" rx="2" /><path d="M13 31v8M18 31v8M23 31v8M28 31v8M33 31v8" /><circle cx="24" cy="10" r="3" /></>,
  scarf: <><path d="M14 8h20v10c0 3-4 5-10 5s-10-2-10-5Z" /><path d="M16 22l-3 18h8l2-15M30 22l3 12" /><path d="M13 40v3M17 40v3M21 40v3" /></>,
  band: <><ellipse cx="24" cy="24" rx="16" ry="9" /><ellipse cx="24" cy="24" rx="11" ry="5" /><path d="M20 15c2 3 2 15 0 18M28 15c-2 3-2 15 0 18" /></>,
  sock: <><path d="M18 6h12v20l6 6a5 5 0 0 1-7 7l-10-9a5 5 0 0 1-1-3Z" /><path d="M18 11h12M18 15h12" /></>,
  glove: <><path d="M15 42V22l-3-5a2 2 0 0 1 3-2l3 4V9a2 2 0 0 1 4 0v9-11a2 2 0 0 1 4 0v11-9a2 2 0 0 1 4 0v10-7a2 2 0 0 1 4 0v18c0 8-4 13-10 13Z" /><path d="M15 36h18" /></>,
  neck: <><path d="M14 10c0 2 4 4 10 4s10-2 10-4M14 10v26c0 2 4 4 10 4s10-2 10-4V10" /><path d="M14 16c0 2 4 4 10 4s10-2 10-4M14 30c0 2 4 4 10 4s10-2 10-4" /></>,
  blanket: <><path d="M8 12h32v26H8z" /><path d="M8 18h32M8 32h32" /><path d="M13 12v-3M19 12v-3M25 12v-3M31 12v-3M37 12v-3" /></>,
  bib: <><path d="M17 8a7 7 0 0 0 14 0" /><path d="M17 8c-6 2-9 8-9 16 0 9 7 16 16 16s16-7 16-16c0-8-3-14-9-16" /><circle cx="24" cy="27" r="5" /></>,
  tote: <><path d="M10 18h28l-2 24H12Z" /><path d="M17 18c0-6 3-9 7-9s7 3 7 9" /><path d="M14 26h20M14 32h20" /></>,
  scrunchie: <><circle cx="24" cy="24" r="14" /><circle cx="24" cy="24" r="6" /><path d="M24 10c3 3 3 5 0 8M38 24c-3 3-5 3-8 0M24 38c-3-3-3-5 0-8M10 24c3-3 5-3 8 0" /></>,
  cushion: <><path d="M10 12c5 2 23 2 28 0-2 6-2 18 0 24-5-2-23-2-28 0 2-6 2-18 0-24Z" /><path d="M16 18h16M16 24h16M16 30h16" /></>,
  mask: <><path d="M8 18c6-4 26-4 32 0v8c-4 8-28 8-32 0Z" /><path d="M8 20H4M40 20h4" /><path d="M14 22h20M15 27h18" /></>,
};

const quality: Record<StandardGroup['icon'], React.ReactNode> = {
  fabric: <><path d="M8 16c5-4 11-4 16 0s11 4 16 0M8 24c5-4 11-4 16 0s11 4 16 0M8 32c5-4 11-4 16 0s11 4 16 0" /></>,
  ruler: <><rect x="6" y="18" width="36" height="12" rx="2" /><path d="M12 18v5M18 18v7M24 18v5M30 18v7M36 18v5" /></>,
  drop: <><path d="M24 7s-11 13-11 21a11 11 0 0 0 22 0C35 20 24 7 24 7Z" /><path d="M19 29a5 5 0 0 0 5 5" /></>,
  shield: <><path d="M24 6 39 12v11c0 9-6 16-15 19C15 39 9 32 9 23V12Z" /><path d="m17 24 5 5 9-10" /></>,
  flask: <><path d="M19 6h10M21 6v12L10 38a3 3 0 0 0 3 4h22a3 3 0 0 0 3-4L27 18V6" /><path d="M14 30h20" /></>,
  child: <><circle cx="24" cy="12" r="5" /><path d="M14 22h20M24 17v12M24 29l-6 12M24 29l6 12" /></>,
  search: <><circle cx="21" cy="21" r="12" /><path d="m30 30 10 10M15 21l4 4 8-8" /></>,
  tag: <><path d="M6 24V8h16l20 20-14 14Z" /><circle cx="14" cy="16" r="3" /></>,
};

const svg = (children: React.ReactNode, size: number) => (
  <svg className="line-icon" width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

export const KnitIcon = ({ name, size = 48 }: { name: KnitIconName; size?: number }) => svg(knit[name], size);
export const QualityIcon = ({ name, size = 40 }: { name: StandardGroup['icon']; size?: number }) => svg(quality[name], size);
