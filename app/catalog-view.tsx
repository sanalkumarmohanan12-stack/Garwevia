import Image from 'next/image';
import Link from 'next/link';
import { Arrow, Icon } from './components';
import { shotStyle } from './images';
import { rfqHref, type Category } from './catalog';
import { categorySpecs, commercial, specFor } from './specs';

/** Indicative commercial terms, shown once at the top of the Products page. */
export function AtAGlance() {
  const items: [string, string, 'layers' | 'sample' | 'ship'][] = [
    ['Minimum order', commercial.moq, 'layers'],
    ['Sampling', commercial.sampling, 'sample'],
    ['Bulk production', commercial.bulk, 'ship'],
  ];
  return (
    <div className="wrap glance">
      {items.map(([t, v, icon]) => (
        <div key={t}><span className="glance-icon"><Icon name={icon} /></span><div><small>{t}</small><p>{v}</p></div></div>
      ))}
      <p className="glance-note">{commercial.note}</p>
    </div>
  );
}

/** One category: photo + category specification, then a spec card for every style. */
export function CategoryBlock({ c, index, total }: { c: Category; index: number; total: number }) {
  const cs = categorySpecs[c.slug];
  return (
    <section id={c.slug} className="pcat">
      <div className="wrap">
        <div className="pcat-head">
          <figure className="pcat-media">
            <Image src={c.shot.src} alt={c.shot.alt} fill sizes="(max-width: 900px) 100vw, 42vw" style={shotStyle(c.shot)} />
            <figcaption className="illustrative">Illustrative imagery</figcaption>
          </figure>
          <div className="pcat-copy">
            <p className="pcat-index">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {c.products.length} styles</p>
            <h2>{c.name}</h2>
            <p className="pcat-intro">{c.intro}</p>
            {cs && (
              <dl className="pcat-spec">
                <div><dt>Sizes</dt><dd>{cs.sizes}</dd></div>
                <div><dt>Fits</dt><dd>{cs.fits}</dd></div>
                <div><dt>Fabrics</dt><dd>{c.fabrics.join(', ')}</dd></div>
                <div><dt>Decoration</dt><dd>{cs.decoration}</dd></div>
                <div><dt>Finishes</dt><dd>{cs.finishes}</dd></div>
                <div><dt>Key tests</dt><dd>{cs.tests}</dd></div>
              </dl>
            )}
            <Link className="btn btn-primary" href={rfqHref(c.name)}>Quote this category <Arrow /></Link>
          </div>
        </div>
        <ul className="style-grid">
          {c.products.map(p => {
            const s = specFor(p);
            return (
              <li key={p} className="style-card">
                <h3>{p}</h3>
                <div className="style-meta">
                  <span><small>Fabric</small>{s.fabric}</span>
                  <span><small>Weight</small>{s.gsm} GSM</span>
                </div>
                <ul className="style-details">{s.details.map(d => <li key={d}>{d}</li>)}</ul>
                <Link className="style-cta" href={rfqHref(c.name, p)}>Request costing <Arrow /></Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
