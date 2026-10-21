'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Arrow, Icon, Kicker, type IconName } from './components';

type Step = { phase: number; title: string; body: string; check: string; gate?: string; icon: IconName };

const phases = ['Plan', 'Develop', 'Produce', 'Deliver'];

const steps: Step[] = [
  { phase: 0, icon: 'brief', title: 'Brief review', body: 'Tech pack, references, quantities, target FOB, market and required standards reviewed with your team.', check: 'Quality manual and test plan agreed' },
  { phase: 0, icon: 'layers', title: 'Costing', body: 'Fabric consumption, processes, trims and freight assumptions costed — nothing hidden in the FOB.', check: 'Fabric and trim specs confirmed' },
  { phase: 0, icon: 'globe', title: 'Partner match', body: 'Knitting, dyeing, decoration and garment partners selected for this product, capacity and compliance.', check: 'Certificates and audit status verified', gate: 'Quote & route approved' },
  { phase: 1, icon: 'fabric', title: 'Fabric & trims', body: 'Lab dips, yarn and GSM trials, print strike-offs and a physical trim card for sign-off.', check: 'Shade ΔE, GSM, shrinkage, colourfastness' },
  { phase: 1, icon: 'sample', title: 'Proto & fit', body: 'Proto and fit samples measured against your POM spec and corrected until they fit.', check: 'Measurement audit vs tolerance' },
  { phase: 1, icon: 'tag', title: 'Size set & PP', body: 'Graded size set and pre-production sample in bulk fabric and trims.', check: 'PP sample sealed as the bulk standard', gate: 'PP sample sealed' },
  { phase: 2, icon: 'fabric', title: 'Knit & dye', body: 'Bulk yarn knitted, dyed, compacted and inspected roll by roll before release to cutting.', check: '4-point fabric inspection, lab tests' },
  { phase: 2, icon: 'cut', title: 'Cutting', body: 'Relaxed fabric laid and cut by shade lot to the graded marker.', check: 'Panel and shade-lot control' },
  { phase: 2, icon: 'print', title: 'Print & embellish', body: 'Screen print, embroidery or heat transfer to the approved strike-off.', check: 'Placement, cure and wash durability' },
  { phase: 2, icon: 'stitch', title: 'Sew & finish', body: 'Assembly, trims, pressing and needle control, with inline inspection on the line.', check: 'Inline / DUPRO inspection report', gate: 'Inline report shared' },
  { phase: 3, icon: 'check', title: 'Final inspection', body: 'Final random inspection of packed goods to the agreed AQL, with measurements and photos.', check: 'AQL sampling to ISO 2859-1' },
  { phase: 3, icon: 'ship', title: 'Pack & ship', body: 'Folded, labelled and cartoned to your packing list, documented and handed to your forwarder.', check: 'Carton, assortment and documents audit', gate: 'Shipment released' },
];

const STEP_MS = 2600;

export function Workflow({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setActive(n => (n + 1) % steps.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  const s = steps[active];
  const pct = (active / (steps.length - 1)) * 100;

  return (
    <div className={compact ? 'wf wf-compact' : 'wf'} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {!compact && (
        <div className="wf-head">
          <div>
            <Kicker>The complete process</Kicker>
            <h2>From your brief <em>to shipment.</em></h2>
          </div>
          <p>Twelve managed steps in four phases. Quality checks run at every stage, and nothing moves to the next phase until you approve it.</p>
        </div>
      )}

      <div className="wf-board">
        {/* phase bands */}
        <div className="wf-phases" aria-hidden="true">
          {phases.map((p, i) => (
            <span key={p} className={s.phase === i ? 'is-active' : s.phase > i ? 'is-done' : ''} style={{ gridColumn: `span ${steps.filter(x => x.phase === i).length}` }}>
              <b>{String(i + 1).padStart(2, '0')}</b> {p}
            </span>
          ))}
        </div>

        {/* rail with travelling garment */}
        <div className="wf-rail" aria-hidden="true">
          <i className="wf-rail-fill" style={{ width: pct + '%' }} />
          <span className="wf-token" style={{ left: pct + '%' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M8 4 4 7l2 4 2-1v10h8V10l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4Z" /></svg>
          </span>
        </div>

        <ol className="wf-steps">
          {steps.map((st, i) => (
            <li key={st.title} className={(i === active ? 'is-active' : i < active ? 'is-done' : '') + (st.gate ? ' has-gate' : '')}>
              <button type="button" onClick={() => { setActive(i); setPaused(true); }} onFocus={() => { setActive(i); setPaused(true); }} aria-current={i === active ? 'step' : undefined}>
                <span className="wf-node"><Icon name={st.icon} size={20} /></span>
                <span className="wf-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="wf-title">{st.title}</span>
              </button>
              {st.gate && <span className="wf-gate" title={'Buyer approval: ' + st.gate}><span className="wf-gate-mark" aria-hidden="true" />{st.gate}</span>}
              {/* mobile: detail inline */}
              <div className="wf-inline">
                <p>{st.body}</p>
                <p className="wf-check"><Icon name="check" size={16} /> {st.check}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* desktop: detail of the active step */}
        <div className="wf-detail" aria-live="polite" key={active}>
          <div className="wf-detail-main">
            <span className="wf-detail-step">Step {String(active + 1).padStart(2, '0')} · {phases[s.phase]}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
          <div className="wf-detail-side">
            <div><small>Quality check</small><p><Icon name="check" size={18} /> {s.check}</p></div>
            <div><small>You approve</small><p>{s.gate ?? (steps.slice(active).find(x => x.gate)?.gate + ' (end of phase)')}</p></div>
          </div>
        </div>
      </div>

      <div className="wf-foot">
        <span>Hover to pause, or tap any step · sequence adapted to each product and buyer manual.</span>
        {!compact && <Link className="text-link" href="/how-it-works">See every step in detail <Arrow /></Link>}
      </div>
    </div>
  );
}
