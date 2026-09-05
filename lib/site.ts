/**
 * Rajdhara Colonizers — single source of truth for site content.
 *
 * Every section renders from this file. Fields typed `| null` are facts the
 * company has NOT supplied yet: the components skip null values entirely, so
 * the site never ships placeholder or invented information. Fill a value in and
 * the corresponding UI appears on the next build.
 */

export type Link = { label: string; href: string };

export type Project = {
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
};

export type Leader = {
  name: string;
  role: string;
  image: string;
  alt: string;
  /**
   * The three supplied photographs are framed very differently — one is a
   * studio full-length shot, two are close crops. `zoom` and `origin` scale and
   * anchor each one inside the shared portrait frame so all three figures read
   * at a similar size, instead of one person floating small beside two others.
   */
  zoom: number;
  origin: string;
  natural: { width: number; height: number };
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
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Contact', href: '#contact' }
  ] as Link[],

  cta: { label: 'Enquire Now', href: '#contact' } as Link,

  hero: {
    eyebrow: 'Rajdhara Colonizers · Jaipur',
    /** Text wrapped in _underscores_ is set in the display italic. */
    headline: ['Building Jaipur’s', 'next _landmarks_.'],
    lede:
      'Plotted townships, farm estates and commercial addresses — developed on ' +
      'approved land, planned around real infrastructure, and placed where Jaipur ' +
      'is actually growing.',
    primary: { label: 'Explore Projects', href: '#projects' } as Link,
    secondary: { label: 'Talk to Us', href: '#contact' } as Link,
    /** The only supplied asset with enough resolution to carry a full-bleed plate. */
    image: '/projects/rajdhara-transport-nagar.webp',
    imageAlt:
      'Entrance gate elevation of Rajdhara Transport Nagar, Dudu, on Main Ajmer Road',
    badge: {
      eyebrow: 'Now developing',
      caption: 'projects underway across Jaipur',
      link: { label: 'Explore Projects', href: '#projects' } as Link
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
      'Landscaped central court at Raghunandan Enclave, Shivdaspura Mode, Tonk Road, Jaipur'
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
        variant: 'overlay'
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
        zoom: 1.09
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
        variant: 'panel'
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
        variant: 'panel'
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
        focal: '56% 46%'
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
    people: [
      {
        name: 'Rahul Sharma',
        role: 'CMD & Founder',
        image: '/leaders/rahul-sharma.webp',
        alt: 'Portrait of Rahul Sharma, CMD and Founder of Rajdhara Colonizers',
        // Already a close crop that fills the frame.
        zoom: 1.02,
        origin: 'center 30%',
        natural: { width: 288, height: 360 }
      },
      {
        name: 'Suraj Yadav',
        role: 'MD & Co-Founder',
        image: '/leaders/suraj-yadav.webp',
        alt: 'Portrait of Suraj Yadav, MD and Co-Founder of Rajdhara Colonizers',
        // Pulled in so the figure matches the others and the parked vehicles
        // behind fall outside the frame.
        zoom: 1.26,
        origin: 'center 28%',
        natural: { width: 374, height: 467 }
      },
      {
        name: 'Ramesh Choudhary',
        role: 'COO & MD',
        image: '/leaders/ramesh-choudhary.webp',
        alt: 'Portrait of Ramesh Choudhary, COO and MD of Rajdhara Colonizers',
        // Full-length studio shot: scaled up and anchored high so the face
        // stays in frame at the same figure size as the other two.
        zoom: 1.5,
        origin: 'center 14%',
        natural: { width: 512, height: 640 }
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
    primary: { label: 'Talk to Our Team', href: '#contact' } as Link,
    secondary: { label: 'See the Portfolio', href: '#projects' } as Link
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
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' }
    ] as Link[]
  }
};

export type Site = typeof site;
