import { renderOg, ogSize } from './og';

export const alt = 'GARWEVIA — knitwear sourcing and apparel manufacturing in Tiruppur, India';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return renderOg('Your apparel, made right in India.', 'Apparel sourcing & manufacturing');
}
