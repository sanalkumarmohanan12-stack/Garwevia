/**
 * Technical flat sketches (front views) in a shared 400-wide coordinate space.
 * `outline` paths are drawn with a stroke-draw animation; `seams` are solid detail
 * lines; `stitches` are dashed topstitch lines; `callouts` are tech-pack annotations.
 */
export type Callout = { at: [number, number]; to: [number, number]; label: string };
export type Dim = { from: [number, number]; to: [number, number]; label: string; offset?: number };
export type Fabric = 'jersey' | 'pique' | 'fleece' | 'performance';
export type Colorway = { name: string; hex: string };
export type Flat = {
  name: string; outline: string[]; seams: string[]; stitches: string[]; dots?: [number, number, number][]; callouts: Callout[]; dims: Dim[];
  /** Rendering details used by the coloured garment renders (art/Render.tsx). */
  fabric?: Fabric; colorways?: Colorway[];
  trims?: string[];   // rib / collar areas
  panels?: string[];  // same-fabric pieces with a subtle edge (pocket, placket, waistband)
  inside?: string[];  // visible garment interior (back neck, hood opening)
  cords?: string[];   // drawcords
  hardware?: 'button' | 'snap' | 'eyelet';
};

export const flats: Record<string, Flat> = {
  tee: {
    name: 'Crew-neck T-shirt',
    outline: ['M150 40 Q200 82 250 40 L322 62 L372 148 L334 170 L314 130 L316 408 L84 408 L86 130 L66 170 L28 148 L78 62 Z'],
    seams: ['M143 44 Q200 100 257 44', 'M150 40 Q200 54 250 40', 'M322 62 L314 130', 'M78 62 L86 130'],
    stitches: ['M367 139 L329 161', 'M33 139 L71 161', 'M88 394 L312 394', 'M147 48 Q200 106 253 48'],
    callouts: [
      { at: [214, 88], to: [470, 30], label: '1×1 rib neck' },
      { at: [250, 250], to: [470, 250], label: 'Single jersey · 180 gsm' },
      { at: [300, 394], to: [470, 420], label: 'Coverstitch hem 2 cm' },
    ],
    dims: [{ from: [86, 150], to: [314, 150], label: 'A · ½ chest' }, { from: [0, 40], to: [0, 408], label: 'B · body length' }],
    fabric: 'jersey',
    inside: ['M150 40 Q200 54 250 40 Q200 82 150 40 Z'],
    trims: ['M150 40 Q200 82 250 40 L257 44 Q200 100 143 44 Z'],
    colorways: [{ name: 'Optic white', hex: '#EFEBE3' }, { name: 'Navy', hex: '#23314B' }, { name: 'Heather grey', hex: '#A7A9AC' }, { name: 'Black', hex: '#222326' }, { name: 'Sand', hex: '#CDB48A' }],
  },
  polo: {
    name: 'Piqué polo',
    outline: ['M150 40 Q200 70 250 40 L322 62 L372 148 L334 170 L314 130 L316 408 L84 408 L86 130 L66 170 L28 148 L78 62 Z'],
    seams: ['M150 40 L134 50 L178 106 L200 80 Z', 'M250 40 L266 50 L222 106 L200 80 Z', 'M150 40 Q200 52 250 40', 'M188 80 L188 190 L212 190 L212 80', 'M362 131 L324 153', 'M38 131 L76 153', 'M322 62 L314 130', 'M78 62 L86 130'],
    stitches: ['M84 380 L316 380', 'M316 408 L316 392', 'M84 408 L84 392'],
    dots: [[200, 112, 4], [200, 140, 4], [200, 168, 4]],
    callouts: [
      { at: [160, 72], to: [-80, 20], label: 'Knit flat collar' },
      { at: [212, 150], to: [470, 120], label: '3-button placket' },
      { at: [250, 280], to: [470, 270], label: 'Piqué · 220 gsm' },
      { at: [349, 142], to: [470, 190], label: 'Rib cuff' },
    ],
    dims: [{ from: [86, 215], to: [314, 215], label: 'A · ½ chest' }],
    fabric: 'pique', hardware: 'button',
    inside: ['M150 40 Q200 52 250 40 L200 80 Z'],
    trims: ['M150 40 L134 50 L178 106 L200 80 Z', 'M250 40 L266 50 L222 106 L200 80 Z', 'M372 148 L334 170 L324 153 L362 131 Z', 'M28 148 L66 170 L76 153 L38 131 Z'],
    panels: ['M188 80 L188 190 L212 190 L212 80 Z'],
    colorways: [{ name: 'Navy', hex: '#22304A' }, { name: 'White', hex: '#EEEAE2' }, { name: 'Bottle green', hex: '#2F4A3A' }, { name: 'Burgundy', hex: '#6A2531' }],
  },
  hoodie: {
    name: 'Pullover hoodie',
    outline: [
      'M150 48 Q200 70 250 48 L326 74 L388 372 L352 384 L318 150 L320 410 L80 410 L82 150 L48 384 L12 372 L74 74 Z',
      'M150 48 C128 10 150 -18 200 -20 C250 -18 272 10 250 48 L236 52 C234 14 166 14 164 52 Z',
    ],
    seams: ['M164 52 L200 96 L236 52', 'M383 350 L347 362', 'M17 350 L53 362', 'M80 382 L320 382', 'M128 262 L272 262 L292 352 L108 352 Z', 'M326 74 L318 150', 'M74 74 L82 150'],
    stitches: ['M134 270 L266 270', 'M130 276 L114 346', 'M270 276 L286 346'],
    cords: ['M186 88 L182 160', 'M214 88 L218 160'],
    dots: [[182, 162, 3], [218, 162, 3]],
    callouts: [
      { at: [214, 0], to: [470, -10], label: '2-panel lined hood' },
      { at: [240, 300], to: [470, 290], label: 'Kangaroo pocket' },
      { at: [300, 396], to: [470, 400], label: '2×2 rib hem & cuffs' },
      { at: [120, 200], to: [-80, 230], label: 'Fleece · 320 gsm' },
    ],
    dims: [{ from: [82, 215], to: [318, 215], label: 'A · ½ chest' }],
    fabric: 'fleece', hardware: 'eyelet',
    inside: ['M164 52 C166 14 234 14 236 52 L200 96 Z'],
    trims: ['M388 372 L352 384 L347 362 L383 350 Z', 'M12 372 L48 384 L53 362 L17 350 Z', 'M80 382 L320 382 L320 410 L80 410 Z'],
    panels: ['M128 262 L272 262 L292 352 L108 352 Z'],
    colorways: [{ name: 'Charcoal', hex: '#3A3C41' }, { name: 'Heather grey', hex: '#A5A7AA' }, { name: 'Olive', hex: '#5B6147' }, { name: 'Sand', hex: '#CBB38C' }],
  },
  jogger: {
    name: 'Fleece jogger',
    outline: ['M112 56 L288 56 L304 360 L304 404 L226 404 L226 360 L204 170 L200 160 L196 170 L174 360 L174 404 L96 404 L96 360 Z', 'M112 20 L288 20 L288 56 L112 56 Z'],
    seams: ['M304 360 L226 360', 'M174 360 L96 360', 'M200 56 L200 160', 'M284 64 L262 150', 'M116 64 L138 150'],
    stitches: ['M112 30 L288 30', 'M112 46 L288 46'],
    cords: ['M192 40 C188 70 180 86 176 100', 'M208 40 C212 70 220 86 224 100'],
    dots: [[192, 38, 3], [208, 38, 3]],
    callouts: [
      { at: [250, 38], to: [470, 10], label: 'Elastic waist · drawcord' },
      { at: [270, 110], to: [470, 120], label: 'Slant side pockets' },
      { at: [280, 390], to: [470, 400], label: 'Rib ankle cuff' },
    ],
    dims: [{ from: [112, 20], to: [288, 20], label: 'Waist relaxed', offset: -30 }, { from: [330, 56], to: [330, 404], label: 'Outseam' }],
    fabric: 'fleece', hardware: 'eyelet',
    trims: ['M112 20 L288 20 L288 56 L112 56 Z', 'M304 360 L304 404 L226 404 L226 360 Z', 'M174 360 L174 404 L96 404 L96 360 Z'],
    colorways: [{ name: 'Heather grey', hex: '#A9ABAE' }, { name: 'Black', hex: '#222326' }, { name: 'Navy', hex: '#24324C' }, { name: 'Olive', hex: '#596046' }],
  },
  legging: {
    name: 'Performance legging',
    outline: ['M114 62 L286 62 L262 404 L218 404 L204 176 L200 168 L196 176 L182 404 L138 404 Z', 'M114 16 L286 16 L286 62 L114 62 Z'],
    seams: ['M200 168 L210 184 L200 200 L190 184 Z', 'M200 62 L200 168', 'M248 62 C246 180 240 300 236 404', 'M152 62 C154 180 160 300 164 404'],
    stitches: ['M114 26 L286 26', 'M114 52 L286 52', 'M139 394 L181 394', 'M219 394 L261 394'],
    callouts: [
      { at: [250, 36], to: [470, 20], label: 'High-rise waistband' },
      { at: [205, 184], to: [470, 180], label: 'Diamond gusset' },
      { at: [245, 280], to: [470, 290], label: 'Flatlock seams' },
      { at: [150, 200], to: [-80, 200], label: 'Nylon-elastane' },
    ],
    dims: [{ from: [300, 16], to: [300, 404], label: 'Outseam' }],
    fabric: 'performance',
    panels: ['M114 16 L286 16 L286 62 L114 62 Z', 'M200 168 L210 184 L200 200 L190 184 Z'],
    colorways: [{ name: 'Black', hex: '#1F2024' }, { name: 'Olive', hex: '#4F5541' }, { name: 'Slate', hex: '#4A5567' }, { name: 'Mocha', hex: '#6D594D' }],
  },
  romper: {
    name: 'Baby romper',
    outline: ['M164 40 Q200 76 236 40 L292 58 L330 120 L300 136 L286 108 L294 300 C290 342 250 354 220 356 L180 356 C150 354 110 342 106 300 L114 108 L100 136 L70 120 L108 58 Z'],
    seams: ['M236 40 L258 64', 'M164 40 L142 64', 'M292 58 L286 108', 'M108 58 L114 108', 'M160 44 Q200 86 240 44'],
    stitches: ['M325 112 L297 127', 'M75 112 L103 127', 'M112 300 C120 334 150 344 180 346', 'M288 300 C280 334 250 344 220 346'],
    dots: [[186, 346, 4], [200, 346, 4], [214, 346, 4], [248, 60, 3], [152, 60, 3]],
    callouts: [
      { at: [250, 56], to: [470, 30], label: 'Envelope neck' },
      { at: [214, 346], to: [470, 360], label: 'Nickel-free snaps' },
      { at: [230, 220], to: [470, 210], label: 'Interlock · organic option' },
    ],
    dims: [{ from: [114, 150], to: [286, 150], label: 'A · ½ chest' }],
    fabric: 'jersey', hardware: 'snap',
    trims: ['M164 40 Q200 76 236 40 L240 44 Q200 86 160 44 Z'],
    colorways: [{ name: 'Ecru', hex: '#EDE6D6' }, { name: 'Sage', hex: '#A8B59A' }, { name: 'Blush', hex: '#D9B7AC' }, { name: 'Sky', hex: '#AEC2D2' }],
  },
};
