import type { Metadata } from 'next';
import { routes } from '@/lib/site';
import { Credentials, Hero } from '@/components/hero';
import { About, Stats } from '@/components/about';
import { Completed, Projects } from '@/components/projects';
import { ClosingCta, Leadership } from '@/components/leadership';
import { Contact } from '@/components/contact';

export const metadata: Metadata = {
  alternates: { canonical: routes.home }
};

/**
 * The home page is the overview: every part of the site is represented here,
 * and each section links through to the page that carries it in full.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Credentials />
      <About />
      <Stats />
      <Projects />
      <Completed />
      <Leadership />
      <ClosingCta />
      <Contact />
    </>
  );
}
