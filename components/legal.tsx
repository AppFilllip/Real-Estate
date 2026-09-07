import Link from 'next/link';
import { routes } from '@/lib/site';
import { DisplayLines, Eyebrow } from './ui/brand';
import { Breadcrumbs } from './page-hero';

type Section = { title: string; body: string[] };

/**
 * Shared shell for the policy pages: a narrow measure for reading, numbered
 * sections in the same hairline-ruled language as the rest of the site, and a
 * sticky index alongside on wide screens.
 *
 * The pages are prose, so they get a reading column rather than the editorial
 * grid the marketing pages use.
 */
export function LegalPage({
  eyebrow,
  title,
  lede,
  sections,
  label
}: {
  eyebrow: string;
  title: string[];
  lede: string;
  sections: Section[];
  /** Breadcrumb label for this page. */
  label: string;
}) {
  return (
    <>
      <section className="legal-hero">
        <div className="container">
          <Breadcrumbs trail={[{ label }]} />
          <Eyebrow className="reveal">{eyebrow}</Eyebrow>
          <h1 className="display-2 legal-hero__title reveal">
            <DisplayLines lines={title} block="display-2" />
          </h1>
          <p className="lede legal-hero__lede reveal">{lede}</p>
        </div>
      </section>

      <section className="legal section">
        <div className="container legal__grid">
          <nav className="legal__index" aria-label="On this page">
            <p className="legal__index-title">On this page</p>
            <ol className="legal__index-list">
              {sections.map((section, i) => (
                <li key={section.title}>
                  <a href={`#section-${i + 1}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal__body">
            {sections.map((section, i) => (
              <section className="lsec reveal" id={`section-${i + 1}`} key={section.title}>
                <h2 className="lsec__title">
                  <span className="lsec__index">{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                {section.body.map((para) => (
                  <p className="lsec__para" key={para.slice(0, 24)}>
                    {para}
                  </p>
                ))}
              </section>
            ))}

            <p className="legal__foot">
              Questions about this page? <Link href={routes.contact}>Get in touch</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
