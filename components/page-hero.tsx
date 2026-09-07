import Link from 'next/link';
import { routes } from '@/lib/site';
import { ArrowArc, ArrowGlyph, DisplayLines, Eyebrow } from './ui/brand';

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb trail. Home is prepended for every page, so a caller passes only
 * the part of the path that is its own.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const crumbs: Crumb[] = [{ label: 'Home', href: routes.home }, ...trail];

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol className="crumbs__list">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li className="crumbs__item" key={`${crumb.label}-${i}`}>
              {crumb.href && !last ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{crumb.label}</span>
              )}
              {!last && (
                <span className="crumbs__sep" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * The banner every inner page opens with — the same editorial voice as the home
 * hero, at a quieter volume: no image plate, the brand arc as a watermark, and
 * the display title wiping up out of its clipping box exactly as it does above
 * the fold on the home page.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  trail,
  children
}: {
  eyebrow: string;
  title: string[];
  lede: string;
  trail: Crumb[];
  /** Optional actions or metadata rail beneath the lede. */
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <ArrowArc className="page-hero__arc" />

      <div className="container page-hero__inner">
        <Breadcrumbs trail={trail} />

        <Eyebrow className="reveal">{eyebrow}</Eyebrow>

        <h1 className="display-1 page-hero__title reveal" id="page-hero-title">
          <DisplayLines lines={title} block="page-hero__title" />
        </h1>

        <p className="lede page-hero__lede reveal">{lede}</p>

        {children}
      </div>
    </section>
  );
}

/**
 * Prev/next style rail closing an inner page — keeps a visitor moving through
 * the site rather than leaving them at a dead end above the footer.
 */
export function NextPage({ label, href, note }: { label: string; href: string; note: string }) {
  return (
    <section className="nextpage">
      <Link className="container nextpage__inner" href={href}>
        <span className="nextpage__note">{note}</span>
        <span className="nextpage__label">
          {label}
          <ArrowGlyph className="nextpage__glyph" />
        </span>
      </Link>
    </section>
  );
}
