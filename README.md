# Rajdhara Colonizers

Marketing site for Rajdhara Colonizers, a Jaipur plotted-development company.
Next.js (App Router) + TypeScript, no UI framework and no animation library —
the design system is hand-written CSS in `app/globals.css`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| Path | What it is |
| --- | --- |
| `lib/site.ts` | **All site content.** Every section reads from here. |
| `app/globals.css` | The design system: tokens, components, responsive rules. |
| `app/layout.tsx` | Shell, fonts, metadata, JSON-LD. |
| `components/` | One file per section, plus `ui/brand.tsx` for shared primitives. |
| `components/site-effects.tsx` | The single client island: header scroll, reveals, counters, scroll-spy. |
| `public/` | Brand marks, project renders, leadership portraits. |
| `tools/prepare-logo.ps1` | Regenerates the transparent logo/mark/favicon from the source JPG. |
| `rajdhara_web_assets/` | Original supplied asset pack, kept as the source of truth. |

## Editing content

`lib/site.ts` is the only file to touch for copy, projects, leadership or
contact details. Fields typed `| null` are facts Rajdhara has not supplied yet —
the components **skip null values** rather than showing placeholders, so nothing
invented ever reaches the page. Fill a value in and its UI appears.

Still awaiting real data (each marked `TODO (Rajdhara)` in `lib/site.ts`):

- `contact.channels` — phone, email, office address, RERA registration number
- `contact.formEndpoint` — the enquiry form has no handler, so it validates and
  tells the visitor plainly instead of silently dropping submissions
- `footer.social` — no profile URLs; the list renders nothing while empty
- `stats` — years of experience, acres developed, families served
- `NEXT_PUBLIC_SITE_URL` — the live domain, for absolute social-card URLs

## Notes on the supplied imagery

- Four of the five project renders are 283–485px wide. Tile sizes in
  `app/globals.css` are capped to what those files can carry without visible
  softening; higher-resolution renders would allow larger compositions.
- `rajdhara-shyam-vihar.webp` has a baked-in rounded white border, cropped out
  via `zoom` on its project entry.
- Leadership portraits live in `public/leaders/` and are shot 4:5 (1122×1402),
  matching the portrait frame. Each still carries a small `zoom` and `origin` in
  `lib/site.ts` so all three figures read at the same apparent size. Replacing a
  portrait means dropping the file in and updating its `image` path — keep the
  4:5 ratio and the framing stays correct.

## Accessibility & motion

Semantic landmarks, a skip link, visible focus rings, labelled form fields with
inline errors, and a focus-trapped mobile menu. All motion is disabled under
`prefers-reduced-motion`, and the page is fully readable with JavaScript off —
reveal styles only engage once the client island marks the document.
