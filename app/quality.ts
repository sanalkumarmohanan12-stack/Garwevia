/**
 * Quality standards commonly applied to knitted garments, grouped by what they protect.
 * Each test lists the ISO method and its AATCC / ASTM / other equivalent where one exists.
 * The exact methods, editions and pass limits are set per buyer and destination market.
 */
export type Test = { test: string; iso?: string; alt?: string; why: string };
export type StandardGroup = { id: string; name: string; summary: string; icon: 'fabric' | 'ruler' | 'drop' | 'shield' | 'flask' | 'child' | 'search' | 'tag'; tests: Test[] };

export const standards: StandardGroup[] = [
  {
    id: 'fabric', name: 'Fabric & yarn', icon: 'fabric',
    summary: 'The base fabric is right before a single panel is cut.',
    tests: [
      { test: 'Fabric weight (GSM)', iso: 'ISO 3801', alt: 'ASTM D3776', why: 'Confirms the agreed weight per square metre.' },
      { test: 'Fibre composition', iso: 'ISO 1833 series', alt: 'AATCC TM20 / TM20A', why: 'Verifies the content declared on the label.' },
      { test: 'Yarn count', iso: 'ISO 2060', alt: 'ASTM D1907', why: 'Checks the yarn specified in costing is the yarn used.' },
      { test: '4-point fabric inspection', alt: 'ASTM D5430', why: 'Scores holes, barre, needle lines, stains and shade per roll.' },
      { test: 'Shade continuity', iso: 'ISO 105-J03 (ΔE CMC)', alt: 'Visual under D65 light box', why: 'Keeps colour consistent across dye lots and panels.' },
    ],
  },
  {
    id: 'stability', name: 'Dimensional stability', icon: 'ruler',
    summary: 'The garment keeps its size and shape after the customer washes it.',
    tests: [
      { test: 'Shrinkage — fabric', iso: 'ISO 6330 + ISO 5077', alt: 'AATCC TM135', why: 'Length and width change after home laundering.' },
      { test: 'Shrinkage — garment', iso: 'ISO 6330 + ISO 5077', alt: 'AATCC TM150', why: 'Measured on the finished garment at key POMs.' },
      { test: 'Spirality / twist', iso: 'ISO 16322-3', alt: 'AATCC TM179', why: 'Stops side seams twisting after washing.' },
      { test: 'Appearance after laundering', iso: 'ISO 15487', alt: 'AATCC TM143', why: 'Puckering, collar curl, print and embroidery after wash.' },
    ],
  },
  {
    id: 'colour', name: 'Colourfastness', icon: 'drop',
    summary: 'Colour stays on the garment — not on the wash, the skin or the sofa.',
    tests: [
      { test: 'To washing', iso: 'ISO 105-C06', alt: 'AATCC TM61', why: 'Colour change and staining in domestic washing.' },
      { test: 'To rubbing / crocking', iso: 'ISO 105-X12', alt: 'AATCC TM8', why: 'Dry and wet rubbing — critical for dark shades.' },
      { test: 'To perspiration', iso: 'ISO 105-E04', alt: 'AATCC TM15', why: 'Acid and alkaline sweat contact.' },
      { test: 'To water', iso: 'ISO 105-E01', alt: 'AATCC TM107', why: 'Bleeding when wet.' },
      { test: 'To light', iso: 'ISO 105-B02', alt: 'AATCC TM16.3', why: 'Fading in daylight — important for brights.' },
      { test: 'To chlorinated water', iso: 'ISO 105-E03', alt: 'AATCC TM162', why: 'Swim and pool-adjacent products.' },
      { test: 'To saliva', alt: 'DIN 53160-1', why: 'Required for babywear and items children mouth.' },
    ],
  },
  {
    id: 'performance', name: 'Physical performance', icon: 'shield',
    summary: 'The knit stands up to wear, stretch and abrasion.',
    tests: [
      { test: 'Bursting strength', iso: 'ISO 13938-1 / -2', alt: 'ASTM D3786', why: 'Knits are tested for bursting rather than tearing.' },
      { test: 'Pilling resistance', iso: 'ISO 12945-1 / -2', alt: 'ASTM D3512', why: 'Surface fuzz and pills after simulated wear.' },
      { test: 'Abrasion resistance', iso: 'ISO 12947 (Martindale)', why: 'Durability for activewear and high-wear areas.' },
      { test: 'Stretch & recovery', alt: 'ASTM D2594 / EN 14704-1', why: 'Leggings, waistbands and rib keep their fit.' },
      { test: 'Seam strength', iso: 'ISO 13935-2', why: 'Seams hold under load, where the buyer requires it.' },
    ],
  },
  {
    id: 'chemical', name: 'Chemical safety', icon: 'flask',
    summary: 'Restricted substances are controlled for the destination market.',
    tests: [
      { test: 'pH of aqueous extract', iso: 'ISO 3071', alt: 'AATCC TM81', why: 'Skin-friendly pH for next-to-skin knitwear.' },
      { test: 'Formaldehyde', iso: 'ISO 14184-1', why: 'Free and hydrolysed formaldehyde limits.' },
      { test: 'Azo amines', iso: 'EN ISO 14362-1', why: 'Banned aryl amines from azo dyes (REACH Annex XVII).' },
      { test: 'Nickel release', alt: 'EN 1811', why: 'Metal trims in prolonged skin contact.' },
      { test: 'Lead & phthalates', alt: 'CPSIA · CPSC-CH-E1002 / C1001', why: 'Children’s products for the US market.' },
      { test: 'RSL / MRSL conformance', alt: 'REACH · ZDHC MRSL · buyer RSL', why: 'Restricted substances in product and process.' },
    ],
  },
  {
    id: 'safety', name: 'Product & child safety', icon: 'child',
    summary: 'Design and trims meet safety rules for the wearer’s age.',
    tests: [
      { test: 'Cords & drawstrings', alt: 'EN 14682 · ASTM F1816', why: 'No drawstrings in hood and neck areas of kidswear.' },
      { test: 'Snap & button attachment', alt: 'ASTM D4846 · buyer pull test', why: 'Trims cannot detach and become choking hazards.' },
      { test: 'Small parts', alt: '16 CFR 1501', why: 'Under-3 products checked for small-part risk.' },
      { test: 'Flammability', alt: '16 CFR 1610 · 16 CFR 1615/1616', why: 'General apparel and children’s sleepwear (US).' },
      { test: 'Needle & sharp-object control', alt: 'Metal detection · broken-needle policy', why: 'No needle fragments leave the factory.' },
    ],
  },
  {
    id: 'inspection', name: 'Inspection & sampling', icon: 'search',
    summary: 'Every shipment is released against an agreed, documented plan.',
    tests: [
      { test: 'AQL random sampling', iso: 'ISO 2859-1', alt: 'ANSI/ASQ Z1.4', why: 'Sample size and acceptance by defect class.' },
      { test: 'Pre-production meeting', alt: 'PPM checklist', why: 'Risks, approved samples and trims aligned before cutting.' },
      { test: 'Inline / during-production', alt: 'DUPRO', why: 'Defects caught early in the line, not at the end.' },
      { test: 'Final random inspection', alt: 'FRI', why: 'Workmanship, measurements, packing and labelling.' },
      { test: 'Measurement audit', alt: 'POM spec & tolerances', why: 'Garments measured against the approved size chart.' },
      { test: 'Carton & packing check', alt: 'Packing list · ISTA where required', why: 'Assortment, carton marks, weights and drop test.' },
    ],
  },
  {
    id: 'labelling', name: 'Labelling', icon: 'tag',
    summary: 'Labels are correct, legal and permanent.',
    tests: [
      { test: 'Care labelling', iso: 'ISO 3758', alt: '16 CFR 423 (US)', why: 'Care symbols and instructions that match testing.' },
      { test: 'Fibre content', alt: 'EU 1007/2011 · US Textile Act', why: 'Correct fibre names and percentages.' },
      { test: 'Country of origin & legibility', alt: 'Destination-market rules', why: 'Permanent, legible labels after washing.' },
    ],
  },
];

export const testCount = standards.reduce((n, g) => n + g.tests.length, 0);

export const standardsNote = 'Methods, editions and pass limits are agreed in the buyer-approved quality plan for each style and market. Testing is carried out at accredited third-party laboratories as required by the buyer; inspections are performed or coordinated by GARWEVIA.';
