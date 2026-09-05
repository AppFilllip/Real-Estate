import { site } from '@/lib/site';
import { DisplayLines, Eyebrow } from './ui/brand';
import { EnquiryForm } from './enquiry-form';

export function Contact() {
  const { contact } = site;

  // Only channels Rajdhara has actually supplied are rendered.
  const known = contact.channels.filter((c) => c.value);

  return (
    <section className="contact section" id="contact">
      <div className="container contact__grid">
        <div className="contact__lead">
          <Eyebrow className="reveal">{contact.eyebrow}</Eyebrow>
          <h2 className="display-2 reveal">
            <DisplayLines lines={contact.title} block="display-2" />
          </h2>
          <p className="lede contact__body reveal">{contact.body}</p>

          <dl className="channels reveal">
            {known.map((channel) => (
              <div className="channel" key={channel.label}>
                <dt className="channel__label">{channel.label}</dt>
                <dd className="channel__value">
                  {channel.href ? (
                    <a href={channel.href}>{channel.value}</a>
                  ) : (
                    channel.value
                  )}
                </dd>
              </div>
            ))}

            <div className="channel">
              <dt className="channel__label">Coverage</dt>
              <dd className="channel__value">{contact.coverage}</dd>
            </div>
          </dl>
        </div>

        <div className="contact__panel reveal">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
