import type { Metadata } from 'next';
import { routes, site } from '@/lib/site';
import { NextPage, PageHero } from '@/components/page-hero';
import { Credentials } from '@/components/hero';
import { EventGallery } from '@/components/gallery';
import { ClosingCta } from '@/components/leadership';

const page = site.pages.gallery;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: routes.gallery },
  openGraph: {
    title: `${page.meta.title} — ${site.name}`,
    description: page.meta.description,
    url: routes.gallery
  }
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lede={page.hero.lede}
        trail={[{ label: 'Gallery' }]}
      />
      <Credentials />
      <EventGallery />
      <ClosingCta />
      <NextPage note="Next" label="See the projects" href={routes.projects} />
    </>
  );
}
