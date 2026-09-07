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

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — the overview. Every section links through to the page carrying it in full. |
| `/about` | The company: story, vision and mission, the five-step approach, why Rajdhara. |
| `/projects` | The portfolio — format rail, the ongoing mosaic, and the completed index. |
| `/projects/[id]` | One page per ongoing project. Statically generated from `site.projects.items`. |
| `/leadership` | The three leaders, and the values the company operates on. |
| `/contact` | Channels, the enquiry form, what happens after you send it. |
| `/faq` | Grouped questions on buying, approvals and the company. |
| `/privacy-policy`, `/terms` | Policy pages. |
| `not-found.tsx` | 404, inside the same shell as everything else. |

Nav lives in `site.nav`; every route is declared once in `routes` (`lib/site.ts`)
and imported, so a link can't drift from the page it points at.

## Where things live

| Path | What it is |
| --- | --- |
| `lib/site.ts` | **All site content**, plus `routes` and `getProject()`. Every page reads from here. |
| `app/globals.css` | The design system: tokens, components, inner-page sections, responsive rules. |
| `app/layout.tsx` | Shell, fonts, metadata (with the title template), JSON-LD. |
| `app/*/page.tsx` | One folder per route; each sets its own metadata and composes sections. |
| `components/` | One file per section, plus `ui/brand.tsx` for shared primitives. |
| `components/page-hero.tsx` | The inner-page banner, breadcrumbs and next-page rail. |
| `components/site-effects.tsx` | The single client island: header scroll, reveals, counters. Re-binds on route change. |
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
- `projects.items[].facts` — RERA number, plot sizes, total area and possession
  for each project. Rows with `value: null` are skipped and the specification
  panel says the figures come from the team instead
- `leadership.people[].bio` — no biographies supplied; the block is skipped
- `NEXT_PUBLIC_SITE_URL` — the live domain, for absolute social-card URLs

### Adding a project

Add an entry to `site.projects.items`. It needs a `layout` slot (`a`–`e`, which
governs its place in the mosaic) and a `variant`, plus the detail-page fields:
`summary`, `overview`, `features` and `facts`. Its page, its static params, its
metadata, its footer link and its structured data all follow from that one
entry — there is no second place to register it.

### Prose written for the site

`site.pages` and `site.legal` hold the page copy — vision and mission
statements, the approach, the FAQs, the policies. Unlike the portfolio data it
was written for the site rather than supplied, and it asserts nothing beyond
what the projects above actually carry. It is worth a read-through with
Rajdhara, and the policy pages should be reviewed before launch.

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

Semantic landmarks, one `<h1>` per page, breadcrumbs on every inner page, a skip
link, visible focus rings, labelled form fields with inline errors, and a
focus-trapped mobile menu that closes on navigation. The FAQ accordion is native
`<details>`, so every answer is in the markup whether or not it is open. All motion is disabled under
`prefers-reduced-motion`, and the page is fully readable with JavaScript off —
reveal styles only engage once the client island marks the document.
