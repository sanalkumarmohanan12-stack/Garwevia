import Link from 'next/link';
import { Arrow, Icon, WhatsAppIcon } from './components';
import { contact, mailHref } from './contact';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** Contact page: every way to reach the team, largest first. */
export function ContactChannels() {
  return (
    <div className="wrap">
      <div className="channels">
        <a className="channel channel-lead" href={mailHref('Sourcing enquiry')} data-reveal>
          <span className="channel-label"><Icon name="mail" /> Email us</span>
          <strong>{contact.email}</strong>
          <p>For enquiries, tech packs, quotations and partnership questions.</p>
          <span className="channel-go">Write an email <Arrow /></span>
        </a>

        <a className="channel" href={contact.phoneHref} data-reveal>
          <span className="channel-label"><Icon name="phone" /> Call</span>
          <strong>{contact.phone}</strong>
          <p>Speak directly with our team in Tiruppur (IST, UTC+5:30).</p>
          <span className="channel-go">Call now <Arrow /></span>
        </a>

        {contact.whatsapp ? (
          <a className="channel channel-wa" href={contact.whatsapp} {...external} data-reveal>
            <span className="channel-label"><WhatsAppIcon /> WhatsApp</span>
            <strong>Chat with us</strong>
            <p>Quick questions, photos and reference garments — straight to our WhatsApp Business account.</p>
            <span className="channel-go">Open WhatsApp <Arrow /></span>
          </a>
        ) : (
          <div className="channel channel-wa is-pending" data-reveal>
            <span className="channel-label"><WhatsAppIcon /> WhatsApp</span>
            <strong>Chat with us</strong>
            <p>Our WhatsApp Business line is being set up. Until then, email or call us.</p>
            <span className="channel-go">Coming soon</span>
          </div>
        )}

        <Link className="channel channel-meet" href="/schedule-a-meeting" data-reveal>
          <span className="channel-label"><Icon name="calendar" /> Schedule a meeting</span>
          <strong>Book a Teams call</strong>
          <p>Pick a 30-minute slot that suits your time zone. The invite arrives with a Microsoft Teams link.</p>
          <span className="channel-go">Choose a time <Arrow /></span>
        </Link>

        <a className="channel channel-visit" href={contact.mapsHref} {...external} data-reveal>
          <span className="channel-label"><Icon name="pin" /> Visit us</span>
          <address>{contact.address.map(l => <span key={l}>{l}</span>)}</address>
          <p>Visits by appointment — we are in the heart of the Tiruppur knitwear cluster.</p>
          <span className="channel-go">Open in Maps <Arrow /></span>
        </a>

        <Link className="channel channel-brief" href="/start-a-project" data-reveal>
          <span className="channel-label"><Icon name="brief" /> Ready with a brief?</span>
          <strong>Send a sourcing brief</strong>
          <p>Upload your tech pack, quantities and target price. We come back with a manufacturing route and costing.</p>
          <span className="channel-go">Open the brief form <Arrow /></span>
        </Link>
      </div>
    </div>
  );
}

/** Meeting page: Microsoft Bookings (Teams calendar of info@garwevia.com) or a fallback until it is connected. */
export function MeetingBooker() {
  return (
    <div className="wrap meet">
      <aside className="meet-info" data-reveal>
        <p className="kicker">What to expect</p>
        <ol>
          <li><b>30 minutes</b> on Microsoft Teams, video or audio — no install needed, it opens in your browser.</li>
          <li><b>Your time zone.</b> Available slots are shown in your local time.</li>
          <li><b>Instant invite.</b> The confirmation and Teams link land in your inbox and calendar.</li>
          <li><b>Come prepared.</b> A tech pack, reference image, target quantities or price helps us get specific.</li>
        </ol>
        <div className="meet-alt">
          <span>Prefer another way?</span>
          <a href={mailHref()}><Icon name="mail" /> {contact.email}</a>
          <a href={contact.phoneHref}><Icon name="phone" /> {contact.phone}</a>
          {contact.whatsapp && <a href={contact.whatsapp} {...external}><WhatsAppIcon size={22} /> WhatsApp</a>}
        </div>
      </aside>

      <div className="meet-book" data-reveal>
        {contact.booking ? (
          <>
            <iframe src={contact.booking} title="Book a meeting with GARWEVIA" loading="lazy" />
            <a className="meet-open" href={contact.booking} {...external}>Open the booking page in a new tab <Arrow /></a>
          </>
        ) : (
          <div className="meet-pending">
            <Icon name="calendar" />
            <h2>Online booking is being connected.</h2>
            <p>Until our calendar goes live, request a meeting by email with two or three times that suit you and your time zone. We confirm with a Microsoft Teams invite.</p>
            <a className="pill pill-sand" href={mailHref('Meeting request — GARWEVIA')}>Request a meeting <span className="pill-dot" /></a>
          </div>
        )}
      </div>
    </div>
  );
}
