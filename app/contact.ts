/**
 * Business contact details — the single source for the contact page, footer, header and structured data.
 * Links left empty render as "coming soon" instead of a dead link.
 */
export const contact = {
  email: 'info@garwevia.com',
  phone: '+91-8546802097',
  phoneHref: 'tel:+918546802097',
  /** WhatsApp Business link. */
  whatsapp: 'https://wa.me/918546802097',
  /** LinkedIn company page, e.g. https://www.linkedin.com/company/garwevia — paste it here when ready. */
  linkedin: '',
  address: ['62, Rayapuram Main Road', 'Tiruppur, Tamil Nadu', 'India — PIN 641601'],
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('62 Rayapuram Main Road, Tiruppur, Tamil Nadu 641601, India'),
};

export const mailHref = (subject?: string) => 'mailto:' + contact.email + (subject ? '?subject=' + encodeURIComponent(subject) : '');
