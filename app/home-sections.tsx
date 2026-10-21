/** Sections for the long-scroll home page: the end-to-end sourcing story in one place. */
import Link from 'next/link';
import { Arrow, Icon, LinkedInIcon, WhatsAppIcon, type IconName } from './components';
import { contact, mailHref } from './contact';
import { categories, rfqHref } from './catalog';
import { categorySpecs, commercial, styleSpecs } from './specs';
import { networkSections, qualitySteps } from './technical';

/* ---------- sticky in-page navigation ---------- */
const anchors: [string, string][] = [
  ['overview', 'Overview'], ['services', 'Services'], ['products', 'Products'], ['capabilities', 'Manufacturing'],
  ['workflow', 'Process'], ['quality', 'Quality'], ['certifications', 'Certifications'], ['engage', 'Working with us'], ['contact', 'Contact'],
];
export function SectionNav() {
  return (
    <nav className="h-nav" aria-label="On this page">
      <div className="wrap h-nav-inner">{anchors.map(([id, label]) => <a key={id} href={'#' + id}>{label}</a>)}</div>
    </nav>
  );
}

/* ---------- one partner vs many ---------- */
const vendors = ['Yarn spinner', 'Knitting unit', 'Dye house', 'Printer / embroiderer', 'Garment factory', 'Trim suppliers', 'Test laboratory', 'Freight forwarder'];
export function OnePartner() {
  return (
    <div className="op">
      <div className="op-col op-without">
        <p className="op-label">Without a sourcing partner</p>
        <div className="op-buyer">Your team</div>
        <ul>{vendors.map(v => <li key={v}>{v}</li>)}</ul>
        <p className="op-foot">8+ suppliers, contracts, time zones and quality standards to manage yourself.</p>
      </div>
      <div className="op-arrow" aria-hidden="true"><Arrow /></div>
      <div className="op-col op-with">
        <p className="op-label">With GARWEVIA</p>
        <div className="op-buyer">Your team</div>
        <div className="op-hub">GARWEVIA <small>one contract · one contact · one quality plan</small></div>
        <ul>{vendors.map(v => <li key={v}>{v}</li>)}</ul>
        <p className="op-foot">We select, coordinate and inspect every supplier — you approve the key decisions.</p>
      </div>
    </div>
  );
}

/* ---------- end-to-end services ---------- */
const services: { icon: IconName; title: string; body: string; points: string[] }[] = [
  { icon: 'brief', title: 'Product development', body: 'From sketch or tech pack to a production-ready style.', points: ['Tech pack & BOM support', 'Pattern & grading', 'Proto, fit, size set, PP'] },
  { icon: 'fabric', title: 'Fabric & yarn sourcing', body: 'The right yarn, knit and finish for your price point.', points: ['Yarn count & fibre selection', 'Knit structure & GSM', 'Lab dips & shade approval'] },
  { icon: 'tag', title: 'Trims & packaging', body: 'Every label, closure and carton sourced to your brand.', points: ['Woven labels & hang tags', 'Zips, snaps, drawcords', 'Polybags & export cartons'] },
  { icon: 'globe', title: 'Factory selection', body: 'Partners matched to product, capacity and compliance.', points: ['Capability & capacity check', 'Audit & certificate review', 'Cost & lead-time comparison'] },
  { icon: 'stitch', title: 'Production management', body: 'On-ground follow-up from cutting to finishing.', points: ['Time & action plan', 'Weekly status reports', 'Issue resolution on the floor'] },
  { icon: 'check', title: 'Quality assurance', body: 'Inspections and testing against your quality plan.', points: ['Inline & final AQL inspection', 'Third-party lab testing', 'Photo & measurement reports'] },
  { icon: 'layers', title: 'Compliance & certification', body: 'Credentials verified for your market and program.', points: ['GOTS, OEKO-TEX, GRS', 'WRAP, SMETA, amfori BSCI', 'CPSIA, REACH, RSL'] },
  { icon: 'ship', title: 'Logistics & shipping', body: 'Packed, documented and handed over on time.', points: ['FOB / CIF coordination', 'Export documentation', 'Consolidation & forwarding'] },
];
export function Services() {
  return (
    <div className="svc-grid">
      {services.map((s, i) => (
        <article key={s.title} className="svc">
          <div className="svc-top"><span className="svc-icon"><Icon name={s.icon} size={24} /></span><span className="svc-num">{String(i + 1).padStart(2, '0')}</span></div>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
          <ul>{s.points.map(p => <li key={p}>{p}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}

/* ---------- supply-chain flow diagram ---------- */
const chain: { icon: IconName; title: string; note: string }[] = [
  { icon: 'fabric', title: 'Yarn', note: 'Count, fibre, certified content' },
  { icon: 'layers', title: 'Knitting', note: 'Structure, gauge, GSM' },
  { icon: 'sample', title: 'Dyeing & finishing', note: 'Shade, shrinkage, hand feel' },
  { icon: 'print', title: 'Print & embroidery', note: 'Strike-off, cure, placement' },
  { icon: 'cut', title: 'Cutting & sewing', note: 'Marker, seams, measurements' },
  { icon: 'tag', title: 'Trims & packing', note: 'Trim card, labels, cartons' },
  { icon: 'check', title: 'Testing & QC', note: 'Lab tests, AQL inspection' },
  { icon: 'ship', title: 'Shipment', note: 'Documents, forwarder, FOB' },
];
export function SupplyChain() {
  return (
    <div className="sc">
      <div className="sc-bracket"><span>Managed end to end by GARWEVIA</span></div>
      <ol className="sc-flow">
        {chain.map((c, i) => (
          <li key={c.title}>
            <span className="sc-node"><Icon name={c.icon} size={22} /></span>
            <b>{String(i + 1).padStart(2, '0')} {c.title}</b>
            <small>{c.note}</small>
          </li>
        ))}
      </ol>
      <div className="sc-legend"><span><i className="sc-dot" /> Quality checkpoint at every hand-over</span><span><i className="sc-line" /> One accountable partner for the full chain</span></div>
    </div>
  );
}

/* ---------- product spec table ---------- */
function gsmRange(products: string[]) {
  const nums = products.flatMap(p => (styleSpecs[p]?.gsm ?? '').split(/[–-]/).map(Number)).filter(n => n > 0);
  return nums.length ? `${Math.min(...nums)}–${Math.max(...nums)}` : '—';
}
export function SpecTable() {
  return (
    <div className="spec-wrap">
      <table className="spec-table">
        <thead><tr><th scope="col">Category</th><th scope="col">Key styles</th><th scope="col">Fabrics</th><th scope="col">GSM</th><th scope="col">Sizes</th><th scope="col">Decoration</th><th scope="col"><span className="sr-only">Quote</span></th></tr></thead>
        <tbody>
          {categories.map(c => {
            const cs = categorySpecs[c.slug];
            return (
              <tr key={c.slug}>
                <th scope="row">{c.name}<small>{c.products.length} styles</small></th>
                <td>{c.products.slice(0, 4).join(', ')}…</td>
                <td>{c.fabrics.slice(0, 3).join(', ')}</td>
                <td className="spec-num">{gsmRange(c.products)}</td>
                <td>{cs?.sizes}</td>
                <td>{cs?.decoration}</td>
                <td><Link className="spec-link" href={rfqHref(c.name)}>Quote <Arrow /></Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="spec-note">MOQ: {commercial.moq}. Sampling: {commercial.sampling}. Bulk: {commercial.bulk}. {commercial.note} <Link href="/products">See all 55 styles with full specifications <Arrow /></Link></p>
    </div>
  );
}

/* ---------- manufacturing capabilities (chips, no clicks) ---------- */
export function Capabilities() {
  const pick = ['knit-capabilities', 'yarn-fibre', 'dyeing', 'printing', 'construction'];
  const titles: Record<string, string> = { 'knit-capabilities': 'Knit fabrics', 'yarn-fibre': 'Yarns & fibres', dyeing: 'Dyeing & finishing', printing: 'Printing & embellishment', construction: 'Garment construction' };
  const groups = networkSections.filter(s => pick.includes(s.id));
  return (
    <div className="capx">
      {groups.map(s => {
        const terms = (s.groups ?? []).flatMap(g => g.terms).filter(t => !/check|defect/i.test(t)).slice(0, 14);
        const items = s.items?.map(([t]) => t) ?? [];
        return (
          <div key={s.id} className="capx-col">
            <h3>{titles[s.id]}</h3>
            <ul>{[...items, ...terms].slice(0, 14).map(t => <li key={t}>{t}</li>)}</ul>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- quality gates ---------- */
export function QualityGates() {
  return (
    <ol className="qg">
      {qualitySteps.map(([t, b], i) => (
        <li key={t}><span>{String(i + 1).padStart(2, '0')}</span><div><b>{t}</b><small>{b}</small></div></li>
      ))}
    </ol>
  );
}

/* ---------- engagement models ---------- */
const models: { title: string; tag: string; body: string; points: string[] }[] = [
  { title: 'Full package', tag: 'End to end', body: 'We deliver finished, packed garments — fabric, trims, production, QC and shipping in one FOB price.', points: ['One price per piece', 'One contract & invoice', 'End-to-end accountability'] },
  { title: 'Development & sampling', tag: 'Start here', body: 'Turn an idea or tech pack into approved samples and a costed bill of materials.', points: ['Fabric & trim development', 'Proto to PP sample', 'Costing for bulk'] },
  { title: 'Sourcing & QC support', tag: 'For your own factories', body: 'On-ground merchandising, inspection and testing for programs you already run in India.', points: ['Factory audits', 'Inline & final inspection', 'Lab test coordination'] },
];
export function Engage() {
  return (
    <div className="eng">
      {models.map(m => (
        <article key={m.title} className="eng-card">
          <span className="eng-tag">{m.tag}</span>
          <h3>{m.title}</h3>
          <p>{m.body}</p>
          <ul>{m.points.map(p => <li key={p}>{p}</li>)}</ul>
          <Link className="btn btn-ghost" href="/start-a-project">Discuss this option <Arrow /></Link>
        </article>
      ))}
    </div>
  );
}

/* ---------- compliance chips ---------- */
export const compliance = ['CPSIA (US)', 'REACH (EU)', 'Prop 65 (California)', 'UKCA / UK REACH', 'Buyer RSL / MRSL', 'EN 14682 cords & drawstrings', '16 CFR 1610 flammability', 'Care labelling ISO 3758'];

/* ---------- contact block ---------- */
export function ContactBlock() {
  return (
    <div className="ctb">
      <div className="ctb-main">
        <p className="kicker">Contact</p>
        <h2>Tell us what you want to make.</h2>
        <p>Send a tech pack, a reference garment or just an idea. We reply with a manufacturing route, indicative costing and timeline.</p>
        <div className="hero-ctas"><Link className="btn btn-primary" href="/start-a-project">Send your brief <Arrow /></Link><a className="btn btn-ghost" href={contact.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> WhatsApp us</a></div>
      </div>
      <div className="ctb-side">
        <a href={mailHref('Sourcing enquiry')}><Icon name="mail" /><span><small>Email</small>{contact.email}</span></a>
        <a href={contact.phoneHref}><Icon name="phone" /><span><small>Phone</small>{contact.phone}</span></a>
        <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer"><Icon name="pin" /><span><small>Office</small>{contact.address.join(', ')}</span></a>
        {contact.linkedin
          ? <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon /><span><small>LinkedIn</small>Follow GARWEVIA</span></a>
          : <span className="ctb-pending"><LinkedInIcon /><span><small>LinkedIn</small>Coming soon</span></span>}
      </div>
    </div>
  );
}
