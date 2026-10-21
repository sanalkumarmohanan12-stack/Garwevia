import Image from 'next/image';
import Link from 'next/link';
import { Arrow, Icon } from './components';
import { KnitIcon } from './art/Icons';
import { knitAccessories, programmes, rfqHref } from './catalog';
import { accessories } from './range';
import { productImage } from './product-images';

/** Photo when one has been added for this product, otherwise a drawn icon on a soft tile. */
function Thumb({ name, children, sizes }: { name: string; children: React.ReactNode; sizes: string }) {
  const src = productImage(name);
  return (
    <figure className={src ? 'thumb has-photo' : 'thumb'}>
      {src ? <Image src={src} alt={name} fill sizes={sizes} /> : children}
    </figure>
  );
}

/** Knit-made accessories with photos (or icons until photos are added). */
export function KnitAccessoryGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'knit-grid is-compact' : 'knit-grid'}>
      {knitAccessories.map(a => (
        <Link key={a.name} href={rfqHref('Knitted accessories', a.name)} className="knit-card">
          <Thumb name={a.name} sizes="(max-width: 700px) 50vw, 16vw"><span className="knit-icon"><KnitIcon name={a.icon} size={compact ? 36 : 44} /></span></Thumb>
          <h3>{a.name}</h3>
          {!compact && <p>{a.note}</p>}
          {!compact && <small>Request costing <Arrow /></small>}
        </Link>
      ))}
    </div>
  );
}

/** Garment trims & packaging, one card per family. `limit` shows the first n items per card. */
export function AccessoryGrid({ limit }: { limit?: number }) {
  return (
    <div className="trim-grid">
      {accessories.map(g => (
        <article key={g.name} className="trim-card">
          <Thumb name={g.name} sizes="(max-width: 700px) 100vw, 25vw"><span className="trim-icon"><Icon name={g.icon} size={30} /></span></Thumb>
          <h3>{g.name}</h3>
          <p>{g.intro}</p>
          <ul>{(limit ? g.items.slice(0, limit) : g.items).map(i => <li key={i}>{i}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}

export function Programmes() {
  return (
    <div className="programmes">
      {programmes.map(([t, b]) => <div key={t}><h3>{t}</h3><p>{b}</p></div>)}
    </div>
  );
}
