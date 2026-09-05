'use client';

import { useEffect } from 'react';

/**
 * One small client island drives every page-level interaction: the header's
 * scroll state, section reveals, the brand arc draw, counters and scroll-spy.
 *
 * Keeping it in a single effect means the rest of the site stays server-rendered
 * — the markup is complete and readable before any JavaScript arrives, and the
 * reveal styles only engage once `.js` is on the document.
 */
export function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];

    /* ------------------------------------------------------- header ----- */
    const header = document.querySelector<HTMLElement>('[data-header]');
    if (header) {
      let ticking = false;
      const update = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      };
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener('scroll', onScroll));
    }

    /* ------------------------------------------------------ reveals ----- */
    const revealables = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal, .rd-arc')
    );
    const show = (el: HTMLElement) =>
      el.classList.add(el.classList.contains('rd-arc') ? 'is-drawn' : 'is-in');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealables.forEach(show);
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          });
        },
        /* A fixed pixel inset rather than a percentage: on a very tall viewport
           a percentage inset can cover content that never scrolls past it, so
           those elements would stay hidden forever. */
        { rootMargin: '0px 0px -80px 0px', threshold: 0 }
      );
      revealables.forEach((el) => observer.observe(el));
      cleanups.push(() => observer.disconnect());
    }

    /* ----------------------------------------------------- counters ----- */
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count-to]'));
    const runCounter = (el: HTMLElement) => {
      const target = Number(el.dataset.countTo);
      const pad = Number(el.dataset.countPad ?? 0);
      if (Number.isNaN(target)) return;

      const render = (value: number) => {
        el.textContent = pad ? String(value).padStart(pad, '0') : String(value);
      };

      if (reduceMotion) {
        render(target);
        return;
      }

      const duration = Math.min(1500, 380 + target * 22);
      let start: number | null = null;
      const step = (now: number) => {
        if (start === null) start = now;
        const t = Math.min(1, (now - start) / duration);
        // easeOutExpo — settles rather than bounces.
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        render(Math.round(target * eased));
        if (t < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCounter);
    } else {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            runCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => counterObserver.observe(el));
      cleanups.push(() => counterObserver.disconnect());
    }

    /* --------------------------------------------------- scroll spy ----- */
    const navLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-target]'));
    if (navLinks.length && 'IntersectionObserver' in window) {
      const byId = new Map<string, HTMLElement>();
      const sections: Element[] = [];

      navLinks.forEach((link) => {
        const id = link.dataset.navTarget;
        if (!id) return;
        const section = document.getElementById(id);
        if (!section) return;
        byId.set(id, link);
        sections.push(section);
      });

      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((l) => l.classList.remove('is-active'));
            byId.get(entry.target.id)?.classList.add('is-active');
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );

      sections.forEach((section) => spy.observe(section));
      cleanups.push(() => spy.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
