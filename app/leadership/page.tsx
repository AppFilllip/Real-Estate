import type { Metadata } from 'next';
import { routes, site } from '@/lib/site';
import { NextPage, PageHero } from '@/components/page-hero';
import { ClosingCta, Leadership, Values } from '@/components/leadership';
import { Stats } from '@/components/about';

const page = site.pages.leadership;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: routes.leadership },
  openGraph: {
    title: `${page.meta.title} — ${site.name}`,
    description: page.meta.description,
    url: routes.leadership,
    images: [site.leadership.people[0].image]
  }
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lede={page.hero.lede}
        trail={[{ label: 'Leadership' }]}
      />
      {/* Banner carries the title, so the section runs from its pull-quote. */}
      <Leadership heading={false} />
      <Values />
      <Stats />
      <ClosingCta />
      <NextPage note="Next" label="Talk to the team" href={routes.contact} />
    </>
  );
}
