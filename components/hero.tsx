import Image from 'next/image';
import { site } from '@/lib/site';
import { ArrowArc, ButtonLink, DisplayLines, Eyebrow, Icon, LinkArrow } from './ui/brand';

/**
 * Split-canvas hero: an off-white editorial panel butted against a full-bleed
 * architectural plate, with a counter card straddling the seam between them.
 * The plate starts below the header line so the navigation always sits on
 * off-white and stays legible without a background of its own.
 */
export function Hero() {
  const { hero, projects } = site;
  const count = projects.items.length;
  const heroStats = [
    { value: `${count.toString().padStart(2, '0')}`, label: 'Projects Underway', icon: 'building' },
    { value: '04', label: 'Completed Projects', icon: 'check' },
    { value: '05', label: 'Jaipur Locations', icon: 'map' }
  ];

  return (
    <section className="hero" id="home">
      <div className="hero__panel">
        <ArrowArc className="hero__arc" />

        <div className="hero__inner">
          <Eyebrow className="hero__eyebrow reveal">{hero.eyebrow}</Eyebrow>

          <h1 className="display-1 hero__title reveal">
            <DisplayLines lines={hero.headline} block="hero__title" />
          </h1>

          <p className="lede hero__lede reveal">{hero.lede}</p>

          <div className="hero__actions reveal">
            <ButtonLink link={hero.primary} kind="accent" icon="grid" />
            <ButtonLink link={hero.secondary} kind="ghost" icon="chat" />
          </div>

          <ul className="hero__stats reveal" aria-label="Rajdhara portfolio summary">
            {heroStats.map((stat) => (
              <li className="hero__stat" key={stat.label}>
                <span className="hero__stat-icon" aria-hidden="true">
                  <Icon name={stat.icon as 'building' | 'check' | 'map'} />
                </span>
                <span>
                  <strong>{stat.value}</strong>
                  <small>{stat.label}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__foot">
          <span className="hero__place">{site.region}</span>
          <a className="hero__scroll" href="#about">
            <span>Scroll</span>
            <span className="hero__scroll-line" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__showcase">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            sizes="(max-width: 1023px) 100vw, 48vw"
            priority
          />
          <div className="hero__showcase-strip" aria-hidden="true">
            <span>Residential Plots</span>
            <span>Farm Estates</span>
            <span>Commercial Land</span>
          </div>
        </div>

        <div className="hero__card">
          <p className="hero__card-eyebrow">{hero.badge.eyebrow}</p>
          <p className="hero__card-count">
            <span data-count-to={count} data-count-pad="2">
              {String(count).padStart(2, '0')}
            </span>
          </p>
          <p className="hero__card-caption">{hero.badge.caption}</p>
          <LinkArrow link={hero.badge.link} className="hero__card-link" />
        </div>
      </div>
    </section>
  );
}

/** Approval rail — every entry appears verbatim in the supplied project data. */
export function Credentials() {
  return (
    <section className="credentials" aria-label="Approvals and assurances">
      <div className="container">
        <ul className="credentials__list">
          {site.credentials.map((item) => (
            <li className="credentials__item" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
