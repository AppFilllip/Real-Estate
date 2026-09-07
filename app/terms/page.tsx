import type { Metadata } from 'next';
import { routes, site } from '@/lib/site';
import { LegalPage } from '@/components/legal';

const page = site.legal.terms;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: routes.terms },
  robots: { index: true, follow: true }
};

export default function TermsPage() {
  return (
    <LegalPage
      label="Terms of Use"
      eyebrow={page.eyebrow}
      title={page.title}
      lede={page.lede}
      sections={page.sections}
    />
  );
}
