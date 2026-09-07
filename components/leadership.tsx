import Image from 'next/image';
import { site } from '@/lib/site';
import { ArrowArc, ButtonLink, DisplayLines, Eyebrow, LinkArrow } from './ui/brand';

/**
 * Large portrait plates on a staggered baseline. The supplied photographs vary
 * a lot in framing and setting, so each carries its own focal point and the set
 * is unified by a light desaturation that lifts to full colour on hover.
 *
 * The company statement runs as a pull-quote in the section header — set in the
 * page's display face, deliberately not boxed like a testimonial.
 *
 * `heading` is dropped on /leadership, where the page banner has already
 * introduced the section; the pull-quote stays either way.
 */
export function Leadership({
  heading = true,
  withLink = true
}: {
  heading?: boolean;
  withLink?: boolean;
}) {
  const { leadership } = site;

  return (
    <section className="leadership section" id="leadership">
      <div className="container">
        {heading ? (
          <header className="section-head section-head--quote">
            <div className="section-head__lead">
              <Eyebrow className="reveal">{leadership.eyebrow}</Eyebrow>
              <h2 className="display-2 reveal">
                <DisplayLines lines={leadership.title} block="display-2" />
              </h2>
              {withLink && (
                <LinkArrow link={leadership.more} className="leadership__more reveal" />
              )}
            </div>

            <blockquote className="pullquote reveal">
              <p>{leadership.quote}</p>
              <footer>
                <cite>{leadership.quoteSource}</cite>
              </footer>
            </blockquote>
          </header>
        ) : (
          <blockquote className="pullquote pullquote--wide reveal">
            <p>{leadership.quote}</p>
            <footer>
              <cite>{leadership.quoteSource}</cite>
            </footer>
          </blockquote>
        )}

        <ul className="leaders">
          {leadership.people.map((person, i) => (
            <li
              className="leader reveal"
              key={person.name}
              style={{ '--reveal-i': i } as React.CSSProperties}
            >
              <figure className="leader__figure">
                <Image
                  src={person.image}
                  alt={person.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 32vw"
                  style={
                    {
                      '--lz': person.zoom,
                      '--lo': person.origin
                    } as React.CSSProperties
                  }
                />
                <span className="leader__scrim" aria-hidden="true" />
              </figure>
              <div className="leader__meta">
                <h3 className="leader__name">{person.name}</h3>
                <p className="leader__role">
                  <span className="leader__dot" aria-hidden="true" />
                  {person.role}
                </p>
                {/* Biographies render only once supplied — see lib/site.ts. */}
                {person.bio && <p className="leader__bio">{person.bio}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** How the company operates — /leadership only. */
export function Values() {
  const { values } = site.pages.leadership;

  return (
    <section className="values section">
      <div className="container">
        <header className="section-head">
          <div className="section-head__lead">
            <Eyebrow className="reveal">{values.eyebrow}</Eyebrow>
            <h2 className="display-2 reveal">
              <DisplayLines lines={values.title} block="display-2" />
            </h2>
          </div>
          <div className="section-head__aside reveal">
            <p>{values.intro}</p>
          </div>
        </header>

        <ul className="values__grid">
          {values.items.map((item, i) => (
            <li
              className="value reveal"
              key={item.title}
              style={{ '--reveal-i': i } as React.CSSProperties}
            >
              <span className="value__rule" aria-hidden="true" />
              <h3 className="value__title">{item.title}</h3>
              <p className="value__text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The one deep-navy band on an otherwise light page. */
export function ClosingCta() {
  const { closing } = site;

  return (
    <section className="closing" aria-labelledby="closing-title">
      <span className="closing__grid" aria-hidden="true" />
      <ArrowArc className="closing__arc" />

      <div className="container closing__inner">
        <Eyebrow className="eyebrow--invert reveal">{closing.eyebrow}</Eyebrow>
        <h2 className="display-2 closing__title reveal" id="closing-title">
          <DisplayLines lines={closing.title} block="closing__title" />
        </h2>
        <p className="lede closing__body reveal">{closing.body}</p>
        <div className="closing__actions reveal">
          <ButtonLink link={closing.primary} kind="accent" />
          <ButtonLink link={closing.secondary} kind="ghost-invert" />
        </div>
      </div>
    </section>
  );
}
