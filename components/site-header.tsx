'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { site } from '@/lib/site';
import { ArrowGlyph } from './ui/brand';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Lock the page behind the overlay, and hand focus in and back out again.
  useEffect(() => {
    if (!open) return;

    document.body.classList.add('is-locked');
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current) return;

      const items = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // A resize back to desktop must never leave the page scroll-locked.
    const onResize = () => {
      if (window.innerWidth > 1023) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header" data-header>
        <div className="site-header__inner">
          <a className="brand" href="#home" aria-label={`${site.name} — home`}>
            <Image
              className="brand__logo"
              src={site.brand.logo}
              alt={site.name}
              width={site.brand.logoSize.width}
              height={site.brand.logoSize.height}
              priority
            />
          </a>

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    className="nav__link"
                    href={item.href}
                    data-nav-target={item.href.replace('#', '')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <a className="btn btn--primary btn--sm site-header__cta" href={site.cta.href}>
              <span>{site.cta.label}</span>
              <ArrowGlyph className="btn__glyph" />
            </a>
            <button
              ref={toggleRef}
              className="menu-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span className="menu-toggle__bars" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="visually-hidden">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu is-open" id="mobile-menu" ref={menuRef}>
          <div className="mobile-menu__head">
            <Image
              className="mobile-menu__logo"
              src={site.brand.logo}
              alt={site.name}
              width={site.brand.logoSize.width}
              height={site.brand.logoSize.height}
            />
            <button className="menu-close" type="button" onClick={close}>
              <span aria-hidden="true">&times;</span>
              <span className="visually-hidden">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile">
            <ul className="mobile-menu__list">
              {site.nav.map((item, i) => (
                <li key={item.href} style={{ '--menu-i': i } as React.CSSProperties}>
                  <a href={item.href} onClick={close}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu__foot">
            <a className="btn btn--accent btn--block" href={site.cta.href} onClick={close}>
              <span>{site.cta.label}</span>
              <ArrowGlyph className="btn__glyph" />
            </a>
            <p className="mobile-menu__note">{site.contact.coverage}</p>
          </div>
        </div>
      )}
    </>
  );
}
