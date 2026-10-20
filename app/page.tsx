import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AccessoryGrid, Arrow, CertGrid, Cta, Icon, JsonLd, Kicker, SectionHead, Steps, type IconName } from './components';
import { Accordion } from './motion';
import { faq, faqLd, seo } from './seo';
import { shots, shotStyle } from './images';
import { categories, productCount, rfqHref } from './catalog';
import { accessories, certCount } from './range';
import { Art, ClusterMap } from './art/Art';

export const metadata: Metadata = {
  title: { absolute: seo.home.title },
  alternates: { canonical: '/' },
};

const figures: [string, string][] = [
  [String(productCount), 'Knitwear product types'],
  [String(accessories.length), 'Accessory & trim families'],
  [String(certCount), 'Certification frameworks sourced'],
  ['1', 'Accountable team in Tiruppur'],
];

const process: { title: string; body: string; icon: IconName }[] = [
  { icon: 'brief', title: 'Brief & tech pack', body: 'Specs, BOM, trims, quantities and target FOB reviewed with you.' },
  { icon: 'globe', title: 'Partner match', body: 'Knitting, processing, garmenting and trim suppliers shortlisted for the product.' },
  { icon: 'layers', title: 'Costing', body: 'Fabric consumption, trims and processes costed; FOB assumptions made explicit.' },
  { icon: 'sample', title: 'Development & sampling', body: 'Lab dips, strike-offs, trim cards, proto, fit and PP samples.' },
  { icon: 'fabric', title: 'Fabric & trims', body: 'Yarn, knitting, dyeing and accessories sourced to approved standards.' },
  { icon: 'stitch', title: 'Production', body: 'Cutting, sewing, printing and trim attachment with inline checks.' },
  { icon: 'check', title: 'Inspection', body: 'Final random inspection to the agreed AQL, with measurement audits.' },
  { icon: 'ship', title: 'Packing & dispatch', body: 'Packed, labelled and cartoned to your packing list, then shipped.' },
];

const quality: [string, string, IconName][] = [
  ['Fabric & testing', 'GSM, shrinkage, spirality and colourfastness checked — tested to AATCC, ISO or buyer methods where required.', 'fabric'],
  ['Trims & accessories', 'Every label, button, zipper and tag matched to the approved trim card, with nickel-free and safety checks for kidswear.', 'tag'],
  ['Inline & final inspection', 'Inline and final random inspections to the agreed AQL, reported with measurements and photos.', 'check'],
];

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Kicker>Knitwear &amp; accessories sourcing · Tiruppur, India</Kicker>
            <h1>Knitwear and trims, <em>sourced and made right</em> in India.</h1>
            <p className="hero-lede">GARWEVIA is your sourcing and manufacturing partner in Tiruppur — matching every garment and accessory to the right manufacturer, and managing development, quality and shipment for you.</p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" href="/start-a-project">Send your tech pack <Arrow /></Link>
              <Link className="btn btn-ghost" href="/products">Explore products</Link>
            </div>
            <ul className="hero-points">
              <li>Private label &amp; custom knitwear</li>
              <li>Labels, tags, buttons, zippers &amp; packaging</li>
              <li>GOTS, OEKO-TEX, GRS &amp; more through certified partners</li>
            </ul>
          </div>
          <div className="hero-media" aria-hidden="true">
            <figure className="hm-main"><Image src={shots.range.src} alt="" fill priority sizes="(max-width: 900px) 100vw, 40vw" style={shotStyle(shots.range)} /><figcaption className="illustrative">Illustrative imagery</figcaption></figure>
            <figure className="hm-a"><Image src={shots.knitting.src} alt="" fill sizes="20vw" style={shotStyle(shots.knitting)} /></figure>
            <figure className="hm-b"><Image src={shots.measuring.src} alt="" fill sizes="20vw" style={shotStyle(shots.measuring)} /></figure>
          </div>
        </div>
      </section>

      {/* 2 — Figures */}
      <section className="figures" aria-label="GARWEVIA at a glance">
        <div className="wrap figures-grid">
          {figures.map(([n, label]) => <div key={label}><strong>{n}</strong><span>{label}</span></div>)}
        </div>
      </section>

      {/* 3 — Who we are */}
      <section className="sec">
        <div className="wrap story">
          <figure className="story-img"><Image src={shots.factoryWide.src} alt={shots.factoryWide.alt} fill sizes="(max-width: 900px) 100vw, 50vw" style={shotStyle(shots.factoryWide)} /><figcaption className="illustrative">Illustrative imagery</figcaption></figure>
          <div className="story-copy">
            <Kicker>Who we are</Kicker>
            <h2>One partner for the <em>whole garment</em> — fabric, trims and finish.</h2>
            <p>International buyers often juggle a knitting mill, a dye house, a garment factory and a dozen trim suppliers. GARWEVIA brings them together. Based in Tiruppur, India’s knitwear capital, we evaluate each product first, then select the manufacturing partners and accessory suppliers that fit it.</p>
            <p>You get one point of contact for costing, sampling, production follow-up, quality inspection and shipment — with clear communication at every stage.</p>
            <ul className="ticks">
              <li>Buyer-focused, not factory-focused</li>
              <li>Garments and accessories under one program</li>
              <li>On-ground quality oversight in Tiruppur</li>
            </ul>
            <Link className="text-link" href="/about">More about GARWEVIA <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* 4 — Knitwear */}
      <section className="sec sec-tint" id="knitwear">
        <div className="wrap">
          <SectionHead kicker="What we make · Knitwear" title="Knitwear for *every collection.*" intro="Private label and custom knitwear developed to your tech pack — from core T-shirts to fleece, babywear, activewear and underwear." link={['All knitwear', '/products']} />
          <div className="cat-grid">
            {categories.map(c => (
              <Link key={c.slug} href={'/products#' + c.slug} className="cat-card">
                <figure><Image src={c.shot.src} alt={c.shot.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 20vw" style={shotStyle(c.shot)} /><figcaption className="illustrative">Illustrative imagery</figcaption></figure>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.detail}</p>
                  <small>{c.fabrics.slice(0, 3).join(' · ')}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Accessories */}
      <section className="sec" id="accessories">
        <div className="wrap">
          <SectionHead kicker="What we make · Accessories & trims" title="The details that *finish the garment.*" intro="Labels, tags, closures, cords, badges and packaging — sourced to your brand standards, approved on a trim card and attached in production, or supplied as a standalone program." link={['All accessories', '/products#accessories']} />
          <AccessoryGrid limit={4} />
          <div className="inline-cta">
            <p>Need trims for an existing program? We source accessories on their own, too.</p>
            <Link className="btn btn-ghost" href={rfqHref('Accessories & trims')}>Request accessory costing <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* 6 — How we work */}
      <section className="sec sec-tint">
        <div className="wrap">
          <SectionHead kicker="How we work" title="From tech pack *to dispatch.*" intro="A documented sequence with checkpoints at every hand-over, so you always know where your order stands." link={['How it works', '/how-it-works']} />
          <Steps steps={process} />
        </div>
      </section>

      {/* 7 — Quality */}
      <section className="sec">
        <div className="wrap">
          <SectionHead kicker="Quality assurance" title="Quality managed *at every stage.*" intro="Inspection scope, test program and acceptance levels are agreed with each buyer and reported transparently." link={['Our quality framework', '/quality-assurance']} />
          <div className="feature-grid">
            {quality.map(([t, b, icon]) => (
              <article key={t} className="feature">
                <span className="feature-icon"><Icon name={icon} size={26} /></span>
                <h3>{t}</h3>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Certifications */}
      <section className="sec sec-tint" id="certifications">
        <div className="wrap">
          <SectionHead kicker="Certifications" title="Certified knitwear, *verified per program.*" intro="Where your program needs a certificate or audit, we source from manufacturing partners and suppliers that hold it — and check its scope and validity for your order." link={['Compliance & sustainability', '/compliance-sustainability']} />
          <CertGrid compact />
        </div>
      </section>

      {/* 9 — Why Tiruppur */}
      <section className="sec">
        <div className="wrap story story-rev">
          <Art className="story-art" label="Map of the Tiruppur knitwear cluster"><ClusterMap /></Art>
          <div className="story-copy">
            <Kicker>Why Tiruppur</Kicker>
            <h2>Rooted in <em>India’s knitwear capital.</em></h2>
            <p>Tiruppur brings yarn, knitting, dyeing, printing, embroidery, garmenting, trim suppliers and export logistics within a short drive of each other. That closeness shortens development, keeps costs competitive and lets us follow every stage in person.</p>
            <ul className="ticks">
              <li>Knitting, processing and garmenting in one cluster</li>
              <li>Local trim and packaging suppliers</li>
              <li>Export-ready logistics via Chennai, Tuticorin and Kochi ports</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section className="sec sec-tint" id="faq">
        <div className="wrap faq-grid">
          <div>
            <Kicker>Buyer questions</Kicker>
            <h2>Questions buyers <em>ask us.</em></h2>
            <p>MOQs, private label, accessories, certifications, quality and timelines — what international buyers want to know before sourcing from India.</p>
          </div>
          <Accordion items={faq.map(([title, body]) => ({ title, body }))} first={null} />
        </div>
        <JsonLd data={faqLd} />
      </section>

      {/* 11 — CTA */}
      <Cta />
    </>
  );
}
