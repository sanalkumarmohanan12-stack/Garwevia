/**
 * Technical content for the capability pages: knit structures, yarns, fabric parameters, processing,
 * construction, quality, testing, compliance and certification. Rendered by <TechSections />.
 *
 * Wording rules: GARWEVIA works through manufacturing partners — never imply it owns the facilities
 * or holds a partner's certification; no universal tolerances, AQLs or machine counts.
 */
import Link from 'next/link';
import { Accent, Arrow, Kicker } from './components';

type Group = { name: string; terms: string[] };
type Card = { title: string; sub?: string; body?: string; points?: string[]; foot?: string; tone?: 'critical' | 'major' | 'minor' };
export type Section = {
  id: string; kicker: string; title: string; intro?: string;
  groups?: Group[];
  items?: [string, string][];
  steps?: [string, string][];
  cards?: Card[];
  table?: { caption: string; head: string[]; rows: string[][]; label: string };
  statement?: string;
  note?: string;
  disclaimer?: string;
};

/* ------------------------------------------------------------------ Manufacturing network */
export const networkSections: Section[] = [
  {
    id: 'knit-capabilities', kicker: 'Knit fabric structures', title: 'Technical knitwear *manufacturing capabilities.*',
    intro: 'GARWEVIA supports knitted-apparel programs from fabric development through finished garment production. Fabric availability depends on yarn, composition, gauge, machine capability, GSM, finishing, MOQ and the selected manufacturing partner.',
    groups: [
      { name: 'Base structures', terms: ['Single jersey', 'Slub jersey', 'Piqué', 'Lacoste', 'Interlock'] },
      { name: 'Rib', terms: ['Rib', '1×1 rib', '2×2 rib'] },
      { name: 'Loopback & brushed', terms: ['French terry', 'Fleece', 'Loop knit'] },
      { name: 'Textured & patterned', terms: ['Waffle knit', 'Pointelle', 'Jacquard knit'] },
      { name: 'Stripes & yarn effects', terms: ['Auto stripe', 'Feeder stripe', 'Engineered stripe', 'Melange'] },
    ],
  },
  {
    id: 'yarn-fibre', kicker: 'Yarn & fibre', title: 'The right yarn *for the fabric.*',
    intro: 'Yarn decides hand feel, pilling, shrinkage and cost before a single needle moves. We specify yarn by fibre, count and spinning system, and confirm availability for each program.',
    groups: [
      { name: 'Cotton', terms: ['Combed cotton', 'Carded cotton', 'Compact cotton', 'Organic cotton', 'Better Cotton', 'Supima cotton, where available', 'Recycled cotton'] },
      { name: 'Cellulosics', terms: ['Viscose', 'Modal', 'Tencel / Lyocell', 'Bamboo viscose, where applicable'] },
      { name: 'Synthetics', terms: ['Polyester', 'Recycled polyester', 'Nylon', 'Spandex / Elastane'] },
      { name: 'Blends', terms: ['Cotton / polyester', 'Cotton / modal', 'Cotton / elastane', 'Other blended yarns'] },
      { name: 'Yarn specification', terms: ['Yarn count (Ne)', 'Yarn twist', 'Ring-spun yarn', 'Compact-spun yarn', 'Open-end yarn, where applicable'] },
    ],
    note: 'Not every yarn type is available for every program. Fibre, count and spinning system are confirmed with the selected partner against your quantity and timeline.',
  },
  {
    id: 'knitting-process', kicker: 'Knitting process', title: 'From yarn *to finished garment.*',
    intro: 'Knitted fabric is usually produced on circular knitting machines — single jersey, rib, interlock, computerised jacquard or auto-stripe — then processed and cut. Each hand-over is a checkpoint.',
    steps: [
      ['Yarn selection', 'Count, composition and spinning system matched to the fabric and price.'],
      ['Knitting', 'Circular knitting to the agreed structure, gauge and stitch length.'],
      ['Grey fabric inspection', 'Greige fabric checked for holes, needle lines and barre before processing.'],
      ['Dyeing / processing', 'Dyed or processed to the approved lab dip and finish.'],
      ['Compacting / finishing', 'Width, GSM and shrinkage set before cutting.'],
      ['Fabric inspection', 'Shade, width, GSM and defects checked on bulk rolls.'],
      ['Cutting', 'Relaxed fabric laid, marked and cut by shade lot.'],
      ['Sewing', 'Seam and stitch types set for the garment and fabric.'],
      ['Washing / finishing', 'Garment wash, pressing and finishing as specified.'],
      ['Final garment inspection', 'Measurements, workmanship and packing verified.'],
    ],
    note: 'Machine types and capacity are confirmed with the selected manufacturing partner for each program.',
  },
  {
    id: 'dyeing', kicker: 'Wet processing', title: 'Dyeing & *fabric processing.*',
    intro: 'Colour is where knitwear programs most often go wrong. We manage it from the first lab dip to the last dye lot, with the finish specified alongside.',
    groups: [
      { name: 'Dyeing methods', terms: ['Reactive dyeing', 'Pigment dyeing', 'Garment dyeing', 'Piece dyeing', 'Yarn dyeing'] },
      { name: 'Washes', terms: ['Bio wash', 'Enzyme wash', 'Silicone wash', 'Softener finish', 'Vintage wash', 'Acid wash, where applicable', 'Stone wash, where applicable'] },
      { name: 'Mechanical & heat finishes', terms: ['Peach finish', 'Brushing', 'Raising', 'Compacting', 'Heat setting', 'Mercerisation, where applicable'] },
      { name: 'Colour control', terms: ['Lab dip', 'Shade approval', 'Bulk shade', 'Dye lot', 'Lot-to-lot shade variation', 'Colour matching', 'Pantone reference', 'Spectrophotometer', 'Delta E, where required'] },
    ],
  },
  {
    id: 'printing', kicker: 'Printing & decoration', title: 'Prints and embellishment, *specified properly.*',
    intro: 'Decoration is chosen for the fabric as much as the artwork. Technique, ink system and cure are agreed before bulk, then checked on strike-offs and wash tests.',
    groups: [
      { name: 'Screen printing', terms: ['Plastisol', 'Water-based', 'Pigment', 'Discharge', 'Puff', 'High-density', 'Rubber', 'Crack', 'Foil', 'Flock', 'Reflective', 'Silicone, where available'] },
      { name: 'Digital & transfer', terms: ['Sublimation, on suitable polyester', 'DTG', 'DTF', 'Heat transfer'] },
      { name: 'Embellishment', terms: ['Flat embroidery', '3D / puff embroidery', 'Appliqué', 'Patchwork', 'Sequins, where applicable', 'Badge application'] },
      { name: 'What we check', terms: ['Print registration', 'Print placement', 'Colour matching', 'Cure temperature', 'Adhesion', 'Cracking', 'Peeling', 'Migration', 'Wash durability', 'Hand feel'] },
    ],
  },
  {
    id: 'construction', kicker: 'Construction', title: 'Garment construction *& sewing.*',
    intro: 'Construction requirements vary with product type and buyer specification. These are the stitch types and details we specify and inspect.',
    items: [
      ['Overlock', 'Joins and neatens knit seams while keeping stretch.'],
      ['Flatlock', 'Flat, low-bulk seam for activewear and next-to-skin comfort.'],
      ['Cover stitch', 'Stretch hems and bindings — the twin-needle finish on a T-shirt hem.'],
      ['Lock stitch', 'Stable, non-stretch seam for plackets, labels and topstitching.'],
      ['Chain stitch', 'Looped stitch used for waistbands and decorative topstitching.'],
      ['Bartack', 'Dense reinforcement at stress points such as pocket corners.'],
    ],
    groups: [
      { name: 'Construction details', terms: ['Neck rib attachment', 'Shoulder tape', 'Binding', 'Rib binding', 'Seam allowance', 'Seam type', 'Reinforcement'] },
      { name: 'Stitch settings', terms: ['SPI — stitches per inch', 'Needle gauge', 'Thread tension'] },
      { name: 'Seam performance', terms: ['Seam stretch', 'Seam strength'] },
      { name: 'Defects we watch for', terms: ['Seam puckering', 'Needle damage', 'Skipped stitch', 'Broken stitch', 'Open seam'] },
    ],
  },
];

/* ------------------------------------------------------------------ Product development */
export const developmentSteps: [string, string][] = [
  ['Concept / tech pack', 'Sketch, tech pack or reference garment reviewed with BOM and measurement specification.'],
  ['Fabric & trim development', 'Fabric, GSM, lab dips, strike-offs and trims developed to the colour standard.'],
  ['Costing', 'Consumption, yield and processes costed; target FOB and assumptions agreed.'],
  ['Prototype', 'Proto sample made to check construction, fabric and design intent.'],
  ['Fit approval', 'Fit sample measured against POMs; pattern corrected until approved.'],
  ['Size set', 'Graded sizes made and measured to confirm the grade rules.'],
  ['PP sample', 'Pre-production sample in bulk fabric and trims — the reference for production.'],
  ['Bulk production', 'Production runs against the PP sample, with inline quality checks.'],
  ['TOP / final approval', 'Top-of-production sample and final inspection before shipment release.'],
];

export const developmentSections: Section[] = [
  {
    id: 'dev-documents', kicker: 'Development documents', title: 'The paperwork *that makes garments repeatable.*',
    items: [
      ['Tech pack', 'The complete product specification: sketches, measurements, materials, construction and artwork.'],
      ['BOM — bill of materials', 'Every fabric, trim, label and packing item, with supplier, colour and quantity.'],
      ['Measurement specification', 'Measurements per size for each point of measurement, with tolerances.'],
      ['POM — point of measurement', 'Exactly where and how each measurement is taken.'],
      ['Construction details', 'Seam types, stitch types, SPI and finishing for every operation.'],
      ['Trim card', 'Physical record of approved trims, labels and accessories.'],
      ['Colour standard', 'The approved physical or Pantone reference each colour is matched to.'],
      ['Lab dip', 'Small dyed swatches submitted to approve a colour before bulk dyeing.'],
      ['Strike-off', 'A test print or embroidery on the actual fabric, approved before bulk.'],
    ],
  },
  {
    id: 'samples', kicker: 'The sample sequence', title: 'Every sample *has a job.*',
    items: [
      ['Proto sample', 'First make of the design, checking construction and concept.'],
      ['Development sample', 'Iterations while fabric, trims and details are refined.'],
      ['Fit sample', 'Checked on a fit model or form against the measurement specification.'],
      ['Salesman sample', 'Made for selling or showroom use before bulk.'],
      ['Size set', 'One garment per size to confirm grading.'],
      ['PP sample', 'Pre-production sample in bulk materials — the production reference.'],
      ['TOP sample', 'Top of production: pulled from the first bulk output for approval.'],
      ['Shipment sample', 'Taken from the finished lot as the record of what shipped.'],
      ['Gold seal / sealed sample', 'The signed-off master sample, where buyer terminology requires it.'],
    ],
  },
  {
    id: 'fabric-parameters', kicker: 'Fabric parameters', title: 'How we *evaluate fabric.*',
    intro: 'These parameters are considered during costing, sampling, bulk production and quality verification.',
    items: [
      ['GSM / fabric weight', 'Grams per square metre — the core weight specification.'],
      ['Fabric width', 'Usable width; tube width for circular fabric, open width once slit.'],
      ['Stitch length / loop length', 'Yarn per loop; drives GSM, stability and hand feel.'],
      ['Courses & wales per inch', 'Loop density across the length (CPI) and width (WPI).'],
      ['Gauge', 'Needles per inch on the knitting machine.'],
      ['Fabric density', 'How tightly the fabric is knitted — affects cover and stability.'],
      ['Fabric yield & consumption', 'Metres per kg, and fabric needed per garment — key to costing.'],
      ['Fabric relaxation', 'Rest time before cutting so the fabric settles.'],
      ['Shrinkage', 'Dimensional change in length and width after washing.'],
      ['Spirality, skewness & bowing', 'Distortions of the knit that twist seams or bend stripes.'],
      ['Stretch & recovery', 'How far the fabric extends and how well it returns.'],
      ['Hand feel, drape & surface', 'Softness, fall and appearance — agreed against a standard.'],
    ],
  },
  {
    id: 'fit-control', kicker: 'Measurement & fit control', title: 'Fit, *measured.*',
    groups: [
      { name: 'Tops — points of measurement', terms: ['Chest width', 'Body length', 'Shoulder width', 'Sleeve length', 'Sleeve opening', 'Armhole', 'Bicep', 'Neck width', 'Front neck drop', 'Back neck drop', 'Bottom opening'] },
      { name: 'Bottoms — points of measurement', terms: ['Waist', 'Hip', 'Inseam', 'Outseam', 'Rise'] },
      { name: 'Fit control', terms: ['Measurement tolerance', 'POM', 'Grading', 'Pattern correction', 'Size set approval', 'Measurement audit'] },
    ],
    statement: 'Measurement tolerances are defined according to buyer specification, product category, fabric behaviour and the approved technical package.',
  },
];

/* ------------------------------------------------------------------ Quality assurance */
export const qualitySteps: [string, string][] = [
  ['Buyer specification review', 'Tech pack, quality manual, testing and packing requirements reviewed.'],
  ['Fabric & trim approval', 'Bulk fabric and trims checked against approved standards.'],
  ['Lab dip / strike-off approval', 'Colour and decoration approved before bulk.'],
  ['Fit / development sample', 'Construction and fit confirmed against POMs.'],
  ['Size set', 'Grading verified across the size range.'],
  ['PP sample', 'Pre-production sample in bulk materials approved as the reference.'],
  ['Pre-production meeting', 'Critical points, risks and quality plan aligned with the factory.'],
  ['Inline inspection', 'Early-production checks to catch defects at source.'],
  ['Midline inspection', 'A further in-process check, where required.'],
  ['Final random inspection', 'Sampling of finished, packed goods to the agreed AQL.'],
  ['Packing verification', 'Assortment, labelling, carton marks and quantities checked.'],
  ['Shipment release recommendation', 'Inspection result reported with a release recommendation.'],
];

export const qualitySections: Section[] = [
  {
    id: 'knitwear-qc', kicker: 'Knitwear quality control', title: 'What we check, *fabric to finished garment.*',
    intro: 'Our quality framework covers the fabric, how it behaves after washing, how it performs, how the colour holds and how the garment looks after laundering.',
    groups: [
      { name: 'Fabric quality', terms: ['GSM verification', 'Fabric composition', 'Fabric width', 'Fabric defects', 'Bowing', 'Skew', 'Spirality', 'Fabric shade', 'Barre', 'Needle lines', 'Holes', 'Slubs', 'Contamination', 'Oil marks'] },
      { name: 'Dimensional stability', terms: ['Length shrinkage', 'Width shrinkage', 'Garment shrinkage', 'Spirality', 'Skew change', 'Shape retention'] },
      { name: 'Physical performance', terms: ['Bursting strength', 'Pilling resistance', 'Abrasion resistance', 'Stretch', 'Recovery', 'Seam strength, where relevant', 'Fabric weight'] },
      { name: 'Colourfastness', terms: ['To washing', 'Dry rubbing / crocking', 'Wet rubbing / crocking', 'To perspiration', 'To water', 'To light', 'To chlorinated water, where relevant', 'To saliva, where required for babywear'] },
      { name: 'Appearance after wash', terms: ['Seam puckering', 'Twisting', 'Collar curling', 'Neckline distortion', 'Print cracking', 'Embroidery distortion', 'Pilling', 'Fuzziness', 'Shape retention'] },
    ],
  },
  {
    id: 'test-methods', kicker: 'Test methods', title: 'Tested to *recognised standards.*',
    statement: 'Testing may be conducted to AATCC, ASTM, ISO, EN, BS or buyer-specific standards depending on destination market and product requirements.',
    intro: 'Commonly referenced AATCC methods for knitwear include:',
    items: [
      ['AATCC TM8', 'Colourfastness to crocking (rubbing).'],
      ['AATCC TM15', 'Colourfastness to perspiration.'],
      ['AATCC TM61', 'Colourfastness to laundering, accelerated.'],
      ['AATCC TM107', 'Colourfastness to water.'],
      ['AATCC TM135', 'Dimensional change of fabrics after home laundering.'],
      ['AATCC TM150', 'Dimensional change of garments after home laundering.'],
      ['AATCC TM179', 'Skew change in fabric and garment twist.'],
      ['AATCC TM143', 'Appearance of apparel after repeated home laundering.'],
    ],
    note: 'The test program, laboratory and method editions are agreed per product and destination market; equivalent ISO or buyer methods are used where specified.',
  },
  {
    id: 'aql', kicker: 'Final inspection & AQL', title: 'Final random inspection, *to your plan.*',
    intro: 'GARWEVIA can perform or coordinate final random inspections according to agreed buyer specifications. Sampling follows recognised frameworks such as ISO 2859-1 and ANSI / ASQ Z1.4.',
    items: [
      ['Lot size', 'The number of units in the order or shipment being inspected.'],
      ['Sample size', 'How many units are drawn, determined by lot size and inspection level.'],
      ['Inspection level', 'The sampling level (for example General II) set in the quality plan.'],
      ['AQL', 'Acceptance quality limit — the defect level accepted for each class.'],
    ],
    table: {
      caption: 'Example acceptance levels',
      head: ['Defect class', 'Acceptance level'],
      rows: [['Critical defects', '0 — none accepted'], ['Major defects', 'AQL 2.5'], ['Minor defects', 'AQL 4.0']],
      label: 'Illustrative example only — buyer specifications prevail.',
    },
    statement: 'Acceptance levels are defined by the buyer or the agreed quality plan. No single AQL applies to every buyer.',
    cards: [
      { title: 'Critical', tone: 'critical', points: ['Broken needle or sharp object', 'Safety hazard', 'Hazardous trim', 'Serious regulatory non-compliance'] },
      { title: 'Major', tone: 'major', points: ['Hole', 'Open seam', 'Wrong garment measurement', 'Wrong colour or serious shade variation', 'Missing component', 'Major print defect', 'Incorrect labelling'] },
      { title: 'Minor', tone: 'minor', points: ['Loose thread', 'Minor stitch irregularity', 'Minor appearance issue', 'Small cosmetic defect'] },
    ],
  },
  {
    id: 'four-point', kicker: 'Fabric inspection', title: 'The 4-point *fabric inspection system.*',
    intro: 'Partner factories may use the 4-point system to assess bulk fabric: each defect is scored by length, and points are totalled per 100 square yards to judge each roll.',
    groups: [{ name: 'Typical defects recorded', terms: ['Knitting defect', 'Hole', 'Contamination', 'Dye streak', 'Barre', 'Oil mark', 'Needle line', 'Shade variation', 'Bowing', 'Skew'] }],
    note: 'Pass / fail point thresholds are set by the buyer or the factory standard for each program — there is no single universal limit.',
  },
  {
    id: 'packaging', kicker: 'Packaging quality', title: 'Packed *exactly as specified.*',
    groups: [
      { name: 'Packing materials', terms: ['Polybag', 'Recycled polybag, where specified', 'Suffocation warning', 'Size sticker', 'Barcode', 'RFID, where required', 'Hangtag', 'Price ticket'] },
      { name: 'Packing method', terms: ['Assortment', 'Ratio packing', 'Solid packing', 'Carton quantity'] },
      { name: 'Carton & shipping', terms: ['Carton marking', 'Net weight', 'Gross weight', 'Carton dimensions', 'Shipping marks'] },
    ],
  },
];

/* ------------------------------------------------------------------ Compliance & sustainability */
export const complianceSections: Section[] = [
  {
    id: 'certifications', kicker: 'Certification & responsible manufacturing', title: 'Certified partners, *verified per program.*',
    intro: 'Where a program needs a certificate or audit, we source from manufacturing partners that hold it — and check its scope and validity for your order.',
    cards: [
      { title: 'GOTS', sub: 'Global Organic Textile Standard', points: ['Certified organic textile processing', 'Organic fibre supply chain', 'Chemical restrictions', 'Environmental and social criteria'], foot: 'Selected partner factories may hold valid GOTS certification depending on buyer requirements.' },
      { title: 'GRS', sub: 'Global Recycled Standard', points: ['Recycled fibre content', 'Chain of custody', 'Traceability', 'Environmental and social requirements'], foot: 'GRS-certified manufacturing options may be sourced where recycled materials and traceability are required.' },
      { title: 'OEKO-TEX', sub: 'STANDARD 100 by OEKO-TEX', points: ['Harmful-substance testing', 'Textile safety', 'Product-level certification'], foot: 'OEKO-TEX certified fabric, trims or manufacturing options can be considered according to project requirements.' },
      { title: 'WRAP', sub: 'Worldwide Responsible Accredited Production', body: 'Social-compliance certification for sewn-product manufacturing.', points: ['Lawful workplace practices', 'No forced or child labour', 'Working hours and compensation', 'Health, safety and security', 'Environmental practices'], foot: 'WRAP-certified manufacturing partners may be selected where required.' },
      { title: 'SMETA / Sedex', sub: 'Ethical audit methodology · responsible-sourcing platform', body: 'Sedex is a responsible-sourcing platform; SMETA is an ethical-audit methodology. Neither is a product certification.', points: ['Labour standards', 'Health and safety', 'Environment', 'Business ethics'], foot: 'GARWEVIA can source from manufacturing partners with current SMETA audit reports or active Sedex participation where required by the buyer.' },
      { title: 'amfori BSCI', sub: 'Social-compliance monitoring framework', body: 'A monitoring and supply-chain improvement framework — not a product certification.', points: ['Working conditions', 'Occupational health and safety', 'Working hours and compensation', 'Freedom of association', 'No child or forced labour', 'Ethical business behaviour'], foot: 'Partner factories with amfori BSCI audit status may be selected according to buyer requirements.' },
      { title: 'ISO', sub: 'Management-system standards', points: ['ISO 9001 — Quality management', 'ISO 14001 — Environmental management', 'ISO 45001 — Occupational health & safety'], foot: 'Selected manufacturing partners may maintain ISO-certified management systems such as ISO 9001, ISO 14001 or ISO 45001.' },
    ],
    disclaimer: 'Certifications, audit status, scope, facility coverage, expiry dates and transaction eligibility are verified at the individual manufacturing-partner level for each sourcing program. GARWEVIA does not represent itself as the certificate holder unless specifically stated.',
  },
  {
    id: 'garment-safety', kicker: 'Garment safety & compliance', title: 'Built for *the destination market.*',
    statement: 'Applicable legal and buyer requirements depend on product category and destination market.',
    groups: [
      { name: 'Regulations & lists', terms: ['CPSIA', 'REACH', 'Restricted Substances List (RSL)', 'MRSL, where applicable'] },
      { name: 'Chemical parameters', terms: ['Formaldehyde', 'Azo dyes', 'Heavy metals', 'Phthalates', 'Lead', 'Nickel', 'pH'] },
      { name: 'Product safety', terms: ['Flammability', 'Children’s product safety', 'Drawcord requirements', 'Small parts, where relevant'] },
      { name: 'Labelling', terms: ['Fibre content labelling', 'Care labelling', 'Country of origin'] },
    ],
  },
  {
    id: 'sustainability', kicker: 'Sustainability', title: 'Lower-impact options, *backed by evidence.*',
    groups: [
      { name: 'Materials', terms: ['Organic cotton', 'Recycled polyester', 'Recycled cotton', 'Certified fibres'] },
      { name: 'Traceability', terms: ['Traceability', 'Chain of custody'] },
      { name: 'Processing', terms: ['Responsible chemical management', 'Waste reduction', 'Water management', 'Energy efficiency', 'Renewable energy, where verified', 'Effluent treatment (ETP)', 'Zero liquid discharge (ZLD), where verified'] },
      { name: 'Packaging', terms: ['Sustainable packaging', 'Recycled packaging'] },
    ],
    note: 'Sustainability claims are made only where they are supported by evidence for the specific facility, material and program.',
  },
];

/* ------------------------------------------------------------------ Products */
export const productSections: Section[] = [
  {
    id: 'product-capabilities', kicker: 'Product-specific capabilities', title: 'Knit capabilities, *product by product.*',
    intro: 'Indicative capabilities available through our manufacturing network. Fabric, GSM, finishes and MOQ are confirmed with the selected partner for each program.',
    cards: [
      { title: 'T-shirts', points: ['140–280 GSM', 'Single jersey', 'Combed, compact or organic cotton', 'Cotton / elastane', 'Regular and oversized fits', 'Garment wash', 'Printing and embroidery'] },
      { title: 'Polos', points: ['Piqué and Lacoste', 'Interlock', 'Rib collar', 'Flat-knit collar, where applicable', 'Embroidery'] },
      { title: 'Hoodies & sweatshirts', points: ['French terry', 'Brushed and unbrushed fleece', '280–450 GSM, subject to availability', 'Rib cuffs and waistband', 'Hood construction', 'Kangaroo pocket'] },
      { title: 'Kids & baby', points: ['Single jersey, interlock and rib', 'Organic cotton options', 'Soft-hand finishes', 'Nickel-free trim options, where required', 'Children’s safety controls'] },
      { title: 'Activewear', points: ['Polyester and polyester / elastane', 'Nylon / elastane', 'Moisture management and quick-dry', 'Stretch and recovery', 'Flatlock and technical seam construction'] },
    ],
  },
];

/* ------------------------------------------------------------------ Glossary */
export const glossary: [string, string][] = [
  ['AQL', 'Acceptance quality limit — the maximum defect level accepted in a sampled inspection, set per defect class.'],
  ['amfori BSCI', 'A social-compliance monitoring and supply-chain improvement framework. Factories hold an audit status, not a product certificate.'],
  ['BOM', 'Bill of materials — every fabric, trim, label and packing component of a style, with quantities.'],
  ['Bursting strength', 'The pressure a knitted fabric withstands before rupturing — knits are tested for bursting rather than tearing.'],
  ['Colourfastness', 'How well a colour resists fading or transferring through washing, rubbing, light, water or perspiration.'],
  ['Cover stitch', 'A stretchable stitch with parallel needle lines on top and a looper underneath, used for hems and bindings.'],
  ['Crocking', 'Colour transfer by rubbing, tested dry and wet.'],
  ['Flatlock', 'A flat seam joining fabric edges butt-to-butt, common in activewear for comfort.'],
  ['FOB', 'Free on board — the price including goods loaded at the port of origin; freight onward is the buyer’s.'],
  ['French terry', 'A knit with a smooth face and loops on the back, used for sweatshirts and joggers.'],
  ['GOTS', 'Global Organic Textile Standard — certifies organic-fibre textiles through processing, with chemical and social criteria.'],
  ['GRS', 'Global Recycled Standard — certifies recycled content and chain of custody, with environmental and social requirements.'],
  ['GSM', 'Grams per square metre — the standard measure of fabric weight.'],
  ['Interlock', 'A double-knit fabric, smooth on both sides, stable and soft — common in babywear and polos.'],
  ['ISO 9001', 'The international standard for quality management systems, held by a facility, not a product.'],
  ['Lab dip', 'A small dyed sample submitted to approve colour before bulk dyeing.'],
  ['MOQ', 'Minimum order quantity — the smallest quantity per style or colour a partner will produce.'],
  ['MRSL', 'Manufacturing Restricted Substances List — chemicals restricted from use in the production process.'],
  ['OEKO-TEX', 'STANDARD 100 by OEKO-TEX certifies textiles tested for harmful substances, at product level.'],
  ['Overlock', 'A stitch that trims, joins and neatens the fabric edge while keeping stretch.'],
  ['Piqué', 'A textured knit with a fine honeycomb or waffle surface, the classic polo fabric.'],
  ['Pilling', 'Small balls of fibre forming on the fabric surface through wear and abrasion.'],
  ['POM', 'Point of measurement — a defined place and method for measuring a garment.'],
  ['PP sample', 'Pre-production sample, made in bulk fabric and trims, approved as the reference for production.'],
  ['RSL', 'Restricted Substances List — chemicals limited or banned in the finished product.'],
  ['Sedex', 'A responsible-sourcing platform where suppliers share ethical and audit data with customers.'],
  ['Shrinkage', 'Dimensional change in length or width after washing, measured as a percentage.'],
  ['Single jersey', 'The basic weft knit: smooth face, loops on the back — the everyday T-shirt fabric.'],
  ['SMETA', 'Sedex Members Ethical Trade Audit — an audit methodology covering labour, health and safety, environment and ethics. Not a certification.'],
  ['Spirality', 'The twist of a knitted fabric or garment after washing, which can make side seams rotate.'],
  ['Strike-off', 'A test print or embroidery on production fabric, approved before bulk decoration.'],
  ['Tech pack', 'The full technical specification for a style: sketches, measurements, materials, construction and artwork.'],
  ['TOP sample', 'Top of production — a sample taken from the first bulk output for approval.'],
  ['WRAP', 'Worldwide Responsible Accredited Production — a social-compliance certification for sewn-product facilities.'],
];

/* ------------------------------------------------------------------ Rendering */
/** Columns that divide the item count evenly, so no row is left with a lone item. */
const cols = (n: number) => ({ ['--cols' as string]: n <= 5 ? n : n === 10 ? 5 : n % 4 === 0 ? 4 : n % 3 === 0 ? 3 : 4 });

function Chips({ terms }: { terms: string[] }) {
  return <ul className="chips-t">{terms.map(t => <li key={t}>{t}</li>)}</ul>;
}

function SectionBlock({ s, alt }: { s: Section; alt: boolean }) {
  return (
    <section id={s.id} className={alt ? 'tech tech-alt' : 'tech'}>
      <div className="wrap tech-head">
        <div>
          <Kicker>{s.kicker}</Kicker>
          <h2 data-reveal><Accent text={s.title} /></h2>
        </div>
        {s.intro && <p data-reveal>{s.intro}</p>}
      </div>
      <div className="wrap tech-body">
        {s.statement && <blockquote className="tech-statement" data-reveal>{s.statement}</blockquote>}
        {s.steps && (
          <ol className="tech-steps" style={cols(s.steps.length)}>
            {s.steps.map(([title, body], i) => (
              <li key={title} data-reveal>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        )}
        {s.items && (
          <dl className="tech-defs" style={cols(s.items.length)}>
            {s.items.map(([term, def]) => <div key={term} data-reveal><dt>{term}</dt><dd>{def}</dd></div>)}
          </dl>
        )}
        {s.table && (
          <figure className="tech-table" data-reveal>
            <figcaption>{s.table.caption}</figcaption>
            <table>
              <thead><tr>{s.table.head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>{s.table.rows.map(r => <tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map(c => <td key={c}>{c}</td>)}</tr>)}</tbody>
            </table>
            <p><strong>{s.table.label}</strong></p>
          </figure>
        )}
        {s.groups && (
          <div className="tech-groups" style={cols(s.groups.length)}>
            {s.groups.map(g => (
              <div key={g.name} className="tech-group" data-reveal>
                <h3>{g.name}</h3>
                <Chips terms={g.terms} />
              </div>
            ))}
          </div>
        )}
        {s.cards && (
          <div className="tech-cards" style={cols(s.cards.length)}>
            {s.cards.map(c => (
              <article key={c.title} className={'tech-card' + (c.tone ? ' tone-' + c.tone : '')} data-reveal>
                <h3>{c.title}</h3>
                {c.sub && <p className="tech-card-sub">{c.sub}</p>}
                {c.body && <p>{c.body}</p>}
                {c.points && <ul>{c.points.map(p => <li key={p}>{p}</li>)}</ul>}
                {c.foot && <p className="tech-card-foot">{c.foot}</p>}
              </article>
            ))}
          </div>
        )}
        {s.disclaimer && <aside className="tech-disclaimer" data-reveal><strong>Important</strong><p>{s.disclaimer}</p></aside>}
        {s.note && <p className="tech-note" data-reveal>{s.note}</p>}
      </div>
    </section>
  );
}

/** Jump links to a page's technical sections — placed directly under the page hero. */
export function TechIndex({ sections }: { sections: Section[] }) {
  return (
    <nav className="tech-index" aria-label="On this page">
      <div className="wrap">
        <span>On this page</span>
        {sections.map(s => <a key={s.id} href={'#' + s.id}>{s.kicker}</a>)}
      </div>
    </nav>
  );
}

/** A run of technical sections with alternating backgrounds. */
export function TechSections({ sections }: { sections: Section[] }) {
  return <div className="tech-run">{sections.map((s, i) => <SectionBlock key={s.id} s={s} alt={i % 2 === 0} />)}</div>;
}

/** Page-end call to action for technical pages. */
export function KnitCta() {
  const send = ['Tech pack', 'Product reference', 'Fabric composition', 'GSM', 'Quantity', 'Colour requirements', 'Certification requirements', 'Quality standards', 'Target FOB', 'Delivery timeline'];
  return (
    <section className="cta knit-cta">
      <div className="cta-inner wrap">
        <Kicker>Developing a knitwear program?</Kicker>
        <h2 className="cta-title" data-reveal>Send us your brief.<br /><em>We’ll take it from there.</em></h2>
        <div className="knit-cta-row">
          <div data-reveal>
            <p className="knit-cta-label">Send GARWEVIA your</p>
            <ol className="knit-cta-list">{send.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>
          </div>
          <div className="knit-cta-actions" data-reveal>
            <Link className="pill pill-sand" href="/start-a-project">Submit your tech pack <span className="pill-dot" /></Link>
            <Link className="text-cta" href="/schedule-a-meeting">Discuss your knitwear requirement <Arrow /></Link>
            <Link className="knit-cta-gloss" href="/knitwear-glossary">New to a term? Read the knitwear glossary</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
