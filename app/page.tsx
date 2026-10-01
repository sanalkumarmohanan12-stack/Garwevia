import Image from 'next/image';
import Link from 'next/link';
import { Arrow, Cta, JsonLd, Kicker, Marquee, PhotoWall } from './components';
import type { Metadata } from 'next';
import { Accordion, Carousel, Counter, HoverList, Journey, ScrollHighlight, Workflow, type Stage } from './motion';
import { faq, faqLd, seo } from './seo';
import { shots, shotStyle, type Shot } from './images';
import { categories, productCount } from './catalog';
import { Art, ClusterMap, LabDips, Marker, NetworkHub, PomSheet, TechPackSheet, Timeline, WorldRoutes } from './art/Art';

// Hero wall: product flat-lays mixed with the making of them, cropped to different details per tile.
const at = (s: Shot, focus: string, zoom?: number): Shot => ({ ...s, focus, zoom });
const heroWall: Shot[][] = [
  [at(shots.range, '12% 50%'), shots.sewingLines, shots.kids, at(shots.cutting, '20% 50%')],
  [shots.tops, shots.fleece, shots.measuring, at(shots.women, '30% 50%')],
  [at(shots.range, '52% 50%'), shots.knitting, shots.performance, shots.kidsPrint],
  [shots.women, at(shots.fleece, '80% 50%'), shots.fabricStacks, at(shots.range, '88% 50%')],
  [at(shots.performance, '75% 50%'), shots.packing, at(shots.kids, '20% 50%'), shots.seamstress],
];

// What physically happens to the garment — shown as the hero workflow.
const stages: Stage[] = [
  { icon: 'pack', title: 'Tech pack', body: 'Specs, BOM, POM chart and target FOB are reviewed; fabric, GSM and trims are confirmed with you.' },
  { icon: 'sample', title: 'Sampling', body: 'Proto and fit samples, then size set and PP sample — corrected until you approve.' },
  { icon: 'fabric', title: 'Knitting & dyeing', body: 'Yarn is circular-knitted to the agreed GSM, dyed to the approved lab dip, then compacted and inspected.' },
  { icon: 'cut', title: 'Cutting', body: 'Relaxed fabric is laid, marked to the graded pattern and cut with shade-lot control.' },
  { icon: 'stitch', title: 'Sewing', body: 'Overlock, flatlock and cover-stitch operations on lines set up for your garment.' },
  { icon: 'print', title: 'Print & embellish', body: 'Screen, water-based or puff prints and embroidery — checked for placement, cure and wash durability.' },
  { icon: 'check', title: 'Quality inspection', body: 'Inline checks, measurement audits and a final random inspection to the agreed AQL.' },
  { icon: 'ship', title: 'Packing & dispatch', body: 'Folded, polybagged and cartoned to your packing list, with shipping marks — then released.' },
];

const journey = [
  { title: 'Your brief', body: 'Upload a tech pack, reference image or product brief.' },
  { title: 'Evaluation', body: 'We evaluate specifications, fabric, colour, quantity, timelines and compliance needs.' },
  { title: 'Factory match', body: 'Suitable manufacturing partners are shortlisted for your product.' },
  { title: 'Costing & sampling', body: 'Commercial options are clarified and samples move toward approval.' },
  { title: 'Production', body: 'Manufacturing begins after commercial and sample approvals, with on-ground follow-up.' },
  { title: 'Quality control', body: 'Inspections follow the quality plan agreed with you.' },
  { title: 'Shipment', body: 'Packing, documentation and logistics are coordinated.' },
];
// One drawing per journey step, shown in the pinned column as the step becomes active.
const journeyArt = [<TechPackSheet key="1" />, <LabDips key="2" />, <NetworkHub key="3" />, <Marker key="4" />, <Timeline key="5" />, <PomSheet key="6" />, <WorldRoutes key="7" />];

const reasons = [
  { title: 'Local presence', body: 'Based directly in Tiruppur, close to the people making your product.', visual: <ClusterMap /> },
  { title: 'Curated manufacturing', body: 'Partner factories selected to suit each product and project.', visual: <NetworkHub /> },
  { title: 'Transparent coordination', body: 'Clear communication on costing, timelines and decisions.', visual: <TechPackSheet flat="tee" /> },
  { title: 'Production visibility', body: 'On-ground follow-up as your order moves through manufacturing.', visual: <Timeline /> },
  { title: 'Quality oversight', body: 'Inspection and reporting aligned to an agreed quality plan.', visual: <PomSheet /> },
];
const stats: [number, string, string][] = [[productCount, '', 'Product types'], [7, '', 'Stages managed'], [11, '', 'QC checkpoints'], [1, '', 'Accountable partner']];

export const metadata: Metadata = {
  title: { absolute: seo.home.title },
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <PhotoWall columns={heroWall} className="wall-home">
        <p className="kicker">Tiruppur, India · Apparel sourcing &amp; manufacturing</p>
        <h1 className="wall-title">Your apparel, <em>made right in India.</em></h1>
        <p className="wall-lede">We match your product to the right manufacturer in India — and follow it through every stage, from tech pack to dispatch.</p>
        <Workflow stages={stages} />
        <ul className="hero-facts">{['Based in Tiruppur', `${productCount} product types`, 'One accountable partner'].map(f => <li key={f}>{f}</li>)}</ul>
      </PhotoWall>

      <Marquee words={['Knit', 'Cut', 'Sew', 'Print', 'Embroider', 'Inspect', 'Ship']} />

      <section className="statement">
        <div className="wrap">
          <Kicker>The GARWEVIA approach</Kicker>
          <ScrollHighlight text="We understand garments technically, not only commercially. Product knowledge, manufacturing access, technical quality control, compliance awareness and on-ground execution — so you can make knitted apparel in India with greater visibility and control." />
          <div className="stats">
            {stats.map(([n, suffix, label]) => (
              <div key={label} className="stat" data-reveal>
                <strong><Counter to={n} suffix={suffix} /></strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <Link className="text-cta" href="/manufacturing-network" data-reveal>Explore the network <Arrow /></Link>
        </div>
      </section>

      <Carousel
        label="Product capabilities"
        head={
          <>
            <Kicker>Product capabilities</Kicker>
            <h2 data-reveal>Made for the way <em>brands build collections.</em></h2>
            <p data-reveal>From everyday essentials to specialized programs, capabilities are matched to the requirements of each product.</p>
          </>
        }
      >
        {categories.map((p, i) => (
          <Link key={p.name} href={'/products#' + p.slug} className="hs-card">
            {/* Eager: cards slide in horizontally, so lazy-loading would pop images in mid-scroll. */}
            <Image src={p.shot.src} alt={p.shot.alt} fill loading="eager" sizes="(max-width: 900px) 85vw, 34vw" style={shotStyle(p.shot)} />
            <span className="hs-shade" />
            <span className="hs-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="hs-info">
              <span className="hs-name">{p.name}</span>
              <span className="hs-detail">{p.detail}</span>
            </span>
            <span className="hs-go"><Arrow /></span>
          </Link>
        ))}
        <Link href="/products" className="hs-end">
          <span className="hs-end-num">{productCount}</span>
          <span>product types in the catalogue</span>
          <span className="pill pill-sand">Explore all products <span className="pill-dot" /></span>
        </Link>
      </Carousel>

      <section className="journey-section">
        <div className="wrap">
          <Kicker>How it works</Kicker>
          <Journey title={<>From brief <em>to bulk.</em></>} steps={journey} visuals={journeyArt} />
        </div>
      </section>

      <section className="why">
        <div className="wrap">
          <div className="why-head">
            <div>
              <Kicker>Why GARWEVIA</Kicker>
              <h2 data-reveal>Your team <em>on the ground.</em></h2>
            </div>
            <p data-reveal>Overseas manufacturing has many moving parts. We give you one accountable point of coordination in India, from the first brief to the final shipment.</p>
          </div>
          <HoverList items={reasons} />
        </div>
      </section>

      <section className="source">
        <div className="wrap source-grid">
          <div className="source-copy">
            <Kicker>Rooted at the source</Kicker>
            <blockquote data-reveal>“Your suppliers may be thousands of kilometres away from you. <em>They are not far from us.</em>”</blockquote>
            <p data-reveal>GARWEVIA is headquartered in Tiruppur, one of India’s established knitwear manufacturing clusters. Being here puts our team close to knitting, processing, printing, sewing, finishing, testing and logistics — and within reach of the ports that ship your order.</p>
            <Link className="text-cta" href="/about" data-reveal>Why Tiruppur <Arrow /></Link>
          </div>
          <Art className="source-map" label="Map of India locating the Tiruppur knitwear cluster and nearby ports and airports"><ClusterMap /></Art>
        </div>
        <span className="coords" aria-hidden="true">11.11° N · 77.34° E<br />Tiruppur, Tamil Nadu</span>
      </section>

      <section className="faq" id="faq">
        <div className="wrap faq-grid">
          <div>
            <Kicker>Buyer questions</Kicker>
            <h2 data-reveal>Questions buyers <em>ask us.</em></h2>
            <p data-reveal>MOQs, private label, certifications, quality and timelines — the things international buyers want to know before sourcing knitwear from India.</p>
          </div>
          <Accordion items={faq.map(([title, body]) => ({ title, body }))} />
        </div>
        <JsonLd data={faqLd} />
      </section>

      <Cta />
    </>
  );
}
