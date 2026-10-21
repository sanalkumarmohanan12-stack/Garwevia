import Link from 'next/link';
import { Arrow } from './components';
import { QualityIcon } from './art/Icons';
import { standards, standardsNote } from './quality';

/** Home: one tile per standards group with its headline methods. */
export function StandardsOverview() {
  return (
    <div className="std-overview">
      {standards.map(g => (
        <Link key={g.id} href={'/quality-assurance#std-' + g.id} className="std-tile">
          <span className="std-icon"><QualityIcon name={g.icon} size={30} /></span>
          <h3>{g.name}</h3>
          <p>{g.summary}</p>
          <ul>{g.tests.slice(0, 3).map(t => <li key={t.test}>{t.test}<small>{t.iso ?? t.alt}</small></li>)}</ul>
          <span className="std-more">{g.tests.length} checks <Arrow /></span>
        </Link>
      ))}
    </div>
  );
}

/** Quality page: the full reference, one table per group. */
export function StandardsTable() {
  return (
    <div className="std-full">
      <nav className="std-jump" aria-label="Standards groups">
        {standards.map(g => <a key={g.id} href={'#std-' + g.id}><QualityIcon name={g.icon} size={20} /> {g.name}</a>)}
      </nav>
      {standards.map(g => (
        <section key={g.id} id={'std-' + g.id} className="std-group">
          <header>
            <span className="std-icon"><QualityIcon name={g.icon} size={30} /></span>
            <div><h3>{g.name}</h3><p>{g.summary}</p></div>
          </header>
          <div className="std-table-wrap">
            <table className="std-table">
              <thead><tr><th scope="col">Test / check</th><th scope="col">ISO method</th><th scope="col">AATCC · ASTM · other</th><th scope="col">Why it matters</th></tr></thead>
              <tbody>
                {g.tests.map(t => (
                  <tr key={t.test}>
                    <th scope="row">{t.test}</th>
                    <td>{t.iso ?? '—'}</td>
                    <td>{t.alt ?? '—'}</td>
                    <td>{t.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      <p className="std-note">{standardsNote}</p>
    </div>
  );
}
