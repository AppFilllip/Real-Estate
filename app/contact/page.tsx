import type { Metadata } from 'next';
import { routes, site } from '@/lib/site';
import { NextPage, PageHero } from '@/components/page-hero';
import { Contact, WhatHappensNext } from '@/components/contact';
import { Credentials } from '@/components/hero';

const page = site.pages.contact;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: routes.contact },
  openGraph: {
    title: `${page.meta.title} — ${site.name}`,
    description: page.meta.description,
    url: routes.contact
  }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lede={page.hero.lede}
        trail={[{ label: 'Contact' }]}
      />
      <Credentials />
      {/* Banner carries the title, so the block opens straight on the channels
          and the form. */}
      <Contact heading={false} projectList />
      <WhatHappensNext />
      <NextPage note="Still deciding?" label="Read the FAQs" href={routes.faq} />
    </>
  );
}
