import Image from 'next/image';
import { site, type Project } from '@/lib/site';
import { ArrowGlyph, DisplayLines, Eyebrow, LinkArrow, Pin } from './ui/brand';

/*
 * Editorial mosaic rather than a row of matching cards.
 *
 * Each project declares a `layout` slot (a–e) that sets its span and media
 * height in CSS, and a `variant` deciding whether its information floats over
 * the image or sits on a plate beneath it. The two compositions alternate so no
 * two neighbouring tiles read the same. Media heights are capped to what the
 * supplied renders can carry without visible softening.
 */

/** Widths the mosaic actually asks for, per slot. */
const SIZES: Record<Project['layout'], string> = {
  a: '(max-width: 640px) 100vw, (max-width: 1180px) 100vw, 58vw',
  b: '(max-width: 860px) 100vw, (max-width: 1180px) 50vw, 41vw',
  c: '(max-width: 860px) 100vw, (max-width: 1180px) 50vw, 41vw',
  d: '(max-width: 860px) 100vw, (max-width: 1180px) 58vw, 33vw',
  e: '(max-width: 860px) 100vw, (max-width: 1180px) 42vw, 25vw'
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={`pcard pcard--${project.layout} pcard--${project.variant} reveal`}
      id={`project-${project.id}`}
      style={{ '--reveal-i': index % 3 } as React.CSSProperties}
    >
      <div className="pcard__media">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes={SIZES[project.layout]}
          style={
            {
              objectPosition: project.focal,
              '--zoom': project.zoom
            } as React.CSSProperties
          }
        />
      </div>

      <span className="pcard__status">Ongoing</span>

      <div className="pcard__body">
        <p className="pcard__type">
          <span className="pcard__dot" aria-hidden="true" />
          {project.type}
        </p>

        <h3 className="pcard__name">
          <a
            className="pcard__link"
            href="#contact"
            aria-label={`Enquire about ${project.name}, ${project.location}`}
          >
            {project.name}
          </a>
        </h3>

        <p className="pcard__loc">
          <Pin />
          <span>{project.location}</span>
        </p>

        <ul className="pcard__tags">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <span className="pcard__cta" aria-hidden="true">
          <span>Enquire</span>
          <ArrowGlyph className="pcard__glyph" />
        </span>
      </div>
    </article>
  );
}

export function Projects() {
  const { projects } = site;

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <header className="section-head">
          <div className="section-head__lead">
            <Eyebrow className="reveal">{projects.eyebrow}</Eyebrow>
            <h2 className="display-2 reveal">
              <DisplayLines lines={projects.title} block="display-2" />
            </h2>
          </div>
          <div className="section-head__aside reveal">
            <p>{projects.intro}</p>
            <LinkArrow link={{ label: 'Enquire about a project', href: '#contact' }} />
          </div>
        </header>

        <div className="projects__mosaic">
          {projects.items.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Completed work is a typographic index, not an image grid — Rajdhara has
 * supplied names only, and inventing photography or descriptions for delivered
 * projects would be worse than a confident, honest list.
 */
export function Completed() {
  const { completed } = site;

  return (
    <section className="completed section" id="completed">
      <div className="container completed__grid">
        <div className="completed__lead">
          <Eyebrow className="reveal">{completed.eyebrow}</Eyebrow>
          <h2 className="display-2 reveal">
            <DisplayLines lines={completed.title} block="display-2" />
          </h2>
          <p className="completed__intro reveal">{completed.intro}</p>
          <LinkArrow
            link={{ label: 'Request project details', href: '#contact' }}
            className="reveal"
          />
        </div>

        <ol className="clist">
          {completed.items.map((item, i) => (
            <li
              className="crow reveal"
              key={item.name}
              style={{ '--reveal-i': i } as React.CSSProperties}
            >
              <span className="crow__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="crow__name">{item.name}</span>
              <span className="crow__tag">Completed</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
