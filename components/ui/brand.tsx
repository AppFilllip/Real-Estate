import type { ReactNode } from 'react';
import type { Link as SiteLink } from '@/lib/site';

/*
 * The Rajdhara mark is an orange arrow rising out of a monogram. That rising
 * arrow is the site's connective detail — it appears in eyebrows, on buttons,
 * behind the hero, and in the closing band, so it reads as identity rather than
 * as ornament dropped onto the page.
 */
export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={`rd-glyph${className ? ` ${className}` : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 20c5.2-.7 9.6-3.6 12.6-8.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path d="M20.6 3.2 21.4 10l-6.5-2z" fill="currentColor" />
    </svg>
  );
}

/** Long-form arrow, drawn as a stroke. Used as a large, quiet brand watermark. */
export function ArrowArc({ className }: { className?: string }) {
  return (
    <svg
      className={`rd-arc${className ? ` ${className}` : ''}`}
      viewBox="0 0 420 260"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="rd-arc__stroke"
        d="M6 252C104 246 186 214 246 152c33-34 57-76 74-124"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path className="rd-arc__head" d="M345 4l-6 62-52-24z" fill="currentColor" />
    </svg>
  );
}

export function Pin() {
  return (
    <svg className="pin" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        d="M8 1.4c-2.5 0-4.5 2-4.5 4.5C3.5 9.4 8 14.6 8 14.6s4.5-5.2 4.5-8.7c0-2.5-2-4.5-4.5-4.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="8" cy="5.9" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function Eyebrow({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow${className ? ` ${className}` : ''}`}>
      <ArrowGlyph className="eyebrow__glyph" />
      <span>{children}</span>
    </p>
  );
}

/**
 * Display headlines are authored as lines of plain text where an _emphasised_
 * span is marked with underscores; that span is set in the display italic — the
 * one typographic accent giving each title a focal word. Each line clips and
 * wipes upward on reveal.
 */
export function DisplayLines({ lines, block }: { lines: string[]; block: string }) {
  return (
    <>
      {lines.map((line, i) => (
        <span
          key={line}
          className={`${block}__line`}
          style={{ '--line-i': i } as React.CSSProperties}
        >
          <span>
            {line.split(/_([^_]+)_/).map((part, j) =>
              j % 2 === 1 ? <em key={j}>{part}</em> : part
            )}
          </span>
        </span>
      ))}
    </>
  );
}

export function LinkArrow({ link, className }: { link: SiteLink; className?: string }) {
  return (
    <a className={`link-arrow${className ? ` ${className}` : ''}`} href={link.href}>
      <span>{link.label}</span>
      <ArrowGlyph className="link-arrow__glyph" />
    </a>
  );
}

export function ButtonLink({
  link,
  kind,
  className
}: {
  link: SiteLink;
  kind: 'primary' | 'accent' | 'ghost' | 'ghost-invert';
  className?: string;
}) {
  return (
    <a className={`btn btn--${kind}${className ? ` ${className}` : ''}`} href={link.href}>
      <span>{link.label}</span>
      <ArrowGlyph className="btn__glyph" />
    </a>
  );
}
