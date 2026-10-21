import { shots, type Shot } from './images';

/** Product categories shared by the home showcase, the Products page and the RFQ form. */
export type Category = { slug: string; name: string; detail: string; intro: string; shot: Shot; products: string[]; fabrics: string[] };

export const categories: Category[] = [
  { slug: 'tops', name: 'Tops & layers', detail: 'Tees · Polos · Henleys · Tanks · Long sleeves', intro: 'Core and elevated jersey tops, shaped around your fit, neckline, decoration and fabric brief.', shot: shots.tops, products: ['Crew-neck T-shirt', 'V-neck T-shirt', 'Oversized / boxy T-shirt', 'Raglan & ringer tee', 'Polo shirt', 'Rugby shirt', 'Henley', 'Tank top & vest', 'Long-sleeve top', 'Thermal waffle top'], fabrics: ['Single jersey', 'Piqué', 'Interlock', 'Waffle', 'Slub jersey', 'Cotton blends'] },
  { slug: 'fleece', name: 'Sweats & bottoms', detail: 'Hoodies · Crews · Joggers · Shorts', intro: 'Coordinated fleece and French terry separates, from brushed winter weight to lighter loopback.', shot: shots.fleece, products: ['Pullover hoodie', 'Zip-through hoodie', 'Crew sweatshirt', 'Half-zip sweatshirt', 'Track jacket', 'Jogger', 'Sweatpant', 'Knit short', 'Co-ord set'], fabrics: ['French terry', 'Brushed fleece', 'Loopback', 'Cotton blends'] },
  { slug: 'women', name: 'Women & lounge', detail: 'Dresses · Skirts · Rib sets · Leggings', intro: 'Soft fashion and lounge pieces with attention to drape, stretch, opacity and recovery.', shot: shots.women, products: ['Rib-knit top', 'Crop top', 'Bodysuit', 'Jersey dress', 'Knit skirt', 'Legging', 'Wide-leg knit pant', 'Loungewear set', 'Knit cardigan layer', 'Maternity & nursing top'], fabrics: ['Rib', 'Single jersey', 'Interlock', 'Modal blends', 'Stretch jersey', 'Pointelle'] },
  { slug: 'kids-baby', name: 'Kids & baby', detail: 'Rompers · Bodysuits · Sets · Sleepwear', intro: 'Soft knit essentials with age-appropriate trims, construction and product-safety review.', shot: shots.kids, products: ['Baby bodysuit', 'Baby romper', 'Sleepsuit', 'Playsuit', 'Kids T-shirt', 'Kids hoodie & jogger', 'Kids pajama set', 'School polo', 'Baby leggings'], fabrics: ['Single jersey', 'Interlock', 'Rib', 'Organic cotton', 'Muslin-look jersey'] },
  { slug: 'performance', name: 'Active & performance', detail: 'Training tops · Leggings · Sports sets', intro: 'Movement-led styles specified for stretch, recovery, moisture management and seam comfort.', shot: shots.performance, products: ['Training T-shirt', 'Long-sleeve training top', 'Performance legging', 'Sports bra', 'Cycling short', 'Track pant', 'Compression base layer', 'Athleisure set'], fabrics: ['Performance jersey', 'Nylon elastane', 'Polyester elastane', 'Mesh', 'Recycled polyester'] },
  { slug: 'underwear', name: 'Underwear & sleep', detail: 'Briefs · Boxers · Base layers · Pajamas', intro: 'Next-to-skin knitwear developed around fit, comfort, stretch and wash durability.', shot: shots.underwear, products: ['Men’s brief', 'Trunk & boxer brief', 'Women’s brief', 'Camisole & vest', 'Knit undershirt', 'Thermal base layer', 'Pajama set', 'Sleep short & tee', 'Night dress'], fabrics: ['Cotton jersey', 'Cotton elastane', 'Rib', 'Modal', 'Micro-modal'] },
];

export type KnitIconName = 'beanie' | 'scarf' | 'band' | 'sock' | 'glove' | 'neck' | 'blanket' | 'bib' | 'tote' | 'scrunchie' | 'cushion' | 'mask';
export type KnitAccessory = { name: string; icon: KnitIconName; note: string };

/** Knit-made products — distinct from garment trims (labels, closures, packaging). */
export const knitAccessories: KnitAccessory[] = [
  { name: 'Beanies & knit caps', icon: 'beanie', note: 'Rib and jersey beanies, cuffed or slouch, with woven or embroidered badges.' },
  { name: 'Scarves & snoods', icon: 'scarf', note: 'Jersey, rib and brushed knit scarves, infinity snoods and wraps.' },
  { name: 'Headbands & ear warmers', icon: 'band', note: 'Knit headbands, twist bands and fleece-lined ear warmers.' },
  { name: 'Socks', icon: 'sock', note: 'Crew, ankle and sports socks, with cushioned or branded designs.' },
  { name: 'Knit gloves', icon: 'glove', note: 'Touch-screen, fingerless and kids’ knitted gloves.' },
  { name: 'Neck warmers & tubes', icon: 'neck', note: 'Fleece and jersey neck gaiters for outdoor and sport.' },
  { name: 'Baby blankets & swaddles', icon: 'blanket', note: 'Interlock, jersey and cellular blankets and swaddle wraps.' },
  { name: 'Bibs, caps & mittens', icon: 'bib', note: 'Baby bibs, knotted hats and scratch mittens to match sets.' },
  { name: 'Knit tote & pouches', icon: 'tote', note: 'Jersey and heavy-knit totes, drawstring bags and pouches.' },
  { name: 'Scrunchies & hair ties', icon: 'scrunchie', note: 'Made from offcut or matching fabric to complete a range.' },
  { name: 'Throws & cushion covers', icon: 'cushion', note: 'Knitted and fleece home textiles to pair with lounge ranges.' },
  { name: 'Face & eye masks', icon: 'mask', note: 'Jersey face masks and sleep eye masks for lounge and travel.' },
];

/** Further knit programmes built from the same categories. */
export const programmes: [string, string][] = [
  ['Corporate & uniform', 'Staff polos, tees and sweatshirts with embroidery and colour matching across re-orders.'],
  ['Promotional & merchandise', 'Event, band and brand merchandise with print-ready blanks and decoration.'],
  ['School & team wear', 'Polos, sweatshirts and sports kits built for repeat wash and durable colour.'],
  ['Sustainable collections', 'Organic, recycled and certified-content programmes with chain-of-custody evidence.'],
];

export const productCount = categories.reduce((n, c) => n + c.products.length, 0);

/** Link into the RFQ form with the category (and optionally the product) pre-filled. */
export const rfqHref = (category: string, product?: string) =>
  '/start-a-project?' + new URLSearchParams(product ? { category, product } : { category }).toString();
