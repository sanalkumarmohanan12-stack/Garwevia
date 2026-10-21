/**
 * Product specifications shown on the Products page.
 * Category defaults (sizes, fits, decoration, finishes, tests) + per-style fabric, weight and construction.
 * Commercial figures are indicative and are confirmed per brief — edit `commercial` to change them site-wide.
 */
export type StyleSpec = { fabric: string; gsm: string; details: string[] };
export type CategorySpec = { sizes: string; fits: string; decoration: string; finishes: string; tests: string };

export const commercial = {
  moq: 'From 300 pcs per style per colour on custom-dyed fabric; lower on stock fabrics',
  sampling: '2–3 weeks per sample round',
  bulk: '45–75 days after PP approval and fabric booking',
  note: 'Indicative figures for planning. MOQ, timelines and prices are confirmed in your quotation.',
};

export const categorySpecs: Record<string, CategorySpec> = {
  tops: { sizes: 'XS–5XL · unisex, men, women', fits: 'Regular, slim, relaxed, oversized, boxy', decoration: 'Screen, water-based, puff, DTF, embroidery, garment dye', finishes: 'Enzyme, silicone, garment wash, peach', tests: 'Shrinkage, spirality, colourfastness, pilling' },
  fleece: { sizes: 'XS–4XL · unisex, men, women, kids', fits: 'Regular, relaxed, oversized, cropped', decoration: 'Screen, puff, embroidery, appliqué, chenille patch', finishes: 'Brushed, unbrushed, enzyme, garment dye', tests: 'Pilling, shrinkage, colourfastness to rubbing' },
  women: { sizes: 'XXS–3XL · regular & petite on request', fits: 'Bodycon, fitted, relaxed, cropped, wide-leg', decoration: 'Tonal print, embroidery, lace or rib trim', finishes: 'Silicone soft, enzyme, garment dye', tests: 'Stretch & recovery, opacity, pilling, shrinkage' },
  'kids-baby': { sizes: 'Preemie–24 M · 2–14 Y', fits: 'Age-graded, room-to-grow options', decoration: 'Water-based print, embroidery, appliqué', finishes: 'Soft-hand, enzyme; nickel-free trims', tests: 'Saliva, cords & drawstrings, snap pull, small parts' },
  performance: { sizes: 'XS–3XL · men, women', fits: 'Compression, slim, athletic, relaxed', decoration: 'Heat transfer, reflective, sublimation, silicone', finishes: 'Moisture-wicking, quick-dry, anti-odour on request', tests: 'Stretch & recovery, abrasion, bursting, chlorine' },
  underwear: { sizes: 'XS–3XL · multipacks available', fits: 'Brief, hipster, trunk, boxer, relaxed sleep', decoration: 'Jacquard waistband, heat-transfer labels, tonal print', finishes: 'Silicone soft, bio-wash', tests: 'pH, stretch & recovery, shrinkage, colourfastness' },
};

export const styleSpecs: Record<string, StyleSpec> = {
  // Tops & layers
  'Crew-neck T-shirt': { fabric: 'Single jersey · combed / compact cotton', gsm: '140–220', details: ['1×1 rib neck', 'Shoulder tape', 'Twin-needle hems'] },
  'V-neck T-shirt': { fabric: 'Single jersey · cotton or cotton-modal', gsm: '140–180', details: ['Mitred V-neck rib', 'Shoulder tape', 'Twin-needle hems'] },
  'Oversized / boxy T-shirt': { fabric: 'Heavy single jersey · combed cotton', gsm: '220–280', details: ['Drop shoulder', 'Wide 2×2 rib neck', 'Garment-dye ready'] },
  'Raglan & ringer tee': { fabric: 'Single jersey · contrast rib', gsm: '160–200', details: ['Raglan sleeves', 'Contrast neck & cuff', 'Flatlock options'] },
  'Polo shirt': { fabric: 'Piqué or Lacoste · cotton / poly-cotton', gsm: '200–240', details: ['Flat-knit or self collar', '2–3 button placket', 'Side vents'] },
  'Rugby shirt': { fabric: 'Heavy jersey · yarn-dyed stripe option', gsm: '260–320', details: ['Twill collar', 'Rubber or horn buttons', 'Reinforced placket'] },
  'Henley': { fabric: 'Slub or waffle jersey', gsm: '160–220', details: ['3-button placket', 'Long or short sleeve', 'Garment-dye ready'] },
  'Tank top & vest': { fabric: 'Single jersey or rib', gsm: '140–180', details: ['Binding or rib arm/neck', 'Racer or classic back', 'Coverstitch hems'] },
  'Long-sleeve top': { fabric: 'Single jersey · cotton / cotton-modal', gsm: '160–200', details: ['Rib cuffs', 'Crew or mock neck', 'Thumbhole option'] },
  'Thermal waffle top': { fabric: 'Waffle / thermal knit', gsm: '200–260', details: ['Rib cuffs and hem', 'Henley or crew neck', 'Flatlock seams'] },
  // Sweats & bottoms
  'Pullover hoodie': { fabric: 'Brushed fleece or French terry', gsm: '280–450', details: ['Double-layer hood', 'Kangaroo pocket', '2×2 rib cuffs & hem'] },
  'Zip-through hoodie': { fabric: 'Brushed fleece or French terry', gsm: '280–400', details: ['Metal or coil zip', 'Lined hood', 'Split kangaroo pockets'] },
  'Crew sweatshirt': { fabric: 'French terry or fleece', gsm: '280–400', details: ['V-insert option', 'Rib neck, cuffs & hem', 'Set-in or raglan'] },
  'Half-zip sweatshirt': { fabric: 'French terry or fleece', gsm: '280–380', details: ['Stand collar', 'Zip guard', 'Rib cuffs & hem'] },
  'Track jacket': { fabric: 'Interlock, tricot or terry', gsm: '240–320', details: ['Full zip', 'Side-seam pockets', 'Contrast taping option'] },
  'Jogger': { fabric: 'Brushed fleece or French terry', gsm: '280–400', details: ['Elastic + drawcord waist', 'Side & back pockets', 'Rib ankle cuff'] },
  'Sweatpant': { fabric: 'Fleece or French terry', gsm: '280–400', details: ['Open or elastic hem', 'Drawcord waist', 'Pocket options'] },
  'Knit short': { fabric: 'French terry or jersey', gsm: '220–320', details: ['Elastic + drawcord', 'Side pockets', 'Raw or hemmed edge'] },
  'Co-ord set': { fabric: 'Matching terry, fleece or rib', gsm: '220–380', details: ['Top + bottom shade-matched', 'Same dye lot', 'Set packing'] },
  // Women & lounge
  'Rib-knit top': { fabric: '2×2 or 1×1 rib · cotton elastane', gsm: '180–240', details: ['Fitted body', 'Scoop, square or crew neck', 'Self binding'] },
  'Crop top': { fabric: 'Rib or stretch jersey', gsm: '160–220', details: ['Cropped length', 'Double-layer option', 'Clean finish'] },
  'Bodysuit': { fabric: 'Stretch jersey or rib', gsm: '180–240', details: ['Snap gusset', 'Thong or full back', 'Bonded edges option'] },
  'Jersey dress': { fabric: 'Viscose / cotton-modal jersey', gsm: '160–220', details: ['Midi or maxi', 'Side slit option', 'Opacity checked'] },
  'Knit skirt': { fabric: 'Rib or ponte interlock', gsm: '220–300', details: ['Elastic waist', 'Pencil or A-line', 'Lining option'] },
  'Legging': { fabric: 'Cotton elastane or ponte', gsm: '200–280', details: ['High-rise waistband', 'Gusset', 'Squat-proof opacity'] },
  'Wide-leg knit pant': { fabric: 'Rib, interlock or ponte', gsm: '220–300', details: ['Elastic waist', 'Pressed seams', 'Pocket option'] },
  'Loungewear set': { fabric: 'Modal, rib or brushed jersey', gsm: '180–260', details: ['Top + bottom', 'Matching dye lot', 'Gift packing option'] },
  'Knit cardigan layer': { fabric: 'Rib, waffle or pointelle', gsm: '220–300', details: ['Button or open front', 'Rib bands', 'Patch pockets option'] },
  'Maternity & nursing top': { fabric: 'Stretch jersey · cotton modal', gsm: '160–200', details: ['Nursing access layer', 'Side ruching', 'Extra length'] },
  // Kids & baby
  'Baby bodysuit': { fabric: 'Interlock or single jersey · organic option', gsm: '160–200', details: ['Envelope neck', 'Nickel-free snaps', 'Short / long sleeve'] },
  'Baby romper': { fabric: 'Interlock, jersey or muslin-look', gsm: '160–220', details: ['Snap legs', 'Footed or footless', 'Soft-hand print'] },
  'Sleepsuit': { fabric: 'Interlock · organic cotton option', gsm: '180–220', details: ['Zip or snap front', 'Fold-over mitts', 'Footed'] },
  'Playsuit': { fabric: 'Jersey or French terry', gsm: '180–260', details: ['Snap crotch', 'Shoulder snaps', 'Pocket option'] },
  'Kids T-shirt': { fabric: 'Single jersey', gsm: '140–180', details: ['Rib neck', 'Age-graded fit', 'Water-based print'] },
  'Kids hoodie & jogger': { fabric: 'Fleece or French terry', gsm: '260–320', details: ['No hood drawcords', 'Rib cuffs', 'Matching set'] },
  'Kids pajama set': { fabric: 'Interlock or jersey', gsm: '160–200', details: ['Snug fit (US sleepwear)', 'Covered elastic', 'Set packing'] },
  'School polo': { fabric: 'Piqué · poly-cotton', gsm: '200–220', details: ['Fade-resistant colour', 'Embroidered crest', 'Name-tape label'] },
  'Baby leggings': { fabric: 'Cotton elastane or interlock', gsm: '180–220', details: ['Soft covered waist', 'Footed option', 'Nappy room'] },
  // Active & performance
  'Training T-shirt': { fabric: 'Poly or poly-elastane performance jersey', gsm: '130–170', details: ['Moisture-wicking', 'Flatlock seams', 'Reflective print option'] },
  'Long-sleeve training top': { fabric: 'Poly-elastane jersey', gsm: '150–190', details: ['Thumbholes', 'Raglan sleeves', 'Mesh panels'] },
  'Performance legging': { fabric: 'Nylon or poly elastane', gsm: '220–300', details: ['High-rise waistband', 'Hidden pocket', 'Gusset, squat-proof'] },
  'Sports bra': { fabric: 'Nylon elastane', gsm: '200–260', details: ['Removable pads', 'Racer or cross back', 'Bonded elastic'] },
  'Cycling short': { fabric: 'Nylon or poly elastane', gsm: '220–280', details: ['Wide waistband', 'Gripper hem', 'Side pocket'] },
  'Track pant': { fabric: 'Interlock, tricot or poly jersey', gsm: '200–260', details: ['Zip pockets', 'Ankle zip option', 'Tapered leg'] },
  'Compression base layer': { fabric: 'Poly or nylon elastane', gsm: '180–240', details: ['Compression fit', 'Flatlock seams', 'Anti-chafe'] },
  'Athleisure set': { fabric: 'Scuba, interlock or peached jersey', gsm: '220–320', details: ['Top + bottom', 'Matching dye lot', 'Tonal branding'] },
  // Underwear & sleep
  'Men’s brief': { fabric: 'Cotton elastane jersey', gsm: '160–200', details: ['Branded jacquard waistband', 'Front pouch', 'Multipack'] },
  'Trunk & boxer brief': { fabric: 'Cotton or modal elastane', gsm: '170–210', details: ['Contoured pouch', 'Flatlock seams', 'Multipack'] },
  'Women’s brief': { fabric: 'Cotton elastane or modal', gsm: '150–190', details: ['Bikini, hipster or full', 'Cotton gusset', 'Bonded edge option'] },
  'Camisole & vest': { fabric: 'Rib or modal jersey', gsm: '150–200', details: ['Adjustable straps option', 'Lace trim option', 'Clean finish'] },
  'Knit undershirt': { fabric: 'Rib or single jersey', gsm: '140–180', details: ['Crew or V-neck', 'Tag-free label', 'Multipack'] },
  'Thermal base layer': { fabric: 'Brushed interlock or waffle', gsm: '200–260', details: ['Top + leggings', 'Flatlock seams', 'Warm brushed back'] },
  'Pajama set': { fabric: 'Jersey, interlock or modal', gsm: '160–220', details: ['Covered elastic waist', 'Piping option', 'Set packing'] },
  'Sleep short & tee': { fabric: 'Jersey or modal', gsm: '150–190', details: ['Relaxed fit', 'Matching set', 'Gift box option'] },
  'Night dress': { fabric: 'Modal or cotton jersey', gsm: '150–180', details: ['Relaxed fit', 'Lace or rib trim option', 'Opacity checked'] },
};

const fallback: StyleSpec = { fabric: 'Specified to your brief', gsm: 'To brief', details: ['Construction to your tech pack'] };
export const specFor = (name: string) => styleSpecs[name] ?? fallback;
