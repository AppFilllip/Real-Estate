import type { Metadata } from 'next';
import { routes, site } from '@/lib/site';
import { LegalPage } from '@/components/legal';

const page = site.legal.privacy;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: routes.privacy },
  robots: { index: true, follow: true }
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      label="Privacy Policy"
      eyebrow={page.eyebrow}
      title={page.title}
      lede={page.lede}
      sections={page.sections}
    />
  );
}
