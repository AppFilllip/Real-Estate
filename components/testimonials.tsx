import { site } from '@/lib/site';
import { DisplayLines, Eyebrow } from './ui/brand';

/**
 * Client quotes, set as a row of pull-quote cards rather than boxed reviews —
 * consistent with the leadership pull-quote's typographic voice.
 *
 * Renders nothing until Rajdhara supplies real, attributable testimonials —
 * see `site.testimonials.items` in lib/site.ts.
 */
export function Testimonials() {
  const { testimonials } = site;
  if (!testimonials.items.length) return null;

  return (
    <section className="testimonials section" aria-labelledby="testimonials-title">
      <div className="container">
        <header className="section-head">
          <div className="section-head__lead">
            <Eyebrow className="reveal">{testimonials.eyebrow}</Eyebrow>
            <h2 className="display-2 reveal" id="testimonials-title">
              <DisplayLines lines={testimonials.title} block="display-2" />
            </h2>
          </div>
          <div className="section-head__aside reveal">
            <p>{testimonials.intro}</p>
          </div>
        </header>

        <ul className="testimonials__grid">
          {testimonials.items.map((item, i) => (
            <li
              className="testimonial reveal"
              key={item.name}
              style={{ '--reveal-i': i % 3 } as React.CSSProperties}
            >
              <blockquote className="pullquote testimonial__quote">
                <p>{item.quote}</p>
                <footer>
                  <cite>
                    {item.name}
                    {item.project ? ` · ${item.project}` : item.role ? ` · ${item.role}` : ''}
                  </cite>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
