import Image from 'next/image';
import Link from 'next/link';
import { Arrow, Cta, Kicker, Marquee } from './components';
import { Counter, HomeHero, HorizontalScroll, HoverList, Journey, ScrollHighlight } from './motion';
import { shotStyle } from './images';
import { categories, productCount } from './catalog';
import { flats, heroFlats } from './art/garments';
import { Art, ClusterMap, GarmentFlat, LabDips, Marker, NetworkHub, PomSheet, TechPackSheet, Timeline, WorldRoutes } from './art/Art';

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

export default function Home() {
  return (
    <>
      <HomeHero
        backdrop={<WorldRoutes labels={false} />}
        items={heroFlats.map(h => ({ word: h.word, name: flats[h.flat].name, drawing: <GarmentFlat name={h.flat} /> }))}
      />

      <Marquee words={['Knit', 'Cut', 'Sew', 'Print', 'Embroider', 'Inspect', 'Ship']} />

      <section className="statement">
        <div className="wrap">
          <Kicker>The GARWEVIA approach</Kicker>
          <ScrollHighlight text="Every product asks for something different. A great jersey T-shirt supplier may not be the right fit for technical activewear or baby essentials. We evaluate the garment, then find the manufacturer that fits it." />
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

      <HorizontalScroll>
        <div className="hs-intro">
          <p className="kicker">Product capabilities</p>
          <h2>Made for the way <em>brands build collections.</em></h2>
          <p>From everyday essentials to specialized programs, capabilities are matched to the requirements of each product.</p>
          <span className="hs-hint" aria-hidden="true"><span className="hs-hint-desk">Keep scrolling</span><span className="hs-hint-mob">Swipe</span> <Arrow /></span>
        </div>
        {categories.map((p, i) => (
          <Link key={p.name} href={'/products#' + p.slug} className="hs-card">
            <Image src={p.shot.src} alt={p.shot.alt} fill sizes="(max-width: 900px) 85vw, 34vw" style={shotStyle(p.shot)} />
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
      </HorizontalScroll>

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

      <Cta />
    </>
  );
}
