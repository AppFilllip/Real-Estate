import Image from 'next/image';
import { site } from '@/lib/site';
import { ArrowArc, ButtonLink, DisplayLines, Eyebrow } from './ui/brand';

/**
 * Large portrait plates on a staggered baseline. The supplied photographs vary
 * a lot in framing and setting, so each carries its own focal point and the set
 * is unified by a light desaturation that lifts to full colour on hover.
 *
 * The company statement runs as a pull-quote in the section header — set in the
 * page's display face, deliberately not boxed like a testimonial.
 */
export function Leadership() {
  const { leadership } = site;

  return (
    <section className="leadership section" id="leadership">
      <div className="container">
        <header className="section-head section-head--quote">
          <div className="section-head__lead">
            <Eyebrow className="reveal">{leadership.eyebrow}</Eyebrow>
            <h2 className="display-2 reveal">
              <DisplayLines lines={leadership.title} block="display-2" />
            </h2>
          </div>

          <blockquote className="pullquote reveal">
            <p>{leadership.quote}</p>
            <footer>
              <cite>{leadership.quoteSource}</cite>
            </footer>
          </blockquote>
        </header>

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
              </div>
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
