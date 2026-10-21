import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AccessoryGrid, Arrow, CertGrid, JsonLd, Kicker, SectionHead } from './components';
import { Accordion } from './motion';
import { faq, faqLd, seo } from './seo';
import { shots, shotStyle } from './images';
import { categories, knitAccessories, productCount, rfqHref } from './catalog';
import { Workflow } from './workflow';
import { StandardsOverview } from './standards';
import { KnitAccessoryGrid, Programmes } from './product-blocks';
import { testCount } from './quality';
import { certCount } from './range';
import { Art, ClusterMap, NetworkHub } from './art/Art';
import { Capabilities, ContactBlock, Engage, OnePartner, QualityGates, SectionNav, Services, SpecTable, SupplyChain, compliance } from './home-sections';

export const metadata: Metadata = { title: { absolute: seo.home.title }, alternates: { canonical: '/' } };

const figures: [string, string][] = [
  [String(productCount) + '+', 'knitted garment styles'],
  [String(knitAccessories.length), 'knit-made accessory lines'],
  [String(testCount), 'quality tests & checks'],
  [String(certCount), 'certification frameworks'],
];

const promises = [
  ['One contract', 'A single partner and price for fabric, trims, making, QC and shipping.'],
  ['One quality plan', 'Your standards written down once and checked at every hand-over.'],
  ['One point of contact', 'A merchandiser in Tiruppur who answers for the whole order.'],
];

export default function Home() {
  return <>
    {/* Hero */}
    <section className="c-hero">
      <Image src={shots.range.src} alt="" fill priority sizes="100vw" className="c-hero-img" style={{ objectPosition: '50% 40%' }} />
      <div className="c-hero-shade" aria-hidden="true" />
      <div className="wrap c-hero-inner">
        <p className="c-eyebrow">End-to-end knitwear sourcing · Tiruppur, India</p>
        <h1>Your complete manufacturing partner <span>in India.</span></h1>
        <p className="c-lede">From yarn to finished, packed garments — GARWEVIA develops, sources, manufactures, inspects and ships private label knitwear and accessories for international brands. One partner, every stage.</p>
        <div className="hero-ctas"><Link className="btn c-btn-gold" href="/start-a-project">Request a quote <Arrow /></Link><a className="btn c-btn-outline" href="#overview">How we work</a></div>
      </div>
    </section>
    <section className="c-trust" aria-label="GARWEVIA at a glance">
      <div className="wrap c-trust-grid">
        {figures.map(([n, l]) => <div key={l} className="c-stat"><strong>{n}</strong><span>{l}</span></div>)}
        <div className="c-badges"><small>Certified partner network</small><ul>{['GOTS', 'OEKO-TEX', 'GRS', 'WRAP', 'amfori BSCI', 'ISO 9001'].map(b => <li key={b}>{b}</li>)}</ul></div>
      </div>
    </section>
    <SectionNav />

    {/* 1 — Overview: who we are + one partner vs many */}
    <section className="sec" id="overview"><div className="wrap">
      <div className="ov-grid">
        <div>
          <Kicker>Who we are</Kicker>
          <h2>One partner for your <em>entire supply chain.</em></h2>
          <p className="lead">Making knitwear in India normally means managing a spinner, a knitting unit, a dye house, a printer, a garment factory, trim suppliers, a test lab and a forwarder. GARWEVIA takes that whole chain off your desk.</p>
          <p className="lead">Based in Tiruppur — India’s knitwear capital — we select the right manufacturing partners for each product, manage development and production on the ground, inspect quality to your standards, and ship finished goods to your door.</p>
          <ul className="promise">{promises.map(([t, b]) => <li key={t}><b>{t}</b><span>{b}</span></li>)}</ul>
        </div>
        <Art className="ov-art" label="GARWEVIA at the centre of a network of manufacturing capabilities"><NetworkHub /></Art>
      </div>
      <OnePartner />
    </div></section>

    {/* 2 — Services */}
    <section className="sec sec-tint" id="services"><div className="wrap">
      <SectionHead kicker="End-to-end services" title="Everything from *design to delivery.*" intro="Use the full package, or only the stages you need. Every service is run by our team in Tiruppur and reported to you in one place." />
      <Services />
    </div></section>

    {/* 3 — Products */}
    <section className="sec" id="products"><div className="wrap">
      <SectionHead kicker="What we make" title="Every kind of *knitted garment.*" intro="Tops, sweats, dresses, kidswear, activewear, underwear and sleepwear — each developed to its own fit, fabric and finish." link={['Full product specifications', '/products']} />
      <div className="cat-grid buyer-cat-grid">{categories.map(c => (
        <Link key={c.slug} href={'/products#' + c.slug} className="cat-card">
          <figure><Image src={c.shot.src} alt={c.shot.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" style={shotStyle(c.shot)} /></figure>
          <div><h3>{c.name}</h3><p>{c.detail}</p><small>{c.products.length} styles · {c.fabrics.slice(0, 3).join(', ')}</small></div>
        </Link>
      ))}</div>
      <h3 className="sub-head">Product specifications at a glance</h3>
      <SpecTable />
      <div className="knit-band">
        <div className="knit-band-head">
          <div><Kicker>Knitted accessories</Kicker><h3>Complete the collection.</h3><p>Knit-made accessories developed alongside your apparel, in matching yarns and colours.</p></div>
          <Link className="text-link" href={rfqHref('Knitted accessories')}>Cost knitted accessories <Arrow /></Link>
        </div>
        <KnitAccessoryGrid compact />
      </div>
      <h3 className="sub-head">Programmes we build</h3>
      <Programmes />
    </div></section>

    {/* 4 — Trims & packaging */}
    <section className="sec sec-tint" id="trims"><div className="wrap">
      <SectionHead kicker="Trims & packaging" title="The details that *finish the garment.*" intro="Labels, tags, closures, cords, badges and packaging sourced to your brand standards, approved on a trim card and attached in production — so goods arrive retail-ready." />
      <AccessoryGrid limit={3} />
    </div></section>

    {/* 5 — Manufacturing capabilities + supply chain diagram */}
    <section className="sec" id="capabilities"><div className="wrap">
      <SectionHead kicker="Manufacturing capabilities" title="Yarn to shipment, *under one partner.*" intro="Through our Tiruppur network we cover every stage of knitwear manufacturing. Each hand-over is a quality checkpoint." link={['Technical details', '/manufacturing-network']} />
      <SupplyChain />
      <Capabilities />
    </div></section>

    {/* 6 — Animated process */}
    <section className="sec sec-tint" id="workflow"><div className="wrap"><Workflow /></div></section>

    {/* 7 — Quality */}
    <section className="sec" id="quality"><div className="wrap">
      <div className="quality-intro">
        <div>
          <Kicker>Quality assurance</Kicker>
          <h2>Tested and inspected to <em>international standards.</em></h2>
          <p>Every program runs on a written quality plan: fabric tests, colourfastness, dimensional stability, chemical and child safety, and AQL inspection — using ISO, AATCC and ASTM methods your QA team already knows.</p>
          <ul className="ticks"><li>Third-party lab testing where the buyer requires it</li><li>Inline and final inspection reports with photos</li><li>Measurements audited against your POM spec</li></ul>
        </div>
        <figure><Image src={shots.measuring.src} alt={shots.measuring.alt} fill sizes="(max-width: 960px) 100vw, 45vw" style={shotStyle(shots.measuring)} /></figure>
      </div>
      <h3 className="sub-head">{testCount} standards, grouped by what they protect</h3>
      <StandardsOverview />
      <h3 className="sub-head">Twelve quality gates on every order</h3>
      <QualityGates />
      <div className="aql-box">
        <div><b>Final inspection to AQL</b><p>Random sampling to ISO 2859-1 / ANSI Z1.4. Example plan: critical 0 · major 2.5 · minor 4.0 — your own levels always take priority.</p></div>
        <Link className="text-link" href="/quality-assurance">Full quality reference <Arrow /></Link>
      </div>
    </div></section>

    {/* 8 — Certifications & compliance */}
    <section className="sec sec-tint" id="certifications"><div className="wrap">
      <SectionHead kicker="Certifications & compliance" title="Certified supply chains, *verified per order.*" intro="Organic, recycled, chemical-safety and social-compliance credentials are sourced through partner factories and suppliers that hold them — with scope and validity checked for your program." />
      <CertGrid />
      <div className="comp-row"><b>Market regulations we build to</b><ul>{compliance.map(c => <li key={c}>{c}</li>)}</ul></div>
    </div></section>

    {/* 9 — Ways to work with us */}
    <section className="sec" id="engage"><div className="wrap">
      <SectionHead kicker="Working with us" title="Choose how much *we handle.*" intro="Most buyers hand us the full package. Some start with development, or need on-ground QC for factories they already use." />
      <Engage />
    </div></section>

    {/* 10 — Why Tiruppur */}
    <section className="sec sec-tint" id="why"><div className="wrap why-grid">
      <Art className="why-art" label="Map of the Tiruppur knitwear cluster"><ClusterMap /></Art>
      <div>
        <Kicker>Why Tiruppur</Kicker>
        <h2>Rooted in <em>India’s knitwear capital.</em></h2>
        <p className="lead">Tiruppur brings yarn, knitting, dyeing, printing, embroidery, garmenting, trims and export logistics within a short drive of each other. That closeness shortens development, keeps costs competitive and lets us be on the factory floor whenever it matters.</p>
        <ul className="ticks"><li>Every manufacturing stage in one cluster</li><li>Local trim, label and packaging suppliers</li><li>Export via Chennai, Tuticorin and Kochi ports</li></ul>
      </div>
    </div></section>

    {/* 11 — FAQ */}
    <section className="sec" id="faq"><div className="wrap faq-grid"><div><Kicker>Buyer questions</Kicker><h2>Before you <em>send the brief.</em></h2><p>Quick answers on quantities, sampling, quality and partner credentials.</p></div><Accordion items={faq.map(([title, body]) => ({ title, body }))} first={null} /></div><JsonLd data={faqLd} /></section>

    {/* 12 — Contact */}
    <section className="sec sec-navy" id="contact"><div className="wrap"><ContactBlock /></div></section>
  </>;
}
