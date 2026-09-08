import { ModelExplorer } from '@/components/model-explorer';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseEvidenceVisual } from '@/components/case-evidence-visual';
import { CaseNavigator } from '@/components/case-navigator';
import { NativeLink } from '@/components/native-link';
import { PageFooter } from '@/components/page-footer';
import { SiteHeader } from '@/components/site-header';
import { cases, getCase } from '@/lib/cases';
import { projectSummaries } from '@/lib/project-summaries';

const caseStories: Record<string, string[]> = {
  "decision-intelligence": [
    "A recommendation is only as useful as the assumptions behind it.",
    "A dashboard could describe the business, but the assignment also required a choice about location and store configuration. Our team connected data checking, margin scenarios and optimisation so the recommendation could be examined rather than simply accepted.",
    "The judgement in the work",
    "Testing margins from 60% to 70% made the assumptions visible. The value of the model was in exposing the decision logic, not in claiming that an assessed recommendation had already delivered a commercial result."
  ],
  "customer-intelligence": [
    "The interesting part was what happened when trust entered the model.",
    "The question began with personalisation and loyalty. In the joint loyalty model, trust remained material while personalisation’s direct coefficient was small and not statistically significant. That changed the interpretation from a simple association to a more specific question about the role of trust.",
    "Why the interpretation matters",
    "I used mediation analysis to examine the relationship, but the survey cannot establish causation. The practical next step is to test changes experimentally and observe behaviour, rather than assume that more personalisation will create loyalty."
  ],
  "process-redesign": [
    "A diagram had to become a database that could answer questions.",
    "Our team moved from business data flows to entity relationships and then working SQL. Creating tables was only part of the task: populating them and running queries tested whether the structure supported the intended reporting.",
    "Where the work could be stronger",
    "Assessor feedback supported the alignment between the ERD and SQL. Clearer DFD notation, explicit test cases and better SQL comments would make the reasoning easier for another analyst to inspect and maintain."
  ],
  "predictive-analytics": [
    "The lowest error rate was the start of a decision, not the end.",
    "I compared 3 classifiers on the same gym membership dataset. The neural network had the lowest validation misclassification at 4.42%, but choosing a retention action requires more than ranking models by a single metric.",
    "The judgement beyond the score",
    "A missed leaver and an unnecessary retention offer have different costs. Test set precision, recall and business cost thresholds would need to be examined before turning a churn score into an operational decision."
  ]
};

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
    alternates: { canonical: `/work/${slug}/` },
    title: project.name,
    description: project.lead,
    openGraph: {
      title: project.name,
      description: project.lead,
      url: `/work/${slug}/`,
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
            <h1>{projectSummaries[slug].headline}</h1>
            <p className="case-lead">{project.lead}</p>
            <div className="case-takeaway"><span>Key finding</span><p>{projectSummaries[slug].result}</p><a href="#evidence">Explore the evidence ↓</a></div>
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
                <h3>{caseStories[slug][0]}</h3>
                <p>{caseStories[slug][1]}</p>
                <h3>{caseStories[slug][2]}</h3>
                <p>{caseStories[slug][3]}</p>
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
                {(
                  <details className="case-model-disclosure">
                    <summary>Explore the model in 3D</summary>
                    <ModelExplorer initialMode={project.slug === 'customer-intelligence' ? 'trust' : project.slug === 'predictive-analytics' ? 'network' : project.slug === 'process-redesign' ? 'data' : 'decision'} />
                  </details>
                )}
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
                <div id="next-iteration">
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
