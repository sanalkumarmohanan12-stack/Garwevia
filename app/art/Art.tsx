/**
 * GARWEVIA illustration system: tech-pack / blueprint line art rendered as inline SVG.
 * Server components — geometry is computed at build time; motion is pure CSS (globals.css, "Art").
 */
import { flats, type Callout, type Dim, type Flat } from './garments';
import { INDIA, WORLD, indiaDots, project, worldDots } from './geo';

type Pt = [number, number];
const P = (p: Pt) => `${p[0]} ${p[1]}`;

/** Wrapper: blueprint grid backdrop; reveals + draws when scrolled into view. */
export function Art({ children, className = '', reveal = true, label }: { children: React.ReactNode; className?: string; reveal?: boolean; label: string }) {
  return (
    <div className={'art ' + className} role="img" aria-label={label} {...(reveal ? { 'data-reveal': true } : {})}>
      {children}
    </div>
  );
}

function DimLine({ d }: { d: Dim }) {
  const [a, b] = [d.from, d.to];
  const vertical = a[0] === b[0];
  const o = d.offset ?? 0;
  const A: Pt = vertical ? [a[0] + o, a[1]] : [a[0], a[1] + o];
  const B: Pt = vertical ? [b[0] + o, b[1]] : [b[0], b[1] + o];
  const tick = (p: Pt) => (vertical ? `M${p[0] - 6} ${p[1]}h12` : `M${p[0]} ${p[1] - 6}v12`);
  const mid: Pt = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  return (
    <g className="a-dim a-fade">
      <path d={`M${P(A)}L${P(B)}${tick(A)}${tick(B)}`} />
      <path className="a-arrow" d={vertical ? `M${A[0] - 4} ${A[1] + 8}L${A[0]} ${A[1]}L${A[0] + 4} ${A[1] + 8}M${B[0] - 4} ${B[1] - 8}L${B[0]} ${B[1]}L${B[0] + 4} ${B[1] - 8}` : `M${A[0] + 8} ${A[1] - 4}L${A[0]} ${A[1]}L${A[0] + 8} ${A[1] + 4}M${B[0] - 8} ${B[1] - 4}L${B[0]} ${B[1]}L${B[0] - 8} ${B[1] + 4}`} />
      <text className="a-lbl a-lbl-sand" x={mid[0]} y={mid[1]} dy={vertical ? 0 : -9} textAnchor="middle" transform={vertical ? `rotate(-90 ${mid[0]} ${mid[1]}) translate(0 -9)` : undefined}>{d.label}</text>
    </g>
  );
}

function CalloutMark({ c }: { c: Callout }) {
  const right = c.to[0] > 200;
  const elbow: Pt = [c.to[0] + (right ? -24 : 24), c.to[1]];
  return (
    <g className="a-fade">
      <path className="a-lead" d={`M${P(c.at)}L${P(elbow)}L${P(c.to)}`} />
      <circle className="a-node" cx={c.at[0]} cy={c.at[1]} r="3.5" />
      <text className="a-lbl" x={c.to[0] + (right ? 8 : -8)} y={c.to[1]} dy="4" textAnchor={right ? 'start' : 'end'}>{c.label}</text>
    </g>
  );
}

/** One technical flat, optionally annotated with callouts and dimension lines. */
export function GarmentFlat({ name, annotate = true, children, viewBox = '-120 -60 740 500' }: { name: keyof typeof flats; annotate?: boolean; children?: React.ReactNode; viewBox?: string }) {
  const f: Flat = flats[name];
  return (
    <svg className="art-svg" viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
      {f.outline.map((d, i) => <path key={'o' + i} className="a-shape a-drawn" d={d} pathLength={1} />)}
      {f.seams.map((d, i) => <path key={'s' + i} className="a-seam a-drawn" d={d} pathLength={1} />)}
      <g className="a-fade">
        {f.stitches.map((d, i) => <path key={'t' + i} className="a-stitch" d={d} />)}
        {f.dots?.map(([x, y, r], i) => <circle key={'d' + i} className="a-shape" cx={x} cy={y} r={r} />)}
      </g>
      {annotate && f.dims.map((d, i) => <DimLine key={'m' + i} d={d} />)}
      {annotate && f.callouts.map((c, i) => <CalloutMark key={'c' + i} c={c} />)}
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ Maps */

const TIRUPPUR: Pt = [77.34, 11.11];
const markets: { name: string; at: Pt; anchor?: 'start' | 'end' }[] = [
  { name: 'Los Angeles', at: [-118.2, 34], anchor: 'start' },
  { name: 'New York', at: [-74, 40.7], anchor: 'end' },
  { name: 'Toronto', at: [-79.4, 43.7], anchor: 'end' },
  { name: 'London', at: [-0.1, 51.5], anchor: 'end' },
  { name: 'Amsterdam', at: [4.9, 52.4], anchor: 'start' },
  { name: 'Dubai', at: [55.3, 25.2], anchor: 'end' },
  { name: 'Tokyo', at: [139.7, 35.7], anchor: 'start' },
  { name: 'Sydney', at: [151.2, -33.9], anchor: 'start' },
];

function arc(a: Pt, b: Pt, lift = 0.3) {
  const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return `M${P(a)}Q${mid[0].toFixed(1)} ${(mid[1] - dist * lift).toFixed(1)} ${P(b)}`;
}

/** Dotted world map with animated routes from Tiruppur to buyer markets. */
export function WorldRoutes({ labels = true }: { labels?: boolean }) {
  const origin = project(WORLD, ...TIRUPPUR);
  return (
    <svg className="art-svg" viewBox={`0 0 ${WORLD.w} ${WORLD.h}`} preserveAspectRatio="xMidYMid meet">
      <path className="a-dots" d={worldDots} />
      {markets.map((m, i) => {
        const to = project(WORLD, ...m.at);
        const d = arc(origin, to, m.at[0] < 0 ? 0.22 : 0.35);
        return (
          <g key={m.name}>
            <path className="a-route-base" d={d} />
            <path className="a-route" d={d} style={{ animationDelay: `${i * -0.4}s` }} />
            <circle className="a-traveller" r="3.5">
              <animateMotion dur={`${5 + (i % 3)}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
            </circle>
            <circle className="a-market" cx={to[0]} cy={to[1]} r="4" />
            {labels && <text className="a-lbl a-lbl-map" x={to[0] + (m.anchor === 'end' ? -10 : 10)} y={to[1]} dy="4" textAnchor={m.anchor}>{m.name}</text>}
          </g>
        );
      })}
      <circle className="a-pulse" cx={origin[0]} cy={origin[1]} r="10" />
      <circle className="a-origin" cx={origin[0]} cy={origin[1]} r="6" />
      {labels && <text className="a-lbl a-lbl-sand a-lbl-map" x={origin[0] + 12} y={origin[1] + 22}>Tiruppur</text>}
    </svg>
  );
}

const hubs: { name: string; at: Pt; kind: string; dx: number; dy: number; anchor: 'start' | 'end' }[] = [
  { name: 'Kochi', at: [76.27, 9.97], kind: 'Port', dx: -40, dy: 5, anchor: 'end' },
  { name: 'Tuticorin', at: [78.13, 8.76], kind: 'Port', dx: -40, dy: 26, anchor: 'end' },
  { name: 'Chennai', at: [80.29, 13.08], kind: 'Port', dx: 16, dy: -10, anchor: 'start' },
];
const cluster = ['Knitting', 'Dyeing', 'Printing', 'Embroidery', 'Sewing', 'Testing'];

/** India dot map locating the Tiruppur knitwear cluster, nearby ports, and cluster capabilities. */
export function ClusterMap() {
  const t = project(INDIA, ...TIRUPPUR);
  const inset: Pt = [500, 560];
  return (
    <svg className="art-svg" viewBox="-20 -10 720 700" preserveAspectRatio="xMidYMid meet">
      <path className="a-dots a-dots-india" d={indiaDots} />
      {hubs.map(h => {
        const p = project(INDIA, ...h.at);
        return (
          <g key={h.name} className="a-fade">
            <path className="a-route a-route-slow" d={`M${P(t)}L${P(p)}`} />
            <rect className="a-hub" x={p[0] - 4} y={p[1] - 4} width="8" height="8" />
            <path className="a-lead" d={`M${P(p)}L${p[0] + h.dx - (h.anchor === 'end' ? -4 : 4)} ${p[1] + h.dy - 4}`} />
            <text className="a-lbl" x={p[0] + h.dx} y={p[1] + h.dy} textAnchor={h.anchor}>{h.name}<tspan className="a-lbl-dim"> · {h.kind}</tspan></text>
          </g>
        );
      })}
      <path className="a-lead a-fade" d={`M${P(t)}L${inset[0] - 80} ${inset[1] - 10}`} />
      <g className="a-fade">
        <circle className="a-ring" cx={inset[0]} cy={inset[1]} r="80" />
        <circle className="a-ring a-ring-dash" cx={inset[0]} cy={inset[1]} r="52" />
        <text className="a-lbl a-lbl-sand" x={inset[0]} y={inset[1] - 4} textAnchor="middle">Tiruppur</text>
        <text className="a-lbl a-lbl-dim" x={inset[0]} y={inset[1] + 12} textAnchor="middle">knitwear cluster</text>
        {cluster.map((c, i) => {
          const ang = (-90 + i * 60) * (Math.PI / 180);
          const n: Pt = [inset[0] + Math.cos(ang) * 80, inset[1] + Math.sin(ang) * 80];
          const l: Pt = [inset[0] + Math.cos(ang) * 98, inset[1] + Math.sin(ang) * 98];
          return (
            <g key={c}>
              <circle className="a-node" cx={n[0]} cy={n[1]} r="4" />
              <text className="a-lbl" x={l[0]} y={l[1]} dy="4" textAnchor={Math.abs(Math.cos(ang)) < 0.2 ? 'middle' : Math.cos(ang) > 0 ? 'start' : 'end'}>{c}</text>
            </g>
          );
        })}
      </g>
      <circle className="a-pulse" cx={t[0]} cy={t[1]} r="9" />
      <circle className="a-origin" cx={t[0]} cy={t[1]} r="6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ Diagrams */

const capabilities = ['Knitting', 'Dyeing & processing', 'Printing', 'Embroidery', 'Cutting & sewing', 'Finishing & packing', 'Testing', 'Logistics'];

/** Buyer → GARWEVIA → capability partners. */
export function NetworkHub() {
  const c: Pt = [300, 330];
  const brand: Pt = [300, 50];
  return (
    <svg className="art-svg" viewBox="-40 0 680 640" preserveAspectRatio="xMidYMid meet">
      <circle className="a-ring a-ring-dash" cx={c[0]} cy={c[1]} r="190" />
      <circle className="a-ring" cx={c[0]} cy={c[1]} r="262" />
      {capabilities.map((name, i) => {
        const ang = (-90 + 22.5 + i * 45) * (Math.PI / 180);
        const n: Pt = [c[0] + Math.cos(ang) * 190, c[1] + Math.sin(ang) * 190];
        const lbl: Pt = [c[0] + Math.cos(ang) * 214, c[1] + Math.sin(ang) * 214];
        const partners = [-9, 0, 9].slice(0, 2 + (i % 2)).map(off => {
          const a2 = ang + off * (Math.PI / 180);
          return [c[0] + Math.cos(a2) * 262, c[1] + Math.sin(a2) * 262] as Pt;
        });
        return (
          <g key={name}>
            <path className="a-route a-route-slow" d={`M${P(c)}L${P(n)}`} style={{ animationDelay: `${i * -0.3}s` }} />
            {partners.map((p, k) => (
              <g key={k} className="a-fade">
                <path className="a-thin" d={`M${P(n)}L${P(p)}`} />
                <circle className="a-partner" cx={p[0]} cy={p[1]} r="5" />
              </g>
            ))}
            <circle className="a-node a-node-lg" cx={n[0]} cy={n[1]} r="7" />
            <text className="a-lbl a-fade" x={lbl[0]} y={lbl[1] + (Math.sin(ang) > 0.5 ? 14 : Math.sin(ang) < -0.5 ? -6 : 4)} textAnchor={Math.cos(ang) > 0.3 ? 'start' : Math.cos(ang) < -0.3 ? 'end' : 'middle'} dx={Math.cos(ang) > 0.3 ? 4 : Math.cos(ang) < -0.3 ? -4 : 0}>{name}</text>
          </g>
        );
      })}
      <path className="a-route a-route-bold" d={`M${P(brand)}L${c[0]} ${c[1] - 58}`} />
      <rect className="a-brand" x={brand[0] - 70} y={brand[1] - 22} width="140" height="40" rx="20" />
      <text className="a-lbl a-lbl-brand" x={brand[0]} y={brand[1] + 2} textAnchor="middle">Your brand</text>
      <circle className="a-pulse" cx={c[0]} cy={c[1]} r="40" />
      <circle className="a-hubcore" cx={c[0]} cy={c[1]} r="58" />
      <text className="a-lbl a-lbl-core" x={c[0]} y={c[1] + 4} textAnchor="middle">GARWEVIA</text>
      <text className="a-lbl a-lbl-dim a-fade" x={c[0]} y={624} textAnchor="middle">● capability  ○ selected partner facilities</text>
    </svg>
  );
}

const pom: [string, string, string, string, string][] = [
  ['A', '½ chest', '52.0', '±1.0', '51.6'],
  ['B', 'Body length HPS', '72.0', '±1.0', '72.4'],
  ['C', 'Sleeve length', '21.0', '±0.5', '20.8'],
  ['D', 'Neck width', '18.0', '±0.5', '18.2'],
  ['E', '½ hem', '51.0', '±1.0', '50.7'],
  ['F', 'Sleeve opening', '17.5', '±0.5', '17.6'],
];
const pomMarks: [string, Pt][] = [['A', [200, 150]], ['B', [138, 240]], ['C', [350, 104]], ['D', [200, 30]], ['E', [200, 420]], ['F', [352, 176]]];

/** Points-of-measure sheet: flat with measurement letters beside a QC tolerance table. */
export function PomSheet() {
  const x0 = 440, y0 = 70, rowH = 50, cols = [0, 44, 250, 322, 394, 444];
  return (
    <svg className="art-svg art-lg" viewBox="-20 -30 950 540" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(10 20) scale(.95)">
        {flats.tee.outline.map((d, i) => <path key={i} className="a-shape a-drawn" d={d} pathLength={1} />)}
        {flats.tee.seams.map((d, i) => <path key={'s' + i} className="a-seam a-drawn" d={d} pathLength={1} />)}
        <g className="a-dim a-fade">
          <path d="M86 150L314 150M150 40L150 408M322 62L372 148M150 32L250 32M84 420L316 420M372 148L334 170" />
        </g>
        {pomMarks.map(([k, p]) => (
          <g key={k} className="a-fade">
            <circle className="a-badge" cx={p[0]} cy={p[1]} r="12" />
            <text className="a-lbl a-lbl-badge" x={p[0]} y={p[1]} dy="4" textAnchor="middle">{k}</text>
          </g>
        ))}
      </g>
      <g className="a-fade">
        <text className="a-lbl a-lbl-sand" x={x0} y={y0 - 40}>Inline inspection · size M · cm</text>
        {['POM', 'Description', 'Spec', 'Tol', 'Actual', ''].map((h, i) => <text key={h + i} className="a-lbl a-lbl-dim" x={x0 + cols[i]} y={y0 - 12}>{h}</text>)}
        <path className="a-thin" d={`M${x0} ${y0}H${x0 + 470}`} />
        {pom.map((r, i) => {
          const y = y0 + (i + 1) * rowH;
          return (
            <g key={r[0]}>
              {r.map((cell, k) => <text key={k} className={k === 0 ? 'a-lbl a-lbl-sand' : 'a-lbl'} x={x0 + cols[k]} y={y - 18}>{cell}</text>)}
              <path className="a-check" d={`M${x0 + 452} ${y - 26}l5 6l10 -12`} />
              <path className="a-thin" d={`M${x0} ${y}H${x0 + 470}`} />
            </g>
          );
        })}
        <g transform={`translate(${x0 + 330} ${y0 + rowH * 6 + 60}) rotate(-8)`}>
          <rect className="a-stamp" x="-70" y="-24" width="140" height="48" rx="6" />
          <text className="a-lbl a-lbl-stamp" x="0" y="6" textAnchor="middle">Pass</text>
        </g>
      </g>
    </svg>
  );
}

/** Cutting marker: tee pattern pieces nested across the fabric width. */
export function Marker() {
  const body = 'M0 22 L58 0 Q100 34 142 0 L200 22 L194 74 Q184 100 200 116 L200 330 L0 330 L0 116 Q16 100 6 74 Z';
  const back = 'M0 22 L58 0 Q100 12 142 0 L200 22 L194 74 Q184 100 200 116 L200 330 L0 330 L0 116 Q16 100 6 74 Z';
  const sleeve = 'M0 70 Q70 -10 150 70 L136 150 L14 150 Z';
  const pieces: { d: string; t: string; label: string; grain: [Pt, Pt] }[] = [
    { d: body, t: 'translate(40 48)', label: 'Front · M · ×1', grain: [[100, 90], [100, 290]] },
    { d: back, t: 'translate(256 48)', label: 'Back · M · ×1', grain: [[100, 90], [100, 290]] },
    { d: sleeve, t: 'translate(470 50)', label: 'Sleeve L', grain: [[75, 60], [75, 140]] },
    { d: sleeve, t: 'translate(626 50)', label: 'Sleeve R', grain: [[75, 60], [75, 140]] },
    { d: 'M0 0H300V22H0Z', t: 'translate(472 350)', label: 'Neck rib', grain: [[20, 11], [120, 11]] },
  ];
  return (
    <svg className="art-svg art-lg" viewBox="0 0 800 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path className="a-hatch" d="M0 0V10" />
        </pattern>
      </defs>
      <rect x="20" y="30" width="760" height="370" fill="url(#hatch)" className="a-fabric" />
      <path className="a-stitch" d="M20 30H780M20 400H780" />
      {pieces.map((p, i) => (
        <g key={i} transform={p.t}>
          <path className="a-shape a-drawn" d={p.d} pathLength={1} />
          <path className="a-grain a-fade" d={`M${P(p.grain[0])}L${P(p.grain[1])}M${p.grain[0][0] - 5} ${p.grain[0][1] + 9}L${P(p.grain[0])}L${p.grain[0][0] + 5} ${p.grain[0][1] + 9}`} />
          {p.label && <text className="a-lbl a-fade" x={i === 4 ? 150 : i === 2 || i === 3 ? 75 : 100} y={i === 4 ? -10 : i === 2 || i === 3 ? 118 : 200} textAnchor="middle">{p.label}</text>}
        </g>
      ))}
      <g className="a-fade">
        <text className="a-lbl a-lbl-sand" x="20" y="18">Marker · style GW-0142 · size run S–XL</text>
        <text className="a-lbl a-lbl-dim" x="780" y="428" textAnchor="end">Fabric width 180 cm · efficiency 84%</text>
      </g>
    </svg>
  );
}

/** Knit face texture with a lens showing the single-jersey structure. */
export function KnitStructure() {
  const rows: React.ReactNode[] = [];
  for (let r = 0; r < 34; r++) {
    let d = '';
    for (let c = 0; c < 26; c++) {
      const x = c * 24, y = r * 18;
      d += `M${x} ${y}q5 11 12 20M${x + 24} ${y}q-5 11 -12 20`;
    }
    rows.push(<path key={r} className={r % 9 === 4 ? 'a-knit a-knit-sand' : 'a-knit'} d={d} />);
  }
  let lens = '';
  for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) {
    const x = c * 48, y = r * 36;
    lens += `M${x} ${y}q10 22 24 40M${x + 48} ${y}q-10 22 -24 40`;
  }
  return (
    <svg className="art-svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
      <g className="a-fade">{rows}</g>
      <circle className="a-lens" cx="300" cy="300" r="150" />
      <g clipPath="url(#lensclip)" className="a-fade">
        <g transform="translate(180 190)"><path className="a-knit a-knit-lens" d={lens} /></g>
      </g>
      <defs><clipPath id="lensclip"><circle cx="300" cy="300" r="146" /></clipPath></defs>
      <circle className="a-ring" cx="300" cy="300" r="150" />
      <g className="a-fade">
        <path className="a-dim" d="M470 180V420M462 188L470 180L478 188M462 412L470 420L478 412" />
        <text className="a-lbl a-lbl-sand" transform="rotate(-90 486 300)" x="486" y="300" textAnchor="middle">Wales</text>
        <path className="a-dim" d="M180 470H420M188 462L180 470L188 478M412 462L420 470L412 478" />
        <text className="a-lbl a-lbl-sand" x="300" y="494" textAnchor="middle">Courses</text>
        <text className="a-lbl" x="300" y="112" textAnchor="middle">Single jersey · face</text>
      </g>
    </svg>
  );
}

const dips = ['#1E2A44', '#2B2E33', '#E6E0D2', '#5E6445', '#B89B72', '#7A2E2E', '#3C5A7E', '#BFC2C6', '#D8CDB6', '#44523A', '#1B1D22', '#9A7B5B'];

/** Lab-dip swatch cards with pinked edges and one approved submission. */
export function LabDips() {
  const zig = (w: number) => { let d = 'M0 8'; for (let x = 0; x <= w; x += 8) d += `L${x} ${(x / 8) % 2 ? 0 : 8}`; return d; };
  return (
    <svg className="art-svg" viewBox="0 0 600 620" preserveAspectRatio="xMidYMid meet">
      {dips.map((col, i) => {
        const x = 40 + (i % 3) * 180, y = 40 + Math.floor(i / 3) * 140;
        return (
          <g key={col} transform={`translate(${x} ${y})`} className="a-fade" style={{ animationDelay: `${0.4 + i * 0.06}s` }}>
            <rect className="a-card" x="0" y="0" width="160" height="120" rx="3" />
            <path d={`${zig(120)}V78H0Z`} transform="translate(20 14)" fill={col} />
            <text className="a-lbl" x="20" y="108">LD-{String(i + 1).padStart(2, '0')} · {'ABC'[i % 3]}</text>
          </g>
        );
      })}
      <g transform="translate(470 470) rotate(-12)" className="a-fade">
        <circle className="a-stamp" r="48" />
        <text className="a-lbl a-lbl-stamp" y="-2" textAnchor="middle">Approved</text>
        <text className="a-lbl a-lbl-stamp-sm" y="16" textAnchor="middle">LD-05 · B</text>
      </g>
    </svg>
  );
}

/** Garment labels: fibre content, origin and care symbols. */
export function CareTags() {
  const tags = [
    { t: 'translate(90 90) rotate(-6)', lines: ['Fibre content', 'Cotton 95%', 'Elastane 5%'] },
    { t: 'translate(250 70) rotate(3)', lines: ['Made in India', 'Style GW-0142', 'Lot 26-0917'] },
    { t: 'translate(410 100) rotate(-2)', lines: ['Care', 'Wash 30°', 'Do not bleach'] },
  ];
  return (
    <svg className="art-svg" viewBox="0 0 600 560" preserveAspectRatio="xMidYMid meet">
      <path className="a-seam a-drawn" d="M40 60 C200 30 400 30 560 70" pathLength={1} />
      {tags.map((tag, i) => (
        <g key={i} transform={tag.t}>
          <path className="a-shape a-drawn" d="M0 0H120V330H0Z" pathLength={1} />
          <path className="a-stitch" d="M8 8H112V322H8Z" />
          <path className="a-seam" d="M0 36H120" />
          {tag.lines.map((l, k) => <text key={k} className={k === 0 ? 'a-lbl a-lbl-sand a-fade' : 'a-lbl a-fade'} x="60" y={70 + k * 30} textAnchor="middle">{l}</text>)}
          {i === 2 && (
            <g className="a-seam a-fade" transform="translate(18 200)">
              <path d="M0 6L6 30H34L40 6M4 12C12 16 28 16 36 12" />
              <path d="M52 30L66 4L80 30ZM56 6L78 28" />
              <path d="M0 50H30V80H0ZM15 65m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0" />
              <path d="M44 78H80L78 62C74 54 58 54 52 58Z" />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

/** Yarn cones for material options. */
export function YarnCones() {
  const cones = [{ x: 90, label: 'Organic cotton', col: '#E6E0D2' }, { x: 250, label: 'Recycled polyester', col: '#3C5A7E' }, { x: 410, label: 'Cotton blend', col: '#B89B72' }];
  return (
    <svg className="art-svg" viewBox="0 0 600 560" preserveAspectRatio="xMidYMid meet">
      {cones.map((c, i) => {
        let wraps = '';
        for (let k = 0; k < 16; k++) { const y = 150 + k * 16, inset = 26 - k * 0.9; wraps += `M${inset} ${y}H${120 - inset}`; }
        return (
          <g key={c.label} transform={`translate(${c.x} 40)`}>
            <path className="a-thread a-drawn" d={`M60 150 C60 60 ${i === 1 ? 160 : -40} 40 ${i === 1 ? 140 : -20} -40`} pathLength={1} style={{ stroke: c.col }} />
            <path className="a-shape a-drawn" d="M26 150 L94 150 L112 420 L8 420 Z" pathLength={1} />
            <path className="a-fade" d={wraps} style={{ stroke: c.col, strokeWidth: 3, opacity: 0.85 }} />
            <path className="a-shape" d="M40 420 H80 V440 H40 Z" />
            <text className="a-lbl a-fade" x="60" y="480" textAnchor="middle">{c.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Traceability chain from fibre to shipment. */
export function TraceChain() {
  const steps = ['Fibre', 'Yarn', 'Fabric', 'Dyeing', 'Garment', 'Shipment'];
  return (
    <svg className="art-svg" viewBox="0 0 600 640" preserveAspectRatio="xMidYMid meet">
      <path className="a-route a-route-slow" d="M300 60V580" />
      {steps.map((s, i) => {
        const y = 60 + i * 104, left = i % 2 === 0;
        return (
          <g key={s} className="a-fade" style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
            <circle className="a-node a-node-xl" cx="300" cy={y} r="16" />
            <path className="a-check" d={`M292 ${y}l6 6l10 -12`} />
            <path className="a-thin" d={`M${left ? 284 : 316} ${y}H${left ? 190 : 410}`} />
            <text className="a-lbl" x={left ? 180 : 420} y={y - 4} textAnchor={left ? 'end' : 'start'}>{s}</text>
            <text className="a-lbl a-lbl-dim" x={left ? 180 : 420} y={y + 14} textAnchor={left ? 'end' : 'start'}>Batch / lot record</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Production timeline (Gantt) with a live "today" marker. */
export function Timeline() {
  const rows: [string, number, number][] = [['Sampling', 0, 3], ['PP approval', 3, 1], ['Fabric & trims', 2, 4], ['Cutting', 5, 2], ['Sewing', 6, 4], ['Inline QC', 7, 3], ['Final inspection', 10, 1], ['Shipment', 11, 1]];
  const x0 = 170, w = 36;
  return (
    <svg className="art-svg" viewBox="0 0 640 520" preserveAspectRatio="xMidYMid meet">
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i} className="a-fade">
          <path className="a-thin" d={`M${x0 + i * w} 40V470`} />
          <text className="a-lbl a-lbl-dim" x={x0 + i * w + w / 2} y="30" textAnchor="middle">W{i + 1}</text>
        </g>
      ))}
      {rows.map(([name, start, len], i) => {
        const y = 60 + i * 52;
        const done = start + len <= 7;
        return (
          <g key={name} className="a-fade" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
            <text className="a-lbl" x={x0 - 14} y={y + 16} textAnchor="end">{name}</text>
            <rect className={done ? 'a-bar a-bar-done' : 'a-bar'} x={x0 + start * w + 2} y={y + 4} width={len * w - 4} height="18" rx="9" />
            <path className="a-milestone" d={`M${x0 + (start + len) * w} ${y + 13}m-6 0l6 -6l6 6l-6 6z`} />
          </g>
        );
      })}
      <path className="a-today" d={`M${x0 + 7 * w} 44V476`} />
      <text className="a-lbl a-lbl-sand" x={x0 + 7 * w} y="500" textAnchor="middle">Today · on schedule</text>
    </svg>
  );
}

/** A tech-pack page: header fields, annotated flat and a bill of materials. */
export function TechPackSheet({ flat = 'hoodie' }: { flat?: keyof typeof flats }) {
  const f = flats[flat];
  const boms: Partial<Record<keyof typeof flats, [string, string][]>> = {
    hoodie: [['Body', 'Fleece 320 gsm'], ['Rib', '2×2 rib, 95/5'], ['Drawcord', 'Flat 10 mm'], ['Labels', 'Woven + care'], ['Pack', 'Polybag, 1 pc']],
    tee: [['Body', 'Single jersey 180 gsm'], ['Neck', '1×1 rib, self'], ['Thread', 'Poly-core, matched'], ['Labels', 'Printed neck + care'], ['Pack', 'Polybag, 1 pc']],
    polo: [['Body', 'Piqué 220 gsm'], ['Collar', 'Knit flat collar'], ['Buttons', '4-hole, 16L'], ['Labels', 'Woven + care'], ['Pack', 'Folded, polybag']],
  };
  const bom = boms[flat] ?? boms.hoodie!;
  return (
    <svg className="art-svg art-lg" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
      <path className="a-sheet a-drawn" d="M10 10H890V610H10Z" pathLength={1} />
      <g className="a-fade">
        <path className="a-thin" d="M10 60H890M300 10V60M520 10V60M700 10V60" />
        {[['Tech pack', 30], ['Style GW-0142', 320], ['Season SS26', 540], ['Rev. 03', 720]].map(([t, x]) => <text key={t} className={t === 'Tech pack' ? 'a-lbl a-lbl-sand' : 'a-lbl'} x={x as number} y="41">{t}</text>)}
        <text className="a-lbl a-lbl-dim" x="30" y="92">{f.name} · front view</text>
      </g>
      <g transform="translate(40 120) scale(.9)">
        {f.outline.map((d, i) => <path key={i} className="a-shape a-drawn" d={d} pathLength={1} />)}
        {f.seams.map((d, i) => <path key={'s' + i} className="a-seam a-drawn" d={d} pathLength={1} />)}
        <g className="a-fade">
          {f.stitches.map((d, i) => <path key={'t' + i} className="a-stitch" d={d} />)}
          {f.dots?.map(([x, y, r], i) => <circle key={'d' + i} className="a-shape" cx={x} cy={y} r={r} />)}
        </g>
      </g>
      <g className="a-fade">
        <path className="a-thin" d="M500 100V580" />
        <text className="a-lbl a-lbl-sand" x="530" y="124">Bill of materials</text>
        {bom.map(([k, v], i) => (
          <g key={k}>
            <text className="a-lbl a-lbl-dim" x="530" y={170 + i * 44}>{k}</text>
            <text className="a-lbl" x="640" y={170 + i * 44}>{v}</text>
            <path className="a-thin" d={`M530 ${184 + i * 44}H870`} />
          </g>
        ))}
        <text className="a-lbl a-lbl-sand" x="530" y="430">Colourways</text>
        {['#2B2E33', '#1E2A44', '#BFC2C6', '#5E6445'].map((c, i) => <rect key={c} x={530 + i * 56} y="448" width="40" height="40" rx="20" fill={c} className="a-swatch" />)}
        <text className="a-lbl a-lbl-dim" x="530" y="530">Size run XS–XXL · graded</text>
      </g>
    </svg>
  );
}

/** Decoration placement on a tee: print box with halftone, embroidery hoop and positions. */
export function PrintPlacement() {
  let halftone = '';
  for (let y = 0; y < 8; y++) for (let x = 0; x < 11; x++) halftone += `M${120 + x * 15 + (y % 2) * 7} ${140 + y * 15}h0`;
  return (
    <GarmentFlat name="tee" annotate={false} viewBox="-60 -40 560 500">
      <g className="a-fade">
        <rect className="a-printbox" x="112" y="130" width="176" height="126" />
        <path className="a-halftone" d={halftone} />
        <path className="a-dim" d="M112 118H288M112 112V124M288 112V124" />
        <text className="a-lbl a-lbl-sand" x="200" y="108" textAnchor="middle">Screen print · W 24 cm</text>
        <path className="a-dim" d="M300 40V130M294 40H306M294 130H306" />
        <text className="a-lbl a-lbl-sand" transform="rotate(-90 316 86)" x="316" y="86" textAnchor="middle">8 cm from HPS</text>
        <circle className="a-hoop" cx="255" cy="96" r="18" />
        <path className="a-lead" d="M270 86L380 20" />
        <text className="a-lbl" x="386" y="24">Embroidery · 7 cm</text>
      </g>
    </GarmentFlat>
  );
}
