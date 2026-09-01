import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseEvidenceVisual } from '@/components/case-evidence-visual';
import { CaseNavigator } from '@/components/case-navigator';
import { NativeLink } from '@/components/native-link';
import { PageFooter } from '@/components/page-footer';
import { SiteHeader } from '@/components/site-header';
import { cases, getCase } from '@/lib/cases';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCase(slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.lead,
    openGraph: {
      title: project.name,
      description: project.lead,
      images: [],
    },
    twitter: {
      title: project.name,
      description: project.lead,
      images: [],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getCase(slug);

  if (!project) notFound();

  const position = cases.findIndex((item) => item.slug === project.slug);
  const previousProject = cases[(position - 1 + cases.length) % cases.length];
  const nextProject = cases[(position + 1) % cases.length];
  const actor = project.label.includes('team') ? 'Our team' : 'I';

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className={`case-hero case-hero--${project.slug}`}>
          <div className="shell">
            <div className="case-kicker">
              <span>
                {String(position + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
              </span>
              <span>{project.label}</span>
            </div>
            <p className="overline">{project.name}</p>
            <h1>{project.title}</h1>
            <p className="case-lead">{project.lead}</p>
          </div>
        </section>

        <section className="case-facts" aria-label="Project at a glance">
          <div className="shell fact-grid">
            {project.facts.map((fact) => (
              <div className="fact" key={fact.label} data-reveal>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="case-content">
          <div className="shell case-layout">
            <CaseNavigator />

            <div className="case-body">
              <section className="case-section" id="question" data-reveal>
                <p className="section-number">01 · Decision</p>
                <h2>{actor} defined the decision before selecting a method.</h2>
                <p className="large-copy">{project.question}</p>
              </section>

              <section className="case-section" id="approach" data-reveal>
                <p className="section-number">02 · Approach</p>
                <h2>{actor} organised the analysis in the following sequence.</h2>
                <ol className="approach-list">
                  {project.approach.map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="case-section evidence-block" id="evidence" data-reveal>
                <p className="section-number">03 · Evidence</p>
                <h2>The results support the following interpretation.</h2>
                <p className="large-copy">{project.evidence}</p>
                <CaseEvidenceVisual slug={project.slug} />
              </section>

              <section className="case-section" id="implications" data-reveal>
                <p className="section-number">04 · Decision implications</p>
                <h2>{actor} translated the analysis into practical next steps.</h2>
                <ul className="implication-list">
                  {project.implications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="case-section split-notes" id="limits" data-reveal>
                <div>
                  <p className="section-number">05 · Limits</p>
                  <h2>The evidence has defined limits.</h2>
                  <p>{project.limitations}</p>
                </div>
                <div>
                  <p className="section-number">06 · Next iteration</p>
                  <h2>{actor} would strengthen the next iteration.</h2>
                  <p>{project.improvement}</p>
                </div>
              </section>

              <section className="case-section contribution-block" id="contribution" data-reveal>
                <p className="section-number">07 · Attribution</p>
                <h2>I distinguish my contribution from the complete project output.</h2>
                <p>{project.contribution}</p>
              </section>

              <section className="case-section toolkit" data-reveal>
                <p className="section-number">Toolkit</p>
                <div className="tag-list">
                  {project.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="case-pagination" aria-label="More case studies">
          <div className="shell case-pagination-grid" data-reveal>
            <NativeLink className="case-pagination-card" href={`/work/${previousProject.slug}`}>
              <span>← Previous case</span>
              <strong>{previousProject.name}</strong>
              <small>{previousProject.title}</small>
            </NativeLink>
            <NativeLink className="case-pagination-card case-pagination-card--next" href={`/work/${nextProject.slug}`}>
              <span>Next case →</span>
              <strong>{nextProject.name}</strong>
              <small>{nextProject.title}</small>
            </NativeLink>
          </div>
        </section>
      </main>

      <PageFooter />
    </>
  );
}
