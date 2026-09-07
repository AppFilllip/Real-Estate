import Link from 'next/link';
import { routes, site } from '@/lib/site';
import { ArrowGlyph, DisplayLines, Eyebrow } from './ui/brand';
import { EnquiryForm } from './enquiry-form';

/**
 * The enquiry block: known contact channels on the left, the form on a white
 * plate to the right. `heading` is dropped on /contact, where the page banner
 * has already carried the title.
 */
export function Contact({
  heading = true,
  defaultProject,
  projectList = false
}: {
  heading?: boolean;
  /** Preselects the project dropdown — used from a project detail page. */
  defaultProject?: string;
  /**
   * Lists the ongoing projects beneath the channels. Used on /contact, where
   * the channel list is short until Rajdhara supplies phone, email and office
   * — and where a visitor arriving cold benefits from seeing what there is to
   * ask about.
   */
  projectList?: boolean;
}) {
  const { contact } = site;

  // Only channels Rajdhara has actually supplied are rendered.
  const known = contact.channels.filter((c) => c.value);

  return (
    <section className="contact section" id="contact">
      <div className="container contact__grid">
        <div className="contact__lead">
          {/* Without the heading the block is sitting under a page banner or a
              section intro that has already said this — so the title and lede
              are dropped rather than repeated. */}
          {heading && (
            <>
              <Eyebrow className="reveal">{contact.eyebrow}</Eyebrow>
              <h2 className="display-2 reveal">
                <DisplayLines lines={contact.title} block="display-2" />
              </h2>
              <p className="lede contact__body reveal">{contact.body}</p>
            </>
          )}

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

            {/* Reassurance drawn from the approvals the projects actually
                carry — no claims beyond what the portfolio data states. */}
            <div className="channel">
              <dt className="channel__label">Assurances</dt>
              <dd className="channel__value">
                <ul className="channel__chips">
                  {site.credentials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          {projectList && (
            <div className="askabout reveal">
              <h3 className="askabout__title">Projects you can ask about</h3>
              <ul className="askabout__list">
                {site.projects.items.map((project) => (
                  <li key={project.id}>
                    <Link className="askabout__row" href={routes.project(project.id)}>
                      <span className="askabout__name">{project.name}</span>
                      <span className="askabout__type">{project.type}</span>
                      <ArrowGlyph className="askabout__glyph" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="contact__panel reveal">
          <EnquiryForm defaultProject={defaultProject} />
        </div>
      </div>
    </section>
  );
}

/**
 * What actually happens after an enquiry is sent — /contact only. Worth saying
 * plainly, since the form has no auto-reply behind it yet.
 */
export function WhatHappensNext() {
  const { expect, visit } = site.pages.contact;

  return (
    <section className="expect" aria-labelledby="expect-title">
      <div className="container expect__grid">
        <div className="expect__lead">
          <h2 className="expect__title" id="expect-title">
            {expect.title}
          </h2>
          <div className="expect__visit reveal">
            <h3 className="expect__visit-title">{visit.title}</h3>
            <p className="expect__visit-text">{visit.text}</p>
          </div>
        </div>

        <ol className="expect__steps">
          {expect.steps.map((step, i) => (
            <li
              className="estep reveal"
              key={step.title}
              style={{ '--reveal-i': i } as React.CSSProperties}
            >
              <span className="estep__index">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="estep__title">{step.title}</h3>
                <p className="estep__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
