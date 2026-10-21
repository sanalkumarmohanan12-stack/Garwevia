/**
 * Per-product photos. Drop a file named `<slug>.webp` (or .jpg/.png) into public/images/products/
 * and it is picked up automatically; until then callers fall back to a category photo or icon.
 * Server-only (reads the file system at build / request time).
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const slugify = (name: string) =>
  name.toLowerCase().replace(/[’']/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const dir = join(process.cwd(), 'public', 'images', 'products');

/** Public URL of the product photo for `name`, or null when it has not been added yet. */
export function productImage(name: string): string | null {
  const slug = slugify(name);
  for (const ext of ['webp', 'jpg', 'jpeg', 'png']) {
    if (existsSync(join(dir, `${slug}.${ext}`))) return `/images/products/${slug}.${ext}`;
  }
  return null;
}

export const imageMap = (names: string[]) => Object.fromEntries(names.map(n => [n, productImage(n)]));
