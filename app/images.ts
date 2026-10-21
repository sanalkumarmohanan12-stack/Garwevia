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
  floorPeople: { src: floor, alt: 'Workers sewing, moving and checking colourful knitwear on a production floor', focus: '60% 50%' },
  seamstress: { src: '/images/sewing-operator.webp', alt: 'Operator stitching a coral knit garment at an industrial sewing machine', focus: '55% 50%' },
  factoryWide: { src: factory, alt: 'Workers sewing, coordinating and checking colourful knit garments', focus: '50% 50%' },
  knitting: { src: '/images/knitting-machines.webp', alt: 'Technicians checking a circular knitting machine producing teal fabric', focus: '50% 50%' },
  sewingLines: { src: '/images/sewing-lines.webp', alt: 'Workers sewing, preparing and moving colourful knit garments', focus: '50% 50%' },
  packing: { src: '/images/packing.webp', alt: 'Workers packing rust and sage knit garments for dispatch', focus: '50% 50%' },
  cutting: { src: cutting, alt: 'Cutter using a straight-knife machine on mustard cotton knit fabric', focus: '48% 50%' },
  fabricStacks: { src: '/images/fabric-handling.webp', alt: 'Worker checking a mustard knit fabric roll among other colourways', focus: '52% 50%' },
  measuring: { src: inspection, alt: 'Inspector measuring a teal knit T-shirt against a specification sheet', focus: '50% 55%' },
  swatches: { src: '/images/swatches.webp', alt: 'Knit fabric swatches, thread and trims on a development table', focus: '50% 50%' },
  screenPrinting: { src: '/images/screen-printing.webp', alt: 'Operator screen printing a subtle geometric design on a cream knit top', focus: '50% 50%' },
  embroidery: { src: '/images/embroidery.webp', alt: 'Operator positioning a sage knit polo for tonal embroidery', focus: '50% 50%' },
  printedGarments: { src: '/images/printed-garments.webp', alt: 'Worker checking a cream knit top with a subtle geometric print', focus: '50% 50%' },
  hoodieSewing: { src: '/images/hoodie-sewing.webp', alt: 'Workers assembling rust and sage fleece hoodies', focus: '50% 50%' },
  leggingsInspection: { src: '/images/leggings-inspection.webp', alt: 'Worker checking teal rib-knit leggings while a colleague measures a rib top', focus: '50% 50%' },
  babywearFinishing: { src: '/images/babywear-finishing.webp', alt: 'Worker checking snap fastenings on a cream knit baby romper', focus: '50% 50%' },

  // Product flat-lays (consistent, unbranded series)
  range: { src: '/images/apparel-essentials.webp', alt: 'Knitwear range with hoodie, joggers, rib top, leggings, baby romper, T-shirt and briefs', focus: '50% 50%' },
  tops: { src: '/images/tops.webp', alt: 'Blank oversized T-shirt, folded crew-neck T-shirts and olive polo shirt', focus: '50% 50%' },
  fleece: { src: '/images/fleece.webp', alt: 'Charcoal fleece hoodie and matching joggers', focus: '50% 45%' },
  women: { src: '/images/womenswear.webp', alt: 'Rib-knit long-sleeve tops, leggings and loungewear set', focus: '50% 45%' },
  kids: { src: '/images/kidswear.webp', alt: 'Cream baby romper, fine-stripe kids T-shirt and sage geometric-print joggers', focus: '50% 40%' },
  kidsPrint: { src: '/images/kidswear.webp', alt: 'Subtle geometric dash print on sage kids joggers', focus: '80% 72%', zoom: 1.5 },
  performance: { src: '/images/performance.webp', alt: 'Blue long-sleeve training top and black leggings', focus: '50% 45%' },
  underwear: { src: '/images/underwear.webp', alt: 'Blank adult cotton briefs and boxer briefs in neutral colours', focus: '50% 45%' },
} satisfies Record<string, Shot>;

export type ShotName = keyof typeof shots;
