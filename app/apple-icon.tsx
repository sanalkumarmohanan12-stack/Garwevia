import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

/** Home-screen icon for iOS / Android: the GARWEVIA mark on the brand night background. */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const logo = await readFile(join(process.cwd(), 'public/logos/garwevia-light.png'), 'base64');
  // The mark sits at the left of the wordmark; show only that square.
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: '#060D18' }}>
        <div style={{ position: 'absolute', left: 37, top: 37, width: 106, height: 106, display: 'flex', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={`data:image/png;base64,${logo}`} alt="" width={560} height={187} style={{ position: 'absolute', left: -32, top: -34 }} />
        </div>
      </div>
    ),
    size,
  );
}
