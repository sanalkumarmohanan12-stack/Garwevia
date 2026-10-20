/** Shared renderer for the link-preview images (Open Graph / Twitter), 1200×630. */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

export async function renderOg(title: string, kicker: string) {
  const logo = await readFile(join(process.cwd(), 'public/logos/garwevia-dark.png'), 'base64');
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: 'linear-gradient(180deg, #F7F4EE 0%, #FFFFFF 100%)', color: '#0A2A55', borderBottom: '14px solid #0A2A55' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={`data:image/png;base64,${logo}`} alt="" height={96} style={{ objectFit: 'contain' }} />
          <div style={{ display: 'flex', padding: '10px 20px', border: '2px solid #C9A35E', borderRadius: 999, color: '#8A6424', fontSize: 22, letterSpacing: 2 }}>TIRUPPUR · INDIA</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', color: '#8A6424', fontSize: 26, letterSpacing: 4, textTransform: 'uppercase' }}>{kicker}</div>
          <div style={{ display: 'flex', fontSize: title.length > 60 ? 54 : 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1040 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#576274' }}>
          <span>Knitwear · Accessories & trims · Quality · Certifications</span>
          <span style={{ color: '#8A6424' }}>garwevia.com</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
