'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routes, site } from '@/lib/site';
import { ArrowGlyph } from './ui/brand';

/**
 * A nav item is current when its route is the active one — and for `/projects`,
 * also while the visitor is on a project detail page beneath it.
 */
function isCurrent(href: string, pathname: string) {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // A route change must never leave the overlay open behind the new page.
  useEffect(() => setOpen(false), [pathname]);

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
          <Link className="brand" href={routes.home} aria-label={`${site.name} — home`}>
            <Image
              className="brand__logo"
              src={site.brand.logo}
              alt={site.name}
              width={site.brand.logoSize.width}
              height={site.brand.logoSize.height}
              priority
            />
          </Link>

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {site.nav.map((item) => {
                const current = isCurrent(item.href, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      className={`nav__link${current ? ' is-active' : ''}`}
                      href={item.href}
                      aria-current={current ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="site-header__actions">
            <Link className="btn btn--primary btn--sm site-header__cta" href={site.cta.href}>
              <span>{site.cta.label}</span>
              <ArrowGlyph className="btn__glyph" />
            </Link>
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
                  <Link
                    className={isCurrent(item.href, pathname) ? 'is-active' : undefined}
                    href={item.href}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu__foot">
            <Link className="btn btn--accent btn--block" href={site.cta.href} onClick={close}>
              <span>{site.cta.label}</span>
              <ArrowGlyph className="btn__glyph" />
            </Link>
            <p className="mobile-menu__note">{site.contact.coverage}</p>
          </div>
        </div>
      )}
    </>
  );
}
