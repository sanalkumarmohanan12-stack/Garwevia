import { shots, type Shot } from './images';

/** Product categories shared by the home showcase, the Products page and the RFQ form. */
export type Category = { slug: string; name: string; detail: string; intro: string; shot: Shot; products: string[]; fabrics: string[] };

export const categories: Category[] = [
  { slug: 'tops', name: 'Tops', detail: 'T-shirts · Polos · Henleys · Tanks', intro: 'Everyday and premium tops, from core crew-necks to oversized fits and polos.', shot: shots.tops, products: ['Basic T-shirt', 'Premium T-shirt', 'Premium oversized T-shirt', 'Polo shirt'], fabrics: ['Single jersey', 'Piqué', 'Interlock', 'Cotton blends'] },
  { slug: 'fleece', name: 'Fleece', detail: 'Hoodies · Sweatshirts · Joggers', intro: 'Fleece and French terry programs for hoodies, crews and joggers.', shot: shots.fleece, products: ['Hoodie', 'Sweatshirt', 'Jogger'], fabrics: ['French terry', 'Fleece', 'Cotton blends'] },
  { slug: 'women', name: 'Women', detail: 'Tops · Loungewear · Leggings', intro: 'Fitted tops, leggings and loungewear sets.', shot: shots.women, products: ['Women’s top', 'Legging'], fabrics: ['Rib', 'Single jersey', 'Interlock', 'Performance fabrics'] },
  { slug: 'kids-baby', name: 'Kids & Baby', detail: 'Rompers · Sets · Pajamas', intro: 'Soft essentials for babies and children, from rompers to sleepwear sets.', shot: shots.kids, products: ['Kids T-shirt', 'Baby romper', 'Pajama set'], fabrics: ['Single jersey', 'Interlock', 'Rib'] },
  { slug: 'performance', name: 'Performance', detail: 'Training tops · Athleisure', intro: 'Training tops and athleisure in performance fabrics.', shot: shots.performance, products: ['Activewear top'], fabrics: ['Performance fabrics', 'Cotton blends'] },
  { slug: 'underwear', name: 'Underwear', detail: 'Briefs · Boxer briefs', intro: 'Everyday adult underwear developed to your fit, fabric and waistband specifications.', shot: shots.underwear, products: ['Men’s brief', 'Women’s brief', 'Boxer brief'], fabrics: ['Cotton jersey', 'Cotton elastane', 'Rib'] },
];

export const productCount = categories.reduce((n, c) => n + c.products.length, 0);

/** Link into the RFQ form with the category (and optionally the product) pre-filled. */
export const rfqHref = (category: string, product?: string) =>
  '/start-a-project?' + new URLSearchParams(product ? { category, product } : { category }).toString();
