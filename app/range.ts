/**
 * Accessories & trims range and knitwear certification frameworks.
 * Shared by the home page, Products and Compliance pages, and structured data.
 * Wording rule: these are available through partner suppliers / factories, verified per program —
 * GARWEVIA does not hold the certifications itself.
 */

export type TrimIcon = 'label' | 'tag' | 'button' | 'zip' | 'cord' | 'patch' | 'box' | 'tape';
export type TrimGroup = { name: string; icon: TrimIcon; intro: string; items: string[] };

export const accessories: TrimGroup[] = [
  { name: 'Labels', icon: 'label', intro: 'Brand, size and care labelling, made to your artwork and placement.', items: ['Woven labels (damask, taffeta, satin)', 'Printed satin & cotton labels', 'Care & content labels', 'Size labels & loops', 'Heat-transfer / tagless labels', 'Flag labels'] },
  { name: 'Hang tags & tickets', icon: 'tag', intro: 'Swing tickets and retail information to your brand guidelines.', items: ['Hang tags (board, recycled, FSC paper)', 'Price tickets & stickers', 'Barcode & size stickers', 'RFID tags, where required', 'Seal tags & tag pins / loops'] },
  { name: 'Buttons & closures', icon: 'button', intro: 'Closures matched to fabric weight and end use — including nickel-free options.', items: ['Polyester & corozo buttons', 'Metal shank buttons', 'Snap fasteners / press studs', 'Prong snaps for babywear', 'Hooks & eyes', 'Velcro / hook-and-loop'] },
  { name: 'Zippers', icon: 'zip', intro: 'Zips for hoodies, jackets, pockets and bags in matched colours.', items: ['Nylon coil zippers', 'Metal zippers', 'Moulded plastic (Vislon) zippers', 'Invisible zippers', 'Custom pullers & sliders'] },
  { name: 'Cords, elastics & tapes', icon: 'cord', intro: 'Functional trims for waistbands, hoods and seam reinforcement.', items: ['Drawcords (flat & round)', 'Metal & plastic aglets / tipping', 'Knitted & woven elastics', 'Branded jacquard elastic', 'Twill, herringbone & shoulder tape', 'Piping & binding tape'] },
  { name: 'Badges & embellishment', icon: 'patch', intro: 'Brand marks and decorative trims applied in the factory.', items: ['Woven & embroidered patches', 'Silicone / rubber badges', 'PVC & TPU patches', 'Metal eyelets & grommets', 'Rivets & decorative studs', 'Heat-transfer logos'] },
  { name: 'Threads & sewing trims', icon: 'tape', intro: 'Sewing inputs specified to colour standard and seam type.', items: ['Spun polyester thread', 'Core-spun thread', 'Texturised thread for overlock', 'Embroidery thread', 'Interlining & fusing', 'Rib trims & collars'] },
  { name: 'Packaging', icon: 'box', intro: 'Retail- and shipment-ready packing, including recycled options.', items: ['Polybags (incl. recycled LDPE)', 'Suffocation-warning print', 'Tissue paper & stickers', 'Gift boxes & printed cartons', 'Export cartons with shipping marks', 'Hangers & clips'] },
];

export type Cert = { name: string; full: string; scope: string };
export type CertGroup = { name: string; intro: string; certs: Cert[] };

export const certifications: CertGroup[] = [
  {
    name: 'Organic & recycled content',
    intro: 'Content claims backed by chain-of-custody certification from fibre to finished garment.',
    certs: [
      { name: 'GOTS', full: 'Global Organic Textile Standard', scope: 'Organic fibre processing with environmental and social criteria' },
      { name: 'OCS', full: 'Organic Content Standard', scope: 'Verifies organic content and chain of custody' },
      { name: 'GRS', full: 'Global Recycled Standard', scope: 'Recycled content, chemical and social requirements' },
      { name: 'RCS', full: 'Recycled Claim Standard', scope: 'Verifies recycled content and chain of custody' },
    ],
  },
  {
    name: 'Chemical & product safety',
    intro: 'Harmful-substance testing and responsible chemical management in wet processing.',
    certs: [
      { name: 'OEKO-TEX® STANDARD 100', full: 'by OEKO-TEX', scope: 'Product-level testing for harmful substances' },
      { name: 'OEKO-TEX® STeP', full: 'Sustainable Textile & Leather Production', scope: 'Facility-level environmental and social certification' },
      { name: 'MADE IN GREEN', full: 'by OEKO-TEX', scope: 'Traceable label for tested products from certified facilities' },
      { name: 'ZDHC', full: 'Zero Discharge of Hazardous Chemicals', scope: 'MRSL conformance and wastewater guidelines' },
      { name: 'bluesign®', full: 'bluesign system', scope: 'Chemical input management for textile production' },
    ],
  },
  {
    name: 'Fibre & material programs',
    intro: 'Responsible raw-material sourcing for cotton, cellulosics and paper trims.',
    certs: [
      { name: 'Better Cotton', full: 'Better Cotton Initiative', scope: 'More sustainable cotton farming at scale' },
      { name: 'Fairtrade Cotton', full: 'Fairtrade International', scope: 'Fair terms and premiums for cotton farmers' },
      { name: 'CmiA', full: 'Cotton made in Africa', scope: 'Sustainable cotton from smallholder farmers' },
      { name: 'FSC®', full: 'Forest Stewardship Council', scope: 'Responsibly sourced paper for hang tags and packaging' },
    ],
  },
  {
    name: 'Social & ethical compliance',
    intro: 'Workplace standards audited at the manufacturing-partner level.',
    certs: [
      { name: 'WRAP', full: 'Worldwide Responsible Accredited Production', scope: 'Social compliance certification for sewn products' },
      { name: 'SMETA / Sedex', full: 'Sedex Members Ethical Trade Audit', scope: 'Ethical audit methodology — not a product certificate' },
      { name: 'amfori BSCI', full: 'Business Social Compliance Initiative', scope: 'Social-compliance monitoring framework' },
      { name: 'SA8000', full: 'Social Accountability International', scope: 'Social accountability management standard' },
      { name: 'Higg Index', full: 'Higg FEM & FSLM (Cascale)', scope: 'Facility environmental and social self-assessment, verified' },
    ],
  },
  {
    name: 'Management systems',
    intro: 'ISO-certified systems held by selected manufacturing partners.',
    certs: [
      { name: 'ISO 9001', full: 'Quality management', scope: 'Documented, audited quality management system' },
      { name: 'ISO 14001', full: 'Environmental management', scope: 'Environmental management system' },
      { name: 'ISO 45001', full: 'Occupational health & safety', scope: 'Health and safety management system' },
    ],
  },
];

export const certCount = certifications.reduce((n, g) => n + g.certs.length, 0);
export const trimCount = accessories.reduce((n, g) => n + g.items.length, 0);

export const certDisclaimer = 'Certifications, audit status, scope, facility coverage, expiry dates and transaction eligibility are verified at the individual manufacturing-partner or supplier level for each sourcing program. GARWEVIA does not represent itself as the certificate holder unless specifically stated.';
