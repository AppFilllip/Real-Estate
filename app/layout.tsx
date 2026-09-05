import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { site } from '@/lib/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteEffects } from '@/components/site-effects';
import './globals.css';

/*
 * A high-contrast display serif for headlines against a clean grotesque for
 * everything else — the pairing does the heavy lifting for "established
 * developer" rather than weight or colour.
 */
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display-loaded'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans-loaded'
});

// TODO (Rajdhara): set NEXT_PUBLIC_SITE_URL to the live domain so social cards
// resolve against it instead of localhost.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  applicationName: site.name,
  icons: { icon: site.brand.favicon, apple: site.brand.favicon },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [site.hero.image]
  },
  twitter: { card: 'summary_large_image' }
};

export const viewport: Viewport = {
  themeColor: '#0f2747'
};

/** Only facts Rajdhara has actually supplied reach the structured data. */
function structuredData() {
  const phone = site.contact.channels.find((c) => c.label === 'Phone' && c.value);
  const email = site.contact.channels.find((c) => c.label === 'Email' && c.value);

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: site.name,
    description: site.description,
    areaServed: site.region,
    slogan: site.tagline,
    ...(phone ? { telephone: phone.value } : {}),
    ...(email ? { email: email.value } : {}),
    ...(site.footer.social.length ? { sameAs: site.footer.social.map((s) => s.href) } : {}),
    makesOffer: site.projects.items.map((p) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Residence',
        name: p.name,
        address: { '@type': 'PostalAddress', addressLocality: p.location }
      }
    }))
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <SiteEffects />
      </body>
    </html>
  );
}
