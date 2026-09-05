import { Credentials, Hero } from '@/components/hero';
import { About, Stats } from '@/components/about';
import { Completed, Projects } from '@/components/projects';
import { ClosingCta, Leadership } from '@/components/leadership';
import { Contact } from '@/components/contact';

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
