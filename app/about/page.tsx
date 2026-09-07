import type { Metadata } from 'next';
import { routes, site } from '@/lib/site';
import { NextPage, PageHero } from '@/components/page-hero';
import { Credentials } from '@/components/hero';
import { About, Approach, Differences, Pillars, Stats, Story } from '@/components/about';
import { ClosingCta } from '@/components/leadership';

const page = site.pages.about;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: routes.about },
  openGraph: {
    title: `${page.meta.title} — ${site.name}`,
    description: page.meta.description,
    url: routes.about
  }
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lede={page.hero.lede}
        trail={[{ label: 'About' }]}
      />
      <Credentials />
      <Story />
      <Pillars />
      {/* The home page's about spread, without its "read more" link — this is
          the page that link points at. */}
      <About withLink={false} />
      <Stats />
      <Approach />
      <Differences />
      <ClosingCta />
      <NextPage note="Next" label="See the projects" href={routes.projects} />
    </>
  );
}
