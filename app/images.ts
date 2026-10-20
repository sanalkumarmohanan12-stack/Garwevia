/**
 * Single source of truth for site imagery.
 * Every placement picks a named shot so each picture matches its message, and
 * `focus` (CSS object-position) steers the crop inside tall or narrow frames.
 * All photography is illustrative — see docs/IMAGE-BRIEF.md for the replacement shot list.
 */
import type { CSSProperties } from 'react';

export type Shot = { src: string; alt: string; focus?: string; zoom?: number };

/** Inline style that applies a shot's crop: focus point, plus an optional zoom into that point. */
export const shotStyle = (s: Shot): CSSProperties => ({ objectPosition: s.focus, ...(s.zoom ? { scale: String(s.zoom), transformOrigin: s.focus } : {}) });

const factory = '/images/about-factory-new.webp';
const floor = '/images/manufacturing-hero.webp';
const cutting = '/images/fabric-cutting.webp';
const inspection = '/images/quality-inspection.webp';

export const shots = {
  // Production floors (landscape)
  floorPeople: { src: floor, alt: 'Operators sewing knit garments at industrial machines', focus: '76% 50%' },
  seamstress: { src: floor, alt: 'Operator sewing a grey knit garment at an industrial machine', focus: '80% 55%' },
  factoryWide: { src: factory, alt: 'Rows of garment sewing stations with operators at work', focus: '50% 50%' },
  knitting: { src: '/images/knitting-machines.webp', alt: 'Circular knitting machines producing rolls of knit fabric', focus: '60% 50%' },
  sewingLines: { src: factory, alt: 'Garment operators and sewing stations on a production floor', focus: '48% 45%' },
  packing: { src: '/images/packing.webp', alt: 'Blank knit garments being folded and packed into cartons', focus: '50% 50%' },
  cutting: { src: cutting, alt: 'Cutter positioning paper patterns on layers of navy knit fabric', focus: '48% 50%' },
  fabricStacks: { src: cutting, alt: 'Layers of navy knit fabric on a cutting table', focus: '80% 60%' },
  measuring: { src: inspection, alt: 'Inspector measuring a navy T-shirt against a specification sheet', focus: '50% 55%' },
  swatches: { src: '/images/swatches.webp', alt: 'Knit fabric swatches, thread and trims on a development table', focus: '50% 50%' },

  // Product flat-lays (consistent, unbranded series)
  range: { src: '/images/apparel-essentials.webp', alt: 'Blank apparel range: T-shirts, hoodie, joggers, sports bra and baby romper', focus: '50% 50%' },
  tops: { src: '/images/tops.webp', alt: 'Blank oversized T-shirt, folded crew-neck T-shirts and olive polo shirt', focus: '50% 50%' },
  fleece: { src: '/images/fleece.webp', alt: 'Charcoal fleece hoodie and matching joggers', focus: '50% 45%' },
  women: { src: '/images/womenswear.webp', alt: 'Rib-knit long-sleeve tops, leggings and loungewear set', focus: '50% 45%' },
  kids: { src: '/images/kidswear.webp', alt: 'Muslin baby romper, kids T-shirt and leaf-print joggers', focus: '50% 40%' },
  kidsPrint: { src: '/images/kidswear.webp', alt: 'Leaf print on olive kids joggers', focus: '80% 72%', zoom: 1.5 },
  performance: { src: '/images/performance.webp', alt: 'Blue long-sleeve training top and black leggings', focus: '50% 45%' },
  underwear: { src: '/images/underwear.webp', alt: 'Blank adult cotton briefs and boxer briefs in neutral colours', focus: '50% 45%' },
} satisfies Record<string, Shot>;

export type ShotName = keyof typeof shots;
