'use client';
import { useState } from 'react';

/** Numbered accordion (FAQ, service lists). The only animated element is the panel opening. */
export function Accordion({ items, first = 0 }: { items: { title: string; body: string }[]; first?: number | null }) {
  const [open, setOpen] = useState<number | null>(first);
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title} className={isOpen ? 'acc-item is-open' : 'acc-item'}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={'acc-' + i} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="acc-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="acc-title">{it.title}</span>
                <span className="acc-icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={'acc-' + i} className="acc-panel" role="region" hidden={!isOpen}>
              <p>{it.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
