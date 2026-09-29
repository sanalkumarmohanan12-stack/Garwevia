import type { MetadataRoute } from 'next';
const routes=['','about','products','sourcing-services','product-development','manufacturing-network','quality-assurance','compliance-sustainability','how-it-works','start-a-project','contact','privacy-policy','terms-of-use','cookie-policy'];
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||'https://garwevia.com';return routes.map(route=>({url:`${base}/${route}`,lastModified:new Date(),changeFrequency:'monthly',priority:route===''?1:.7}))}
