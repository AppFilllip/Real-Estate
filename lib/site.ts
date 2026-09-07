/**
 * Rajdhara Colonizers — single source of truth for site content.
 *
 * Every page and section renders from this file. Fields typed `| null` are
 * facts the company has NOT supplied yet: the components skip null values
 * entirely, so the site never ships placeholder or invented information. Fill a
 * value in and the corresponding UI appears on the next build.
 *
 * Copy in `pages` is written for the site rather than quoted from supplied
 * data. It makes no factual claim beyond the portfolio below, but it is the
 * company's voice — worth a read-through with Rajdhara before launch.
 */

export type Link = { label: string; href: string };

export type Fact = { label: string; value: string | null };

export type Project = {
  /** Also the URL segment: /projects/<id> */
  id: string;
  name: string;
  location: string;
  type: string;
  highlights: string[];
  image: string;
  alt: string;
  /** Natural pixel size of the supplied asset — governs how large it is framed. */
  natural: { width: number; height: number };
  /** Slot in the editorial mosaic (a–e); each has its own span and media height. */
  layout: 'a' | 'b' | 'c' | 'd' | 'e';
  /** `overlay` floats the information plate inside the image; `panel` sits below it. */
  variant: 'overlay' | 'panel';
  focal?: string;
  /** Extra crop, for sources that carry a baked-in border. */
  zoom?: number;

  /* ---- Detail page ---------------------------------------------------- */
  /** One line — the card blurb and the detail-page lede. */
  summary: string;
  /** Body copy. Restates the supplied facts in prose; asserts nothing beyond them. */
  overview: string[];
  /** Each supplied highlight, expanded into what it means for a buyer. */
  features: { title: string; text: string }[];
  /**
   * Specification table. `null` rows are skipped, so plot sizes, RERA numbers
   * and possession dates appear the moment Rajdhara supplies them.
   */
  facts: Fact[];
};

export type Leader = {
  name: string;
  role: string;
  image: string;
  alt: string;
  /**
   * All three portraits are shot 4:5, matching the frame, so `cover` shows each
   * one whole. `zoom` and `origin` make the small remaining adjustments that
   * bring the three figures to the same apparent size.
   */
  zoom: number;
  origin: string;
  natural: { width: number; height: number };
  /** TODO (Rajdhara): supply a short biography. Null renders no bio. */
  bio: string | null;
};

export type Stat = {
  value: number | null;
  suffix?: string;
  label: string;
  note: string;
};

export type Channel = {
  label: string;
  value: string | null;
  href: string | null;
};

/** Canonical routes — imported rather than typed out, so links never drift. */
export const routes = {
  home: '/',
  about: '/about',
  projects: '/projects',
  project: (id: string) => `/projects/${id}`,
  leadership: '/leadership',
  contact: '/contact',
  faq: '/faq',
  privacy: '/privacy-policy',
  terms: '/terms'
} as const;

export const site = {
  name: 'Rajdhara Colonizers',
  legalName: 'Rajdhara Colonizers',
  tagline: 'Building Jaipur’s next landmarks.',
  region: 'Jaipur, Rajasthan',

  description:
    'Rajdhara Colonizers develops approved plotted townships, farm estates and ' +
    'commercial addresses across Jaipur — built on clear titles, planned ' +
    'infrastructure and locations chosen for long-term value.',

  brand: {
    logo: '/brand/rajdhara-logo.png',
    logoSize: { width: 1328, height: 802 },
    mark: '/brand/rajdhara-mark.png',
    favicon: '/brand/favicon.png'
  },

  nav: [
    { label: 'Home', href: routes.home },
    { label: 'About', href: routes.about },
    { label: 'Projects', href: routes.projects },
    { label: 'Leadership', href: routes.leadership },
    { label: 'Contact', href: routes.contact }
  ] as Link[],

  cta: { label: 'Enquire Now', href: routes.contact } as Link,

  hero: {
    eyebrow: 'Rajdhara Colonizers · Jaipur',
    /** Text wrapped in _underscores_ is set in the display italic. */
    headline: ['Building Jaipur’s', 'next _landmarks_.'],
    lede:
      'Plotted townships, farm estates and commercial addresses — developed on ' +
      'approved land, planned around real infrastructure, and placed where Jaipur ' +
      'is actually growing.',
    primary: { label: 'Explore Projects', href: routes.projects } as Link,
    secondary: { label: 'Talk to Us', href: routes.contact } as Link,
    /** The only supplied asset with enough resolution to carry a full-bleed plate. */
    image: '/projects/rajdhara-transport-nagar.webp',
    imageAlt:
      'Entrance gate elevation of Rajdhara Transport Nagar, Dudu, on Main Ajmer Road',
    badge: {
      eyebrow: 'Now developing',
      caption: 'projects underway across Jaipur',
      link: { label: 'Explore Projects', href: routes.projects } as Link
    }
  },

  /** Approvals and assurances that appear verbatim in the supplied project data. */
  credentials: [
    'RERA Registered',
    'JDA Approved',
    'Government Approved',
    'Municipal Corporation Approved',
    '100% Agreement Value'
  ],

  about: {
    eyebrow: 'About Rajdhara',
    title: ['Built on Trust.', 'Driven by _Vision_.'],
    body: [
      'Rajdhara Colonizers develops land the way it should be developed — title ' +
        'first, approvals first, infrastructure first. Every address the company takes ' +
        'on is chosen for where Jaipur is heading, not only for where it stands today.',
      'From plotted residential townships on Ajmer Road and Tonk Road to farm estates ' +
        'at Morsar and commercial addresses at Dudu, the portfolio is built around one ' +
        'idea: an approved, well-planned plot is the most durable asset a family or a ' +
        'business can hold.'
    ],
    /** Drawn from assurances that recur across the supplied project data. */
    principles: [
      {
        title: 'Approved & Compliant',
        text: 'RERA registration, JDA and municipal approvals carried on the projects themselves.'
      },
      {
        title: 'Thoughtful Locations',
        text: 'Ajmer Road, Tonk Road, Morsar and Dudu — addresses along Jaipur’s growth corridors.'
      },
      {
        title: 'Modern Infrastructure',
        text: 'Planned roads, gated entries and services laid before a plot is handed over.'
      },
      {
        title: 'Long-Term Value',
        text: 'Residential, farm and commercial formats held to the same standard of development.'
      }
    ],
    image: '/projects/raghunandan-enclave.webp',
    imageAlt:
      'Landscaped central court at Raghunandan Enclave, Shivdaspura Mode, Tonk Road, Jaipur',
    /** Home carries the summary; the full story lives on /about. */
    more: { label: 'More about the company', href: routes.about } as Link
  },

  /**
   * Stats strip. `value: null` means Rajdhara has not supplied the number —
   * those tiles are skipped rather than guessed, so the strip always reads as
   * finished. Add a real figure and its tile appears.
   */
  stats: [
    { value: 5, label: 'Ongoing Projects', note: 'derived from projects' },
    { value: 4, label: 'Completed Projects', note: 'derived from completed' },
    { value: 5, label: 'Locations Across Jaipur', note: 'derived from projects' },
    { value: null, suffix: '+', label: 'Years of Experience', note: 'TODO: supply founding year' },
    { value: null, suffix: '+', label: 'Acres Developed', note: 'TODO: supply verified figure' },
    { value: null, suffix: '+', label: 'Families Served', note: 'TODO: supply verified figure' }
  ] as Stat[],

  projects: {
    eyebrow: 'Ongoing Portfolio',
    title: ['Projects Designed', 'for What’s _Next_.'],
    intro: 'Five addresses in development across Jaipur — residential, farm and commercial.',
    more: { label: 'View all projects', href: routes.projects } as Link,
    items: [
      {
        id: 'rajdhara-krishnam-bagh',
        name: 'Rajdhara Krishnam Bagh',
        location: 'Morsar, Jaipur',
        type: 'Farm Plots',
        highlights: ['RERA Registered', 'Spacious Farm Plots', 'Premium Amenities'],
        image: '/projects/rajdhara-krishnam-bagh.webp',
        alt: 'Entrance canopy and manned gate at Rajdhara Krishnam Bagh, Morsar, Jaipur',
        natural: { width: 485, height: 273 },
        layout: 'a',
        variant: 'overlay',
        summary:
          'A RERA-registered farm-plot development at Morsar, planned around spacious ' +
          'holdings behind a gated, manned entrance.',
        overview: [
          'Rajdhara Krishnam Bagh is a farm-plot development at Morsar, on the edge of ' +
            'Jaipur, laid out for buyers who want land with room to breathe — a weekend ' +
            'farmhouse, an orchard, or simply an asset held in green surroundings rather ' +
            'than inside a built-up colony.',
          'The project is RERA registered, and the layout is entered through a manned gate ' +
            'under a covered canopy. Plot-by-plot availability, sizes and current pricing ' +
            'are shared by the Rajdhara team on enquiry.'
        ],
        features: [
          {
            title: 'RERA Registered',
            text: 'The development is registered with the state real-estate regulator; the registration is provided with the plot documents.'
          },
          {
            title: 'Spacious Farm Plots',
            text: 'Holdings are sized for farm use rather than dense residential subdivision, so each plot carries genuine open frontage.'
          },
          {
            title: 'Premium Amenities',
            text: 'A gated, manned entrance and planned internal infrastructure serve the layout — the full amenity schedule is confirmed at enquiry.'
          }
        ],
        facts: [
          { label: 'Status', value: 'Ongoing' },
          { label: 'Type', value: 'Farm Plots' },
          { label: 'Location', value: 'Morsar, Jaipur' },
          { label: 'Approvals', value: 'RERA Registered' },
          // TODO (Rajdhara): supply the rows below; each appears once filled.
          { label: 'RERA Number', value: null },
          { label: 'Plot Sizes', value: null },
          { label: 'Total Area', value: null },
          { label: 'Possession', value: null }
        ]
      },
      {
        id: 'rajdhara-shyam-vihar',
        name: 'Rajdhara Shyam Vihar',
        location: 'Boraj, Ajmer Road, Jaipur',
        type: 'Residential Plots',
        highlights: ['Premium Location', 'Modern Infrastructure', 'Government Approved'],
        image: '/projects/rajdhara-shyam-vihar.webp',
        alt: 'Gated entrance and internal road at Rajdhara Shyam Vihar, Boraj, Ajmer Road, Jaipur',
        natural: { width: 367, height: 206 },
        layout: 'b',
        variant: 'panel',
        // This source carries a baked-in rounded white border — crop past it.
        zoom: 1.09,
        summary:
          'A government-approved residential layout at Boraj on Ajmer Road, with a gated ' +
          'entrance and internal roads already laid.',
        overview: [
          'Rajdhara Shyam Vihar sits at Boraj on Ajmer Road — one of the corridors along ' +
            'which Jaipur has been extending outward for years. The layout is a ' +
            'government-approved residential plotted development, entered through a gated ' +
            'front and served by internal roads laid as part of the scheme.',
          'It suits a family buying a plot to build on, and an investor holding approved ' +
            'residential land on a corridor that already carries road connectivity. Plot ' +
            'availability and dimensions are confirmed by the team on enquiry.'
        ],
        features: [
          {
            title: 'Premium Location',
            text: 'Boraj sits on Ajmer Road, a corridor already carrying established residential development outward from the city.'
          },
          {
            title: 'Modern Infrastructure',
            text: 'Internal roads, a gated entrance and the services that go with them are laid as part of the development, not left to the buyer.'
          },
          {
            title: 'Government Approved',
            text: 'The layout carries government approval, and the sanction papers are shown with the plot documentation.'
          }
        ],
        facts: [
          { label: 'Status', value: 'Ongoing' },
          { label: 'Type', value: 'Residential Plots' },
          { label: 'Location', value: 'Boraj, Ajmer Road, Jaipur' },
          { label: 'Approvals', value: 'Government Approved' },
          { label: 'RERA Number', value: null },
          { label: 'Plot Sizes', value: null },
          { label: 'Total Area', value: null },
          { label: 'Possession', value: null }
        ]
      },
      {
        id: 'raghunandan-enclave',
        name: 'Raghunandan Enclave',
        location: 'Shivdaspura Mode, Tonk Road, Jaipur',
        type: 'Residential Plots',
        highlights: ['RERA Approved', 'JDA Approved', '100% Agreement Value'],
        image: '/projects/raghunandan-enclave.webp',
        alt: 'Landscaped central temple court at Raghunandan Enclave, Shivdaspura Mode, Tonk Road, Jaipur',
        natural: { width: 384, height: 216 },
        layout: 'c',
        variant: 'panel',
        summary:
          'A RERA and JDA approved residential township at Shivdaspura Mode on Tonk Road, ' +
          'composed around a landscaped central court.',
        overview: [
          'Raghunandan Enclave is a residential plotted township at Shivdaspura Mode on ' +
            'Tonk Road, planned around a landscaped central court with a temple at its ' +
            'centre — a shared open space the layout is composed around, rather than a ' +
            'leftover strip at its edge.',
          'The project carries both RERA and JDA approval, and transactions are done at ' +
            '100% agreement value. For a buyer that combination is the one that matters: ' +
            'a regulator-registered, development-authority-approved layout, documented at ' +
            'the full transaction value.'
        ],
        features: [
          {
            title: 'RERA Approved',
            text: 'Registered with the state real-estate regulator, so the project sits on the public record with its declared particulars.'
          },
          {
            title: 'JDA Approved',
            text: 'Approved by the Jaipur Development Authority — sanctioned by the body that governs planning across the region.'
          },
          {
            title: '100% Agreement Value',
            text: 'The full transaction is recorded on the agreement, which is what makes a clean resale and a straightforward loan file possible later.'
          }
        ],
        facts: [
          { label: 'Status', value: 'Ongoing' },
          { label: 'Type', value: 'Residential Plots' },
          { label: 'Location', value: 'Shivdaspura Mode, Tonk Road, Jaipur' },
          { label: 'Approvals', value: 'RERA Approved · JDA Approved' },
          { label: 'RERA Number', value: null },
          { label: 'Plot Sizes', value: null },
          { label: 'Total Area', value: null },
          { label: 'Possession', value: null }
        ]
      },
      {
        id: 'rajdhara-eco-park',
        name: 'Rajdhara Eco Park',
        location: 'Mokhampura, Ajmer Road, Jaipur',
        type: 'Commercial Spaces',
        highlights: ['Prime Business Location', 'Government Approved', 'Modern Commercial Spaces'],
        image: '/projects/rajdhara-eco-park.webp',
        alt: 'Curved glazed facade of the commercial block at Rajdhara Eco Park, Mokhampura, Ajmer Road, Jaipur',
        natural: { width: 283, height: 159 },
        layout: 'd',
        variant: 'panel',
        summary:
          'Government-approved commercial space at Mokhampura on Ajmer Road, in a modern ' +
          'glazed block built for business use.',
        overview: [
          'Rajdhara Eco Park is a commercial development at Mokhampura on Ajmer Road. ' +
            'Unlike the plotted schemes elsewhere in the portfolio, this one is built ' +
            'space — a modern block with a curved glazed frontage, intended for businesses ' +
            'that want a visible address on a main corridor.',
          'The development is government approved. Unit sizes, floor plates and current ' +
            'availability are shared by the Rajdhara team on enquiry.'
        ],
        features: [
          {
            title: 'Prime Business Location',
            text: 'Mokhampura sits on Ajmer Road, giving the block main-corridor frontage and the passing traffic that comes with it.'
          },
          {
            title: 'Government Approved',
            text: 'The development carries government approval for its commercial use.'
          },
          {
            title: 'Modern Commercial Spaces',
            text: 'Purpose-built units behind a contemporary glazed facade, rather than converted residential floor space.'
          }
        ],
        facts: [
          { label: 'Status', value: 'Ongoing' },
          { label: 'Type', value: 'Commercial Spaces' },
          { label: 'Location', value: 'Mokhampura, Ajmer Road, Jaipur' },
          { label: 'Approvals', value: 'Government Approved' },
          { label: 'RERA Number', value: null },
          { label: 'Unit Sizes', value: null },
          { label: 'Total Area', value: null },
          { label: 'Possession', value: null }
        ]
      },
      {
        id: 'rajdhara-transport-nagar',
        name: 'Rajdhara Transport Nagar',
        location: 'Dudu, Main Ajmer Road',
        type: 'Commercial Plots',
        highlights: ['RERA Registered', 'Municipal Corporation Approved', 'Commercial Plots'],
        image: '/projects/rajdhara-transport-nagar.webp',
        alt: 'Illuminated entrance arch at Rajdhara Transport Nagar, Dudu, Main Ajmer Road',
        natural: { width: 1400, height: 788 },
        layout: 'e',
        variant: 'overlay',
        focal: '56% 46%',
        summary:
          'RERA-registered commercial plots at Dudu on Main Ajmer Road, approved by the ' +
          'municipal corporation and entered through a lit arch.',
        overview: [
          'Rajdhara Transport Nagar is a commercial plotted development at Dudu, directly ' +
            'on Main Ajmer Road. It is planned as commercial land — plots a business buys ' +
            'to build its own premises on, rather than pre-built units taken on lease.',
          'The project is RERA registered and approved by the municipal corporation, and ' +
            'is entered through an illuminated arch off the main road. Plot sizes, ' +
            'frontages and availability are confirmed by the team on enquiry.'
        ],
        features: [
          {
            title: 'RERA Registered',
            text: 'Registered with the state real-estate regulator, with the registration provided alongside the plot documents.'
          },
          {
            title: 'Municipal Corporation Approved',
            text: 'The layout is approved by the municipal corporation for its intended commercial use.'
          },
          {
            title: 'Commercial Plots',
            text: 'Land bought outright and built on to suit the business, rather than a fixed unit inside someone else’s block.'
          }
        ],
        facts: [
          { label: 'Status', value: 'Ongoing' },
          { label: 'Type', value: 'Commercial Plots' },
          { label: 'Location', value: 'Dudu, Main Ajmer Road' },
          { label: 'Approvals', value: 'RERA Registered · Municipal Corporation Approved' },
          { label: 'RERA Number', value: null },
          { label: 'Plot Sizes', value: null },
          { label: 'Total Area', value: null },
          { label: 'Possession', value: null }
        ]
      }
    ] as Project[]
  },

  completed: {
    eyebrow: 'Track Record',
    title: ['Delivered,', 'and _standing_.'],
    intro:
      'Projects Rajdhara Colonizers has completed. Layouts, approvals and plot ' +
      'details for any of these are available on enquiry.',
    /** Only the names are on record — no addresses, dates or figures are asserted. */
    items: [
      { name: 'The Kachnaar Farms' },
      { name: 'Shiv Residency' },
      { name: 'Govindam Arcade Extension' },
      { name: 'Rajdhara Shyam Vihar' }
    ]
  },

  leadership: {
    eyebrow: 'Leadership',
    title: ['Leadership Behind', 'the _Vision_.'],
    quote:
      'Great organizations are built by visionary leadership, strong values, and ' +
      'people who believe in a shared purpose.',
    quoteSource: 'Rajdhara Colonizers',
    more: { label: 'Meet the leadership', href: routes.leadership } as Link,
    people: [
      {
        name: 'Rahul Sharma',
        role: 'CMD & Founder',
        image: '/leaders/rahul-sharma.png',
        alt: 'Portrait of Rahul Sharma, CMD and Founder of Rajdhara Colonizers',
        // Fills the 4:5 frame as shot — the reference the other two match.
        zoom: 1,
        origin: 'center 30%',
        natural: { width: 1122, height: 1402 },
        bio: null // TODO (Rajdhara): supply a short biography.
      },
      {
        name: 'Suraj Yadav',
        role: 'MD & Co-Founder',
        image: '/leaders/suraj.png',
        alt: 'Portrait of Suraj Yadav, MD and Co-Founder of Rajdhara Colonizers',
        // Nudged in: slightly more headroom than the reference shot.
        zoom: 1.05,
        origin: 'center 26%',
        natural: { width: 1122, height: 1402 },
        bio: null // TODO (Rajdhara): supply a short biography.
      },
      {
        name: 'Ramesh Choudhary',
        role: 'COO & MD',
        image: '/leaders/ramesh.png',
        alt: 'Portrait of Ramesh Choudhary, COO and MD of Rajdhara Colonizers',
        // Studio shot sits smaller in its frame; pulled in to match the others.
        zoom: 1.12,
        origin: 'center 28%',
        natural: { width: 1122, height: 1402 },
        bio: null // TODO (Rajdhara): supply a short biography.
      }
    ] as Leader[]
  },

  closing: {
    eyebrow: 'Next Step',
    title: ['Find the right place for', 'your _next investment_.'],
    body:
      'Tell us what you are looking for — a plot to build on, a farm estate to hold, ' +
      'or a commercial address to trade from — and our team will walk you through ' +
      'availability, approvals and pricing.',
    primary: { label: 'Talk to Our Team', href: routes.contact } as Link,
    secondary: { label: 'See the Portfolio', href: routes.projects } as Link
  },

  contact: {
    eyebrow: 'Contact',
    title: ['Start the', '_conversation_.'],
    body:
      'Share a few details and the Rajdhara team will get back to you with plot ' +
      'availability, approval documents and site-visit options.',

    /**
     * TODO (Rajdhara): supply real contact details. Each entry renders only once
     * `value` is filled in, so no placeholder phone numbers, emails or addresses
     * ever reach the page.
     */
    channels: [
      { label: 'Phone', value: null, href: null }, // e.g. '+91 …' / 'tel:+91…'
      { label: 'Email', value: null, href: null }, // e.g. 'info@…' / 'mailto:…'
      { label: 'Office', value: null, href: null }, // registered office address
      { label: 'RERA', value: null, href: null } // registration number
    ] as Channel[],

    /** Factual: every project in the supplied portfolio sits in or around Jaipur. */
    coverage: 'Developing across Jaipur, Rajasthan',

    /**
     * TODO (Rajdhara): point this at a real form handler (Formspree, Getform, or
     * your own route). While it is null the form validates and gives the visitor
     * clear feedback, but does not attempt to send anywhere.
     */
    formEndpoint: null as string | null,

    form: {
      interests: ['Residential Plots', 'Farm Plots', 'Commercial Plots', 'General Enquiry']
    }
  },

  footer: {
    blurb:
      'Approved plotted development across Jaipur — residential townships, farm ' +
      'estates and commercial addresses.',
    /** TODO (Rajdhara): add real profile URLs. An empty list renders nothing. */
    social: [] as Link[],
    legal: [
      { label: 'Privacy Policy', href: routes.privacy },
      { label: 'Terms of Use', href: routes.terms },
      { label: 'FAQs', href: routes.faq }
    ] as Link[]
  },

  /* ===========================================================================
     Page-level content. One entry per route; each carries its own banner copy
     and metadata so nothing is duplicated between the page and its <head>.
     ======================================================================== */
  pages: {
    about: {
      meta: {
        title: 'About Us',
        description:
          'How Rajdhara Colonizers develops land in Jaipur — title first, approvals ' +
          'first, infrastructure first — and the principles behind every project.'
      },
      hero: {
        eyebrow: 'About Rajdhara',
        title: ['A developer judged by', 'what it _hands over_.'],
        lede:
          'Rajdhara Colonizers works on approved land across Jaipur, developing ' +
          'residential townships, farm estates and commercial addresses to a single ' +
          'standard — whatever the format, the plot is clear, sanctioned and serviced ' +
          'before it changes hands.'
      },

      story: {
        eyebrow: 'The Company',
        title: ['Land, developed', 'the _right way round_.'],
        body: [
          'Most of what can go wrong with a plot goes wrong before a buyer ever sees it ' +
            '— an unclear title, a layout without sanction, infrastructure promised for ' +
            'later and never laid. Rajdhara Colonizers works the other way round: title ' +
            'first, approvals first, infrastructure first, and only then a plot on offer.',
          'That order is why the portfolio reads the way it does. Every ongoing project ' +
            'carries approvals on the project itself — RERA registration, JDA sanction, ' +
            'government and municipal corporation approvals — and Raghunandan Enclave is ' +
            'transacted at 100% agreement value, so the paperwork reflects the deal.',
          'The addresses follow Jaipur outward rather than chasing it. Ajmer Road, Tonk ' +
            'Road, Morsar and Dudu are corridors with road connectivity already in place ' +
            'and development already moving along them — which is what turns a plot into ' +
            'something worth holding.'
        ]
      },

      /** Positioning statements, written for the site. Review before launch. */
      pillars: [
        {
          label: 'Vision',
          title: 'To build the addresses Jaipur grows into.',
          text:
            'To develop land along Jaipur’s growth corridors so that the plot a family ' +
            'or a business buys today sits inside a working, connected neighbourhood ' +
            'tomorrow — and to be the developer people name when they are asked who did ' +
            'it properly.'
        },
        {
          label: 'Mission',
          title: 'Approved land, planned properly, handed over clean.',
          text:
            'To take on only land we can develop with clear title and full sanction; to ' +
            'lay roads, gates and services before handover rather than after; and to give ' +
            'every buyer the documents, the approvals and the straight answers that make ' +
            'a plot purchase an easy decision.'
        }
      ],

      approach: {
        eyebrow: 'How We Work',
        title: ['Five steps between', 'raw land and _your plot_.'],
        intro:
          'Every Rajdhara project moves through the same sequence. Nothing is offered ' +
          'for sale until it has cleared the stage before it.',
        steps: [
          {
            title: 'Location Study',
            text: 'Corridors are chosen for connectivity and direction of growth — the reason the portfolio sits on Ajmer Road, Tonk Road, Morsar and Dudu.'
          },
          {
            title: 'Title & Due Diligence',
            text: 'Ownership, encumbrances and land use are examined before the company commits. A title that will not come clean ends the conversation.'
          },
          {
            title: 'Approvals',
            text: 'RERA registration and the relevant sanction — JDA, government or municipal corporation — are taken on the project itself, not left as an assurance.'
          },
          {
            title: 'Master Planning',
            text: 'Roads, plot sizes, entrances and open space are planned together, so the layout works as a neighbourhood rather than as a grid of parcels.'
          },
          {
            title: 'Infrastructure & Handover',
            text: 'Internal roads, gated entries and services are laid, and the plot is handed over with its documentation in order.'
          }
        ]
      },

      differences: {
        eyebrow: 'Why Rajdhara',
        title: ['What you get that', 'you should not _have to ask for_.'],
        items: [
          {
            title: 'Approvals on the project',
            text: 'Every ongoing development carries its own approvals — RERA, JDA, government or municipal corporation, named per project rather than claimed for the company.'
          },
          {
            title: 'Full agreement value',
            text: 'Raghunandan Enclave transacts at 100% agreement value, so the recorded price is the real one — which matters at resale and at the bank.'
          },
          {
            title: 'Infrastructure before handover',
            text: 'Internal roads and gated entries are laid as part of the development, so a plot is usable on the day it is handed over.'
          },
          {
            title: 'One standard, three formats',
            text: 'Residential, farm and commercial developments are held to the same approvals and the same planning discipline.'
          },
          {
            title: 'Documents you can take away',
            text: 'Approval papers and plot documentation are shared during the enquiry, not produced at the last minute.'
          },
          {
            title: 'Corridors, not islands',
            text: 'Addresses sit on roads that already carry traffic and development, rather than on land waiting for a highway that may not arrive.'
          }
        ]
      }
    },

    projects: {
      meta: {
        title: 'Projects',
        description:
          'Ongoing and completed developments by Rajdhara Colonizers across Jaipur — ' +
          'residential plots, farm plots and commercial addresses on Ajmer Road, Tonk ' +
          'Road, Morsar and Dudu.'
      },
      hero: {
        eyebrow: 'Portfolio',
        title: ['Five addresses', 'in _development_.'],
        lede:
          'Residential townships, farm estates and commercial land across Jaipur — each ' +
          'with its own approvals, its own corridor, and its own reason for being where ' +
          'it is. Below the ongoing work sits the record of what has already been ' +
          'delivered.'
      },
      /** Grouping rail above the mosaic; counts are derived, never typed in. */
      formatsTitle: 'What we develop',
      formats: [
        {
          type: 'Residential Plots',
          text: 'Approved plotted townships for families building their own home, on corridors already carrying residential growth.'
        },
        {
          type: 'Farm Plots',
          text: 'Larger holdings on the city’s green edge, for a farmhouse, an orchard, or land simply held for the long term.'
        },
        {
          type: 'Commercial Plots',
          text: 'Sanctioned commercial land on main-road frontage, bought outright and built to suit the business.'
        },
        {
          type: 'Commercial Spaces',
          text: 'Purpose-built units in a modern block, for businesses that want a finished address rather than a plot.'
        }
      ]
    },

    project: {
      /** Shared chrome for every /projects/<id> page. */
      backLabel: 'All projects',
      overviewTitle: 'Overview',
      featuresTitle: 'What this project carries',
      factsTitle: 'Project details',
      pendingNote:
        'Plot sizes, RERA number and possession details are confirmed by the team on ' +
        'enquiry.',
      alsoTitle: 'Also in development',
      enquiry: {
        eyebrow: 'Enquire',
        title: 'Ask about this project',
        body:
          'Availability, plot dimensions, approval documents and a site visit — tell us ' +
          'which of those you need and the team will come back to you.'
      }
    },

    leadership: {
      meta: {
        title: 'Leadership',
        description:
          'The leadership of Rajdhara Colonizers — Rahul Sharma, Suraj Yadav and Ramesh ' +
          'Choudhary — and the values the company is run on.'
      },
      hero: {
        eyebrow: 'Leadership',
        title: ['The people the', 'company _answers to_.'],
        lede:
          'Rajdhara Colonizers is led by three people who between them carry the ' +
          'company’s land, delivery and day-to-day operations — and who put their names ' +
          'to every project it takes on.'
      },
      values: {
        eyebrow: 'How We Operate',
        title: ['Values that survive', 'a _difficult day_.'],
        intro:
          'Principles are easy on a good day. These are the ones the company holds to ' +
          'when a deal would be simpler without them.',
        items: [
          {
            title: 'Say it straight',
            text: 'A buyer hears what a project is and what it is not — including what has not been finalised yet.'
          },
          {
            title: 'Paper before promise',
            text: 'If the approval is not in hand, it is not presented as though it is.'
          },
          {
            title: 'Deliver the boring things',
            text: 'Roads, drainage, gates and documentation are the parts nobody photographs and everybody lives with.'
          },
          {
            title: 'Stay after the sale',
            text: 'A plot buyer’s questions do not stop at registration, and neither does the team.'
          }
        ]
      }
    },

    contact: {
      meta: {
        title: 'Contact',
        description:
          'Enquire about plot availability, approvals and site visits at Rajdhara ' +
          'Colonizers projects across Jaipur.'
      },
      hero: {
        eyebrow: 'Contact',
        title: ['Tell us what you', 'are _looking for_.'],
        lede:
          'A plot to build on, a farm holding to keep, or a commercial address to trade ' +
          'from — send the details and the Rajdhara team will come back with ' +
          'availability, approvals and what a site visit would involve.'
      },
      /** What actually happens after the form is sent — set expectations honestly. */
      expect: {
        title: 'What happens next',
        steps: [
          {
            title: 'We read the enquiry',
            text: 'Your requirement is matched against current availability across the five ongoing projects.'
          },
          {
            title: 'We come back with specifics',
            text: 'Plot options, sizes where finalised, approval documents and an indicative price for what fits.'
          },
          {
            title: 'We walk the site with you',
            text: 'A visit to the layout, so the plot, the roads and the surroundings are seen rather than described.'
          }
        ]
      },
      visit: {
        title: 'Prefer to visit a project directly?',
        text:
          'Site visits can be arranged at any of the five ongoing developments. Mention ' +
          'the project in your enquiry and the team will confirm a time.'
      }
    },

    faq: {
      meta: {
        title: 'FAQs',
        description:
          'Common questions about buying a plot from Rajdhara Colonizers — approvals, ' +
          'RERA registration, agreement value, documentation and site visits.'
      },
      hero: {
        eyebrow: 'FAQs',
        title: ['Questions worth', 'asking _any developer_.'],
        lede:
          'The questions buyers put to us most often, answered plainly. Anything ' +
          'specific to a plot — size, price, registration number — is confirmed by the ' +
          'team on enquiry rather than guessed at here.'
      },
      groups: [
        {
          title: 'Buying a plot',
          items: [
            {
              q: 'What is a plotted development?',
              a: 'You buy the land itself, within a planned and approved layout, and build on it yourself — as opposed to buying a finished flat or unit. Rajdhara lays the roads, entrances and services for the layout; what goes up on your plot is yours to decide, within the sanctioned norms for the scheme.'
            },
            {
              q: 'What does Rajdhara develop?',
              a: 'Four formats across Jaipur: residential plots, farm plots, commercial plots and built commercial spaces. Five projects are in development — at Morsar, Boraj and Mokhampura on Ajmer Road, Shivdaspura Mode on Tonk Road, and Dudu on Main Ajmer Road.'
            },
            {
              q: 'Can I visit a site before deciding?',
              a: 'Yes. Site visits are arranged at any of the ongoing projects. Mention which project you are interested in when you enquire and the team will confirm a time.'
            },
            {
              q: 'Do you help with home loans or financing?',
              a: 'Financing depends on your bank, the project and your own eligibility, so we do not make promises on it. What we can do is provide the approval and title documentation a lender will ask for. Speak to the team about the specific project you are considering.'
            }
          ]
        },
        {
          title: 'Approvals and paperwork',
          items: [
            {
              q: 'What does “RERA registered” mean for me?',
              a: 'It means the project is registered with the state real-estate regulator and its declared particulars are on the public record, with the protections the RERA framework gives a buyer. Rajdhara Krishnam Bagh, Raghunandan Enclave and Rajdhara Transport Nagar are registered; the registration is provided with the plot documents.'
            },
            {
              q: 'What is JDA approval?',
              a: 'Approval from the Jaipur Development Authority, the body that governs planning across the Jaipur region. A JDA-approved layout has been sanctioned by that authority. Raghunandan Enclave carries JDA approval.'
            },
            {
              q: 'What does “100% agreement value” mean?',
              a: 'The full transaction is recorded on the agreement, rather than a part of it being kept off the paperwork. It matters later: a clean recorded value is what makes a straightforward resale and a straightforward loan file possible. Raghunandan Enclave transacts this way.'
            },
            {
              q: 'Which approvals does each project carry?',
              a: 'They differ, and each project page lists its own. Across the portfolio you will see RERA registration, JDA approval, government approval and municipal corporation approval — named per project rather than claimed generally.'
            },
            {
              q: 'What documents will I receive?',
              a: 'The approval papers for the project and the plot documentation for your specific plot. These are shared during the enquiry, before you commit — ask for them and they will be sent.'
            }
          ]
        },
        {
          title: 'About the company',
          items: [
            {
              q: 'Has Rajdhara delivered projects before?',
              a: 'Yes — four completed developments: The Kachnaar Farms, Shiv Residency, Govindam Arcade Extension and Rajdhara Shyam Vihar. Layouts, approvals and plot details for any of them are available on request.'
            },
            {
              q: 'What infrastructure is laid before handover?',
              a: 'Internal roads, gated entries and the services planned for the layout. The point of the sequence is that a plot is usable when it is handed over, rather than waiting on work promised for later.'
            },
            {
              q: 'How do I get plot sizes and pricing?',
              a: 'Send an enquiry naming the project. Availability, dimensions and current pricing change as a project sells, so the team confirms them directly rather than publishing figures that go stale.'
            }
          ]
        }
      ]
    },

    notFound: {
      eyebrow: 'Error 404',
      title: ['This page has', 'not been _developed_.'],
      body:
        'The address you followed does not exist on this site — it may have moved, or ' +
        'the link may be mistyped. The portfolio and the team are both a click away.',
      primary: { label: 'Back to Home', href: routes.home } as Link,
      secondary: { label: 'See the Projects', href: routes.projects } as Link
    }
  },

  /* ===========================================================================
     Legal pages. General-purpose policies for a marketing site that collects
     enquiries and nothing else. TODO (Rajdhara): have these reviewed, and fill
     in the contact route for data requests once contact.channels are supplied.
     ======================================================================== */
  legal: {
    privacy: {
      meta: {
        title: 'Privacy Policy',
        description:
          'How Rajdhara Colonizers handles the information submitted through the ' +
          'enquiry form on this website.'
      },
      eyebrow: 'Legal',
      title: ['Privacy', '_Policy_.'],
      lede:
        'This policy explains what this website collects, why, and what happens to it. ' +
        'It covers the site only — not any separate agreement you may enter into with ' +
        'Rajdhara Colonizers.',
      sections: [
        {
          title: 'What we collect',
          body: [
            'The only information this website asks for is what you type into the ' +
              'enquiry form: your name, phone number, and optionally your email address, ' +
              'the type of property you are interested in, the project you are asking ' +
              'about, and your message.',
            'The site does not require an account, and there is nothing to sign up for.'
          ]
        },
        {
          title: 'Why we collect it',
          body: [
            'To respond to your enquiry — to share plot availability, approval ' +
              'documents, pricing and site-visit options for the projects you asked ' +
              'about, and to follow up on that conversation.',
            'Your details are not sold, rented or traded, and are not used to send ' +
              'marketing unrelated to the enquiry you made.'
          ]
        },
        {
          title: 'Cookies and analytics',
          body: [
            'This site sets no advertising or tracking cookies of its own, and it does ' +
              'not build a profile of your browsing.',
            'Web fonts are served through Google Fonts, which means your browser makes a ' +
              'request to Google’s servers when the page loads. That request is subject ' +
              'to Google’s own privacy terms.'
          ]
        },
        {
          title: 'How long we keep it',
          body: [
            'Enquiries are retained for as long as needed to deal with them and to keep ' +
              'a record of the conversation, and no longer than is required for our ' +
              'legitimate business and legal purposes.'
          ]
        },
        {
          title: 'Your choices',
          body: [
            'You can ask us what enquiry information we hold about you, ask for it to be ' +
              'corrected, or ask us to delete it. Send that request through the contact ' +
              'page and we will act on it.'
          ]
        },
        {
          title: 'Changes to this policy',
          body: [
            'If this policy changes, the revised version will be published on this page.'
          ]
        }
      ]
    },

    terms: {
      meta: {
        title: 'Terms of Use',
        description:
          'The terms on which the Rajdhara Colonizers website is provided, including ' +
          'the status of project information published here.'
      },
      eyebrow: 'Legal',
      title: ['Terms of', '_Use_.'],
      lede:
        'These terms govern your use of this website. Using the site means you accept ' +
        'them.',
      sections: [
        {
          title: 'About this website',
          body: [
            'This site is published by Rajdhara Colonizers to describe the company and ' +
              'the projects it is developing, and to let visitors send an enquiry.'
          ]
        },
        {
          title: 'Project information is indicative',
          body: [
            'Renders, layouts, descriptions and project particulars on this site are ' +
              'indicative and for general information. They are not an offer, an ' +
              'invitation to offer, or a contract.',
            'Availability, plot dimensions, specifications and pricing change during the ' +
              'course of a development, and are confirmed by our team in writing at the ' +
              'time of your enquiry. Where a figure has not been finalised, this site ' +
              'leaves it out rather than estimating it.',
            'Anything you agree with Rajdhara Colonizers is governed by the sale ' +
              'agreement and the project’s registered particulars — those documents ' +
              'prevail over anything published here.'
          ]
        },
        {
          title: 'Images',
          body: [
            'Photographs and architectural renders illustrate the design intent of a ' +
              'project. Built work may differ, and landscaping shown may be at a mature ' +
              'stage rather than at handover.'
          ]
        },
        {
          title: 'Intellectual property',
          body: [
            'The Rajdhara Colonizers name, logo, project names, text and imagery on this ' +
              'site belong to the company and may not be reproduced without written ' +
              'permission.'
          ]
        },
        {
          title: 'External links',
          body: [
            'Where this site links out, we are not responsible for the content or ' +
              'practices of the site you arrive at.'
          ]
        },
        {
          title: 'Governing law',
          body: [
            'These terms are governed by the laws of India, and the courts at Jaipur, ' +
              'Rajasthan have jurisdiction over any dispute arising from them.'
          ]
        }
      ]
    }
  }
};

export type Site = typeof site;

/** Look a project up by its URL segment. */
export function getProject(id: string): Project | undefined {
  return site.projects.items.find((p) => p.id === id);
}
