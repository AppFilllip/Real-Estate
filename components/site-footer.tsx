import Image from 'next/image';
import { site } from '@/lib/site';
import { ArrowGlyph } from './ui/brand';

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="footer__col">
      <h3 className="footer__col-title">{title}</h3>
      <ul className="footer__links">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  // Contact details render only when supplied; see lib/site.ts.
  const reach = site.contact.channels.filter((c) => c.value);

  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          {/* The mark is drawn in brand blue and navy, so on the dark footer it
              sits on a white plate rather than losing half its weight. */}
          <span className="footer__logo">
            <Image
              src={site.brand.logo}
              alt={site.name}
              width={site.brand.logoSize.width}
              height={site.brand.logoSize.height}
            />
          </span>
          <p className="footer__blurb">{site.footer.blurb}</p>

          {site.footer.social.length > 0 && (
            <ul className="footer__social">
              {site.footer.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="noopener noreferrer" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Column title="Explore">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </Column>

        <Column title="Ongoing Projects">
          {site.projects.items.map((p) => (
            <li key={p.id}>
              <a href={`#project-${p.id}`}>{p.name}</a>
            </li>
          ))}
        </Column>

        <Column title="Completed">
          {site.completed.items.map((p) => (
            <li key={p.name}>
              <span>{p.name}</span>
            </li>
          ))}
        </Column>

        <Column title="Reach Us">
          {reach.map((c) => (
            <li key={c.label}>
              {c.href ? <a href={c.href}>{c.value}</a> : <span>{c.value}</span>}
            </li>
          ))}
          <li>
            <span>{site.contact.coverage}</span>
          </li>
          <li>
            <a className="footer__cta-link" href={site.cta.href}>
              {site.cta.label}
              <ArrowGlyph className="link-arrow__glyph" />
            </a>
          </li>
        </Column>
      </div>

      <div className="container footer__bar">
        <p className="footer__copy">
          &copy; {year} {site.legalName}. All rights reserved.
        </p>
        <ul className="footer__legal">
          {site.footer.legal.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a className="to-top" href="#home">
          <span className="visually-hidden">Back to top</span>
          <ArrowGlyph className="to-top__glyph" />
        </a>
      </div>
    </footer>
  );
}
