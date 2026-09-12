import Image from 'next/image';
import { routes, site } from '@/lib/site';
import { DisplayLines, Eyebrow, LinkArrow } from './ui/brand';

/** Groups the flat photo list by event, preserving first-seen order. */
function groupByEvent(photos: typeof site.pages.gallery.events) {
  const order: string[] = [];
  const groups = new Map<string, typeof photos>();

  for (const photo of photos) {
    if (!groups.has(photo.event)) {
      order.push(photo.event);
      groups.set(photo.event, []);
    }
    groups.get(photo.event)!.push(photo);
  }

  return order.map((event) => ({
    event,
    date: groups.get(event)![0].date,
    photos: groups.get(event)!
  }));
}

/**
 * Company events, grouped into a photo wall per event. Until Rajdhara supplies
 * photos (see `site.pages.gallery.events` in lib/site.ts), a quiet notice
 * stands in the space rather than empty tiles.
 */
export function EventGallery() {
  const { gallery } = site.pages;

  if (!gallery.events.length) {
    return (
      <section className="gallery-empty section">
        <div className="container">
          <p className="gallery-empty__note reveal">{gallery.empty}</p>
        </div>
      </section>
    );
  }

  const groups = groupByEvent(gallery.events);

  return (
    <>
      {groups.map((group, gi) => (
        <section className="gallery section" key={group.event}>
          <div className="container">
            <header className="gallery__head reveal">
              <Eyebrow>{group.date ?? 'Company Event'}</Eyebrow>
              <h2 className="display-2 gallery__title">{group.event}</h2>
            </header>

            <ul className="gallery__grid">
              {group.photos.map((photo, i) => (
                <li
                  className="gallery__item reveal"
                  key={photo.image}
                  style={{ '--reveal-i': (gi + i) % 4 } as React.CSSProperties}
                >
                  <figure className="gallery__figure">
                    <Image
                      src={photo.image}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    />
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}

/**
 * Home-page teaser: a handful of thumbnails and a link through to the full
 * /gallery page. Renders nothing until at least one event photo exists.
 */
export function GalleryTeaser() {
  const { gallery } = site.pages;
  const preview = gallery.events.slice(0, 4);
  if (!preview.length) return null;

  return (
    <section className="gteaser section" aria-labelledby="gteaser-title">
      <div className="container">
        <header className="section-head">
          <div className="section-head__lead">
            <Eyebrow className="reveal">{gallery.hero.eyebrow}</Eyebrow>
            <h2 className="display-2 reveal" id="gteaser-title">
              <DisplayLines lines={gallery.hero.title} block="display-2" />
            </h2>
            <LinkArrow
              link={{ label: 'View Gallery', href: routes.gallery }}
              className="gteaser__more reveal"
            />
          </div>
        </header>

        <ul className="gallery__grid">
          {preview.map((photo, i) => (
            <li
              className="gallery__item reveal"
              key={photo.image}
              style={{ '--reveal-i': i } as React.CSSProperties}
            >
              <figure className="gallery__figure">
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 25vw"
                />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
