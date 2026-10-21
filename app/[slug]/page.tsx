import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AccessoryGrid, Accent, Arrow, CertGrid, Cta, JsonLd, Kicker, PageHero, SectionHead, Steps } from '../components';
import { breadcrumbLd, glossaryLd, seo, serviceLd } from '../seo';
import { Accordion } from '../motion';
import { shots, shotStyle, type Shot } from '../images';
import { categories, rfqHref } from '../catalog';
import { KnitAccessoryGrid, Programmes } from '../product-blocks';
import { StandardsTable } from '../standards';
import { AtAGlance, CategoryBlock } from '../catalog-view';
import { testCount } from '../quality';
import { Workflow } from '../workflow';
import { Art, CareTags, ClusterMap, KnitStructure, LabDips, Marker, NetworkHub, PomSheet, PrintPlacement, TechPackSheet, Timeline, TraceChain, WorldRoutes, YarnCones } from '../art/Art';
import { RfqForm } from '../rfq-form';
import { Glossary } from '../glossary';
import { KnitCta, TechIndex, TechSections, complianceSections, developmentSections, developmentSteps, glossary, networkSections, productSections, qualitySections, qualitySteps, type Section } from '../technical';
import { ContactChannels } from '../contact-view';

type Item = { title: string; body?: string; shot?: Shot; visual?: React.ReactNode };
type View = 'about' | 'catalog' | 'accordion' | 'journey' | 'panels' | 'contact' | 'glossary' | 'legal';
type Page = { kicker: string; title: string; intro: string; crumb: string; view: View; lede?: string; heading?: string; items: Item[]; note?: string; marquee?: string[]; sections?: Section[]; knit?: boolean; certs?: boolean };

// Hero visuals: original tech-pack illustrations per page; Products keeps its product photography.
const heroArt: Record<string, React.ReactNode> = {
  'sourcing-services': <TechPackSheet />,
  'product-development': <Marker />,
  'manufacturing-network': <NetworkHub />,
  'quality-assurance': <PomSheet />,
  'compliance-sustainability': <TraceChain />,
  'how-it-works': <WorldRoutes />,
};
const heroPhoto: Record<string, Shot> = { products: shots.range, about: shots.swatches };
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
    kicker: 'Knitwear & accessories', crumb: 'Products', view: 'catalog', title: 'A complete knitwear range, built around *your brief.*',
    intro: 'Private label knitwear across tops, sweats, dresses, lounge, kidswear, performance, underwear and sleepwear — plus knit-made accessories and garment trims.',
    lede: 'Fabric, GSM, fit, decoration, trims and packaging can be reviewed against your brief for every product. MOQ and certification availability depend on the selected manufacturing partner.',
    items: [], note: 'No public prices or fixed MOQs are listed. Send a tech pack or reference garment for project-specific costing.',
    sections: productSections, knit: true,
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
    intro: 'We work from a complete tech pack, reference garment, specification sheet or sketch — or an existing product that needs a new manufacturing route.',
    heading: 'Nine steps to *bulk.*',
    lede: 'Every development step is documented — tech pack, BOM, POM chart, lab dips, strike-offs and samples — so what you approve is what gets made.',
    items: developmentSteps.map(([title, body]) => ({ title, body })),
    sections: developmentSections, knit: true,
  },
  'manufacturing-network': {
    kicker: 'Manufacturing network', crumb: 'Our network', view: 'panels', title: 'A network built *around your product.*',
    intro: 'Different manufacturing partners suit different products. We match each knitwear brief to the capabilities available through our sourcing network — yarn, knitting, processing, decoration and garment making — starting in Tiruppur.',
    lede: 'From yarn to finished garment, every stage of apparel manufacturing is within reach of our network.',
    items: [
      { title: 'Fabrics', body: 'Single jersey, rib, interlock, piqué, French terry, fleece, cotton blends and performance fabrics. Organic and recycled options depend on partner availability.', visual: <KnitStructure /> },
      { title: 'Processing', body: 'Dyeing, garment dye, washing and compacting through relevant partners.', visual: <LabDips /> },
      { title: 'Printing', body: 'Screen, puff and high-density printing techniques selected for the design and fabric.', visual: <PrintPlacement /> },
      { title: 'Embroidery', body: 'Tonal and decorative embroidery, appliqué and specialty techniques subject to partner capability.', visual: <Marker /> },
      { title: 'Garment manufacturing', body: 'Pattern, cutting, sewing, finishing and packing coordinated through selected partners.', visual: <TechPackSheet /> },
    ],
    note: 'Manufacturing partners are selected according to product, capacity, commercial and compliance requirements. Partner facilities are not represented as GARWEVIA-owned factories.',
    sections: networkSections, knit: true,
  },
  'quality-assurance': {
    kicker: 'Quality assurance', crumb: 'Quality', view: 'journey', title: 'Quality managed *at every stage.*',
    intro: 'A process-driven quality framework for knitwear — from specification review to shipment release. Inspection scope, test program and acceptance levels are agreed with each buyer.',
    heading: 'Twelve *checkpoints.*',
    lede: 'Each checkpoint is performed or coordinated according to the quality plan agreed with you, and reported with measurements, photos and corrective actions.',
    items: qualitySteps.map(([title, body]) => ({ title, body })),
    note: 'A project QC report can include PO, style, factory, quantities, defect counts by class, measurement results, photos, corrective actions and the inspection result.',
    sections: qualitySections, knit: true,
  },
  'compliance-sustainability': {
    kicker: 'Certifications & compliance', crumb: 'Certifications', view: 'panels', title: 'Certified knitwear, *responsibly made.*',
    intro: 'We assess manufacturing partners against each buyer’s product-safety, social-compliance and certification requirements, and request current evidence as part of partner selection.',
    items: [
      { title: 'Partner credentials', body: 'Selected partners may hold GOTS, GRS or OEKO-TEX certification, WRAP certification, SMETA audit reports, amfori BSCI audit status or ISO management systems — verified per program.', visual: <CareTags /> },
      { title: 'Material options', body: 'Organic cotton, recycled polyester and recycled cotton can be assessed where available and supported by chain-of-custody evidence.', visual: <YarnCones /> },
      { title: 'Chemical & process control', body: 'RSL and MRSL compliance, responsible chemical management, water and effluent treatment are reviewed against specific partner capabilities.', visual: <LabDips /> },
    ],
    note: 'Certification availability and validity are confirmed at the manufacturing-partner level for each project. GARWEVIA does not claim these certifications as its own.',
    sections: complianceSections, knit: true, certs: true,
  },
  'how-it-works': {
    kicker: 'The sourcing journey', crumb: 'How it works', view: 'journey', title: 'From brief *to bulk.*',
    intro: 'A clear, documented sequence gives your team visibility from first requirement to shipment release.',
    lede: 'GARWEVIA combines product knowledge, manufacturing access, technical quality control, compliance awareness and on-ground execution — so international buyers can make knitted apparel in India with greater visibility and control.',
    heading: 'The detailed hand-offs.',
    items: [
      ['Submit your requirement', 'Send a tech pack, reference garment or brief — with fabric, GSM, quantity, target FOB and delivery window if known.'],
      ['Technical review', 'We review construction, fabric parameters, colour, testing, certification and packing requirements.'],
      ['Manufacturing match', 'Partner factories are shortlisted for capability, capacity, compliance status and MOQ.'],
      ['Costing', 'Fabric consumption, processes and trims are costed; FOB and assumptions are made explicit.'],
      ['Development & sampling', 'Lab dips, strike-offs, proto, fit, size set and PP sample move the style to approval.'],
      ['Bulk production', 'Production starts after PP approval and the pre-production meeting, with inline inspection.'],
      ['Final inspection', 'Final random inspection to the agreed AQL, with measurement and packing verification.'],
      ['Shipment', 'Cartons, shipping marks and documents are checked and a release recommendation is issued.'],
    ].map(([title, body]) => ({ title, body })),
    knit: true,
  },
  'knitwear-glossary': {
    kicker: 'Knitwear glossary', crumb: 'Glossary', view: 'glossary', title: 'Knitwear, *explained.*',
    intro: 'Plain-language definitions of the technical, quality and compliance terms used across knitwear sourcing — from GSM and spirality to AQL, GOTS and SMETA.',
    items: [], knit: true,
  },
  contact: {
    kicker: 'Contact', crumb: 'Contact', view: 'contact', title: 'Let’s talk about *your next product.*',
    intro: 'Email, call or message us on WhatsApp — and follow GARWEVIA on LinkedIn. Our team is based in Tiruppur, Tamil Nadu — India’s knitwear capital.',
    items: [],
  },
  'privacy-policy': {
    kicker: 'Legal', crumb: 'Privacy policy', view: 'legal', title: 'Privacy policy.', intro: 'This policy describes how GARWEVIA handles information submitted through this website.',
    items: [{ title: 'Information collected', body: 'Contact details, company information, product requirements and files submitted through our forms.' }, { title: 'Use of information', body: 'We use submissions to assess enquiries, respond to buyers and coordinate sourcing opportunities.' }, { title: 'Retention & requests', body: 'Email info@garwevia.com to request access, correction or deletion of your information. A final retention schedule must be confirmed before launch.' }],
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

const serviceSlugs = ['sourcing-services', 'product-development', 'manufacturing-network', 'quality-assurance', 'compliance-sustainability'];

const pad = (i: number) => String(i + 1).padStart(2, '0');

export function generateStaticParams() {
  return [...Object.keys(pages), 'start-a-project'].map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  const s = seo[slug];
  const title = s?.title ?? (page ? page.title.replaceAll('*', '') : 'Start a Project');
  const description = s?.description ?? page?.intro ?? 'Send GARWEVIA your apparel sourcing brief.';
  return {
    title, description, keywords: s?.keywords,
    alternates: { canonical: '/' + slug },
    openGraph: { title, description, url: '/' + slug },
    twitter: { title, description },
  };
}

function Note({ children }: { children: React.ReactNode }) {
  return <aside className="note wrap"><span>Note</span><p>{children}</p></aside>;
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
                <span className="split-num">{pad(i)}</span>
                <h2>{it.title}</h2>
                <p>{it.body}</p>
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
              <a className="chip chip-alt" href="#knitted-accessories">Knitted accessories</a>
              <a className="chip chip-alt" href="#accessories">Trims &amp; packaging</a>
            </div>
          </nav>
          <AtAGlance />
          {categories.map((c, i) => <CategoryBlock key={c.slug} c={c} index={i} total={categories.length} />)}
          <section id="knitted-accessories" className="sec sec-tint">
            <div className="wrap">
              <SectionHead kicker="Knit-made accessories" title="The collection *beyond garments.*" intro="Accessories knitted from yarn or knit fabric can be developed alongside apparel. Feasibility, construction, MOQ and specialist partner availability are confirmed for each brief." />
              <KnitAccessoryGrid />
              <h3 className="programmes-title">Programmes we build from the same range</h3>
              <Programmes />
            </div>
          </section>
          <section id="accessories" className="sec acc-sec">
            <div className="wrap">
              <SectionHead kicker="Trims & packaging" title="The details that *finish the garment.*" intro="Labels, closures, cords, badges and packaging sourced to your brand standards, approved on a trim card, then attached in production or supplied separately." />
              <AccessoryGrid />
              <div className="inline-cta">
                <p>Send your trim card or artwork and quantities for accessory costing.</p>
                <Link className="btn btn-primary" href={rfqHref('Accessories & trims')}>Request accessory costing <Arrow /></Link>
              </div>
            </div>
          </section>
          <div className="wrap quote-kit">
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
      return (
        <div className="wrap">
          {page.crumb === 'How it works' && <Workflow compact />}
          {page.heading && <h2 className="content-heading"><Accent text={page.heading} /></h2>}
          <Steps steps={items.map(it => ({ title: it.title, body: it.body }))} />
        </div>
      );
    case 'panels':
      return (
        <div className="wrap panel-grid">
          {items.map((it, i) => (
            <article key={it.title} className="panel-card">
              {it.shot ? <figure className="panel-card-photo"><Image src={it.shot.src} alt={it.shot.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" style={shotStyle(it.shot)} /><figcaption className="illustrative">Illustrative imagery</figcaption></figure> : it.visual && <Art className="panel-card-art" label={it.title}>{it.visual}</Art>}
              <div>
                <span className="panel-num">{pad(i)}</span>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
            </article>
          ))}
        </div>
      );
    case 'contact':
      return <ContactChannels />;
    case 'glossary':
      return <div className="wrap"><Glossary items={glossary} /></div>;
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
  if (slug === 'start-a-project') return <><RfqForm /><JsonLd data={breadcrumbLd('Start a project', '/start-a-project')} /></>;
  const page = pages[slug];
  if (!page) notFound();
  const bare = page.view === 'legal' || page.view === 'contact';
  return (
    <>
      <PageHero crumb={page.crumb} kicker={page.kicker} title={page.title} intro={page.intro} image={heroPhoto[slug]} art={heroArt[slug]} />
      {page.sections && <TechIndex sections={page.sections} extra={page.certs ? [['certification-frameworks', 'Certification frameworks']] : slug === 'quality-assurance' ? [['standards', 'Quality standards']] : []} />}
      {slug === 'quality-assurance' && (
        <section className="sec std-sec" id="standards">
          <div className="wrap">
            <SectionHead kicker="Quality standards reference" title={'The ' + testCount + ' tests and checks *behind every order.*'} intro="The standards commonly applied to knitted garments, grouped by what they protect. Your quality plan selects the methods, editions and limits for each style and destination market." />
            <StandardsTable />
          </div>
        </section>
      )}
      {page.certs && (
        <section className="sec" id="certification-frameworks">
          <div className="wrap">
            <SectionHead kicker="Certification frameworks" title="Every major knitwear *certification.*" intro="Organic and recycled content, chemical safety, responsible fibres, social compliance and management systems — sourced through partner factories and suppliers that hold them." />
            <CertGrid />
          </div>
        </section>
      )}
      <section className={'content content-' + page.view}>
        {page.lede && (
          <div className="wrap content-lede">
            <Kicker>{page.crumb}</Kicker>
            <p>{page.lede}</p>
          </div>
        )}
        {page.heading && page.view === 'accordion' && <h2 className="wrap content-heading"><Accent text={page.heading} /></h2>}
        <Body page={page} />
        {page.note && <Note>{page.note}</Note>}
        {page.sections && <TechSections sections={page.sections} />}
      </section>
      {slug === 'quality-assurance' && <aside className="wrap quality-references">
        <div><Kicker>Reference frameworks</Kicker><h2>Standards selected <em>for your program.</em></h2><p>Method editions, test limits, inspection level and acceptance criteria are set in the buyer-approved quality plan. Reports and partner evidence are reviewed against the specific order.</p></div>
        <div><a href="https://www.aatcc.org/testing/standards" target="_blank" rel="noopener noreferrer">AATCC textile test methods <Arrow /></a><a href="https://www.iso.org/standard/2859-1" target="_blank" rel="noopener noreferrer">ISO 2859-1 sampling framework <Arrow /></a></div>
      </aside>}
      {!bare && (page.knit ? <KnitCta /> : <Cta />)}
      <JsonLd data={breadcrumbLd(page.crumb, '/' + slug)} />
      {serviceSlugs.includes(slug) && <JsonLd data={serviceLd(page.kicker, '/' + slug, seo[slug]?.description ?? page.intro)} />}
      {slug === 'knitwear-glossary' && <JsonLd data={glossaryLd(glossary)} />}
    </>
  );
}
