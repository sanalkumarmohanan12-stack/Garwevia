import Link from 'next/link';
import { Arrow } from './components';
import { KnitIcon } from './art/Icons';
import { knitAccessories, programmes, rfqHref } from './catalog';

/** Knit-made accessories, drawn as icons (no stock photos — what the buyer gets is developed to brief). */
export function KnitAccessoryGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'knit-grid is-compact' : 'knit-grid'}>
      {knitAccessories.map(a => (
        <Link key={a.name} href={rfqHref('Knitted accessories', a.name)} className="knit-card">
          <span className="knit-icon"><KnitIcon name={a.icon} size={compact ? 36 : 44} /></span>
          <h3>{a.name}</h3>
          {!compact && <p>{a.note}</p>}
          {!compact && <small>Request costing <Arrow /></small>}
        </Link>
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
