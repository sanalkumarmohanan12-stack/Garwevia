'use client';
import { useState } from 'react';

/** Searchable knitwear glossary, grouped by first letter. */
export function Glossary({ items }: { items: [string, string][] }) {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const shown = items
    .filter(([t, d]) => !query || t.toLowerCase().includes(query) || d.toLowerCase().includes(query))
    .sort((a, b) => a[0].localeCompare(b[0]));
  const letters = [...new Set(shown.map(([t]) => t[0].toUpperCase()))];
  return (
    <div className="gloss">
      <label className="gloss-search">
        <span>Search {items.length} terms</span>
        <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="e.g. spirality, AQL, GOTS" />
      </label>
      {shown.length === 0 && <p className="gloss-empty">No terms match “{q}”.</p>}
      {letters.map(l => (
        <section key={l} className="gloss-letter">
          <h2>{l}</h2>
          <dl>
            {shown.filter(([t]) => t[0].toUpperCase() === l).map(([t, d]) => (
              <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
