import type { Metadata } from 'next';
import { routes, site } from '@/lib/site';
import { NextPage, PageHero } from '@/components/page-hero';
import { Credentials } from '@/components/hero';
import { Approach, Differences } from '@/components/about';
import { ClosingCta } from '@/components/leadership';

const page = site.pages.whyChooseUs;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: routes.whyChooseUs },
  openGraph: {
    title: `${page.meta.title} — ${site.name}`,
    description: page.meta.description,
    url: routes.whyChooseUs
  }
};

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lede={page.hero.lede}
        trail={[{ label: 'Why Choose Us' }]}
      />
      <Credentials />
      <Differences withLink={false} />
      <Approach />
      <ClosingCta />
      <NextPage note="Next" label="See the projects" href={routes.projects} />
    </>
  );
}
