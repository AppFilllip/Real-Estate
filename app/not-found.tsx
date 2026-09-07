import Link from 'next/link';
import { routes, site } from '@/lib/site';
import { ArrowArc, ArrowGlyph, DisplayLines, Eyebrow } from '@/components/ui/brand';

/**
 * 404. Rendered inside the same shell as every other page, so the header, the
 * footer and the way out are all where the visitor expects them.
 */
export default function NotFound() {
  const page = site.pages.notFound;

  return (
    <section className="notfound">
      <ArrowArc className="notfound__arc" />

      <div className="container notfound__inner">
        <Eyebrow>{page.eyebrow}</Eyebrow>

        <h1 className="display-1 notfound__title">
          <DisplayLines lines={page.title} block="notfound__title" />
        </h1>

        <p className="lede notfound__body">{page.body}</p>

        <div className="notfound__actions">
          <Link className="btn btn--primary" href={page.primary.href}>
            <span>{page.primary.label}</span>
            <ArrowGlyph className="btn__glyph" />
          </Link>
          <Link className="btn btn--ghost" href={page.secondary.href}>
            <span>{page.secondary.label}</span>
            <ArrowGlyph className="btn__glyph" />
          </Link>
        </div>

        <ul className="notfound__links">
          {site.nav
            .filter((item) => item.href !== routes.home)
            .map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          <li>
            <Link href={routes.faq}>FAQs</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
