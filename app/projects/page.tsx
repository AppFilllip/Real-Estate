import type { Metadata } from 'next';
import { routes, site } from '@/lib/site';
import { NextPage, PageHero } from '@/components/page-hero';
import { Completed, Formats, Projects } from '@/components/projects';
import { ClosingCta } from '@/components/leadership';

const page = site.pages.projects;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: routes.projects },
  openGraph: {
    title: `${page.meta.title} — ${site.name}`,
    description: page.meta.description,
    url: routes.projects,
    images: [site.projects.items[0].image]
  }
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lede={page.hero.lede}
        trail={[{ label: 'Projects' }]}
      />
      <Formats />
      {/* The banner has already introduced the portfolio, so the mosaic runs
          without a second heading above it. */}
      <Projects heading={false} />
      <Completed />
      <ClosingCta />
      <NextPage note="Next" label="Meet the leadership" href={routes.leadership} />
    </>
  );
}
