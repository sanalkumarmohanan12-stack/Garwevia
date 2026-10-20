const sharp = require('sharp');
const path = require('path');

const source = 'C:/Users/sanal/.codex/generated_images/01a157d2-1aa1-7443-8553-7c09936d31dd';
const photos = {
  'manufacturing-hero': 'exec-808c8b66-db90-4039-8e08-b30994f0910d.png',
  'sewing-operator': 'exec-37cbb71f-911e-4aa4-aa83-ff708c18fe9a.png',
  'about-factory-new': 'exec-3f826746-e9cd-41ef-b11b-fac407cb1b1f.png',
  'sewing-lines': 'exec-3c212208-20eb-48b1-b656-1c9254084a9c.png',
  'knitting-machines': 'exec-a0cdae4c-b7c1-487a-9d8a-6534898b5b7f.png',
  'fabric-cutting': 'exec-b97e6b8b-c4ae-47ce-8dcf-07127a8b433d.png',
  'quality-inspection': 'exec-ade2d945-82f8-46d4-86fa-f7b9c6d4add6.png',
  packing: 'exec-b353634a-7fca-4794-a38e-8fb83628bcd1.png',
  'fabric-handling': 'exec-391824e2-fadf-4163-aa01-41e346e87e9c.png',
};

Promise.all(Object.entries(photos).map(async ([name, filename]) => {
  const destination = path.join('public/images', `${name}.webp`);
  await sharp(path.join(source, filename)).webp({ quality: 84, effort: 6 }).toFile(destination);
  console.log(destination);
})).catch(error => { console.error(error); process.exitCode = 1; });
