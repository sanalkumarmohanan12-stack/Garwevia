/**
 * Search: keyword map per page, structured data (schema.org JSON-LD) and the buyer FAQ.
 * Keywords live where search engines read them legitimately — titles, descriptions,
 * structured data, alt text and visible (expandable) FAQ copy. Never as hidden text.
 */
import { contact } from './contact';

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://garwevia.com';

type Seo = { title: string; description: string; keywords: string[] };

/** One primary search intent per page, plus close variants buyers type. */
export const seo: Record<string, Seo> = {
  home: {
    title: 'Knitwear Sourcing & Apparel Manufacturing in Tiruppur, India | GARWEVIA',
    description: 'GARWEVIA is a Tiruppur-based apparel sourcing and manufacturing-management partner for international brands — T-shirts, hoodies, polos, babywear and activewear, from tech pack to shipment.',
    keywords: ['apparel manufacturer India', 'knitwear manufacturer India', 'clothing manufacturer Tiruppur', 'garment sourcing agent India', 'private label clothing manufacturer', 'custom T-shirt manufacturer', 'hoodie manufacturer India', 'OEM apparel manufacturer', 'sourcing agent Tiruppur', 'knitwear sourcing India'],
  },
  about: {
    title: 'About GARWEVIA — Apparel Sourcing Partner in Tiruppur, India',
    description: 'Global sourcing, local expertise. GARWEVIA connects international apparel buyers with selected knitwear manufacturing partners in Tiruppur, India’s knitwear hub.',
    keywords: ['apparel sourcing company India', 'Tiruppur sourcing agent', 'garment buying house India', 'knitwear sourcing partner', 'India clothing supplier'],
  },
  products: {
    title: 'Custom Knitwear Manufacturing — T-Shirts, Hoodies, Polos, Babywear',
    description: 'Private label T-shirts, polos, hoodies, sweatshirts, joggers, leggings, kidswear, baby rompers and activewear, developed to your tech pack through manufacturing partners in India.',
    keywords: ['custom T-shirt manufacturer India', 'polo shirt manufacturer', 'hoodie and sweatshirt manufacturer', 'jogger manufacturer', 'legging manufacturer', 'baby romper manufacturer', 'organic babywear manufacturer', 'kidswear manufacturer India', 'activewear manufacturer India', 'blank T-shirt supplier', 'oversized T-shirt manufacturer', 'French terry hoodie manufacturer'],
  },
  'sourcing-services': {
    title: 'Apparel Sourcing Services in India — Garment Sourcing Agent',
    description: 'Requirement review, factory matching, costing, sampling, production follow-up, quality inspection and shipment coordination — one accountable apparel sourcing agent in India.',
    keywords: ['apparel sourcing services', 'garment sourcing agent India', 'clothing sourcing company', 'factory sourcing India', 'buying agent Tiruppur', 'production follow-up India', 'merchandising services'],
  },
  'product-development': {
    title: 'Garment Product Development — Tech Pack, Sampling & Fit Approval',
    description: 'Tech pack review, BOM, POM and measurement specs, lab dips, strike-offs, proto, fit, size set, PP and TOP samples — knitwear product development through to bulk production.',
    keywords: ['garment product development', 'tech pack development', 'apparel sampling India', 'fit sample', 'PP sample', 'TOP sample', 'lab dip approval', 'strike-off', 'pattern making and grading', 'fabric GSM specification'],
  },
  'manufacturing-network': {
    title: 'Knit Fabric & Garment Manufacturing Network in Tiruppur, India',
    description: 'Single jersey, piqué, rib, interlock, French terry and fleece; reactive and garment dyeing; screen, puff and DTF printing; embroidery; overlock, flatlock and cover-stitch sewing — through partner factories.',
    keywords: ['knit fabric manufacturer Tiruppur', 'circular knitting India', 'single jersey fabric', 'French terry fabric', 'fleece fabric manufacturer', 'garment dyeing India', 'screen printing apparel', 'DTF printing', 'embroidery apparel India', 'cut and sew manufacturer', 'combed cotton', 'organic cotton knitwear'],
  },
  'quality-assurance': {
    title: 'Garment Quality Control & AQL Inspection in India',
    description: 'Knitwear quality control from fabric to final random inspection: GSM, shrinkage, spirality, colourfastness, measurement audits, AQL sampling to ISO 2859-1 / ANSI Z1.4 and packing verification.',
    keywords: ['garment quality inspection India', 'AQL inspection', 'final random inspection', 'inline inspection', 'garment testing AATCC', 'shrinkage testing', 'colourfastness testing', '4-point fabric inspection', 'third-party inspection Tiruppur', 'QC for apparel'],
  },
  'compliance-sustainability': {
    title: 'GOTS, OEKO-TEX, GRS, WRAP & BSCI Certified Clothing Partners',
    description: 'Source from partner factories with GOTS, GRS, OEKO-TEX, WRAP, SMETA / Sedex, amfori BSCI or ISO credentials — verified per program. CPSIA, REACH and RSL compliance for knitwear.',
    keywords: ['GOTS certified clothing manufacturer India', 'OEKO-TEX certified garment manufacturer', 'GRS recycled apparel', 'WRAP certified factory India', 'amfori BSCI factory', 'SMETA audited supplier', 'sustainable clothing manufacturer India', 'organic cotton clothing manufacturer', 'CPSIA compliant childrenswear', 'REACH compliant apparel'],
  },
  'how-it-works': {
    title: 'How Apparel Sourcing from India Works — Brief to Shipment',
    description: 'Eight documented steps: submit your tech pack, technical review, factory match, costing, development and sampling, bulk production, AQL final inspection and shipment.',
    keywords: ['how to source clothing from India', 'apparel sourcing process', 'garment manufacturing process', 'clothing production steps', 'import clothing from India'],
  },
  'knitwear-glossary': {
    title: 'Knitwear & Garment Glossary — GSM, AQL, Tech Pack, GOTS Explained',
    description: 'Plain-language definitions of knitwear, quality and compliance terms: GSM, MOQ, FOB, tech pack, BOM, POM, PP sample, AQL, spirality, pilling, GOTS, OEKO-TEX, WRAP, SMETA and more.',
    keywords: ['what is GSM in fabric', 'what is AQL', 'what is a tech pack', 'what is spirality', 'PP sample meaning', 'lab dip meaning', 'GOTS vs OEKO-TEX', 'single jersey vs interlock', 'French terry meaning'],
  },
  contact: {
    title: 'Contact GARWEVIA — Clothing Sourcing in Tiruppur, India',
    description: `Email ${contact.email}, call ${contact.phone}, message us on WhatsApp or book a Teams meeting. 62 Rayapuram Main Road, Tiruppur, Tamil Nadu, India.`,
    keywords: ['contact apparel sourcing agent', 'Tiruppur garment company contact', 'clothing manufacturer India contact'],
  },
  'schedule-a-meeting': {
    title: 'Book a Teams Meeting with GARWEVIA',
    description: 'Pick a 30-minute Microsoft Teams slot to discuss your knitwear program — product, fabric, quantities, certifications and timelines.',
    keywords: ['apparel sourcing consultation', 'book meeting clothing manufacturer'],
  },
  'start-a-project': {
    title: 'Request a Quote — Send Your Tech Pack to GARWEVIA',
    description: 'Send your tech pack, fabric, GSM, quantity, target FOB and delivery window. Our Tiruppur team reviews it and comes back with a manufacturing route and costing.',
    keywords: ['clothing manufacturer quote', 'request apparel quotation', 'send tech pack', 'RFQ garment manufacturing'],
  },
};

/** Broad topics GARWEVIA is knowledgeable about — used in the Organization structured data. */
const knowsAbout = [
  'Knitwear sourcing', 'Apparel manufacturing', 'Private label clothing', 'Garment product development', 'Tech packs', 'Sampling',
  'Single jersey', 'Piqué', 'Interlock', 'Rib knit', 'French terry', 'Fleece', 'Organic cotton', 'Recycled polyester',
  'Reactive dyeing', 'Garment dyeing', 'Screen printing', 'DTF printing', 'Embroidery',
  'Garment quality control', 'AQL inspection', 'Colourfastness testing', 'Shrinkage testing',
  'GOTS', 'OEKO-TEX', 'GRS', 'WRAP', 'SMETA', 'amfori BSCI', 'CPSIA', 'REACH',
];

const services: [string, string][] = [
  ['Apparel sourcing', '/sourcing-services'], ['Product development & sampling', '/product-development'],
  ['Knitwear manufacturing coordination', '/manufacturing-network'], ['Quality control & AQL inspection', '/quality-assurance'],
  ['Compliance & certification sourcing', '/compliance-sustainability'],
];
const products = ['T-shirts', 'Polo shirts', 'Hoodies', 'Sweatshirts', 'Joggers', 'Leggings', 'Women’s tops', 'Kids T-shirts', 'Baby rompers', 'Pajama sets', 'Activewear tops'];

export const organizationLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': SITE + '/#org',
      name: 'GARWEVIA',
      legalName: 'GARWEVIA',
      slogan: 'Global apparel sourcing & manufacturing',
      description: seo.home.description,
      url: SITE,
      logo: SITE + '/logos/garwevia-dark.png',
      image: SITE + '/images/apparel-essentials.webp',
      email: contact.email,
      telephone: '+91 85468 02097',
      address: { '@type': 'PostalAddress', streetAddress: '62, Rayapuram Main Road', addressLocality: 'Tiruppur', addressRegion: 'Tamil Nadu', postalCode: '641601', addressCountry: 'IN' },
      areaServed: ['United States', 'United Kingdom', 'European Union', 'Canada', 'Australia', 'Middle East', 'Worldwide'],
      knowsAbout,
      contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: contact.email, telephone: '+91 85468 02097', availableLanguage: ['English'] }],
      ...(contact.whatsapp ? { sameAs: [contact.whatsapp] } : {}),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Knitwear sourcing and manufacturing services',
        itemListElement: [
          ...services.map(([name, path]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, url: SITE + path } })),
          ...products.map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom ' + name, brand: { '@type': 'Brand', name: 'Private label' } } })),
        ],
      },
    },
    { '@type': 'WebSite', '@id': SITE + '/#site', url: SITE, name: 'GARWEVIA', publisher: { '@id': SITE + '/#org' }, inLanguage: 'en' },
  ],
};

export const breadcrumbLd = (name: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name, item: SITE + path },
  ],
});

export const serviceLd = (name: string, path: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name, description, url: SITE + path,
  serviceType: name,
  provider: { '@id': SITE + '/#org' },
  areaServed: 'Worldwide',
});

export const glossaryLd = (terms: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Knitwear & garment glossary',
  url: SITE + '/knitwear-glossary',
  hasDefinedTerm: terms.map(([name, description]) => ({ '@type': 'DefinedTerm', name, description })),
});

/** Buyer questions, phrased the way prospects search. Answers stay non-committal where facts are per program. */
export const faq: [string, string][] = [
  ['Is GARWEVIA a clothing manufacturer in India?', 'GARWEVIA is a Tiruppur-based apparel sourcing and manufacturing-management company. We match each product to selected manufacturing partners in our network and manage development, production, quality control and shipment for you — one accountable point of contact in India.'],
  ['What is your minimum order quantity (MOQ)?', 'MOQ depends on the fabric, colour, process and manufacturing partner — for example, custom-dyed fabric or special yarns usually need higher quantities per colour than stock fabrics. Send your quantities per style and colour and we will confirm what is achievable.'],
  ['Can you make private label T-shirts, hoodies and polos to my tech pack?', 'Yes. We develop private label and custom knitwear to your tech pack or reference garment — including fabric, GSM, fit, prints, embroidery, labels, hangtags and packaging to your brand standards.'],
  ['What do I need to send for a quotation?', 'A tech pack or reference garment, fabric composition and GSM if known, quantity per style and colour, colour requirements, any certification or testing requirements, target FOB price and your delivery timeline and destination.'],
  ['How long do sampling and bulk production take?', 'Timelines depend on product complexity, fabric development, approvals and order size. We share a time-and-action plan for your program once the requirement is reviewed, and update it at every stage.'],
  ['Can you source GOTS, OEKO-TEX or GRS certified garments?', 'Yes — selected partner factories may hold GOTS, GRS or OEKO-TEX certification, and WRAP, SMETA or amfori BSCI audit status. Certificate scope and validity are verified for each program; GARWEVIA does not claim these certifications as its own.'],
  ['How do you control quality?', 'Through a documented quality workflow: specification review, fabric and trim approval, lab dips and strike-offs, fit and PP samples, a pre-production meeting, inline inspection, final random inspection to the agreed AQL and packing verification — with reports and photos.'],
  ['Do you work with international brands and ship worldwide?', 'Yes. We work with brands, retailers and sourcing teams abroad, typically on FOB terms, and coordinate packing, documentation and shipment to your destination or forwarder.'],
  ['Why source knitwear from Tiruppur?', 'Tiruppur is India’s largest knitwear cluster, with yarn, knitting, dyeing, printing, embroidery, garmenting and export logistics close together — which shortens development and gives access to a wide range of manufacturing capabilities.'],
];

export const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};
