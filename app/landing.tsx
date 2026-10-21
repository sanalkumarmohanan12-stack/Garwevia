/**
 * Search landing pages — each targets one high-intent query buyers type into Google
 * ("apparel sourcing company in India", "knitwear manufacturers in Tiruppur" …) with real,
 * visible content, an FAQ (FAQPage schema) and links into the rest of the site.
 */
import Image from 'next/image';
import Link from 'next/link';
import { Arrow, Cta, JsonLd, Kicker } from './components';
import { Accordion } from './motion';
import { shots, shotStyle, type Shot } from './images';
import { categories } from './catalog';
import { SITE, breadcrumbLd } from './seo';

type Landing = {
  slug: string; crumb: string; title: string; description: string; keywords: string[];
  h1: string; intro: string; shot: Shot;
  sections: { h2: string; body: string[]; list?: string[] }[];
  faq: [string, string][];
};

export const landings: Landing[] = [
  {
    slug: 'apparel-sourcing-company-india', crumb: 'Apparel sourcing company in India',
    title: 'Apparel Sourcing Company in India — Knitwear from Tiruppur',
    description: 'GARWEVIA is an apparel sourcing company in India based in Tiruppur. We source and manufacture private label knitwear end to end — development, factories, quality control, certifications and shipping.',
    keywords: ['apparel sourcing company in India', 'apparel sourcing companies in India', 'clothing sourcing company India', 'garment sourcing company India', 'sourcing company Tiruppur', 'apparel sourcing India'],
    h1: 'Apparel sourcing company in India, specialised in knitwear',
    intro: 'GARWEVIA is an apparel sourcing company based in Tiruppur, India’s knitwear capital. We help international brands, retailers and importers source and manufacture private label knitted garments and accessories — managing every stage from tech pack to shipment through one accountable team.',
    shot: shots.range,
    sections: [
      { h2: 'What an apparel sourcing company in India does for you', body: ['Sourcing garments from India usually means finding and managing several separate suppliers: a yarn spinner, a knitting unit, a dye house, a printer or embroiderer, a garment factory, trim suppliers, a test laboratory and a freight forwarder. An apparel sourcing company brings them together for you.', 'GARWEVIA evaluates your product first, then selects manufacturing partners that suit its fabric, construction, quantity, price and compliance needs. We coordinate development and production on the ground, inspect quality to your standards and hand over finished, packed goods to your forwarder.'] },
      { h2: 'Why buyers choose GARWEVIA', body: [], list: ['Based in Tiruppur, close to the factories making your product', 'End-to-end: product development, fabric, trims, production, QC and shipping', 'One contract, one point of contact and one written quality plan', 'Certified supply chains — GOTS, OEKO-TEX, GRS, WRAP, amfori BSCI and more, verified per order', 'Testing to ISO, AATCC and ASTM methods and AQL final inspection', 'Transparent costing with FOB assumptions made explicit'] },
      { h2: 'Knitwear we source and manufacture', body: ['We specialise in knitted apparel: T-shirts, polos, hoodies, sweatshirts, joggers, women’s and loungewear, kidswear and babywear, activewear, underwear and sleepwear — plus knitted accessories such as beanies, socks and scarves, and all garment trims and packaging.'], list: categories.map(c => `${c.name} — ${c.detail}`) },
      { h2: 'How sourcing with us works', body: ['Send a tech pack, reference garment or product brief. We review it, propose a manufacturing route and costing, develop samples to your approval, manage bulk production with inline inspection, run a final AQL inspection and coordinate shipment. You approve the key decisions at each phase.'] },
    ],
    faq: [
      ['Which are the best apparel sourcing companies in India for knitwear?', 'Look for a sourcing company based in a knitwear cluster such as Tiruppur, with technical product knowledge, an on-ground quality team, verified certified partners and transparent costing. GARWEVIA was set up in Tiruppur specifically to offer that end-to-end service for knitted garments.'],
      ['Is GARWEVIA a manufacturer or a sourcing agent?', 'GARWEVIA is a sourcing and manufacturing-management company. We work through selected partner factories and take responsibility for development, production follow-up, quality control and shipment — so you deal with one partner instead of many suppliers.'],
      ['What is the minimum order quantity?', 'MOQ depends on fabric, colour and process. Custom-dyed programmes typically start from around 300 pieces per style per colour; stock fabrics can go lower. We confirm the MOQ in your quotation.'],
      ['Which countries do you ship to?', 'We work with buyers in the US, UK, EU, Canada, Australia, the Middle East and elsewhere, typically on FOB terms, and coordinate shipment with your forwarder.'],
    ],
  },
  {
    slug: 'knitwear-manufacturers-tiruppur', crumb: 'Knitwear manufacturers in Tiruppur',
    title: 'Knitwear Manufacturers in Tiruppur — Sourcing Partner',
    description: 'Looking for knitwear manufacturers in Tiruppur? GARWEVIA connects international buyers with selected Tiruppur knitwear factories and manages development, production, quality and export end to end.',
    keywords: ['knitwear manufacturers in Tiruppur', 'Tiruppur knitwear manufacturers', 'garment manufacturers in Tiruppur', 'Tiruppur garment exporters', 'T-shirt manufacturers Tiruppur', 'Tiruppur sourcing agent'],
    h1: 'Knitwear manufacturers in Tiruppur — one sourcing partner',
    intro: 'Tiruppur in Tamil Nadu is India’s largest knitwear cluster, producing a large share of the country’s knitted garment exports. GARWEVIA is based here and gives international buyers access to the right Tiruppur knitwear manufacturers — without having to find, vet and manage each factory themselves.',
    shot: shots.tops,
    sections: [
      { h2: 'Why source knitwear from Tiruppur', body: ['Tiruppur brings spinning, circular knitting, dyeing and processing, printing, embroidery, garment manufacturing, trims, packaging and export logistics within a short distance of each other. That density shortens development cycles, keeps costs competitive and offers specialists for almost every knitted product.'], list: ['Complete knitwear supply chain in one cluster', 'Strong base in cotton jersey, rib, interlock, piqué, fleece and French terry', 'Experience with international buyers and their compliance standards', 'Many units holding GOTS, OEKO-TEX, GRS, WRAP, SMETA and amfori BSCI credentials', 'Export through Chennai, Tuticorin and Kochi ports'] },
      { h2: 'How we choose the right Tiruppur manufacturer', body: ['No single factory is right for every product. A strong basic-tee unit may not suit technical activewear or babywear. We match each brief on product capability, machinery, capacity, quality systems, certification status and price — then visit, verify and manage the partner throughout your order.'] },
      { h2: 'Knitted products made in Tiruppur through GARWEVIA', body: [], list: categories.map(c => `${c.name}: ${c.products.slice(0, 5).join(', ')}`) },
      { h2: 'Quality and compliance on the ground', body: ['Our team in Tiruppur runs pre-production meetings, inline and final AQL inspections, measurement audits and third-party lab testing, and verifies each partner’s certificates for your order. You receive reports with photos and measurements before goods ship.'] },
    ],
    faq: [
      ['How do I find reliable knitwear manufacturers in Tiruppur?', 'Working through a Tiruppur-based sourcing partner is the fastest route. GARWEVIA pre-qualifies factories on capability, capacity, quality systems and certifications, and stays accountable for the order.'],
      ['Can Tiruppur manufacturers produce small quantities?', 'Many can, depending on fabric and colour. Stock fabrics allow lower quantities; custom-dyed fabric typically needs around 300 pieces per style per colour. We find the partner that fits your volume.'],
      ['Do Tiruppur factories hold organic and social certifications?', 'Many hold GOTS, OEKO-TEX, GRS, WRAP, SMETA or amfori BSCI credentials. We verify the certificate scope and validity for your specific programme.'],
      ['What knitwear is Tiruppur best known for?', 'Cotton knitwear — T-shirts, polos, sweatshirts, hoodies, innerwear, kidswear and babywear — and increasingly activewear and sustainable collections.'],
    ],
  },
  {
    slug: 'private-label-clothing-manufacturer-india', crumb: 'Private label clothing manufacturer India',
    title: 'Private Label Clothing Manufacturer in India — Knitwear',
    description: 'Private label clothing manufacturing in India for brands and retailers — T-shirts, hoodies, joggers, kidswear, activewear and underwear made to your tech pack in Tiruppur, with your labels and packaging.',
    keywords: ['private label clothing manufacturer India', 'private label apparel manufacturer', 'custom clothing manufacturer India', 'OEM garment manufacturer India', 'private label T-shirt manufacturer', 'private label hoodie manufacturer'],
    h1: 'Private label clothing manufacturing in India',
    intro: 'Launching or growing a clothing brand? GARWEVIA manufactures private label knitwear in India to your tech pack — your fit, fabric, colours, prints, labels and packaging — through selected factories in Tiruppur, with quality control and shipping managed for you.',
    shot: shots.fleece,
    sections: [
      { h2: 'Your brand, made to your specification', body: ['Everything is developed for you: fabric and GSM, fit and grading, lab-dipped colours, prints and embroidery, woven or heat-transfer labels, hang tags, polybags and cartons. We support you from a sketch or reference garment if you do not yet have a full tech pack.'], list: ['Tech pack and BOM support', 'Pattern making, grading and fit samples', 'Custom colours, prints and embroidery', 'Branded labels, hang tags and packaging', 'Size sets, PP samples and bulk production'] },
      { h2: 'Private label products', body: [], list: categories.map(c => `${c.name} — ${c.detail}`) },
      { h2: 'From first sample to bulk', body: ['Sampling usually takes 2–3 weeks per round. After PP sample approval and fabric booking, bulk production typically runs 45–75 days depending on the product and quantity. Every order is inspected before it leaves India.'] },
    ],
    faq: [
      ['Can you manufacture for a new clothing brand?', 'Yes. We work with start-up and established brands, and can help prepare tech packs, choose fabrics and plan quantities to meet minimums.'],
      ['Do you put our own labels and tags on the garments?', 'Yes. Woven or printed labels, care labels, hang tags and packaging are made to your artwork and approved on a trim card before production.'],
      ['Can I get organic or recycled private label clothing?', 'Yes — through partners holding GOTS, OCS, GRS or RCS certification, with chain-of-custody documentation for your order.'],
    ],
  },
  {
    slug: 'garment-sourcing-agent-india', crumb: 'Garment sourcing agent in India',
    title: 'Garment Sourcing Agent in India — Tiruppur Buying Office',
    description: 'GARWEVIA acts as your garment sourcing agent and buying office in India — factory selection, merchandising, production follow-up, AQL inspection and shipment for knitwear programmes from Tiruppur.',
    keywords: ['garment sourcing agent India', 'apparel sourcing agent India', 'buying agent Tiruppur', 'buying house India', 'sourcing office India', 'garment buying agent'],
    h1: 'Your garment sourcing agent and buying office in India',
    intro: 'Need a team on the ground in India? GARWEVIA works as your sourcing agent and buying office in Tiruppur — finding and auditing factories, managing merchandising and production, inspecting quality and coordinating shipment for your knitwear programmes.',
    shot: shots.swatches,
    sections: [
      { h2: 'Services as your sourcing agent', body: [], list: ['Factory search, audit and selection', 'Costing, negotiation and order placement support', 'Merchandising: samples, approvals and time-and-action plans', 'Production follow-up with weekly status reports', 'Inline and final AQL inspections with photo reports', 'Lab testing and certificate verification', 'Export documentation and forwarder coordination'] },
      { h2: 'Full package or agent support — your choice', body: ['Most buyers hand us the full package, receiving finished goods at one FOB price. Others already work with Indian factories and use us for on-ground merchandising and quality control only. Both models are run by the same Tiruppur team.'] },
    ],
    faq: [
      ['What is the difference between a sourcing agent and a buying house?', 'A buying house often places orders in its own name; a sourcing agent acts on your behalf. GARWEVIA can work either way — as your end-to-end supplier or as your agent and QC office.'],
      ['Can you inspect orders from factories we already use?', 'Yes. We provide inline and final inspections, measurement audits and lab-test coordination for existing suppliers in and around Tiruppur.'],
    ],
  },
];

export const landingBySlug = Object.fromEntries(landings.map(l => [l.slug, l]));

export function LandingPage({ l }: { l: Landing }) {
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: l.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const pageLd = { '@context': 'https://schema.org', '@type': 'WebPage', name: l.title, description: l.description, url: `${SITE}/${l.slug}`, about: { '@id': SITE + '/#org' }, keywords: l.keywords.join(', ') };
  return (
    <>
      <section className="page-hero has-visual">
        <div className="wrap page-hero-grid">
          <div className="page-hero-copy">
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{l.crumb}</span></nav>
            <Kicker>GARWEVIA · Tiruppur, India</Kicker>
            <h1 className="page-title">{l.h1}</h1>
            <p className="page-intro">{l.intro}</p>
            <div className="hero-ctas"><Link className="btn c-btn-gold" href="/start-a-project">Request a quote <Arrow /></Link><Link className="btn c-btn-outline" href="/products">View products</Link></div>
          </div>
          <div className="page-hero-visual is-photo"><Image src={l.shot.src} alt={l.shot.alt} fill priority sizes="(max-width: 900px) 100vw, 45vw" style={shotStyle(l.shot)} /></div>
        </div>
      </section>
      <article className="sec lp">
        <div className="wrap lp-grid">
          <div className="lp-body">
            {l.sections.map(s => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.body.map(p => <p key={p.slice(0, 30)}>{p}</p>)}
                {s.list && <ul className="ticks">{s.list.map(i => <li key={i}>{i}</li>)}</ul>}
              </section>
            ))}
            <section>
              <h2>Frequently asked questions</h2>
              <Accordion items={l.faq.map(([title, body]) => ({ title, body }))} first={null} />
            </section>
          </div>
          <aside className="lp-side">
            <div className="lp-card">
              <h3>Explore GARWEVIA</h3>
              <Link href="/">End-to-end sourcing overview <Arrow /></Link>
              <Link href="/products">55+ knitwear styles with specs <Arrow /></Link>
              <Link href="/quality-assurance">41 quality standards <Arrow /></Link>
              <Link href="/compliance-sustainability">21 certifications <Arrow /></Link>
              <Link href="/how-it-works">Our 12-step process <Arrow /></Link>
            </div>
            <div className="lp-card">
              <h3>Related</h3>
              {landings.filter(x => x.slug !== l.slug).map(x => <Link key={x.slug} href={'/' + x.slug}>{x.crumb} <Arrow /></Link>)}
            </div>
          </aside>
        </div>
      </article>
      <Cta />
      <JsonLd data={faqLd} />
      <JsonLd data={pageLd} />
      <JsonLd data={breadcrumbLd(l.crumb, '/' + l.slug)} />
    </>
  );
}
