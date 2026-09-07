import type { Metadata } from 'next';
import { routes, site } from '@/lib/site';
import { NextPage, PageHero } from '@/components/page-hero';
import { Faq, FaqJsonLd } from '@/components/faq';
import { ClosingCta } from '@/components/leadership';

const page = site.pages.faq;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: routes.faq },
  openGraph: {
    title: `${page.meta.title} — ${site.name}`,
    description: page.meta.description,
    url: routes.faq
  }
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lede={page.hero.lede}
        trail={[{ label: 'FAQs' }]}
      />
      <Faq />
      <ClosingCta />
      <NextPage note="Next" label="Send an enquiry" href={routes.contact} />
    </>
  );
}
