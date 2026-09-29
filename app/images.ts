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
  floorPeople: { src: floor, alt: 'Sewing line with operators stitching navy knitwear', focus: '70% 50%' },
  seamstress: { src: floor, alt: 'Operator stitching a navy knit garment on a sewing machine', focus: '80% 55%' },
  factoryWide: { src: factory, alt: 'Knitwear production floor with knitting, sewing, cutting and packing areas', focus: '50% 50%' },
  knitting: { src: factory, alt: 'Circular knitting machines producing fabric rolls', focus: '12% 50%' },
  sewingLines: { src: factory, alt: 'Rows of sewing stations with finished garments', focus: '52% 45%' },
  packing: { src: factory, alt: 'Folded garments packed into cartons for shipment', focus: '92% 80%' },
  cutting: { src: cutting, alt: 'Cutter laying paper patterns on stacked navy fabric', focus: '30% 50%' },
  fabricStacks: { src: cutting, alt: 'Stacks of dyed navy knit fabric on a cutting table', focus: '85% 60%' },
  measuring: { src: inspection, alt: 'Inspector measuring a navy knit garment with a tape measure', focus: '45% 55%' },
  swatches: { src: inspection, alt: 'Fabric swatch card and folded knitwear on an inspection table', focus: '88% 70%' },

  // Product flat-lays (consistent, unbranded series)
  range: { src: '/images/apparel-essentials.webp', alt: 'Blank apparel range: T-shirts, hoodie, joggers, sports bra and baby romper', focus: '50% 50%' },
  tops: { src: '/images/apparel-essentials.webp', alt: 'Stack of blank crew-neck T-shirts in white, black and navy', focus: '0% 18%', zoom: 1.4 },
  fleece: { src: '/images/fleece.webp', alt: 'Charcoal fleece hoodie and matching joggers', focus: '50% 45%' },
  women: { src: '/images/womenswear.webp', alt: 'Rib-knit long-sleeve top, leggings and loungewear set', focus: '50% 45%' },
  kids: { src: '/images/kidswear.webp', alt: 'Muslin baby romper, kids T-shirt and printed jogger', focus: '50% 40%' },
  kidsPrint: { src: '/images/kidswear.webp', alt: 'All-over leaf print on a kids jogger', focus: '80% 72%', zoom: 1.5 },
  performance: { src: '/images/performance.webp', alt: 'Performance long-sleeve training top and leggings', focus: '50% 45%' },
} satisfies Record<string, Shot>;

export type ShotName = keyof typeof shots;
