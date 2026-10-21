import type { MetadataRoute } from 'next';
import { SITE } from './seo';
import { landings } from './landing';

const updated = new Date('2026-10-21');
const routes: [string, number][] = [
  ['', 1], ['products', 0.9], ['start-a-project', 0.9], ['manufacturing-network', 0.8], ['quality-assurance', 0.8],
  ['compliance-sustainability', 0.8], ['product-development', 0.8], ['sourcing-services', 0.8], ['how-it-works', 0.7],
  ['about', 0.7], ['knitwear-glossary', 0.6], ['contact', 0.7],
  ...landings.map(l => [l.slug, 0.9] as [string, number]),
  ['privacy-policy', 0.2], ['terms-of-use', 0.2], ['cookie-policy', 0.2],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(([route, priority]) => ({ url: route ? `${SITE}/${route}` : SITE, lastModified: updated, changeFrequency: 'monthly', priority }));
}
