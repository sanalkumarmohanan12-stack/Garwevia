/**
 * Animated line-art scenes for the home workflow (tech pack → dispatch).
 * Pure SVG + CSS: each scene rests in its finished state and plays its animation
 * when its card is active (see `.sa-*` rules in globals.css). viewBox 400×300;
 * the story sits in the top ~170 units because the card text covers the bottom.
 */
import type { CSSProperties } from 'react';

const S = '#D3B57A';   // sand
const B = '#F2EDE3';   // bone
const P = '#0E2140';   // panel navy
const TEE = 'M150 40 Q200 82 250 40 L322 62 L372 148 L334 170 L314 130 L316 408 L84 408 L86 130 L66 170 L28 148 L78 62 Z';
const d = (s: number): CSSProperties => ({ animationDelay: s + 's' });
const line = { fill: 'none', stroke: S, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Tee({ x, y, s, className = '', fill = 'none', style }: { x: number; y: number; s: number; className?: string; fill?: string; style?: CSSProperties }) {
  return <path className={className} style={style} d={TEE} transform={`translate(${x} ${y}) scale(${s})`} fill={fill} stroke={S} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" pathLength={1} />;
}

function Check({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g className="sa-pop" style={d(delay)}>
      <circle cx={x} cy={y} r="8" fill={S} />
      <path d={`M${x - 3.5} ${y}l2.5 2.5 4.5-5`} fill="none" stroke="#060D18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Grid() {
  return (
    <g opacity=".5">
      {Array.from({ length: 13 }, (_, i) => <path key={'v' + i} d={`M${i * 33} 0V300`} stroke={B} strokeOpacity=".05" />)}
      {Array.from({ length: 10 }, (_, i) => <path key={'h' + i} d={`M0 ${i * 33}H400`} stroke={B} strokeOpacity=".05" />)}
    </g>
  );
}

/* 01 — Tech pack: the spec sheet draws itself, then BOM / POM / GSM tick off */
function TechPack() {
  return (
    <>
      <rect x="104" y="14" width="196" height="156" rx="8" fill={P} stroke={S} strokeOpacity=".5" />
      <path d="M104 34H300" stroke={S} strokeOpacity=".35" />
      <text x="116" y="28" className="sa-t">TECH PACK · GW-0142</text>
      <Tee x={112} y={34} s={0.24} className="sa-draw" />
      <g className="sa-fade" style={d(1.1)}>
        <path d="M133 72h74M133 68v8M207 68v8" {...line} strokeWidth={1.4} />
        <text x="152" y="66" className="sa-t sa-t-s">½ CHEST</text>
      </g>
      {['BOM', 'POM', 'GSM 180'].map((t, i) => (
        <g key={t}>
          <rect x="222" y={52 + i * 34} width="66" height="24" rx="4" fill="none" stroke={B} strokeOpacity=".25" />
          <text x="230" y={68 + i * 34} className="sa-t">{t}</text>
          <Check x={288} y={64 + i * 34} delay={1.4 + i * 0.35} />
        </g>
      ))}
    </>
  );
}

/* 02 — Sampling: proto, fit and PP samples arrive; the PP sample is stamped approved */
function Sampling() {
  const cards = ['PROTO', 'FIT', 'PP'];
  return (
    <>
      {cards.map((c, i) => (
        <g key={c} className="sa-rise" style={d(i * 0.35)}>
          <rect x={58 + i * 100} y="20" width="84" height="128" rx="8" fill={P} stroke={S} strokeOpacity={i === 2 ? 0.9 : 0.4} />
          <Tee x={67 + i * 100} y={30} s={0.19} fill={i === 2 ? 'rgba(211,181,122,.14)' : 'none'} />
          <text x={100 + i * 100} y="138" textAnchor="middle" className="sa-t">{c} SAMPLE</text>
        </g>
      ))}
      <g className="sa-fade" style={d(0.9)}>
        <path d="M172 62h56" stroke={S} strokeWidth="1.4" strokeDasharray="2 3" />
        <text x="200" y="56" textAnchor="middle" className="sa-t sa-t-s">FIT ✓</text>
      </g>
      <g className="sa-stamp" style={d(1.4)}>
        <circle cx="318" cy="86" r="30" fill="none" stroke="#E07A5F" strokeWidth="2.5" />
        <circle cx="318" cy="86" r="24" fill="none" stroke="#E07A5F" strokeWidth="1" />
        <text x="318" y="90" textAnchor="middle" className="sa-t sa-stamp-t">APPROVED</text>
      </g>
    </>
  );
}

/* 03 — Knitting & dyeing: yarn feeds a turning circular machine; lab dips fill with colour */
function Knitting() {
  return (
    <>
      {[124, 150, 176].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 9} 36 L${x - 5} 14 H${x + 5} L${x + 9} 36 Z`} fill={P} stroke={S} strokeWidth="1.5" />
          <path className="sa-flow" d={`M${x} 36 C${x} 50 150 52 150 64`} fill="none" stroke={B} strokeOpacity=".7" strokeWidth="1.2" strokeDasharray="3 4" style={d(i * 0.2)} />
        </g>
      ))}
      <ellipse cx="150" cy="68" rx="50" ry="10" fill={P} stroke={S} strokeWidth="2" />
      <clipPath id="sa-cyl"><rect x="100" y="68" width="100" height="44" /></clipPath>
      <rect x="100" y="68" width="100" height="44" fill={P} stroke={S} strokeWidth="2" />
      <g clipPath="url(#sa-cyl)"><g className="sa-spin-x">{Array.from({ length: 20 }, (_, i) => <path key={i} d={`M${88 + i * 8} 70V110`} stroke={S} strokeOpacity=".55" />)}</g></g>
      <ellipse cx="150" cy="112" rx="50" ry="10" fill="none" stroke={S} strokeWidth="2" />
      <g className="sa-grow">
        <path d="M112 118 H188 V168 H112 Z" fill="rgba(242,237,227,.06)" stroke={B} strokeOpacity=".4" />
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${118 + i * 8} 122 v42`} stroke={B} strokeOpacity=".22" strokeDasharray="3 2" />)}
      </g>
      <text x="150" y="182" textAnchor="middle" className="sa-t sa-t-s">CIRCULAR KNIT · 24G</text>
      {[['#23314B', 'A'], ['#4F5541', 'B'], ['#6A2531', 'C']].map(([c, l], i) => (
        <g key={l}>
          <rect x="246" y={24 + i * 46} width="60" height="36" rx="5" fill="none" stroke={B} strokeOpacity=".25" />
          <rect className="sa-dip" style={{ ...d(0.5 + i * 0.4), fill: c }} x="246" y={24 + i * 46} width="60" height="36" rx="5" />
          <text x="316" y={46 + i * 46} className="sa-t">LAB DIP {l}</text>
        </g>
      ))}
      <Check x={306} y={71} delay={1.9} />
      <text x="316" y="104" className="sa-t sa-t-s sa-fade" style={d(2)}>ΔE 0.6</text>
    </>
  );
}

/* 04 — Cutting: fabric lay with a marker; a blade traces the front-body piece */
const FRONT = 'M150 58 Q172 72 194 58 L222 66 L232 92 L220 96 L218 150 L126 150 L124 96 L112 92 L122 66 Z';
function Cutting() {
  return (
    <>
      {[0, 1, 2, 3].map(i => <path key={i} d={`M${56 + i * 4} ${168 - i * 5} L${86 + i * 4} ${38 - i * 5} H${352 - i * 4} L${322 - i * 4} ${168 - i * 5} Z`} fill={i === 3 ? '#1B2F52' : P} stroke={S} strokeOpacity={0.25 + i * 0.1} />)}
      <text x="96" y="30" className="sa-t sa-t-s">LAY · 40 PLIES</text>
      <path d="M252 62 h52 v38 h-52 Z M256 108 h44 v36 h-44 Z" fill="none" stroke={B} strokeOpacity=".45" strokeDasharray="4 3" />
      <path d={FRONT} fill="none" stroke={B} strokeOpacity=".3" strokeDasharray="4 3" />
      <path className="sa-draw" d={FRONT} {...line} strokeWidth={2.4} pathLength={1} style={{ animationDuration: '2.4s' }} />
      <g className="sa-blade">
        <circle r="9" fill={B} />
        <circle r="3" fill="#060D18" />
      </g>
    </>
  );
}

/* 05 — Sewing: needle runs, fabric feeds, stitches form */
function Sewing() {
  return (
    <>
      <path d="M92 132 V56 Q92 34 116 34 H300 Q318 34 318 52 V92 H282 V62 H128 V132" fill={P} stroke={S} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="318" cy="70" r="16" fill="none" stroke={S} strokeWidth="2" />
      <g className="sa-wheel" style={{ transformOrigin: '318px 70px' }}><path d="M318 56v28M304 70h28" stroke={S} strokeWidth="1.5" /></g>
      <path d="M150 20 h20 M160 20 v14" stroke={B} strokeOpacity=".6" strokeWidth="1.5" />
      <path d="M160 34 C190 40 250 44 262 62" fill="none" stroke={B} strokeOpacity=".5" strokeDasharray="2 3" />
      <g className="sa-needle"><path d="M262 92 v34" stroke={B} strokeWidth="2" /><path d="M254 92 h16" stroke={S} strokeWidth="3" /></g>
      <path d="M244 128 h36" stroke={S} strokeWidth="3" strokeLinecap="round" />
      <rect x="40" y="130" width="320" height="30" fill="rgba(242,237,227,.07)" stroke={B} strokeOpacity=".3" />
      <path d="M40 145 H262" stroke={S} strokeWidth="2" strokeDasharray="7 5" className="sa-feed" />
      <text x="44" y="178" className="sa-t sa-t-s">COVER STITCH · 12 SPI</text>
    </>
  );
}

/* 06 — Print & embellish: a squeegee sweeps the screen, the print appears on the shirt */
function Printing() {
  return (
    <>
      <Tee x={96} y={36} s={0.36} fill="rgba(242,237,227,.05)" />
      <clipPath id="sa-print"><rect className="sa-reveal" x="140" y="64" width="80" height="60" /></clipPath>
      <g clipPath="url(#sa-print)">
        <circle cx="167" cy="94" r="20" fill="none" stroke={S} strokeWidth="3" />
        <path d="M156 94h22M167 83v22" stroke={S} strokeWidth="2.5" />
        <text x="192" y="98" className="sa-t" fill={S}>GW</text>
      </g>
      <rect x="126" y="54" width="108" height="80" rx="3" fill="none" stroke={B} strokeOpacity=".5" strokeWidth="2" />
      <path d="M126 64h108M126 74h108M126 84h108M126 94h108M126 104h108M126 114h108M126 124h108" stroke={B} strokeOpacity=".08" />
      <g className="sa-squeegee"><rect x="124" y="46" width="8" height="96" rx="3" fill={S} /><rect x="122" y="40" width="12" height="10" rx="2" fill={B} /></g>
      <g>
        {['#D3B57A', '#F2EDE3', '#E07A5F'].map((c, i) => <circle key={c} cx={276} cy={62 + i * 30} r="10" fill={c} className="sa-pop" style={d(0.3 + i * 0.25)} />)}
        <text x="294" y="66" className="sa-t">PLASTISOL</text>
        <text x="294" y="96" className="sa-t">WATER-BASED</text>
        <text x="294" y="126" className="sa-t">PUFF</text>
      </g>
      <text x="126" y="172" className="sa-t sa-t-s">STRIKE-OFF · CURE 160°C</text>
    </>
  );
}

/* 07 — Quality inspection: a magnifier scans, measurements check out, AQL pass */
function Quality() {
  return (
    <>
      <Tee x={40} y={30} s={0.34} fill="rgba(242,237,227,.05)" />
      <path d="M70 92h78M70 87v10M148 87v10" stroke={S} strokeWidth="1.4" />
      <text x="84" y="84" className="sa-t sa-t-s">52.0 cm ✓</text>
      <g className="sa-scan"><circle cx="0" cy="0" r="18" fill="rgba(211,181,122,.12)" stroke={B} strokeWidth="2.5" /><path d="M13 13 L28 28" stroke={B} strokeWidth="4" strokeLinecap="round" /></g>
      {['Measurements', 'Workmanship', 'Shade & labels'].map((t, i) => (
        <g key={t}>
          <path d={`M214 ${46 + i * 30} h120`} stroke={B} strokeOpacity=".15" />
          <text x="214" y={40 + i * 30} className="sa-t">{t.toUpperCase()}</text>
          <Check x={340} y={36 + i * 30} delay={0.8 + i * 0.35} />
        </g>
      ))}
      <g className="sa-pop" style={d(2)}>
        <rect x="214" y="128" width="136" height="34" rx="17" fill={S} />
        <text x="282" y="150" textAnchor="middle" className="sa-t sa-t-dark">AQL 2.5 · PASS</text>
      </g>
    </>
  );
}

/* 08 — Packing & dispatch: cartons stack, the truck heads to port */
function Dispatch() {
  const box = (x: number, y: number, i: number) => (
    <g key={i} className="sa-drop" style={d(i * 0.3)}>
      <rect x={x} y={y} width="54" height="38" fill={P} stroke={S} strokeWidth="1.8" />
      <path d={`M${x} ${y + 10}h54M${x + 27} ${y}v10`} stroke={S} strokeOpacity=".5" />
      <text x={x + 6} y={y + 28} className="sa-t sa-t-s">CTN {i + 1}</text>
    </g>
  );
  return (
    <>
      {box(52, 122, 0)}{box(108, 122, 1)}{box(80, 82, 2)}
      <path d="M40 162 H372" stroke={B} strokeOpacity=".3" />
      <path d="M180 150 H350" stroke={S} strokeWidth="1.5" strokeDasharray="6 6" className="sa-feed-r" />
      <g className="sa-truck">
        <rect x="0" y="118" width="58" height="32" rx="3" fill={B} />
        <path d="M58 128 h16 l10 12 v10 h-26 Z" fill={S} />
        <circle cx="16" cy="152" r="7" fill="#060D18" stroke={B} strokeWidth="2" />
        <circle cx="66" cy="152" r="7" fill="#060D18" stroke={B} strokeWidth="2" />
      </g>
      <g>
        <path d="M352 64 c0 -18 26 -18 26 0 c0 14 -13 26 -13 26 s-13 -12 -13 -26z" fill={S} />
        <circle cx="365" cy="64" r="5" fill="#060D18" />
        <text x="365" y="108" textAnchor="middle" className="sa-t sa-t-s">PORT</text>
      </g>
      <text x="200" y="40" className="sa-t">SHIPPING MARKS ✓</text>
      <text x="200" y="60" className="sa-t">PACKING LIST ✓</text>
    </>
  );
}

const scenes = { pack: TechPack, sample: Sampling, fabric: Knitting, cut: Cutting, stitch: Sewing, print: Printing, check: Quality, ship: Dispatch };
export type SceneName = keyof typeof scenes;

/** Active card: the whole scene fits above the caption. Collapsed card: a full-height slice of it. */
export function StageArt({ name, active = false }: { name: SceneName; active?: boolean }) {
  const Scene = scenes[name];
  return (
    <svg className="sa" viewBox={active ? "0 8 400 200" : "0 0 400 300"} preserveAspectRatio={active ? "xMidYMid meet" : "xMidYMin slice"} aria-hidden="true">
      <Grid />
      <g transform="translate(0 18)"><Scene /></g>
    </svg>
  );
}
