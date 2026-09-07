import Image from 'next/image';
import Link from 'next/link';
import { routes, site, type Project } from '@/lib/site';
import { ArrowGlyph, Eyebrow, LinkArrow, Pin } from './ui/brand';
import { Breadcrumbs } from './page-hero';

/**
 * Project detail banner: a full-bleed plate carrying the render, with the name,
 * location and type on a white plate straddling its lower edge — the same
 * seam-straddling move the home hero makes with its counter card, so a detail
 * page reads as part of the same site rather than as a template.
 */
export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="phero" aria-labelledby="phero-title">
      <div className="phero__plate">
        <Image
          className="phero__image"
          src={project.image}
          alt={project.alt}
          fill
          sizes="100vw"
          priority
          style={
            { objectPosition: project.focal, '--zoom': project.zoom } as React.CSSProperties
          }
        />
        <span className="phero__tint" aria-hidden="true" />
      </div>

      <div className="container phero__inner">
        <div className="phero__crumbs">
          <Breadcrumbs
            trail={[
              { label: 'Projects', href: routes.projects },
              { label: project.name }
            ]}
          />
        </div>

        <div className="phero__card">
          <p className="phero__type">
            <span className="phero__dot" aria-hidden="true" />
            {project.type}
            <span className="phero__status">Ongoing</span>
          </p>

          <h1 className="display-2 phero__title" id="phero-title">
            {project.name}
          </h1>

          <p className="phero__loc">
            <Pin />
            <span>{project.location}</span>
          </p>

          <p className="phero__summary">{project.summary}</p>

          <ul className="phero__tags">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Overview prose beside the specification table. Rows whose value is still null
 * are skipped, and the note beneath the table says plainly where those numbers
 * come from instead — see lib/site.ts.
 */
export function ProjectBody({ project }: { project: Project }) {
  const copy = site.pages.project;
  const known = project.facts.filter((f) => f.value);
  const pending = project.facts.filter((f) => !f.value);

  return (
    <section className="pbody section">
      <div className="container pbody__grid">
        <div className="pbody__prose">
          <h2 className="pbody__title reveal">{copy.overviewTitle}</h2>
          {project.overview.map((para, i) => (
            <p
              className="pbody__para reveal"
              key={para.slice(0, 24)}
              style={{ '--reveal-i': i } as React.CSSProperties}
            >
              {para}
            </p>
          ))}

          <h2 className="pbody__title pbody__title--spaced reveal">{copy.featuresTitle}</h2>
          <ul className="pfeatures">
            {project.features.map((feature, i) => (
              <li
                className="pfeature reveal"
                key={feature.title}
                style={{ '--reveal-i': i } as React.CSSProperties}
              >
                <span className="pfeature__index">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="pfeature__title">{feature.title}</h3>
                  <p className="pfeature__text">{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="pspec reveal">
          <h2 className="pspec__title">{copy.factsTitle}</h2>
          <dl className="pspec__list">
            {known.map((fact) => (
              <div className="pspec__row" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          {pending.length > 0 && (
            <p className="pspec__note">
              {copy.pendingNote}
              {/* The specific rows still awaiting data, for whoever maintains
                  the site — never shown as blanks to a visitor. */}
              <span hidden data-pending-facts={pending.map((f) => f.label).join(', ')} />
            </p>
          )}

          <Link className="btn btn--primary btn--block pspec__cta" href={routes.contact}>
            <span>Enquire About This Project</span>
            <ArrowGlyph className="btn__glyph" />
          </Link>
        </aside>
      </div>
    </section>
  );
}

/** The rest of the portfolio, as a horizontal index at the foot of a detail page. */
export function AlsoDeveloping({ current }: { current: Project }) {
  const others = site.projects.items.filter((p) => p.id !== current.id);
  const copy = site.pages.project;

  return (
    <section className="also section">
      <div className="container">
        <header className="also__head">
          <Eyebrow className="reveal">{copy.alsoTitle}</Eyebrow>
          <LinkArrow
            link={{ label: copy.backLabel, href: routes.projects }}
            className="reveal"
          />
        </header>

        <ul className="also__grid">
          {others.map((project, i) => (
            <li
              className="also__item reveal"
              key={project.id}
              style={{ '--reveal-i': i % 4 } as React.CSSProperties}
            >
              <Link className="acard" href={routes.project(project.id)}>
                <span className="acard__media">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    style={
                      {
                        objectPosition: project.focal,
                        '--zoom': project.zoom
                      } as React.CSSProperties
                    }
                  />
                </span>
                <span className="acard__type">{project.type}</span>
                <span className="acard__name">{project.name}</span>
                <span className="acard__loc">{project.location}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
