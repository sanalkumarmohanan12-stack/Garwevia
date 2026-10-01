import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GARWEVIA — Apparel Sourcing & Manufacturing',
    short_name: 'GARWEVIA',
    description: 'Knitwear sourcing and apparel manufacturing in Tiruppur, India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#060D18',
    theme_color: '#060D18',
    icons: [{ src: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  };
}
