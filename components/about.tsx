import Image from 'next/image';
import { site } from '@/lib/site';
import { DisplayLines, Eyebrow } from './ui/brand';

/**
 * Two-column editorial spread. The statement column holds the display title and
 * an image that bleeds off the left edge of the viewport; the narrative column
 * carries the story and a hairline-ruled set of principles — no cards.
 */
export function About() {
  const { about } = site;

  return (
    <section className="about section" id="about">
      <div className="container about__grid">
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
        </div>

        <figure className="about__figure reveal">
          <Image
            src={about.image}
            alt={about.imageAlt}
            fill
            sizes="(max-width: 1023px) 100vw, 46vw"
          />
        </figure>

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
