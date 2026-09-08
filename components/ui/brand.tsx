import type { ReactNode } from 'react';
import NextLink from 'next/link';
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

export function Icon({
  name,
  className
}: {
  name: 'grid' | 'chat' | 'building' | 'check' | 'map' | 'info' | 'users' | 'up' | 'next';
  className?: string;
}) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const
  };

  return (
    <svg
      className={`ui-icon${className ? ` ${className}` : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {name === 'grid' && (
        <>
          <rect x="4" y="4" width="6" height="6" rx="1.4" {...common} />
          <rect x="14" y="4" width="6" height="6" rx="1.4" {...common} />
          <rect x="4" y="14" width="6" height="6" rx="1.4" {...common} />
          <rect x="14" y="14" width="6" height="6" rx="1.4" {...common} />
        </>
      )}
      {name === 'chat' && (
        <path
          d="M5.2 6.7A6.9 6.9 0 0 1 12 3.8a6.9 6.9 0 0 1 6.8 6.9 6.9 6.9 0 0 1-7 6.9 7.8 7.8 0 0 1-2.7-.5L5 19l1.1-3.6a6.8 6.8 0 0 1-.9-8.7Z"
          {...common}
        />
      )}
      {name === 'building' && (
        <>
          <path d="M5 20V5.8c0-.9.7-1.6 1.6-1.6h7.8c.9 0 1.6.7 1.6 1.6V20" {...common} />
          <path d="M3.5 20h17" {...common} />
          <path d="M9 8h3M9 12h3M9 16h3" {...common} />
        </>
      )}
      {name === 'check' && (
        <>
          <circle cx="12" cy="12" r="8.5" {...common} />
          <path d="m8.4 12.2 2.3 2.3 4.9-5" {...common} />
        </>
      )}
      {name === 'map' && (
        <>
          <path d="M12 21s6-5.6 6-11a6 6 0 0 0-12 0c0 5.4 6 11 6 11Z" {...common} />
          <circle cx="12" cy="10" r="2" {...common} />
        </>
      )}
      {name === 'info' && (
        <>
          <circle cx="12" cy="12" r="8.5" {...common} />
          <path d="M12 11.2V16" {...common} />
          <path d="M12 8h.01" {...common} />
        </>
      )}
      {name === 'users' && (
        <>
          <circle cx="9" cy="8" r="3" {...common} />
          <path d="M3.8 19c.8-3.2 2.6-4.8 5.2-4.8s4.4 1.6 5.2 4.8" {...common} />
          <path d="M15.2 6.2a2.7 2.7 0 0 1 0 5.2" {...common} />
          <path d="M16.2 14.4c2 .5 3.3 2 4 4.6" {...common} />
        </>
      )}
      {name === 'up' && <path d="m7 14 5-5 5 5" {...common} />}
      {name === 'next' && <path d="m9 6 6 6-6 6" {...common} />}
    </svg>
  );
}

/**
 * Routes go through next/link so navigation stays client-side; in-page hashes
 * and external URLs stay plain anchors, where a router would only get in the
 * way of the browser's own behaviour.
 */
function Anchor({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith('/')) {
    return (
      <NextLink className={className} href={href} {...rest}>
        {children}
      </NextLink>
    );
  }
  return (
    <a className={className} href={href} {...rest}>
      {children}
    </a>
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
      <span className="eyebrow__mark" aria-hidden="true" />
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

function iconForLink(label: string): 'grid' | 'chat' | 'building' | 'check' | 'map' | 'info' | 'users' | 'up' | 'next' {
  const text = label.toLowerCase();
  if (text.includes('contact') || text.includes('enquire') || text.includes('talk') || text.includes('request')) return 'chat';
  if (text.includes('project')) return 'grid';
  if (text.includes('company') || text.includes('about')) return 'info';
  if (text.includes('leadership') || text.includes('team')) return 'users';
  if (text.includes('location') || text.includes('visit')) return 'map';
  return 'check';
}

export function LinkArrow({
  link,
  className,
  icon
}: {
  link: SiteLink;
  className?: string;
  icon?: 'grid' | 'chat' | 'building' | 'check' | 'map' | 'info' | 'users' | 'up' | 'next';
}) {
  return (
    <Anchor className={`link-arrow${className ? ` ${className}` : ''}`} href={link.href}>
      <span>{link.label}</span>
      <Icon name={icon ?? iconForLink(link.label)} className="link-arrow__glyph" />
    </Anchor>
  );
}

export function ButtonLink({
  link,
  kind,
  className,
  icon = 'grid'
}: {
  link: SiteLink;
  kind: 'primary' | 'accent' | 'ghost' | 'ghost-invert';
  className?: string;
  icon?: 'grid' | 'chat' | 'building' | 'check' | 'map' | 'info' | 'users' | 'up' | 'next';
}) {
  return (
    <Anchor className={`btn btn--${kind}${className ? ` ${className}` : ''}`} href={link.href}>
      <span>{link.label}</span>
      <Icon name={icon} className="btn__glyph" />
    </Anchor>
  );
}
