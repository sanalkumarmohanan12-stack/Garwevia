import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Accent, Arrow, Cta, Kicker, Marquee, PageHero } from '../components';
import { Accordion, ExpandPanels, Journey, ScrollHighlight } from '../motion';
import { shots, shotStyle, type Shot } from '../images';
import { categories, rfqHref } from '../catalog';
import { Art, CareTags, ClusterMap, KnitStructure, LabDips, Marker, NetworkHub, PomSheet, PrintPlacement, TechPackSheet, Timeline, TraceChain, WorldRoutes, YarnCones } from '../art/Art';
import { RfqForm } from '../rfq-form';

type Item = { title: string; body?: string; shot?: Shot; visual?: React.ReactNode };
type View = 'about' | 'catalog' | 'accordion' | 'journey' | 'panels' | 'rows' | 'legal';
type Page = { kicker: string; title: string; intro: string; crumb: string; view: View; lede?: string; heading?: string; items: Item[]; note?: string; marquee?: string[] };

// Hero visuals: original tech-pack illustrations per page; Products keeps its product photography.
const heroArt: Record<string, React.ReactNode> = {
  about: <WorldRoutes />,
  'sourcing-services': <TechPackSheet />,
  'product-development': <Marker />,
  'manufacturing-network': <NetworkHub />,
  'quality-assurance': <PomSheet />,
  'compliance-sustainability': <TraceChain />,
  'how-it-works': <WorldRoutes />,
};
const heroPhoto: Record<string, Shot> = { products: shots.range };

const pages: Record<string, Page> = {
  about: {
    kicker: 'About GARWEVIA', crumb: 'About', view: 'about', title: 'Global sourcing. *Local expertise.*',
    intro: 'GARWEVIA was created to make apparel sourcing from India simpler, more transparent and more manageable for international buyers.',
    lede: 'We build a network of manufacturing capabilities and select partners around each buyer’s requirements — not the other way around.',
    items: [
      { title: 'Our mission', body: 'Make sourcing from India more clear, connected and accountable for international brands.', visual: <NetworkHub /> },
      { title: 'Our approach', body: 'Buyer-focused rather than factory-focused. We assess the product first, then select a suitable manufacturing route.', visual: <TechPackSheet flat="tee" /> },
      { title: 'Why Tiruppur', body: 'Our presence in this knitwear cluster connects projects to relevant fabrication, processing, manufacturing and logistics capabilities.', visual: <ClusterMap /> },
      { title: 'Our values', body: 'Transparency, accountability, quality, partnership, reliability and continuous improvement.', visual: <Timeline /> },
    ],
  },
  products: {
    kicker: 'Product capabilities', crumb: 'Products', view: 'catalog', title: 'Products built around *your brief.*',
    intro: 'Explore product types that can be developed and sourced through our manufacturing network. Specifications, MOQs, certifications and production routes are confirmed for each project.',
    lede: 'Fabric, GSM, fit, decoration, trims and packaging can be reviewed against your brief for every product. MOQ and certification availability depend on the selected manufacturing partner.',
    items: [], note: 'No public prices or fixed MOQs are listed. Send a tech pack or reference garment for project-specific costing.',
  },
  'sourcing-services': {
    kicker: 'Sourcing services', crumb: 'Services', view: 'accordion', title: 'Sourcing without *the guesswork.*',
    intro: 'From requirement review to shipment coordination, GARWEVIA acts as your on-ground sourcing and manufacturing management partner in India.',
    heading: 'Seven services. *One accountable partner.*',
    items: [
      { title: 'Requirement assessment', body: 'We review tech packs, samples, fabric, target price, MOQ, lead time, quality standards and certification requirements.' },
      { title: 'Factory matching', body: 'Suitable manufacturing partners are shortlisted according to product capability, capacity, commercial and compliance needs.' },
      { title: 'Costing', body: 'We coordinate costing and clarify commercial assumptions before decisions are made.' },
      { title: 'Sampling', body: 'Development samples, fit samples, size sets and approvals are coordinated through the selected partner.' },
      { title: 'Production coordination', body: 'We follow milestones, communication and emerging issues throughout manufacturing.' },
      { title: 'Quality assurance', body: 'Inspection activities are performed or coordinated according to the agreed quality plan.' },
      { title: 'Logistics coordination', body: 'Support for packing, documentation and shipment coordination.' },
    ],
  },
  'product-development': {
    kicker: 'Product development', crumb: 'Product development', view: 'journey', title: 'From idea to *production-ready.*',
    intro: 'We can work from a complete tech pack, reference garment, specification sheet, sketch or existing product needing an alternative manufacturing route.',
    heading: 'Nine steps to *bulk.*',
    lede: 'Available development steps depend on each project, and each one is coordinated with the selected manufacturing partner as required.',
    items: ['Concept or tech pack', 'Fabric selection', 'Costing', 'Pattern development', 'Prototype', 'Fit review', 'Size set', 'Pre-production sample', 'Bulk production'].map(title => ({ title })),
  },
  'manufacturing-network': {
    kicker: 'Manufacturing network', crumb: 'Our network', view: 'panels', title: 'A network built *around your product.*',
    intro: 'Different manufacturing partners are suited to different products. We match each brief to available capabilities across our sourcing network, starting in Tiruppur.',
    lede: 'From yarn to finished garment, every stage of apparel manufacturing is within reach of our network.',
    items: [
      { title: 'Fabrics', body: 'Single jersey, rib, interlock, piqué, French terry, fleece, cotton blends and performance fabrics. Organic and recycled options depend on partner availability.', visual: <KnitStructure /> },
      { title: 'Processing', body: 'Dyeing, garment dye, washing and compacting through relevant partners.', visual: <LabDips /> },
      { title: 'Decoration', body: 'Screen, puff and high-density printing; embroidery, appliqué and specialty techniques subject to partner capability.', visual: <PrintPlacement /> },
      { title: 'Garment manufacturing', body: 'Pattern, cutting, sewing, finishing and packing coordinated through selected partners.', visual: <Marker /> },
    ],
    note: 'Manufacturing partners are selected according to product, capacity, commercial and compliance requirements. Partner facilities are not represented as GARWEVIA-owned factories.',
  },
  'quality-assurance': {
    kicker: 'Quality assurance', crumb: 'Quality', view: 'journey', title: 'Quality managed *at every stage.*',
    intro: 'Our quality assurance framework makes expectations visible from development to final inspection. The inspection scope is agreed with the buyer according to project requirements.',
    heading: 'Eleven *checkpoints.*',
    lede: 'Each checkpoint is reviewed or coordinated according to the inspection plan agreed with you.',
    items: ['Requirement verification', 'Fabric & trim review', 'Pre-production sample', 'Size set review', 'Pre-production meeting', 'Inline inspection', 'Measurement verification', 'Workmanship inspection', 'Packing verification', 'Final inspection', 'Shipment release recommendation'].map(title => ({ title })),
    note: 'A project QC report can include PO, style, factory, quantities, defect counts, measurements, photos, corrective actions and inspection result.',
  },
  'compliance-sustainability': {
    kicker: 'Compliance & sustainability', crumb: 'Compliance', view: 'panels', title: 'Responsible manufacturing *matters.*',
    intro: 'We can assess manufacturing partners against a buyer’s compliance requirements and request relevant evidence as part of partner selection.',
    marquee: ['GOTS', 'GRS', 'OEKO-TEX', 'WRAP', 'SMETA / SEDEX', 'amfori BSCI', 'ISO'],
    items: [
      { title: 'Partner credentials', body: 'Selected manufacturing partners within our network may hold credentials including GOTS, GRS, OEKO-TEX, WRAP, SMETA / SEDEX, amfori BSCI or ISO.', visual: <CareTags /> },
      { title: 'Material options', body: 'Organic cotton and recycled-fiber options may be assessed when available and supported by evidence.', visual: <YarnCones /> },
      { title: 'Operational practices', body: 'Traceability, chemical management, waste reduction and lower-impact processing can be discussed against specific partner capabilities.', visual: <LabDips /> },
    ],
    note: 'Certification availability and validity are confirmed at the manufacturing-partner level for each project. GARWEVIA does not claim these certifications as its own.',
  },
  'how-it-works': {
    kicker: 'The sourcing journey', crumb: 'How it works', view: 'journey', title: 'From brief *to bulk.*',
    intro: 'A clear sequence gives your team visibility from first requirement to shipment.',
    heading: 'Eight steps. *Full visibility.*',
    items: [['Submit your requirement', 'Upload a tech pack, reference image or product brief.'], ['Requirement review', 'We evaluate specifications, quantity, timelines and compliance needs.'], ['Manufacturing match', 'Suitable manufacturing partners are shortlisted.'], ['Costing', 'Commercial options are developed and assumptions clarified.'], ['Sampling', 'Development and approvals move the product toward production.'], ['Production', 'Manufacturing begins after commercial and sample approvals.'], ['Quality assurance', 'Production monitoring and inspections follow the agreed plan.'], ['Shipment', 'Packing and logistics are coordinated.']].map(([title, body]) => ({ title, body })),
  },
  contact: {
    kicker: 'Contact', crumb: 'Contact', view: 'rows', title: 'Let’s talk about *your next product.*',
    intro: 'Share your sourcing question or send a complete brief. Our team is based in Tiruppur, Tamil Nadu, India.',
    items: [
      { title: 'Business enquiries', body: 'Email address to be confirmed before launch.' },
      { title: 'Sourcing & RFQs', body: 'Use the Start a Project form to send your requirements and supporting files.' },
      { title: 'Schedule a discussion', body: 'Include your preferred time zone and availability in your message. We will follow up to arrange a call.' },
    ],
    note: 'Phone, WhatsApp, LinkedIn and exact office location will be published once verified.',
  },
  'privacy-policy': {
    kicker: 'Legal', crumb: 'Privacy policy', view: 'legal', title: 'Privacy policy.', intro: 'This policy describes how GARWEVIA handles information submitted through this website.',
    items: [{ title: 'Information collected', body: 'Contact details, company information, product requirements and files submitted through our forms.' }, { title: 'Use of information', body: 'We use submissions to assess enquiries, respond to buyers and coordinate sourcing opportunities.' }, { title: 'Retention & requests', body: 'Contact us to request access, correction or deletion. A final retention schedule and contact address must be confirmed before launch.' }],
    note: 'Legal text is a launch draft and requires review with actual business details, providers and jurisdiction.',
  },
  'terms-of-use': {
    kicker: 'Legal', crumb: 'Terms of use', view: 'legal', title: 'Terms of use.', intro: 'The information on this website describes potential sourcing services and manufacturing capabilities.',
    items: [{ title: 'No guaranteed capability', body: 'Availability, timing, commercial terms and compliance status are confirmed for each individual project.' }, { title: 'Website content', body: 'Content is provided for general business information and may be updated.' }, { title: 'Enquiries', body: 'Sending a form does not create a supply agreement or guarantee an offer.' }],
    note: 'Legal text is a launch draft and requires business and legal review.',
  },
  'cookie-policy': {
    kicker: 'Legal', crumb: 'Cookie policy', view: 'legal', title: 'Cookie policy.', intro: 'This site uses essential browser storage to remember your cookie preference.',
    items: [{ title: 'Essential storage', body: 'The garwevia-cookie preference is stored in your browser.' }, { title: 'Optional analytics', body: 'Analytics and advertising integrations are placeholders and should only be enabled with appropriate consent and updated disclosures.' }],
    note: 'Review this policy when analytics, advertising or third-party tools are enabled.',
  },
};

const pad = (i: number) => String(i + 1).padStart(2, '0');

export function generateStaticParams() {
  return [...Object.keys(pages), 'start-a-project'].map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return { title: slug === 'start-a-project' ? 'Start a Project' : page ? page.title.replaceAll('*', '') : 'Page', description: page?.intro || 'Send GARWEVIA your apparel sourcing brief.' };
}

function Note({ children }: { children: React.ReactNode }) {
  return <aside className="note wrap" data-reveal><span>Note</span><p>{children}</p></aside>;
}

function Body({ page }: { page: Page }) {
  const { items } = page;
  switch (page.view) {
    case 'about':
      return (
        <div className="split-rows">
          {items.map((it, i) => (
            <article key={it.title} className="split-row">
              <Art className="split-img" label={it.title}>{it.visual}</Art>
              <div className="split-text">
                <span className="split-num" data-reveal>{pad(i)}</span>
                <h2 data-reveal>{it.title}</h2>
                <p data-reveal>{it.body}</p>
              </div>
            </article>
          ))}
        </div>
      );
    case 'catalog':
      return (
        <>
          <nav className="cat-nav" aria-label="Product categories">
            <div className="wrap chips">
              {categories.map(c => <a key={c.slug} className="chip" href={'#' + c.slug}>{c.name} <sup>{c.products.length}</sup></a>)}
            </div>
          </nav>
          {categories.map((c, i) => (
            <section key={c.slug} id={c.slug} className="cat">
              <figure className="cat-media">
                <Image src={c.shot.src} alt={c.shot.alt} fill sizes="(max-width: 900px) 100vw, 50vw" style={shotStyle(c.shot)} />
                <figcaption className="illustrative">Illustrative imagery</figcaption>
              </figure>
              <div className="cat-body">
                <p className="cat-index" data-reveal>{pad(i)} <span>/ {pad(categories.length - 1)}</span></p>
                <h2 data-reveal>{c.name}</h2>
                <p className="cat-intro" data-reveal>{c.intro}</p>
                <ul className="cat-products" data-reveal>
                  {c.products.map(p => (
                    <li key={p}>
                      <Link href={rfqHref(c.name, p)}>
                        <span>{p}</span>
                        <small>Request costing <Arrow /></small>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="cat-fabrics" data-reveal>
                  <small>Common fabric bases</small>
                  <div>{c.fabrics.map(fb => <span key={fb}>{fb}</span>)}</div>
                </div>
                <Link className="pill pill-sand" href={rfqHref(c.name)} data-reveal>Get costing for {c.name} <span className="pill-dot" /></Link>
              </div>
            </section>
          ))}
          <div className="wrap quote-kit" data-reveal>
            <p className="kicker">To quote quickly, send us</p>
            <ol>
              {['Tech pack or reference garment', 'Fabric and GSM, if known', 'Quantity per style and colour', 'Target FOB price', 'Delivery window and destination'].map((t, n) => <li key={t}><small>{pad(n)}</small>{t}</li>)}
            </ol>
          </div>
        </>
      );
    case 'accordion':
      return <div className="wrap"><Accordion items={items.map(it => ({ title: it.title, body: it.body! }))} /></div>;
    case 'journey':
      return <div className="wrap"><Journey title={<Accent text={page.heading!} />} steps={items} /></div>;
    case 'panels':
      return <ExpandPanels items={items.map(it => ({ title: it.title, body: it.body!, visual: it.visual }))} />;
    case 'rows':
      return (
        <div className="wrap contact-rows">
          {items.map((it, i) => (
            <div key={it.title} className="contact-row" data-reveal>
              <span>{pad(i)}</span><h2>{it.title}</h2><p>{it.body}</p>
            </div>
          ))}
          <Link className="contact-row contact-row-cta" href="/start-a-project" data-reveal>
            <span>→</span><h2>Send a sourcing brief</h2><p>Start a project <Arrow /></p>
          </Link>
        </div>
      );
    case 'legal':
      return (
        <div className="legal wrap">
          {items.map((it, i) => (
            <section key={it.title}><h2><small>{pad(i)}</small>{it.title}</h2><p>{it.body}</p></section>
          ))}
        </div>
      );
  }
}

export default async function InnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'start-a-project') return <RfqForm />;
  const page = pages[slug];
  if (!page) notFound();
  const legal = page.view === 'legal';
  return (
    <>
      <PageHero crumb={page.crumb} kicker={page.kicker} title={page.title} intro={page.intro} image={heroPhoto[slug]} art={heroArt[slug]} />
      {page.marquee && <Marquee words={page.marquee} tone="sand" />}
      <section className={'content content-' + page.view}>
        {page.lede && (
          <div className="wrap content-lede">
            <Kicker>{page.crumb}</Kicker>
            <ScrollHighlight text={page.lede} className="highlight-sm" />
          </div>
        )}
        {page.heading && page.view === 'accordion' && <h2 className="wrap content-heading" data-reveal><Accent text={page.heading} /></h2>}
        <Body page={page} />
        {page.note && <Note>{page.note}</Note>}
      </section>
      {!legal && <Cta />}
    </>
  );
}
