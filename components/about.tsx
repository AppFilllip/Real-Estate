import Image from 'next/image';
import { site } from '@/lib/site';
import { DisplayLines, Eyebrow, LinkArrow } from './ui/brand';

/**
 * Two-column editorial spread. The statement column holds the display title and
 * an image that bleeds off the left edge of the viewport; the narrative column
 * carries the story and a hairline-ruled set of principles — no cards.
 *
 * On the home page it closes with a link through to /about; the about page
 * itself renders it without one.
 */
export function About({ withLink = true }: { withLink?: boolean }) {
  const { about } = site;

  return (
    <section className="about section" id="about">
      <div className="container about__grid">
        <div className="about__media">
          <figure className="about__figure reveal">
            <Image
              src={about.image}
              alt={about.imageAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 46vw"
            />
          </figure>
        </div>

        <div className="about__content">
          <div className="about__statement">
            <Eyebrow className="reveal">{about.eyebrow}</Eyebrow>
            <h2 className="display-2 about__title reveal">
              <DisplayLines lines={about.title} block="about__title" />
            </h2>
          </div>

          <div className="about__narrative">
            {about.body.map((para, i) => (
              <p
                className="about__para lede reveal"
                key={para.slice(0, 24)}
                style={{ '--reveal-i': i } as React.CSSProperties}
              >
                {para}
              </p>
            ))}
            {withLink && <LinkArrow link={about.more} className="about__more reveal" />}
          </div>

          <ul className="about__principles">
            {about.principles.map((principle, i) => (
              <li
                className="principle reveal"
                key={principle.title}
                style={{ '--reveal-i': i } as React.CSSProperties}
              >
                <span className="principle__index">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="principle__title">{principle.title}</h3>
                  <p className="principle__text">{principle.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Stats strip. Only stats with a real value render — see lib/site.ts. Anything
 * still pending is emitted as an HTML comment for whoever maintains the page,
 * never as a guessed number for a visitor.
 */
export function Stats() {
  const ready = site.stats.filter((s) => s.value !== null);
  const pending = site.stats.filter((s) => s.value === null);
  if (!ready.length) return null;

  return (
    <section className="stats" aria-label="Company at a glance">
      {pending.length > 0 && (
        <div
          hidden
          data-pending-stats={pending.map((s) => `${s.label} — ${s.note}`).join('; ')}
        />
      )}
      <div className="container">
        <ul className="stats__list">
          {ready.map((stat, i) => (
            <li
              className="stat reveal"
              key={stat.label}
              style={{ '--reveal-i': i } as React.CSSProperties}
            >
              <p className="stat__value">
                <span data-count-to={stat.value ?? 0} data-count-pad="2">
                  {String(stat.value).padStart(2, '0')}
                </span>
                {stat.suffix ? <span className="stat__suffix">{stat.suffix}</span> : null}
              </p>
              <p className="stat__label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===========================================================================
   Sections below appear on /about only.
   ======================================================================== */

/**
 * The long-form company story: a sticky display title against a measured
 * column of body copy, the same left-heavy composition the home page uses but
 * given the full width of the page.
 */
export function Story() {
  const { story } = site.pages.about;

  return (
    <section className="story section">
      <div className="container story__grid">
        <div className="story__lead">
          <Eyebrow className="reveal">{story.eyebrow}</Eyebrow>
          <h2 className="display-2 reveal">
            <DisplayLines lines={story.title} block="display-2" />
          </h2>
        </div>

        <div className="story__body">
          {story.body.map((para, i) => (
            <p
              className="story__para reveal"
              key={para.slice(0, 24)}
              style={{ '--reveal-i': i } as React.CSSProperties}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Vision and mission, set as two large statements on the surface rather than as
 * boxed cards — the display face carries them, the way the pull-quote does in
 * the leadership header.
 */
export function Pillars() {
  const { pillars } = site.pages.about;

  return (
    <section className="pillars" aria-label="Vision and mission">
      <div className="container pillars__grid">
        {pillars.map((pillar, i) => (
          <article
            className="pillar reveal"
            key={pillar.label}
            style={{ '--reveal-i': i } as React.CSSProperties}
          >
            <p className="pillar__label">{pillar.label}</p>
            <h2 className="pillar__title">{pillar.title}</h2>
            <p className="pillar__text">{pillar.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * The five-stage sequence, drawn as a numbered ladder with a rule running down
 * its left edge — a process reads as a sequence, so it is laid out as one
 * rather than as a row of equal tiles.
 */
export function Approach() {
  const { approach } = site.pages.about;

  return (
    <section className="approach section">
      <div className="container approach__grid">
        <div className="approach__lead">
          <Eyebrow className="reveal">{approach.eyebrow}</Eyebrow>
          <h2 className="display-2 reveal">
            <DisplayLines lines={approach.title} block="display-2" />
          </h2>
          <p className="approach__intro reveal">{approach.intro}</p>
        </div>

        <ol className="steps">
          {approach.steps.map((step, i) => (
            <li
              className="step reveal"
              key={step.title}
              style={{ '--reveal-i': i % 3 } as React.CSSProperties}
            >
              <span className="step__index">{String(i + 1).padStart(2, '0')}</span>
              <div className="step__body">
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Why-us grid — hairline-ruled cells on white, no shadows, no boxes.
 *
 * `withLink` points through to the full /why-choose-us page; dropped on that
 * page itself, since linking to the page you're already on serves no one.
 */
export function Differences({ withLink = true }: { withLink?: boolean } = {}) {
  const { differences } = site.pages.about;

  return (
    <section className="diffs section">
      <div className="container">
        <header className="section-head">
          <div className="section-head__lead">
            <Eyebrow className="reveal">{differences.eyebrow}</Eyebrow>
            <h2 className="display-2 reveal">
              <DisplayLines lines={differences.title} block="display-2" />
            </h2>
            {withLink && (
              <LinkArrow link={differences.more} className="diffs__more reveal" />
            )}
          </div>
        </header>

        <ul className="diffs__grid">
          {differences.items.map((item, i) => (
            <li
              className="diff reveal"
              key={item.title}
              style={{ '--reveal-i': i % 3 } as React.CSSProperties}
            >
              <h3 className="diff__title">{item.title}</h3>
              <p className="diff__text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
