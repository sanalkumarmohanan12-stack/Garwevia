import { renderOg, ogSize } from '../og';
import { seo } from '../seo';

export const alt = 'GARWEVIA — apparel sourcing and manufacturing in India';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = (seo[slug]?.title ?? 'Apparel sourcing & manufacturing in India').replace(/\s*\|\s*GARWEVIA$/, '');
  const kicker = slug.replace(/-/g, ' ');
  return renderOg(title, kicker);
}
