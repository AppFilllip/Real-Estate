import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, routes, site } from '@/lib/site';
import {
  AlsoDeveloping,
  LocationMap,
  MasterPlan,
  NearbyAttractions,
  PaymentPlan,
  ProjectBody,
  ProjectDocuments,
  ProjectHero
} from '@/components/project-detail';
import { Contact } from '@/components/contact';
import { Credentials } from '@/components/hero';
import { Eyebrow } from '@/components/ui/brand';

type Params = { params: Promise<{ id: string }> };

/** Five known projects — all five are statically rendered at build time. */
export function generateStaticParams() {
  return site.projects.items.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};

  const title = `${project.name} — ${project.type}, ${project.location}`;

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: routes.project(project.id) },
    openGraph: {
      title,
      description: project.summary,
      url: routes.project(project.id),
      images: [project.image]
    }
  };
}

/** Only facts the project data actually carries reach the structured data. */
function structuredData(id: string) {
  const project = getProject(id);
  if (!project) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: project.name,
    description: project.summary,
    image: project.image,
    category: project.type,
    brand: { '@type': 'Organization', name: site.name },
    additionalProperty: project.facts
      .filter((f) => f.value)
      .map((f) => ({ '@type': 'PropertyValue', name: f.label, value: f.value }))
  };
}

export default async function ProjectPage({ params }: Params) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const copy = site.pages.project;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(id)) }}
      />

      <ProjectHero project={project} />
      <Credentials />
      <ProjectBody project={project} />
      <NearbyAttractions project={project} />
      <MasterPlan project={project} />
      <LocationMap project={project} />
      <PaymentPlan project={project} />
      <ProjectDocuments project={project} />
      <AlsoDeveloping current={project} />

      <div className="penquiry">
        <div className="container penquiry__head">
          <Eyebrow className="reveal">{copy.enquiry.eyebrow}</Eyebrow>
          <h2 className="display-2 penquiry__title reveal">{copy.enquiry.title}</h2>
          <p className="lede penquiry__body reveal">{copy.enquiry.body}</p>
        </div>
        {/* The project dropdown arrives preselected with this project. */}
        <Contact heading={false} defaultProject={project.name} />
      </div>
    </>
  );
}
