import Link from 'next/link';
import { Arrow, Icon, LinkedInIcon, WhatsAppIcon } from './components';
import { contact, mailHref } from './contact';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** Contact page: every way to reach the team. */
export function ContactChannels() {
  return (
    <div className="wrap channels">
      <a className="channel channel-lead" href={mailHref('Sourcing enquiry')}>
        <span className="channel-label"><Icon name="mail" /> Email us</span>
        <strong>{contact.email}</strong>
        <p>For enquiries, tech packs, trim cards, quotations and partnership questions.</p>
        <span className="channel-go">Write an email <Arrow /></span>
      </a>

      <a className="channel" href={contact.phoneHref}>
        <span className="channel-label"><Icon name="phone" /> Call</span>
        <strong>{contact.phone}</strong>
        <p>Speak directly with our team in Tiruppur (IST, UTC+5:30).</p>
        <span className="channel-go">Call now <Arrow /></span>
      </a>

      <a className="channel channel-wa" href={contact.whatsapp} {...external}>
        <span className="channel-label"><WhatsAppIcon size={22} /> WhatsApp</span>
        <strong>Chat with us</strong>
        <p>Quick questions, photos and reference garments — straight to our WhatsApp Business account.</p>
        <span className="channel-go">Open WhatsApp <Arrow /></span>
      </a>

      {contact.linkedin ? (
        <a className="channel channel-li" href={contact.linkedin} {...external}>
          <span className="channel-label"><LinkedInIcon size={22} /> LinkedIn</span>
          <strong>Follow GARWEVIA</strong>
          <p>Company updates, capabilities and new programs.</p>
          <span className="channel-go">Visit our page <Arrow /></span>
        </a>
      ) : (
        <div className="channel channel-li is-pending">
          <span className="channel-label"><LinkedInIcon size={22} /> LinkedIn</span>
          <strong>Follow GARWEVIA</strong>
          <p>Our LinkedIn company page is coming soon.</p>
          <span className="channel-go">Coming soon</span>
        </div>
      )}

      <a className="channel channel-visit" href={contact.mapsHref} {...external}>
        <span className="channel-label"><Icon name="pin" /> Visit us</span>
        <address>{contact.address.map(l => <span key={l}>{l}</span>)}</address>
        <p>Visits by appointment — in the heart of the Tiruppur knitwear cluster.</p>
        <span className="channel-go">Open in Maps <Arrow /></span>
      </a>

      <Link className="channel channel-brief" href="/start-a-project">
        <span className="channel-label"><Icon name="brief" /> Ready with a brief?</span>
        <strong>Send a sourcing brief</strong>
        <p>Upload your tech pack, quantities and target price. We come back with a manufacturing route and costing.</p>
        <span className="channel-go">Open the brief form <Arrow /></span>
      </Link>
    </div>
  );
}
