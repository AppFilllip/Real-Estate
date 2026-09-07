import { site } from '@/lib/site';

/**
 * Grouped accordion built on <details>/<summary>. No JavaScript is involved:
 * the browser handles the disclosure, every answer is present in the markup for
 * search engines and for a reader with scripting off, and Ctrl+F finds text
 * inside collapsed panels in modern browsers.
 */
export function Faq() {
  const { groups } = site.pages.faq;

  return (
    <section className="faq section">
      <div className="container faq__grid">
        {groups.map((group, gi) => (
          <section className="faq__group" key={group.title}>
            <div className="faq__group-lead">
              <h2 className="faq__group-title reveal">
                <span className="faq__group-index">{String(gi + 1).padStart(2, '0')}</span>
                {group.title}
              </h2>
            </div>

            <div className="faq__items">
              {group.items.map((item, i) => (
                <details
                  className="qa reveal"
                  key={item.q}
                  style={{ '--reveal-i': i % 3 } as React.CSSProperties}
                >
                  <summary className="qa__q">
                    <span>{item.q}</span>
                    <span className="qa__sign" aria-hidden="true" />
                  </summary>
                  <div className="qa__a">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

/** FAQPage structured data — built from the same source as the visible copy. */
export function FaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: site.pages.faq.groups.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a }
      }))
    )
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
