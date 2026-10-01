/**
 * Business contact details — the single source for the contact page, footer and meeting page.
 * Links left empty render as "being set up" instead of a dead link.
 */
export const contact = {
  email: 'info@garwevia.com',
  phone: '+91-8546802097',
  phoneHref: 'tel:+918546802097',
  /** WhatsApp Business link (e.g. https://wa.me/message/XXXX or https://wa.me/918546802097). */
  whatsapp: 'https://wa.me/918546802097',
  /**
   * Microsoft Bookings page for info@garwevia.com — bookings land in that Outlook/Teams calendar and
   * each confirmation carries a Teams meeting link. Paste the public booking page URL here.
   */
  booking: '',
  address: ['62, Rayapuram Main Road', 'Tiruppur, Tamil Nadu', 'India — PIN 641601'],
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('62 Rayapuram Main Road, Tiruppur, Tamil Nadu 641601, India'),
};

export const mailHref = (subject?: string) => 'mailto:' + contact.email + (subject ? '?subject=' + encodeURIComponent(subject) : '');
